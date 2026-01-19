import { adminDb } from "../../../firebaseAdmin";
import twilio from "twilio";

function isPhoneDigits10or11(v) {
  return /^[0-9]{10,11}$/.test(v);
}

function makeCode(len = 7) {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "";
  for (let i = 0; i < len; i++) out += chars[Math.floor(Math.random() * chars.length)];
  return out;
}

async function createUniqueInviteDoc(uses = 3) {
  // retry a few times to avoid collisions
  for (let i = 0; i < 10; i++) {
    const code = makeCode(7);
    const ref = adminDb.collection("invites").doc(code);
    const snap = await ref.get();
    if (!snap.exists) {
      await ref.set({
        enabled: true,
        usesRemaining: uses,
        createdAt: new Date(),
      });
      return code;
    }
  }
  throw new Error("failed_to_generate_code");
}

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") return res.status(405).json({ ok: false, error: "method_not_allowed" });

    const {
      inviteCode,
      phone,
      firstName,
      age,
      gender,
      sexualIdentification,
      primaryNeighborhood,
      locationType,
    } = req.body || {};

    const code = String(inviteCode || "").trim().toUpperCase();
    const rawPhone = String(phone || "").replace(/\D/g, ""); // expects digits only already, but safe
    const ageNum = parseInt(age, 10);

    if (
      !code ||
      !rawPhone ||
      !firstName ||
      !gender ||
      !primaryNeighborhood ||
      !locationType ||
      !Array.isArray(sexualIdentification) ||
      !sexualIdentification[0] ||
      Number.isNaN(ageNum)
    ) {
      return res.status(400).json({ ok: false, error: "missing_fields" });
    }

    if (!isPhoneDigits10or11(rawPhone)) {
      return res.status(400).json({ ok: false, error: "missing_fields" });
    }

    // 1) Validate + decrement invite atomically
    const inviteRef = adminDb.collection("invites").doc(code);

    await adminDb.runTransaction(async (tx) => {
      const snap = await tx.get(inviteRef);
      if (!snap.exists) throw new Error("invalid_invite");
      const data = snap.data() || {};
      if (!data.enabled) throw new Error("invalid_invite");
      const uses = Number(data.usesRemaining || 0);
      if (uses <= 0) throw new Error("used_up");
      tx.update(inviteRef, { usesRemaining: uses - 1 });
    });

    // 2) Prevent duplicate phone across BOTH collections (users + notChicago)
    const usersQ = await adminDb.collection("users").where("phone", "==", rawPhone).limit(1).get();
    if (!usersQ.empty) return res.status(409).json({ ok: false, error: "duplicate_phone" });

    const notChicagoQ = await adminDb.collection("notChicago").where("phone", "==", rawPhone).limit(1).get();
    if (!notChicagoQ.empty) return res.status(409).json({ ok: false, error: "duplicate_phone" });

    // 3) Write signup to same collection logic as before
    const targetCollection = locationType === "No" ? "notChicago" : "users";

    await adminDb.collection(targetCollection).add({
      phone: rawPhone,
      firstName: String(firstName).trim(),
      age: String(ageNum),
      gender,
      sexualIdentification: [String(sexualIdentification[0])],
      primaryNeighborhood,
      locationType,
      createdAt: new Date(),
      inviteUsed: code,
    });

    // 4) Create a new personal invite for THIS new user (3 uses)
    const myCode = await createUniqueInviteDoc(3);
    const myInviteLink = `https://joineclipse.co/?code=${myCode}`;

    // 5) Send SMS with invite link
    try {
      const client = twilio(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_AUTH_TOKEN
      );

      const greeting = firstName ? `, ${firstName}` : "";

      await client.messages.create({
        body: `Welcome to Eclipse${greeting}.

You're officially in.

Your private invite link (3 uses):
${myInviteLink}

Send it to up to 3 friends for first access.`,
        messagingServiceSid: process.env.TWILIO_MESSAGING_SERVICE_SID,
        to: `+${rawPhone}`,
      });
    } catch (smsError) {
      // Log SMS error but don't fail the request - user still gets their invite link
      console.error("Failed to send SMS:", smsError);
    }

    return res.status(200).json({ ok: true, myInviteLink });
  } catch (e) {
    const msg = String(e?.message || "");
    if (msg === "invalid_invite") return res.status(400).json({ ok: false, error: "invalid_invite" });
    if (msg === "used_up") return res.status(400).json({ ok: false, error: "used_up" });
    console.error(e);
    return res.status(500).json({ ok: false, error: "server_error" });
  }
}
