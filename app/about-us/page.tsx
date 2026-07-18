import type { Metadata } from "next";
import Link from "next/link";
import {
  ChevronRight,
  Handshake,
  Layers,
  MapPin,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { getCatalogData } from "@/lib/catalog";
import { partnerBrands, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Rainbow Laminates — authorized distributor of Rosewood Laminates in Bengaluru since 2009. Our story, our values and the brands we carry.",
};

const values = [
  {
    icon: ShieldCheck,
    title: "Genuine Products",
    desc: "We supply only factory-fresh, authentic Rosewood sheets, sourced directly from the manufacturer.",
  },
  {
    icon: Layers,
    title: "Complete Range",
    desc: "All six Rosewood brands, every catalogue and finish — available to browse in person or online.",
  },
  {
    icon: Handshake,
    title: "Honest Guidance",
    desc: "Straightforward advice on decors, thicknesses and budgets, whether you need one sheet or a full project lot.",
  },
  {
    icon: Users,
    title: "Trade Friendly",
    desc: "Trusted by carpenters, contractors, architects and interior designers across Bengaluru.",
  },
];

export default async function AboutUsPage() {
  const catalog = await getCatalogData();
  const totalDesigns = Math.floor(catalog.products.length / 10) * 10;
  const years = site.experienceYears;

  const gallery = [
    ...catalog.products.filter((p) => p.brandSlug === "ranwood").slice(10, 12),
    ...catalog.products.filter((p) => p.brandSlug === "ranberry").slice(2, 4),
  ];

  return (
    <main className="bg-stone-50 text-stone-900">
      <PageHero
        eyebrow="About Us"
        title="The house of premium surfaces in Bengaluru"
        description={`Since ${site.since}, Rainbow Laminates has been the trusted destination for Rosewood decorative laminates — bringing world-class designs to homes and workspaces across Karnataka.`}
        crumbs={[{ label: "Home", href: "/" }, { label: "About Us" }]}
      />

      {/* Story */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-amber-700">
              Our Story
            </div>
            <h2 className="font-display mt-4 text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">
              {years}+ years of surfaces done right
            </h2>
            <div className="mt-6 space-y-4 leading-relaxed text-stone-600">
              <p>
                Rainbow Laminates began in {site.since} with a simple belief:
                choosing a laminate should be exciting, not exhausting. From
                our first store in Kamakshipalya, Bengaluru, we set out to
                bring the finest decorative surfaces to every carpenter&apos;s
                workshop and every family&apos;s dream home.
              </p>
              <p>
                Today, we are an authorized distributor of{" "}
                <span className="font-semibold text-stone-900">
                  Rosewood Laminates
                </span>{" "}
                — one of India&apos;s most respected laminate houses — and we
                stock their complete portfolio: {totalDesigns}+ designs across
                Ranwood, Ranberry, Arica, Atina, Ranwood Rega and Dazzle
                Berry.
              </p>
              <p>
                What started as a single showroom has grown into{" "}
                <span className="font-semibold text-stone-900">
                  three branches across Bengaluru
                </span>{" "}
                — Rainbow Laminates, Rainbow Marketing and Rainbow Trade Link
                — keeping stock closer to your site and your deadlines.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-6 border-t border-stone-200 pt-8 sm:grid-cols-4">
              {[
                [`${totalDesigns}+`, "Designs in Stock"],
                ["6", "Rosewood Brands"],
                ["3", "Branches"],
                [`${years}+`, "Years of Experience"],
              ].map(([value, label]) => (
                <div key={label}>
                  <div className="font-display text-3xl font-semibold text-amber-700">
                    {value}
                  </div>
                  <div className="mt-1 text-xs uppercase tracking-widest text-stone-500">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {gallery.map((product, index) => (
              <div
                key={product.id}
                className={`overflow-hidden rounded-3xl shadow-lg ${
                  index % 2 === 1 ? "translate-y-6" : ""
                }`}
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

      {/* Values */}
      <section className="bg-gradient-to-br from-stone-100 to-stone-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-stone-200 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-stone-700">
              What We Stand For
            </div>
            <h2 className="font-display mt-4 text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">
              The Rainbow promise
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((item) => (
              <div
                key={item.title}
                className="group rounded-2xl border border-stone-200 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-stone-200/50"
              >
                <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-amber-100 to-amber-200 text-amber-700 shadow-sm transition-transform duration-300 group-hover:scale-110">
                  <item.icon className="h-7 w-7" />
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
        </div>
      </section>

      {/* Brand family */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-amber-700">
            <Sparkles className="h-4 w-4" />
            The Brands We Carry
          </div>
          <h2 className="font-display mt-4 text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">
            The complete Rosewood family
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-stone-600">
            Rosewood Laminates manufactures on advanced high-pressure
            lamination lines with rigorous quality systems — and we carry every
            one of their brands, alongside Koyoo, Vogue and Royalglow.
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
                href={`/collections?brand=${brand.slug}`}
                className="group overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="aspect-[16/9] overflow-hidden bg-stone-100">
                  {sample && (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={sample.imageUrl}
                      alt={`${brand.name} laminate sample`}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                  )}
                </div>
                <div className="p-6">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="h-8 w-auto"
                    loading="lazy"
                  />
                  <p className="mt-3 text-sm leading-relaxed text-stone-600">
                    {brand.blurb}
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-700 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    View Collection
                    <ChevronRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              </Link>
            );
          })}
          {partnerBrands.map((brand) => (
            <Link
              key={brand.slug}
              href="/e-catalogues"
              className="group overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="aspect-[16/9] overflow-hidden bg-stone-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={brand.cover}
                  alt={`${brand.name} catalogue`}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="h-8 w-auto rounded-md"
                  loading="lazy"
                />
                <p className="mt-3 text-sm leading-relaxed text-stone-600">
                  {brand.blurb}
                </p>
                <div className="mt-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-700 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  View E-Catalogues
                  <ChevronRight className="h-3.5 w-3.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Visit CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-stone-950 via-stone-900 to-stone-950 p-8 shadow-2xl sm:p-12">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl" />
          <div className="relative grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-amber-400">
                <MapPin className="h-4 w-4" />
                Visit Our Store
              </div>
              <h2 className="font-display mt-4 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                See and feel every finish in person
              </h2>
              <p className="mt-3 max-w-2xl leading-relaxed text-stone-300">
                Photos only tell half the story. Drop by our Kamakshipalya
                store to browse full-size sheets, compare textures side by side
                and take samples home.
              </p>
            </div>
            <Link
              href="/contact-us"
              className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-7 py-3.5 text-sm font-semibold text-stone-900 transition-all hover:bg-amber-400 hover:shadow-lg hover:shadow-amber-500/25"
            >
              Get Directions
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
