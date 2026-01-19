import twilio from "twilio";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end("Method not allowed");
  }

  const { phone, firstName, inviteLink } = req.body;

  if (!phone) {
    return res.status(400).json({ error: "Missing phone number" });
  }

  if (!inviteLink) {
    return res.status(400).json({ error: "Missing invite link" });
  }

  try {
    const client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );

    const greeting = firstName ? `, ${firstName}` : "";

    await client.messages.create({
      body: `Welcome to Eclipse${greeting}.

You’re officially in.

Your private invite link (3 uses):
${inviteLink}

Send it to up to 3 friends for first access.`,
      messagingServiceSid: process.env.TWILIO_MESSAGING_SERVICE_SID,
      to: `+${phone}`,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Twilio error:", error);
    return res.status(500).json({ error: "Failed to send message" });
  }
}
