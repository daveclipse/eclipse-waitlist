import twilio from "twilio";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end("Method not allowed");
  }

  const { phone, firstName } = req.body;

  if (!phone) {
    return res.status(400).json({ error: "Missing phone number" });
  }

  try {
    const client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );

    await client.messages.create({
      body: `Hey ${firstName || ""}, thanks for signing up for Eclipse!`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: `+${phone}`,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Twilio error:", error);
    return res.status(500).json({ error: "Failed to send message" });
  }
}