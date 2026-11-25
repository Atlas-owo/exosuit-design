import http from "node:http";
import {readFile, stat} from "node:fs/promises";
import path from "node:path";
import {fileURLToPath} from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../dist");
const port = Number(process.env.PORT || 4173);
const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".glb": "model/gltf-binary",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
  ".md": "text/markdown; charset=utf-8"
};

http.createServer(async (request, response) => {
  try {
    const url = new URL(request.url, `http://localhost:${port}`);
    const requestedPath = decodeURIComponent(url.pathname);
    const filename = path.resolve(root, `.${requestedPath === "/" ? "/index.html" : requestedPath}`);
    if (!filename.startsWith(root + path.sep)) {
      response.writeHead(403).end("Forbidden");
      return;
    }
    const metadata = await stat(filename);
    if (!metadata.isFile()) throw new Error("Not a file");
    const data = await readFile(filename);
    response.writeHead(200, {"Content-Type": contentTypes[path.extname(filename)] || "application/octet-stream", "Cache-Control": "no-cache"});
    response.end(data);
  } catch {
    response.writeHead(404).end("Not found");
  }
}).listen(port, "127.0.0.1", () => {
  console.log(`SARTEXO Design Explorer is available at http://127.0.0.1:${port}`);
});
