export default async function handler(req, res) {
  if (req.method === "GET") {
    const VERIFY_TOKEN = "bfj_secret_token";

    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      return res.status(200).send(challenge);
    } else {
      return res.status(403).send("Forbidden");
    }
  }

  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  const hasMessage =
    req.body?.entry?.[0]?.changes?.[0]?.value?.messages !== undefined;

  if (hasMessage) {
    await fetch("https://brazilfinancejournal.app.n8n.cloud/webhook/proxy-handler", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });
  }

  return res.status(200).end();
}

