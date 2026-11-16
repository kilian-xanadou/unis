// Petit serveur local pour regarder site/ : node src/serve.mjs puis http://localhost:4321
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { join, extname, dirname, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "site");
const TYPES = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".svg": "image/svg+xml", ".xml": "application/xml", ".txt": "text/plain" };
const PORT = process.env.PORT || 4321;

createServer(async (req, res) => {
  let p = normalize(decodeURIComponent(new URL(req.url, "http://x").pathname)).replace(/^(\.\.[\/\\])+/, "");
  let f = join(ROOT, p);
  try { if ((await stat(f)).isDirectory()) f = join(f, "index.html"); } catch {}
  try {
    const body = await readFile(f);
    res.writeHead(200, { "content-type": TYPES[extname(f)] || "application/octet-stream" }).end(body);
  } catch {
    res.writeHead(404, { "content-type": TYPES[".html"] }).end(await readFile(join(ROOT, "404.html")));
  }
}).listen(PORT, () => console.log(`UNIS : http://localhost:${PORT}`));
