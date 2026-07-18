import type { Metadata } from "next";
import { BookOpen, Download, Eye, FileText, MessageCircle } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { getECatalogues } from "@/lib/e-catalogues";
import { whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "E-Catalogues",
  description:
    "Browse and download every e-catalogue Rainbow Laminates carries — laminates, louvers, wall panels, acrylic and more — in one place.",
};

export default async function ECataloguesPage() {
  const catalogues = await getECatalogues();

  return (
    <main className="bg-stone-50 text-stone-900">
      <PageHero
        eyebrow="E-Catalogues"
        title="The complete library, in your pocket"
        description={`${catalogues.length} e-catalogues covering every brand and product line we carry — flip through them online or download and share with your architect, carpenter or client.`}
        crumbs={[{ label: "Home", href: "/" }, { label: "E-Catalogues" }]}
      />

      {/* Catalogue shelf */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-amber-700">
            <BookOpen className="h-4 w-4" />
            {catalogues.length} Catalogues Available
          </div>
          <p className="text-sm text-stone-500">
            Tap a cover to read online · use the arrow to download
          </p>
        </div>

        {catalogues.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-stone-300 bg-white py-24 text-center">
            <FileText className="h-10 w-10 text-stone-300" />
            <p className="mt-4 font-semibold text-stone-700">
              Catalogues are on their way
            </p>
            <p className="mt-1 text-sm text-stone-500">
              Message us on WhatsApp and we&apos;ll send you the latest PDFs.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 sm:gap-7 lg:grid-cols-4">
            {catalogues.map((catalogue, index) => (
              <div
                key={catalogue.fileName}
                className="animate-fade-in-up group opacity-0"
                style={{ animationDelay: `${Math.min(index * 70, 600)}ms` }}
              >
                {/* Cover */}
                <a
                  href={catalogue.viewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`Read ${catalogue.title} online`}
                  className="relative block overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-md transition-all duration-500 group-hover:-translate-y-2 group-hover:-rotate-1 group-hover:shadow-2xl group-hover:shadow-stone-400/30"
                >
                  {/* book spine */}
                  <div className="absolute inset-y-0 left-0 z-10 w-1.5 bg-gradient-to-b from-stone-900/30 via-stone-900/10 to-stone-900/30" />

                  {catalogue.coverUrl ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={catalogue.coverUrl}
                      alt={`${catalogue.title} catalogue cover`}
                      className="aspect-[3/4] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex aspect-[3/4] w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-stone-800 via-stone-900 to-stone-950 p-6 text-center">
                      <FileText className="h-10 w-10 text-amber-500/70" />
                      <p className="font-display text-lg font-semibold text-white">
                        {catalogue.title}
                      </p>
                      <p className="text-[10px] uppercase tracking-[0.25em] text-stone-400">
                        E-Catalogue
                      </p>
                    </div>
                  )}

                  {/* hover overlay */}
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-stone-950/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="m-4 inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-xs font-bold uppercase tracking-wider text-stone-900 shadow-lg">
                      <Eye className="h-4 w-4" />
                      Read Online
                    </span>
                  </div>
                </a>

                {/* Caption */}
                <div className="mt-3 flex items-start justify-between gap-3 px-1">
                  <div className="min-w-0">
                    {catalogue.logoUrl ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={catalogue.logoUrl}
                        alt={catalogue.series ?? catalogue.title}
                        className="mb-1 h-5 w-auto rounded-sm"
                        loading="lazy"
                      />
                    ) : (
                      catalogue.series && (
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-700">
                          {catalogue.series}
                        </p>
                      )
                    )}
                    <h2 className="truncate font-semibold text-stone-900">
                      {catalogue.title}
                    </h2>
                    <p className="text-xs text-stone-400">
                      PDF · {catalogue.sizeLabel}
                    </p>
                  </div>
                  <a
                    href={catalogue.downloadUrl}
                    download={catalogue.fileName}
                    title={`Download ${catalogue.title}`}
                    className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-500 shadow-sm transition-all hover:border-amber-500 hover:bg-amber-50 hover:text-amber-700"
                  >
                    <Download className="h-4 w-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Help CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-stone-950 via-stone-900 to-stone-950 p-8 shadow-2xl sm:p-12">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-amber-600/10 blur-3xl" />
          <div className="relative grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            <div>
              <h2 className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                Can&apos;t find what you&apos;re looking for?
              </h2>
              <p className="mt-3 max-w-2xl leading-relaxed text-stone-300">
                New catalogues arrive regularly. Message us and we&apos;ll send
                you the latest edition — or visit the store in Kamakshipalya to
                browse printed copies and sample chips.
              </p>
            </div>
            <a
              href={whatsappLink(
                "Hi Rainbow Laminates! I'm looking for a catalogue.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-7 py-3.5 text-sm font-semibold text-stone-900 transition-all hover:bg-amber-400 hover:shadow-lg hover:shadow-amber-500/25"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
