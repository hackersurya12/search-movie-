export default async function handler(req, res) {
  try {
    const { url } = req.query;

    if (!url) {
      return res.status(400).json({
        error: "Missing url parameter"
      });
    }

    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0"
      }
    });

    const contentType = response.headers.get("content-type") || "";

    res.setHeader("Access-Control-Allow-Origin", "*");

    if (contentType.includes("application/json")) {
      const data = await response.json();
      return res.status(response.status).json(data);
    }

    const text = await response.text();
    return res.status(response.status).send(text);

  } catch (err) {
    return res.status(500).json({
      error: err.message
    });
  }
}
