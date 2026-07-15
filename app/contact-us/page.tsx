import { SiteShell } from "@/components/site-shell";
import { Phone, Mail, MapPin, Clock, Send, ChevronRight } from "lucide-react";

export default function ContactUsPage() {
  return (
    <SiteShell
      intro="Contact Us"
      title="Get in Touch with Rainbow Laminates"
      description="Have questions about our products? Want to become a dealer? Our team is here to help you with any inquiries."
    >
      {/* Contact Section */}
      <section className="mx-auto max-w-[90rem] px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Contact Information Cards */}
          <div className="space-y-4 lg:col-span-1">
            <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-stone-200/50">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-widest text-stone-900">
                    Phone
                  </h3>
                  <a
                    href="tel:+918866630305"
                    className="mt-2 block text-lg font-semibold text-stone-900 hover:text-amber-600"
                  >
                    +91 88666 30305
                  </a>
                  <p className="mt-1 text-sm text-stone-500">
                    Mon - Sat, 9:00 AM - 7:00 PM
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-stone-200/50">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-widest text-stone-900">
                    Email
                  </h3>
                  <a
                    href="mailto:rainbowlaminates.bangalore@gmail.com"
                    className="mt-2 block text-base font-semibold text-stone-900 hover:text-amber-600"
                  >
                    rainbowlaminates.bangalore@gmail.com
                  </a>
                  <p className="mt-1 text-sm text-stone-500">
                    We&apos;ll respond within 24 hours
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-stone-200/50">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-widest text-stone-900">
                    Visit Us
                  </h3>
                  <p className="mt-2 text-base font-semibold text-stone-900">
                    Bangalore, Karnataka, India
                  </p>
                  <p className="mt-2 text-sm leading-6 text-stone-600">
                    Do.no.77/1, Near Swayam Prabha Kalyana Mantapa
                    Nanjundeshwara Nilaya Meenakshi Nagar 6th main, Police
                    Station Rd, Kamakshipalya, Bengaluru, Karnataka 560079
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-stone-200/50">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
                  <Clock className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-widest text-stone-900">
                    Business Hours
                  </h3>
                  <p className="mt-2 text-base font-semibold text-stone-900">
                    Monday - Saturday
                  </p>
                  <p className="mt-1 text-sm text-stone-500">
                    9:00 AM - 7:00 PM IST
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-xl shadow-stone-200/50">
              <div className="border-b border-stone-100 bg-gradient-to-r from-stone-50 to-stone-100/50 p-6 sm:p-8">
                <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-amber-700">
                  <Send className="h-4 w-4" />
                  Send us a Message
                </div>
                <h2 className="mt-4 text-2xl font-bold uppercase tracking-tight text-stone-900">
                  We&apos;d Love to Hear from You
                </h2>
                <p className="mt-2 text-stone-600">
                  Fill out the form below and our team will get back to you
                  shortly.
                </p>
              </div>

              <div className="p-6 sm:p-8">
                <form className="grid gap-6 sm:grid-cols-2">
                  <div className="sm:col-span-1">
                    <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-stone-500">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm font-medium text-stone-900 outline-none transition-all placeholder:text-stone-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                    />
                  </div>

                  <div className="sm:col-span-1">
                    <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-stone-500">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm font-medium text-stone-900 outline-none transition-all placeholder:text-stone-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                    />
                  </div>

                  <div className="sm:col-span-1">
                    <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-stone-500">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 XXXXX XXXXX"
                      className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm font-medium text-stone-900 outline-none transition-all placeholder:text-stone-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                    />
                  </div>

                  <div className="sm:col-span-1">
                    <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-stone-500">
                      Subject *
                    </label>
                    <select className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm font-medium text-stone-900 outline-none transition-all focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20">
                      <option value="">Select a subject</option>
                      <option value="product">Product Inquiry</option>
                      <option value="dealer">Become a Dealer</option>
                      <option value="support">Technical Support</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-stone-500">
                      Message *
                    </label>
                    <textarea
                      rows={5}
                      placeholder="Tell us how we can help you..."
                      className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm font-medium text-stone-900 outline-none transition-all placeholder:text-stone-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <button
                      type="submit"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-stone-900 px-8 py-4 text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-amber-600 hover:shadow-lg hover:shadow-amber-500/25 sm:w-auto"
                    >
                      Send Message
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gradient-to-br from-stone-100 to-stone-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-stone-200 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-stone-700">
              FAQ
            </div>
            <h2 className="mt-4 text-3xl font-bold uppercase tracking-tight text-stone-900 sm:text-4xl">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="mx-auto max-w-3xl space-y-4">
            {[
              {
                q: "What is the minimum order quantity?",
                a: "Our minimum order quantity varies by product line. Please contact our sales team for specific details regarding your requirements.",
              },
              {
                q: "Do you provide samples?",
                a: "Yes, we offer product samples for qualified projects. Contact us to learn more about our sample program.",
              },
              {
                q: "What is the delivery time?",
                a: "Standard delivery time is 7-14 business days depending on the order size and location. Express delivery options are available.",
              },
              {
                q: "Do you ship internationally?",
                a: "Yes, we export to select countries. Please reach out to our export team for more information on international shipping.",
              },
            ].map((faq, index) => (
              <div
                key={index}
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

      {/* Map Placeholder */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-xl shadow-stone-200/50">
          <div className="aspect-[16/9] bg-gradient-to-br from-stone-200 to-stone-300">
            <div className="flex h-full items-center justify-center">
              <div className="text-center text-stone-500">
                <MapPin className="mx-auto h-12 w-12 opacity-50" />
                <p className="mt-4 text-sm font-medium uppercase tracking-widest">
                  Interactive Map
                </p>
                <p className="mt-1 text-xs text-stone-400">
                  Bangalore, Karnataka, India
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
