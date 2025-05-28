export default async function handler(req, res) {
  if (req.method === "GET") {
    const VERIFY_TOKEN = "bfj_secret_token";

    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    if (mode && token && mode === "subscribe" && token === VERIFY_TOKEN) {
      return res.status(200).send(challenge);
    } else {
      return res.status(403).send("Forbidden");
    }
  }

  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  const body = req.body;
  const hasMessages = body?.messages !== undefined;

  if (hasMessages) {
    await fetch("https://brazilfinancejournal.app.n8n.cloud/webhook-test/cbf534ed-4b29-4190-9fe1-63c2d6a8df49/webhook", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  }

  return res.status(200).end();
}
