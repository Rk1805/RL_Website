"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, Phone, Mail, MapPin, ChevronRight } from "lucide-react";
import { navItems, site } from "@/lib/site";

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      {/* Top Bar */}
      <div className="bg-stone-950 text-stone-300">
        <div className="mx-auto max-w-7xl px-4 py-2 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-4">
              <a
                href={site.phoneHref}
                className="flex items-center gap-1.5 transition-colors hover:text-white"
              >
                <Phone className="h-3.5 w-3.5" />
                <span>{site.phone}</span>
              </a>
              <a
                href={site.emailHref}
                className="hidden items-center gap-1.5 transition-colors hover:text-white md:flex"
              >
                <Mail className="h-3.5 w-3.5" />
                <span>{site.email}</span>
              </a>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" />
              <span>{site.addressShort}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 shadow-lg shadow-stone-200/50 backdrop-blur-md"
            : "bg-white"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <Link href="/" className="group flex items-center gap-3">
              <div className="relative h-12 w-12 overflow-hidden rounded-full bg-gradient-to-br from-amber-100 to-amber-200 p-0.5 shadow-md">
                <div className="flex h-full w-full items-center justify-center rounded-full bg-white">
                  <Image
                    src="/logo.png"
                    alt="Rainbow Laminates"
                    width={40}
                    height={40}
                    preload
                    className="h-10 w-10 object-contain"
                  />
                </div>
              </div>
              <div className="leading-tight">
                <div className="font-display text-xl font-bold tracking-wide text-stone-900 sm:text-2xl">
                  Rainbow
                </div>
                <div className="text-[10px] font-medium uppercase tracking-[0.3em] text-amber-700">
                  Laminates
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden items-center gap-1 lg:flex">
              {navItems.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className={`relative px-4 py-2 text-sm font-medium uppercase tracking-wider transition-colors hover:text-amber-700 ${
                    isActive(href) ? "text-amber-700" : "text-stone-600"
                  }`}
                >
                  {label}
                  {isActive(href) && (
                    <span className="absolute bottom-0 left-1/2 h-0.5 w-3/5 -translate-x-1/2 rounded-full bg-amber-600" />
                  )}
                </Link>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <Link
                href="/contact-us"
                className="inline-flex items-center gap-2 rounded-full bg-stone-900 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-amber-700 hover:shadow-lg hover:shadow-amber-500/25"
              >
                Get a Quote
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen((open) => !open)}
              className="rounded-lg p-2 text-stone-600 hover:bg-stone-100 lg:hidden"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="border-t border-stone-100 bg-white lg:hidden">
            <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
              <nav className="flex flex-col gap-1">
                {navItems.map(({ label, href }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`rounded-lg px-4 py-3 text-sm font-medium uppercase tracking-wider transition-colors hover:bg-amber-50 hover:text-amber-700 ${
                      isActive(href) ? "text-amber-700" : "text-stone-600"
                    }`}
                  >
                    {label}
                  </Link>
                ))}
                <Link
                  href="/contact-us"
                  onClick={() => setIsMenuOpen(false)}
                  className="mt-2 flex items-center justify-center gap-2 rounded-full bg-stone-900 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-amber-700"
                >
                  Get a Quote
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </nav>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
