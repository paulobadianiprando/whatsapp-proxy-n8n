export default async function handler(req, res) {
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
