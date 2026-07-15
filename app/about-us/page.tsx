import { SiteShell } from "@/components/site-shell";
import {
  CheckCircle2,
  Award,
  Clock,
  Users,
  Globe,
  Leaf,
  Target,
  Heart,
} from "lucide-react";

export default function AboutUsPage() {
  return (
    <SiteShell
      intro="About Us"
      title="Crafting Beautiful Surfaces Since 2013"
      description="Rainbow Laminates is built around quality, dependable supply, and a modern decor palette designed for architects, dealers, and interior teams."
    >
      {/* Story Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-amber-700">
              Our Story
            </div>
            <h2 className="mt-4 text-3xl font-bold uppercase tracking-tight text-stone-900 sm:text-4xl">
              A Legacy of Excellence
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-stone-600">
              Since 2013, Rainbow Laminates has been at the forefront of the
              decorative surfaces industry. We began with a vision to bring
              premium quality laminates to architects, designers, and homeowners
              who demand nothing but the best.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-stone-600">
              Today, our collection represents a modern design language because
              we continuously refine colors, finishes, and surfaces for
              residences, offices, and hospitality interiors across India and
              beyond.
            </p>
            <div className="mt-8 flex gap-8">
              <div>
                <div className="text-4xl font-bold text-amber-600">10+</div>
                <div className="mt-1 text-sm font-medium uppercase tracking-wider text-stone-500">
                  Years Experience
                </div>
              </div>
              <div>
                <div className="text-4xl font-bold text-amber-600">500+</div>
                <div className="mt-1 text-sm font-medium uppercase tracking-wider text-stone-500">
                  Designs
                </div>
              </div>
              <div>
                <div className="text-4xl font-bold text-amber-600">1000+</div>
                <div className="mt-1 text-sm font-medium uppercase tracking-wider text-stone-500">
                  Happy Clients
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-amber-100 to-stone-100 opacity-50 blur-2xl" />
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-stone-200 shadow-2xl">
              <div className="flex h-full items-center justify-center bg-gradient-to-br from-stone-300 to-stone-400">
                <div className="text-center text-stone-500">
                  <Award className="mx-auto h-16 w-16 opacity-50" />
                  <p className="mt-4 text-sm font-medium uppercase tracking-widest">
                    Premium Quality Since 2013
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-gradient-to-br from-stone-100 to-stone-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-stone-200 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-stone-700">
              Our Values
            </div>
            <h2 className="mt-4 text-3xl font-bold uppercase tracking-tight text-stone-900 sm:text-4xl">
              What Drives Us
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Target,
                title: "Research-led collections",
                desc: "New decor lines designed to stay current.",
              },
              {
                icon: Award,
                title: "Quality first",
                desc: "Consistent standards across every sheet and finish.",
              },
              {
                icon: Clock,
                title: "Reliable delivery",
                desc: "Built for projects that need dependable supply.",
              },
              {
                icon: Users,
                title: "Visual support",
                desc: "The visualizer helps clients decide faster.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="group rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-300 hover:shadow-lg hover:shadow-stone-200/50"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-100 to-amber-200 text-amber-600 shadow-sm transition-transform duration-300 group-hover:scale-110">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-widest text-stone-900">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-stone-600">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-amber-700">
            Why Choose Rainbow
          </div>
          <h2 className="mt-4 text-3xl font-bold uppercase tracking-tight text-stone-900 sm:text-4xl">
            The Rainbow Advantage
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: Globe,
              title: "Global Standards",
              desc: "Our products meet international quality benchmarks for durability and aesthetics.",
            },
            {
              icon: Leaf,
              title: "Eco-Friendly",
              desc: "Sustainable manufacturing processes that minimize environmental impact.",
            },
            {
              icon: Heart,
              title: "Customer First",
              desc: "Dedicated support team ready to assist with every project requirement.",
            },
            {
              icon: Award,
              title: "Premium Materials",
              desc: "Only the finest raw materials are used in our laminate production.",
            },
            {
              icon: Target,
              title: "Precision Engineering",
              desc: "State-of-the-art technology ensures consistent quality across all products.",
            },
            {
              icon: Clock,
              title: "On-Time Delivery",
              desc: "Reliable logistics network ensuring your projects stay on schedule.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="group rounded-2xl border border-stone-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-amber-300 hover:shadow-lg hover:shadow-stone-200/50"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-stone-100 text-stone-600 transition-colors duration-300 group-hover:bg-amber-100 group-hover:text-amber-600">
                <item.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold uppercase tracking-tight text-stone-900">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 p-8 shadow-2xl sm:p-12 lg:p-16">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-amber-600/10 blur-3xl" />

          <div className="relative text-center">
            <h2 className="text-2xl font-bold uppercase tracking-tight text-white sm:text-3xl">
              Ready to Transform Your Space?
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-stone-300">
              Explore our collection of premium decorative laminates and find
              the perfect finish for your next project.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                href="/products"
                className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-8 py-3 text-sm font-bold uppercase tracking-wider text-stone-900 transition-all hover:bg-amber-400 hover:shadow-lg hover:shadow-amber-500/25"
              >
                Browse Collection
              </a>
              <a
                href="/contact-us"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-3 text-sm font-bold uppercase tracking-wider text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/30"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}