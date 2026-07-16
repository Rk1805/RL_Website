import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { EnquiryForm } from "@/components/enquiry-form";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Rainbow Laminates, Bengaluru — call, WhatsApp, email or visit our store in Kamakshipalya for the complete Rosewood Laminates range.",
};

const faqs = [
  {
    q: "Do you stock all Rosewood Laminates brands?",
    a: "Yes. As an authorized distributor we carry the complete Rosewood portfolio — Ranwood, Ranberry, Arica, Atina, Ranwood Rega and Dazzle Berry — with current catalogues in store.",
  },
  {
    q: "Can I see samples before ordering?",
    a: "Absolutely. Visit our store in Kamakshipalya to browse full catalogues and take sample chips home, or send us a design code on WhatsApp and we'll share photos and availability.",
  },
  {
    q: "What sheet sizes and thicknesses are available?",
    a: "Standard sheets are 1220 × 2440 mm, available in 0.82 mm, 1 mm and 1.4 mm thicknesses depending on the brand and design.",
  },
  {
    q: "Do you supply for bulk and project orders?",
    a: "Yes — we regularly supply contractors, architects and furniture makers. Share your requirement and we'll quote project pricing and delivery timelines.",
  },
];

export default function ContactUsPage() {
  const mapQuery = encodeURIComponent(site.addressFull);

  return (
    <main className="bg-stone-50 text-stone-900">
      <PageHero
        eyebrow="Contact Us"
        title="Let's talk laminates"
        description="Questions about a design, prices or availability? Call, WhatsApp or drop by our Bengaluru store — we respond fast."
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact Us" }]}
      />

      {/* Contact Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Contact Information Cards */}
          <div className="space-y-4 lg:col-span-1">
            <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-stone-200/50">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-widest text-stone-900">
                    Phone / WhatsApp
                  </h3>
                  <a
                    href={site.phoneHref}
                    className="mt-2 block text-lg font-semibold text-stone-900 hover:text-amber-700"
                  >
                    {site.phone}
                  </a>
                  <p className="mt-1 text-sm text-stone-500">{site.hours}</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-stone-200/50">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                  <Mail className="h-6 w-6" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-stone-900">
                    Email
                  </h3>
                  <a
                    href={site.emailHref}
                    className="mt-2 block break-words text-base font-semibold text-stone-900 hover:text-amber-700"
                  >
                    {site.email}
                  </a>
                  <p className="mt-1 text-sm text-stone-500">
                    We usually respond within 24 hours
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-stone-200/50">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-widest text-stone-900">
                    Visit Us
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-stone-600">
                    {site.addressFull}
                  </p>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-sm font-semibold text-amber-700 hover:text-amber-600"
                  >
                    Open in Google Maps →
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-stone-200/50">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                  <Clock className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-widest text-stone-900">
                    Business Hours
                  </h3>
                  <p className="mt-2 text-base font-semibold text-stone-900">
                    Monday – Saturday
                  </p>
                  <p className="mt-1 text-sm text-stone-500">
                    9:00 AM – 7:00 PM IST
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Enquiry Form */}
          <div className="lg:col-span-2">
            <div className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-xl shadow-stone-200/50">
              <div className="border-b border-stone-100 bg-gradient-to-r from-stone-50 to-stone-100/50 p-6 sm:p-8">
                <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-amber-700">
                  <Send className="h-4 w-4" />
                  Send us a Message
                </div>
                <h2 className="font-display mt-4 text-2xl font-semibold tracking-tight text-stone-900 sm:text-3xl">
                  We&apos;d love to hear from you
                </h2>
                <p className="mt-2 text-stone-600">
                  Fill in the form and send it straight to us on WhatsApp or
                  email — whichever you prefer.
                </p>
              </div>

              <div className="p-6 sm:p-8">
                <EnquiryForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-xl shadow-stone-200/50">
          <iframe
            title="Rainbow Laminates on Google Maps"
            src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
            className="aspect-[16/7] w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gradient-to-br from-stone-100 to-stone-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-stone-200 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-stone-700">
              FAQ
            </div>
            <h2 className="font-display mt-4 text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">
              Frequently asked questions
            </h2>
          </div>

          <div className="mx-auto max-w-3xl space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.q}
                className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm"
              >
                <h3 className="text-base font-bold text-stone-900">{faq.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-600">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
