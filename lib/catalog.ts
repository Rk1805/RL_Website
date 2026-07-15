import "server-only";

import { readdir, readFile } from "fs/promises";
import path from "path";

export type CatalogFinish = {
  name: string;
  code: string;
};

export type CatalogImage = {
  fileName: string;
  code: string;
  finishCode: string | null;
  finishName: string | null;
  imageUrl: string;
};

export type CatalogBrand = {
  slug: string;
  name: string;
  finishes: CatalogFinish[];
  images: CatalogImage[];
};

export type CatalogData = {
  brands: CatalogBrand[];
};

const ROOT = process.cwd();
const CATALOG_DIR = path.join(ROOT, "catalogue");
const FINISH_DIR = path.join(ROOT, "finishes");

const supportedImageExtensions = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".gif",
]);

function toDisplayName(slug: string) {
  return slug
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function parseFinishLine(line: string): CatalogFinish | null {
  const trimmed = line.trim();

  if (!trimmed) return null;

  const separatorIndex = trimmed.lastIndexOf(" - ");

  if (separatorIndex === -1) return null;

  const name = trimmed.slice(0, separatorIndex).trim();
  const code = trimmed
    .slice(separatorIndex + 3)
    .trim()
    .toUpperCase();

  if (!name || !code) return null;

  return { name, code };
}

async function readFinishMap(slug: string) {
  const filePath = path.join(FINISH_DIR, `${slug}.txt`);

  try {
    const content = await readFile(filePath, "utf8");
    const entries = content
      .split(/\r?\n/)
      .map(parseFinishLine)
      .filter((entry): entry is CatalogFinish => Boolean(entry));

    return entries;
  } catch {
    return [];
  }
}

function getImageCode(fileName: string) {
  const code = fileName.match(/^[A-Z]+/)?.[0] ?? "";
  return code.toUpperCase();
}

export async function getCatalogData(): Promise<CatalogData> {
  const brandEntries = await readdir(CATALOG_DIR, { withFileTypes: true });
  const requestedOrder = ["arica", "ranwood", "ranberry"];

  const availableBrands = brandEntries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort((left, right) => {
      const leftIndex = requestedOrder.indexOf(left);
      const rightIndex = requestedOrder.indexOf(right);

      if (leftIndex === -1 && rightIndex === -1)
        return left.localeCompare(right);
      if (leftIndex === -1) return 1;
      if (rightIndex === -1) return -1;
      return leftIndex - rightIndex;
    });

  const brands: CatalogBrand[] = [];

  for (const slug of availableBrands) {
    const [finishes, files] = await Promise.all([
      readFinishMap(slug),
      readdir(path.join(CATALOG_DIR, slug), { withFileTypes: true }),
    ]);

    const finishLookup = new Map(finishes.map((item) => [item.code, item]));

    const images: CatalogImage[] = files
      .filter((entry) => entry.isFile())
      .map((entry) => entry.name)
      .filter((fileName) =>
        supportedImageExtensions.has(path.extname(fileName).toLowerCase()),
      )
      .sort((left, right) => left.localeCompare(right))
      .map((fileName) => {
        const code = getImageCode(fileName);
        const finish = code ? (finishLookup.get(code) ?? null) : null;

        return {
          fileName,
          code,
          finishCode: finish?.code ?? null,
          finishName: finish?.name ?? null,
          imageUrl: `/api/catalog-image?brand=${encodeURIComponent(slug)}&file=${encodeURIComponent(fileName)}`,
        };
      });

    brands.push({
      slug,
      name: toDisplayName(slug),
      finishes,
      images,
    });
  }

  return { brands };
}
