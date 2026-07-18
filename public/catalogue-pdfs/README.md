# E-Catalogue PDFs

Drop catalogue PDFs in this folder and they appear on the `/e-catalogues`
page after the next build/deploy (on Vercel: just push to git).

- The displayed title comes from `lib/e-catalogues.ts`: known files have
  clean curated titles there; new files fall back to a tidied-up filename.
  Add an entry to the `curated` map for a polished title/series/logo.
- Cover thumbnails live in `public/e-catalogue-covers/`. After adding new
  PDFs, run `npm run covers` (macOS) to render page-1 covers. PDFs without
  a cover get a styled placeholder card.
- Keep each PDF under 100 MB (Vercel's per-file limit).
