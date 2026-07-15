import { readFile } from "fs/promises";
import path from "path";

const ROOT = process.cwd();
const CATALOG_DIR = path.join(ROOT, "catalogue");

function getMimeType(fileName: string) {
  const ext = path.extname(fileName).toLowerCase();

  if (ext === ".jpg" || ext === ".jpeg") return "image/jpeg";
  if (ext === ".png") return "image/png";
  if (ext === ".webp") return "image/webp";
  if (ext === ".gif") return "image/gif";

  return "application/octet-stream";
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const brand = url.searchParams.get("brand") ?? "";
  const file = url.searchParams.get("file") ?? "";

  if (!brand || !file) {
    return new Response("Missing brand or file", { status: 400 });
  }

  const safeBrand = brand.replace(/[^a-zA-Z0-9_-]/g, "");
  const safeFile = file.replace(/[^a-zA-Z0-9._-]/g, "");
  const resolvedPath = path.resolve(CATALOG_DIR, safeBrand, safeFile);
  const allowedRoot = path.resolve(CATALOG_DIR, safeBrand);

  if (!resolvedPath.startsWith(allowedRoot)) {
    return new Response("Invalid path", { status: 400 });
  }

  try {
    const bytes = await readFile(resolvedPath);

    return new Response(bytes, {
      headers: {
        "Content-Type": getMimeType(safeFile),
        "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
