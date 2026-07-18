# Rainbow Laminates

Marketing site for **Rainbow Laminates**, Bengaluru — authorized distributor
of Rosewood Laminates. Built with Next.js (App Router) + Tailwind CSS.
Fully static: no database, no backend services.

## Pages

- `/` — home (hero, brands, collections, features)
- `/about-us` — story, values, brand family, branches
- `/collections` — 314-design browser with brand/collection/thickness filters
  (`?brand=` and `?collection=` deep links supported)
- `/collections/[id]` — product detail with specs and 360° room viewer
- `/e-catalogues` — downloadable PDF catalogues
- `/contact-us` — enquiry form (WhatsApp/email), branches, map

## Develop

```bash
pnpm install
pnpm dev
```

To open the dev server from a phone on the same network, use the machine's
LAN IP (e.g. http://192.168.1.5:3000) — allowed origins are configured in
next.config.ts.

## Content updates

- **Business info** (phone, address, branches, brands): lib/site.ts
- **Products**: data/rosewood-products.json + images in public/catalogue/
- **PDF catalogues**: drop files in public/catalogue-pdfs/
  (see the README there), then `npm run covers` for thumbnails
- **Brand logos**: public/brand-logos/

## Deploy

```bash
pnpm build   # verify locally
```

Push to GitHub and import the repo at vercel.com — no environment
variables or extra configuration needed. Every page is statically
generated; all images/PDFs are served from public/.
