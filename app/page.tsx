import { SiteShell } from "@/components/site-shell";
import Link from "next/link";
import {
  Palette,
  Sparkles,
  Award,
  Truck,
  Headphones,
  ChevronRight,
  Monitor,
} from "lucide-react";

export default function Home() {
  return (
    <SiteShell
      intro="Welcome to Rainbow Laminates"
      title="Unleashing the beauty of wood and decors with new edge decorative laminates"
      description="Since 2013, Rainbow has dealt with decorative laminates preferred by specialists and designers to enhance interiors with refined texture, quality, and modern color stories."
    >
      {/* Featured Products Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-amber-700">
            <Sparkles className="h-4 w-4" />
            Our Collections
          </div>
          <h2 className="mt-4 text-3xl font-bold uppercase tracking-tight text-stone-900 sm:text-4xl">
            Premium Laminate Range
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-stone-600">
            Discover our diverse range of decorative laminates crafted for
            every interior need
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              name: "Ranwood Laminates",
              desc: "The first portfolio launched with designer laminates.",
              icon: Palette,
              color: "amber",
            },
            {
              name: "Arica Laminates",
              desc: "Premium 1.00 mm collection for home and office.",
              icon: Award,
              color: "stone",
            },
            {
              name: "Ranberry Laminates",
              desc: "A wide array of products for specialists and common use.",
              icon: Sparkles,
              color: "amber",
            },
            {
              name: "Digital Laminates",
              desc: "Statement surfaces for contemporary projects.",
              icon: Monitor,
              color: "stone",
            },
          ].map((product, index) => (
            <Link
              key={product.name}
              href="/products"
              className="group relative overflow-hidden rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-stone-200/50"
            >
              <div
                className={`absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-10 transition-transform duration-500 group-hover:scale-150 ${
                  product.color === "amber" ? "bg-amber-500" : "bg-stone-500"
                }`}
              />
              <div className="relative">
                <div
                  className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${
                    product.color === "amber"
                      ? "bg-amber-100 text-amber-600"
                      : "bg-stone-100 text-stone-600"
                  }`}
                >
                  <product.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-bold uppercase tracking-tight text-stone-900">
                  {product.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-600">
                  {product.desc}
                </p>
                <div className="mt-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-amber-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  Explore
                  <ChevronRight className="h-4 w-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-gradient-to-br from-stone-100 to-stone-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-stone-200 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-stone-700">
              Why Rainbow
            </div>
            <h2 className="mt-4 text-3xl font-bold uppercase tracking-tight text-stone-900 sm:text-4xl">
              Excellence in Every Sheet
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Sparkles,
                title: "Research",
                desc: "Our constant research involves new designs.",
              },
              {
                icon: Award,
                title: "Quality",
                desc: "A 100% quality approach keeps us at the front line.",
              },
              {
                icon: Truck,
                title: "Delivery",
                desc: "On-time delivery nationally and globally.",
              },
              {
                icon: Headphones,
                title: "Support",
                desc: "Support channel for sustainable growth.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="group rounded-2xl border border-stone-200 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-stone-200/50"
              >
                <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-amber-100 to-amber-200 text-amber-600 shadow-sm transition-transform duration-300 group-hover:scale-110">
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

      {/* Visualizer CTA Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 p-8 shadow-2xl sm:p-12 lg:p-16">
          {/* Decorative Background */}
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-amber-600/10 blur-3xl" />

          <div className="relative grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-amber-400">
                <Monitor className="h-4 w-4" />
                Interactive Tool
              </div>
              <h2 className="mt-4 text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl">
                Visualize Your Space
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-stone-300">
                Upload an image of your room, choose a laminate finish, and see
                how it transforms your space instantly. Our visualizer makes
                decision-making easier than ever.
              </p>
              <div className="mt-8">
                <Link
                  href="/visualizer"
                  className="inline-flex items-center gap-3 rounded-full bg-amber-500 px-8 py-4 text-sm font-bold uppercase tracking-wider text-stone-900 transition-all hover:bg-amber-400 hover:shadow-lg hover:shadow-amber-500/25"
                >
                  Launch Visualizer
                  <ChevronRight className="h-5 w-5" />
                </Link>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <div className="relative">
                <div className="absolute inset-0 rounded-2xl bg-amber-500/20 blur-2xl" />
                <div className="relative overflow-hidden rounded-2xl border border-stone-700 bg-stone-800 p-2">
                  <div className="aspect-video overflow-hidden rounded-xl bg-stone-900">
                    <div className="flex h-full items-center justify-center">
                      <div className="text-center">
                        <Monitor className="mx-auto h-12 w-12 text-stone-600" />
                        <p className="mt-4 text-sm text-stone-500">
                          Interactive Preview
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "About Us", href: "/about-us", desc: "Our story & values" },
            { label: "Products", href: "/products", desc: "Browse collection" },
            { label: "Visualizer", href: "/visualizer", desc: "Try before you buy" },
            { label: "Contact Us", href: "/contact-us", desc: "Get in touch" },
          ].map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="group flex items-center gap-4 rounded-xl border border-stone-200 bg-white p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-300 hover:shadow-md hover:shadow-stone-200/50"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-stone-100 transition-colors duration-300 group-hover:bg-amber-100">
                <ChevronRight className="h-5 w-5 text-stone-600 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-amber-600" />
              </div>
              <div>
                <div className="text-sm font-bold uppercase tracking-wider text-stone-900">
                  {link.label}
                </div>
                <div className="text-xs text-stone-500">{link.desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}