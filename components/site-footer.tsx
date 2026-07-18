import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import {
  navItems,
  brandMeta,
  branches,
  partnerBrands,
  site,
} from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="bg-stone-950 text-stone-400">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <div className="relative h-11 w-11 overflow-hidden rounded-full bg-gradient-to-br from-amber-100 to-amber-200 p-0.5">
                <div className="flex h-full w-full items-center justify-center rounded-full bg-white">
                  <Image
                    src="/logo.png"
                    alt="Rainbow Laminates"
                    width={36}
                    height={36}
                    className="h-9 w-9 object-contain"
                  />
                </div>
              </div>
              <div>
                <div className="font-display text-xl font-bold tracking-wide text-white">
                  Rainbow
                </div>
                <div className="text-[9px] font-medium uppercase tracking-[0.3em] text-amber-500">
                  Laminates
                </div>
              </div>
            </div>
            <p className="mt-6 max-w-md text-sm leading-relaxed">
              Authorized distributor of Rosewood Laminates in Bengaluru. Since{" "}
              {site.since}, we have helped architects, interior designers and
              homeowners find the perfect surface from a range of 300+ premium
              decorative laminate designs.
            </p>
            <div className="mt-6 flex flex-col gap-3 text-sm">
              <a
                href={site.phoneHref}
                className="flex items-center gap-2 transition-colors hover:text-amber-400"
              >
                <Phone className="h-4 w-4 shrink-0" />
                {site.phone}
              </a>
              <a
                href={site.emailHref}
                className="flex items-center gap-2 transition-colors hover:text-amber-400"
              >
                <Mail className="h-4 w-4 shrink-0" />
                {site.email}
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white">
              Quick Links
            </h4>
            <nav className="mt-4 flex flex-col gap-3">
              {navItems.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-sm transition-colors hover:text-amber-400"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Brands */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white">
              Our Brands
            </h4>
            <nav className="mt-4 flex flex-col gap-3">
              {brandMeta.map((brand) => (
                <Link
                  key={brand.slug}
                  href={`/collections?brand=${brand.slug}`}
                  className="text-sm transition-colors hover:text-amber-400"
                >
                  {brand.name}
                </Link>
              ))}
              {partnerBrands.map((brand) => (
                <Link
                  key={brand.slug}
                  href="/e-catalogues"
                  className="text-sm transition-colors hover:text-amber-400"
                >
                  {brand.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Branches */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white">
              Our Branches
            </h4>
            <div className="mt-4 flex flex-col gap-4 text-sm">
              {branches.map((branch) => (
                <div key={branch.name}>
                  <a
                    href={branch.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-2 font-medium text-stone-300 transition-colors hover:text-amber-400"
                  >
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                    <span>
                      {branch.name}
                      <span className="block text-xs font-normal text-stone-500">
                        {branch.city} · Est. {branch.since}
                      </span>
                    </span>
                  </a>
                  <a
                    href={branch.phoneHref}
                    className="ml-6 mt-1 block text-xs text-stone-500 transition-colors hover:text-amber-400"
                  >
                    {branch.phone}
                  </a>
                </div>
              ))}
              <div className="flex items-start gap-2 text-xs text-stone-500">
                <Clock className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                {site.hours}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-stone-800 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 text-xs text-stone-500 sm:flex-row">
            <p>
              &copy; {new Date().getFullYear()} {site.name}. All rights
              reserved.
            </p>
            <p className="uppercase tracking-wider">
              Authorized Distributor of Rosewood Laminates
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
