import "server-only";

import { readFile } from "fs/promises";
import path from "path";
import { brandMeta, type BrandMeta } from "./site";

export type Product = {
  id: string;
  code: string;
  brand: string;
  brandSlug: string;
  collection: string | null;
  thickness: string | null;
  size: string;
  finish: string | null;
  imageUrl: string;
  panoramaUrl: string | null;
};

export type CatalogData = {
  products: Product[];
  brands: (BrandMeta & { count: number })[];
  collections: { name: string; count: number }[];
  thicknesses: { name: string; count: number }[];
};

type RawProduct = {
  code: string;
  brand: string;
  finish: string | null;
  size: string | null;
  thickness: string | null;
  collection: string | null;
  file: string;
  pano: string | null;
  panoFile?: string;
};

const DATA_FILE = path.join(process.cwd(), "data", "rosewood-products.json");

// Rosewood lists sheet size in mixed formats per brand; sheets are the
// standard 2440 x 1220 mm, so display one canonical value.
const SHEET_SIZE = "2440 X 1220 MM";

const brandNameToSlug: Record<string, string> = {
  Ranwood: "ranwood",
  "Ran Berry": "ranberry",
  Atina: "atina",
  Arica: "arica",
  "Ranwood Rega": "ranwood-rega",
  "Dazzle Berry": "dazzle-berry",
};

// Images live in public/catalogue/<folder>/ and are served statically.
function imageUrl(folder: string, fileName: string) {
  return `/catalogue/${encodeURIComponent(folder)}/${encodeURIComponent(fileName)}`;
}

function slugifyCode(code: string) {
  return code
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

let cached: CatalogData | null = null;

export async function getCatalogData(): Promise<CatalogData> {
  if (cached) return cached;

  const raw: RawProduct[] = JSON.parse(await readFile(DATA_FILE, "utf8"));

  const products: Product[] = raw
    .filter((item) => brandNameToSlug[item.brand])
    .map((item) => {
      const brandSlug = brandNameToSlug[item.brand];
      const meta = brandMeta.find((b) => b.slug === brandSlug);

      return {
        id: `${brandSlug}-${slugifyCode(item.code)}`,
        code: item.code,
        brand: meta?.name ?? item.brand,
        brandSlug,
        collection: item.collection || null,
        thickness: item.thickness || null,
        size: SHEET_SIZE,
        finish: item.finish ? item.finish.replace(/\s*\|\s*/g, " / ") : null,
        imageUrl: imageUrl(brandSlug, item.file),
        panoramaUrl: item.panoFile ? imageUrl("360", item.panoFile) : null,
      };
    });

  products.sort((a, b) => {
    if (a.brandSlug !== b.brandSlug)
      return a.brandSlug.localeCompare(b.brandSlug);
    return a.code.localeCompare(b.code, undefined, { numeric: true });
  });

  const brands = brandMeta.map((meta) => ({
    ...meta,
    count: products.filter((p) => p.brandSlug === meta.slug).length,
  }));

  const countBy = (values: (string | null)[]) => {
    const map = new Map<string, number>();
    for (const value of values) {
      if (!value) continue;
      map.set(value, (map.get(value) ?? 0) + 1);
    }
    return [...map.entries()]
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  };

  cached = {
    products,
    brands,
    collections: countBy(products.map((p) => p.collection)),
    thicknesses: countBy(products.map((p) => p.thickness)),
  };

  return cached;
}

export async function getProduct(id: string) {
  const { products } = await getCatalogData();
  return products.find((p) => p.id === id) ?? null;
}

export async function getRelatedProducts(product: Product, limit = 4) {
  const { products } = await getCatalogData();
  const sameBrand = products.filter(
    (p) => p.brandSlug === product.brandSlug && p.id !== product.id,
  );
  const index = sameBrand.findIndex(
    (p) => p.code.localeCompare(product.code, undefined, { numeric: true }) > 0,
  );
  if (index === -1) return sameBrand.slice(0, limit);
  const related = sameBrand.slice(index, index + limit);
  return related.length < limit
    ? related.concat(sameBrand.slice(0, limit - related.length))
    : related;
}
