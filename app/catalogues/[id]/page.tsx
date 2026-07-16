import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ChevronRight,
  Droplets,
  FlaskConical,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";
import { PanoramaViewer } from "@/components/panorama-viewer";
import { ShareButton } from "@/components/share-button";
import { getCatalogData, getProduct, getRelatedProducts } from "@/lib/catalog";
import { whatsappLink } from "@/lib/site";

export async function generateStaticParams() {
  const { products } = await getCatalogData();
  return products.map((product) => ({ id: product.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) return { title: "Design Not Found" };
  return {
    title: `${product.code} — ${product.brand} Laminate`,
    description: `${product.brand} decorative laminate ${product.code}. ${product.size} sheet${product.thickness ? `, ${product.thickness} thickness` : ""}. Available at Rainbow Laminates, Bengaluru.`,
  };
}

const careCards = [
  {
    icon: ShieldCheck,
    title: "Scratch & Impact",
    points: [
      "Use chopping boards — knives and sharp utensils can score any surface.",
      "Keep hot pans, irons and lit cigarettes off the sheet.",
      "Avoid heavy hammer or metal blows that could crack the surface.",
    ],
  },
  {
    icon: Droplets,
    title: "Everyday Cleaning",
    points: [
      "Wipe with a damp, non-abrasive cotton cloth and mild detergent.",
      "Rinse lightly — avoid flooding the surface with water.",
      "Finish by drying with a soft, clean cloth.",
    ],
  },
  {
    icon: FlaskConical,
    title: "Chemical Care",
    points: [
      "Keep acids, alkalis and bleach-based cleaners away from the surface.",
      "Harsh chemicals can etch, corrode or permanently discolour laminate.",
      "Store contaminated rags and bottles away from finished surfaces.",
    ],
  },
];

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) notFound();

  const related = await getRelatedProducts(product, 4);

  const specs: [string, string][] = [["Brand", product.brand]];
  if (product.finish) specs.push(["Finish", product.finish]);
  specs.push(["Design Number", product.code], ["Size", product.size]);
  if (product.thickness) specs.push(["Thickness", product.thickness]);
  if (product.collection) specs.push(["Collection", product.collection]);

  return (
    <main className="bg-stone-50 text-stone-900">
      {/* Breadcrumb bar */}
      <div className="border-b border-stone-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-stone-500">
            <Link href="/" className="transition-colors hover:text-amber-700">
              Home
            </Link>
            <ChevronRight className="h-3 w-3" />
            <Link
              href="/catalogues"
              className="transition-colors hover:text-amber-700"
            >
              Catalogues
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-amber-700">{product.code}</span>
          </nav>
          <Link
            href="/catalogues"
            className="inline-flex items-center gap-1.5 rounded-full border border-amber-600/40 px-4 py-1.5 text-sm font-medium text-amber-700 transition-colors hover:bg-amber-50"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
        </div>
      </div>

      {/* Product */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid items-start gap-10 lg:grid-cols-[2fr_3fr]">
          {/* Sheet image on neutral panel */}
          <div className="group relative flex items-center justify-center overflow-hidden rounded-2xl bg-stone-200 p-8 shadow-sm sm:p-12">
            <div className="relative w-full max-w-[340px]">
              <span className="absolute left-6 top-6 z-10 text-base font-medium tracking-wider text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)]">
                {product.size}
              </span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={product.imageUrl}
                alt={`${product.brand} laminate ${product.code}`}
                className="aspect-[283/352] w-full rounded-sm border border-white/50 object-cover shadow-xl transition-transform duration-700 group-hover:scale-[1.02]"
              />
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col pt-0 lg:pt-2">
            <h1 className="mb-6 text-3xl font-semibold uppercase leading-tight tracking-wide text-stone-900 sm:text-4xl">
              {product.code}
            </h1>

            <dl className="mb-8 border-t border-stone-200">
              {specs.map(([label, value]) => (
                <div
                  key={label}
                  className="flex items-center border border-t-0 border-stone-200 bg-white p-3"
                >
                  <dt className="w-[180px] shrink-0 text-sm uppercase tracking-wide text-stone-400">
                    {label}
                  </dt>
                  <dd className="text-sm text-stone-900">{value}</dd>
                </div>
              ))}
            </dl>

            {product.panoramaUrl && (
              <div className="mb-8">
                <PanoramaViewer
                  src={product.panoramaUrl}
                  label={`${product.code} · 360° Room View`}
                />
              </div>
            )}

            <p className="mb-6 text-xs leading-relaxed text-stone-500">
              Decor shades may vary slightly between screen and actual sheet.
              Visit our store or request a physical sample before finalizing.
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href={whatsappLink(
                  `Hi Rainbow Laminates! I'm interested in ${product.brand} design ${product.code}. Please share price and availability.`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-7 py-3 text-sm font-semibold text-stone-900 transition-all hover:bg-amber-400 hover:shadow-lg hover:shadow-amber-500/25"
              >
                <MessageCircle className="h-4 w-4" />
                Send Enquiry
              </a>
              <ShareButton
                title={`${product.brand} Laminate ${product.code} — Rainbow Laminates`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Care */}
      <section className="bg-gradient-to-br from-stone-100 to-stone-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-stone-200 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-stone-700">
              Built to Last
            </div>
            <h2 className="font-display mt-4 text-3xl font-semibold tracking-tight text-stone-900">
              Caring for your laminate
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {careCards.map((card) => (
              <div
                key={card.title}
                className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-100 to-amber-200 text-amber-700">
                  <card.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-sm font-bold uppercase tracking-widest text-stone-900">
                  {card.title}
                </h3>
                <ul className="mt-3 space-y-2">
                  {card.points.map((point) => (
                    <li
                      key={point}
                      className="flex gap-2 text-sm leading-relaxed text-stone-600"
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-amber-600" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-stone-900 sm:text-3xl">
              More from {product.brand}
            </h2>
            <Link
              href={`/catalogues?brand=${product.brandSlug}`}
              className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-amber-700 transition-colors hover:text-amber-600"
            >
              View All
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {related.map((item) => (
              <Link
                key={item.id}
                href={`/catalogues/${item.id}`}
                className="group overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="aspect-[283/352] overflow-hidden bg-stone-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.imageUrl}
                    alt={`${item.brand} laminate ${item.code}`}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-4">
                  <p className="font-semibold text-stone-900">{item.code}</p>
                  <p className="text-xs text-stone-500">{item.brand}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
