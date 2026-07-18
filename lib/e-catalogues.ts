import "server-only";

import { existsSync } from "fs";
import { readdir, stat } from "fs/promises";
import path from "path";

export type ECatalogue = {
  fileName: string;
  title: string;
  series: string | null;
  logoUrl: string | null;
  sizeLabel: string;
  coverUrl: string | null;
  viewUrl: string;
  downloadUrl: string;
};

const E_CATALOGUE_DIR = path.join(process.cwd(), "public", "catalogue-pdfs");
const COVER_DIR = path.join(process.cwd(), "public", "e-catalogue-covers");

// Clean display names for known catalogue files. New PDFs dropped into
// e-catalogues/ fall back to a cleaned-up filename; add them here for a
// polished title. `series` renders as the small label above the title and
// `logo` (a file in public/brand-logos/) replaces it with the brand mark.
const curated: Record<
  string,
  { title: string; series?: string; logo?: string }
> = {
  "arica touch file": {
    title: "Arica Touch",
    series: "Laminates",
    logo: "/brand-logos/arica.svg",
  },
  "ran wood": {
    title: "Ranwood",
    series: "Laminates",
    logo: "/brand-logos/ranwood.svg",
  },
  "ran wood rega 1": {
    title: "Ranwood Rega",
    series: "Laminates",
    logo: "/brand-logos/ranwood-rega.svg",
  },
  "dbl v1 48 pcs e catalogue lr": {
    title: "Louvers · Vol. 1",
    series: "Dazzle Berry",
    logo: "/brand-logos/dazzle-berry.svg",
  },
  "black pearl": {
    title: "Black Pearl",
    series: "Vogue",
    logo: "/brand-logos/vogue.png",
  },
  "royal glow final pdf": {
    title: "PVC Laminates",
    series: "Royalglow",
    logo: "/brand-logos/royalglow.png",
  },
  "new koyoo final 251012 181955": {
    title: "Koyoo",
    logo: "/brand-logos/koyoo.png",
  },
  "sofit final 8 10 2025 1": {
    title: "Sofit · Arika Panels",
    series: "Royalglow",
    logo: "/brand-logos/royalglow.png",
  },
  "db acrylic 2025": {
    title: "Acrylic 2025",
    series: "Dazzle Berry",
    logo: "/brand-logos/dazzle-berry.svg",
  },
  "dazzle berry asa": {
    title: "ASA Collection",
    series: "Dazzle Berry",
    logo: "/brand-logos/dazzle-berry.svg",
  },
  "dazzle berry louvers vol 2 251028 114541": {
    title: "Louvers · Vol. 2",
    series: "Dazzle Berry",
    logo: "/brand-logos/dazzle-berry.svg",
  },
  "dazzle berry wall panels cc 1": {
    title: "Wall Panels",
    series: "Dazzle Berry",
    logo: "/brand-logos/dazzle-berry.svg",
  },
  "dazzle berry cane": {
    title: "Cane · Rattan",
    series: "Dazzle Berry",
    logo: "/brand-logos/dazzle-berry.svg",
  },
  "dezzale berry canezy 18 2 2026": {
    title: "Canezy",
    series: "Dazzle Berry",
    logo: "/brand-logos/dazzle-berry.svg",
  },
};

function normalize(value: string) {
  return value
    .replace(/\.pdf$/i, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function coverSlug(fileName: string) {
  return normalize(fileName).replace(/\s+/g, "-");
}

function fallbackTitle(fileName: string) {
  const noise = new Set(["final", "pdf", "lr", "new", "e", "catalogue"]);
  return normalize(fileName)
    .split(" ")
    .filter((word) => !noise.has(word) && !/^\d+$/.test(word))
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function formatSize(bytes: number) {
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

export async function getECatalogues(): Promise<ECatalogue[]> {
  let entries;
  try {
    entries = await readdir(E_CATALOGUE_DIR, { withFileTypes: true });
  } catch {
    return [];
  }

  const pdfs = entries
    .filter((entry) => entry.isFile() && /\.pdf$/i.test(entry.name))
    .map((entry) => entry.name);

  const catalogues = await Promise.all(
    pdfs.map(async (fileName): Promise<ECatalogue> => {
      const { size } = await stat(path.join(E_CATALOGUE_DIR, fileName));
      const known = curated[normalize(fileName)];
      const slug = coverSlug(fileName);
      const url = `/catalogue-pdfs/${encodeURIComponent(fileName)}`;

      return {
        fileName,
        title: known?.title ?? fallbackTitle(fileName),
        series: known?.series ?? null,
        logoUrl: known?.logo ?? null,
        sizeLabel: formatSize(size),
        coverUrl: existsSync(path.join(COVER_DIR, `${slug}.jpg`))
          ? `/e-catalogue-covers/${slug}.jpg`
          : null,
        viewUrl: url,
        downloadUrl: url,
      };
    }),
  );

  return catalogues.sort((a, b) => {
    const seriesA = a.series ?? "";
    const seriesB = b.series ?? "";
    if (seriesA !== seriesB) return seriesA.localeCompare(seriesB);
    return a.title.localeCompare(b.title);
  });
}
