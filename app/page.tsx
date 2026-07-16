import Link from "next/link";
import {
  ChevronRight,
  Layers,
  ShieldCheck,
  Sparkles,
  Droplets,
  Flame,
  Sun,
  Wind,
  Fingerprint,
  Award,
  Truck,
  Phone,
} from "lucide-react";
import { getCatalogData } from "@/lib/catalog";
import { brandMeta, site, whatsappLink } from "@/lib/site";

const featureTiles = [
  {
    icon: ShieldCheck,
    title: "Scratch Resistant",
    desc: "Tough wear layers that stand up to daily knocks and abrasion.",
  },
  {
    icon: Flame,
    title: "Heat Resistant",
    desc: "Engineered to handle the warmth of busy kitchens and worktops.",
  },
  {
    icon: Droplets,
    title: "Easy to Clean",
    desc: "Wipe-clean surfaces that keep their finish for years.",
  },
  {
    icon: Sparkles,
    title: "Antibacterial",
    desc: "Hygienic surfaces suited to kitchens, wardrobes and offices.",
  },
  {
    icon: Sun,
    title: "Colourfast",
    desc: "High lightfastness keeps decors rich and true over time.",
  },
  {
    icon: Wind,
    title: "Moisture Resistant",
    desc: "Stable performance in humid Indian conditions.",
  },
  {
    icon: Fingerprint,
    title: "Soft-Touch Finishes",
    desc: "Velvety anti-fingerprint textures for premium interiors.",
  },
  {
    icon: Layers,
    title: "1220 × 2440 mm Sheets",
    desc: "Full-size sheets in 0.82 mm to 1.4 mm thicknesses.",
  },
];

export default async function Home() {
  const catalog = await getCatalogData();
  const totalDesigns = Math.floor(catalog.products.length / 10) * 10;

  const heroPicks = [
    ...catalog.products.filter((p) => p.brandSlug === "ranwood").slice(2, 4),
    ...catalog.products.filter((p) => p.brandSlug === "atina").slice(4, 6),
    ...catalog.products
      .filter((p) => p.brandSlug === "dazzle-berry")
      .slice(3, 5),
  ];

  const collectionCards = catalog.collections.map((collection) => {
    const sample = catalog.products.find(
      (p) => p.collection === collection.name,
    );
    return { ...collection, image: sample?.imageUrl };
  });

  const featured = catalog.brands
    .map((brand) =>
      catalog.products.find((p) => p.brandSlug === brand.slug && p.thickness),
    )
    .filter((p) => p !== undefined)
    .slice(0, 6);

  return (
    <main className="bg-stone-50 text-stone-900">
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-stone-950 via-stone-900 to-stone-950">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -left-1/4 -top-1/4 h-[80%] w-[80%] rounded-full bg-amber-500/5 blur-3xl" />
          <div className="absolute -bottom-1/4 -right-1/4 h-[80%] w-[80%] rounded-full bg-amber-600/5 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-xs font-medium uppercase tracking-widest text-amber-400 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-400" />
                Authorized Distributor of Rosewood Laminates
              </div>
              <h1 className="font-display mt-6 text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl xl:text-6xl">
                Surfaces that turn
                <span className="text-amber-400"> houses </span>
                into homes
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-stone-300">
                Explore {totalDesigns}+ premium decorative laminate designs
                across six designer brands — woodgrains, marbles, pastels and
                bold abstracts, all under one roof in Bengaluru since{" "}
                {site.since}.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/catalogues"
                  className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-7 py-3.5 text-sm font-semibold text-stone-900 transition-all hover:bg-amber-400 hover:shadow-lg hover:shadow-amber-500/25"
                >
                  Explore Catalogues
                  <ChevronRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/contact-us"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-white/30 hover:bg-white/10"
                >
                  <Phone className="h-4 w-4" />
                  Talk to Us
                </Link>
              </div>

              {/* Stats */}
              <div className="mt-12 grid grid-cols-3 gap-6 border-t border-white/10 pt-8">
                {[
                  [`${totalDesigns}+`, "Laminate Designs"],
                  ["6", "Designer Brands"],
                  [`${new Date().getFullYear() - site.since}+`, "Years of Service"],
                ].map(([value, label]) => (
                  <div key={label}>
                    <div className="font-display text-3xl font-semibold text-amber-400 sm:text-4xl">
                      {value}
                    </div>
                    <div className="mt-1 text-xs uppercase tracking-widest text-stone-400">
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero mosaic */}
            <div className="hidden lg:block">
              <div className="grid grid-cols-3 gap-3">
                {heroPicks.map((product, index) => (
                  <Link
                    key={product.id}
                    href={`/catalogues/${product.id}`}
                    className={`group relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl ${
                      index % 3 === 1 ? "translate-y-8" : ""
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={product.imageUrl}
                      alt={`${product.brand} laminate ${product.code}`}
                      className="aspect-[3/4] w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-stone-950/80 to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <p className="text-xs font-semibold text-white">
                        {product.brand} · {product.code}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-stone-50 to-transparent" />
      </section>

      {/* ============ BRAND MARQUEE ============ */}
      <section className="border-b border-stone-200 bg-white py-8">
        <div className="overflow-hidden">
          <div className="animate-marquee flex w-max items-center gap-16 px-8">
            {[...brandMeta, ...brandMeta].map((brand, index) => (
              <Link
                key={`${brand.slug}-${index}`}
                href={`/catalogues?brand=${brand.slug}`}
                className="font-display whitespace-nowrap text-2xl font-semibold tracking-wide text-stone-300 transition-colors hover:text-amber-600"
              >
                {brand.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ COLLECTIONS ============ */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-amber-700">
              <Sparkles className="h-4 w-4" />
              Our Collections
            </div>
            <h2 className="font-display mt-4 text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">
              A decor for every story
            </h2>
            <p className="mt-3 max-w-2xl text-stone-600">
              From warm woodgrains to dramatic marbles and playful pastels —
              browse curated collections from the Rosewood family.
            </p>
          </div>
          <Link
            href="/catalogues"
            className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-amber-700 transition-colors hover:text-amber-600"
          >
            View All
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {collectionCards.map((collection) => (
            <Link
              key={collection.name}
              href={`/catalogues?collection=${encodeURIComponent(collection.name)}`}
              className="group relative overflow-hidden rounded-3xl shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="aspect-[4/5] w-full overflow-hidden bg-stone-200">
                {collection.image && (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={collection.image}
                    alt={collection.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                )}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="font-display text-xl font-semibold text-white">
                  {collection.name.replace(" Collection", "")}
                </h3>
                <p className="mt-1 text-sm text-stone-300">
                  {collection.count}+ designs
                </p>
                <div className="mt-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-400 opacity-0 transition-all duration-300 group-hover:opacity-100">
                  Explore
                  <ChevronRight className="h-3.5 w-3.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ============ BRANDS ============ */}
      <section className="bg-stone-950 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-amber-400">
              The Rosewood Family
            </div>
            <h2 className="font-display mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Six brands, one standard of excellence
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-stone-400">
              As an authorized distributor, we stock the complete Rosewood
              Laminates portfolio — every brand, every finish, every design.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {catalog.brands.map((brand) => {
              const sample = catalog.products.find(
                (p) => p.brandSlug === brand.slug,
              );
              return (
                <Link
                  key={brand.slug}
                  href={`/catalogues?brand=${brand.slug}`}
                  className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 transition-all duration-300 hover:-translate-y-1 hover:border-amber-500/30"
                >
                  <div className="flex items-center gap-5 p-6">
                    <div className="h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-stone-800">
                      {sample && (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          src={sample.imageUrl}
                          alt={brand.name}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                          loading="lazy"
                        />
                      )}
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-semibold text-white">
                        {brand.name}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-stone-400">
                        {brand.blurb}
                      </p>
                      <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-amber-400">
                        {brand.count} designs
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ WHY CHOOSE ============ */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-stone-200 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-stone-700">
            Built to Last
          </div>
          <h2 className="font-display mt-4 text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">
            Beauty that performs
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-stone-600">
            Every sheet is manufactured by Rosewood Laminates using
            high-pressure lamination for surfaces that look premium and live
            practical.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featureTiles.map((item) => (
            <div
              key={item.title}
              className="group rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-stone-200/50"
            >
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-100 to-amber-200 text-amber-700 transition-transform duration-300 group-hover:scale-110">
                <item.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-sm font-bold uppercase tracking-widest text-stone-900">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ============ FEATURED DESIGNS ============ */}
      <section className="bg-gradient-to-br from-stone-100 to-stone-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-amber-700">
                <Layers className="h-4 w-4" />
                Fresh from the Catalogue
              </div>
              <h2 className="font-display mt-4 text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">
                Designs our clients love
              </h2>
            </div>
            <Link
              href="/catalogues"
              className="inline-flex items-center gap-2 rounded-full bg-stone-900 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-amber-700"
            >
              Browse All Designs
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {featured.map((product) => (
              <Link
                key={product.id}
                href={`/catalogues/${product.id}`}
                className="group overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="aspect-[3/4] overflow-hidden bg-stone-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.imageUrl}
                    alt={`${product.brand} ${product.code}`}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
                <div className="p-3">
                  <p className="text-sm font-semibold text-stone-900">
                    {product.code}
                  </p>
                  <p className="text-xs text-stone-500">{product.brand}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ WHY RAINBOW ============ */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-stone-200 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-stone-700">
              Why Rainbow
            </div>
            <h2 className="font-display mt-4 text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">
              A distributor you can build on
            </h2>
            <p className="mt-5 leading-relaxed text-stone-600">
              For over a decade, architects, carpenters and homeowners across
              Bengaluru have trusted Rainbow Laminates for genuine Rosewood
              products, honest advice and stock that&apos;s ready when the site
              is.
            </p>
            <div className="mt-8 space-y-5">
              {[
                {
                  icon: Award,
                  title: "Genuine, factory-fresh stock",
                  desc: "Every sheet sourced directly from Rosewood Laminates — no seconds, no substitutes.",
                },
                {
                  icon: Layers,
                  title: "The complete range",
                  desc: "All six brands and every current catalogue available to see and touch.",
                },
                {
                  icon: Truck,
                  title: "Fast local delivery",
                  desc: "Quick dispatch across Bengaluru so your project never waits on material.",
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-stone-900">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-stone-600">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10">
              <Link
                href="/about-us"
                className="inline-flex items-center gap-2 rounded-full bg-stone-900 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-amber-700"
              >
                More About Us
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {catalog.products
              .filter((p) => p.brandSlug === "arica")
              .slice(6, 10)
              .map((product, index) => (
                <div
                  key={product.id}
                  className={`overflow-hidden rounded-3xl shadow-lg ${index % 2 === 1 ? "translate-y-6" : ""}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.imageUrl}
                    alt={`${product.brand} laminate ${product.code}`}
                    className="aspect-[4/5] w-full object-cover"
                    loading="lazy"
                  />
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-stone-950 via-stone-900 to-stone-950 p-8 shadow-2xl sm:p-12 lg:p-16">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-amber-600/10 blur-3xl" />

          <div className="relative mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Let&apos;s help you choose right
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-stone-300">
              Not sure which decor suits your space? Send us your ideas — we
              will shortlist designs, share samples and quote the best price.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                href={whatsappLink(
                  "Hi Rainbow Laminates! I'd like help choosing a laminate design.",
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-7 py-3.5 text-sm font-semibold text-stone-900 transition-all hover:bg-amber-400 hover:shadow-lg hover:shadow-amber-500/25"
              >
                WhatsApp Us
                <ChevronRight className="h-4 w-4" />
              </a>
              <Link
                href="/contact-us"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-white/30 hover:bg-white/10"
              >
                Enquire Now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
