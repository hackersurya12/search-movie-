export default async function handler(req, res) {
  const url = req.query.url
  if (!url) {
    return res.status(400).json({ error: 'Missing "url" query parameter' })
  }

  try {
    const response = await fetch(url)
    const body = await response.text()

    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Content-Type', response.headers.get('Content-Type') || 'text/plain')
    res.status(response.status).send(body)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
