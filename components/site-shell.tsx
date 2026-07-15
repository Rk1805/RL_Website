"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Phone, Mail, MapPin, ChevronRight } from "lucide-react";

const navItems = [
  ["Home", "/"],
  ["About Us", "/about-us"],
  ["Products", "/products"],
  ["Visualizer", "/visualizer"],
  ["Contact Us", "/contact-us"],
] as const;

export function SiteShell({
  children,
  intro,
  title,
  description,
}: {
  children: React.ReactNode;
  intro: string;
  title: string;
  description: string;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <main className="min-h-screen bg-stone-50 text-stone-900">
      {/* Top Bar */}
      <div className="bg-stone-900 text-stone-300">
        <div className="mx-auto max-w-7xl px-4 py-2 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-4">
              <a
                href="tel:+918866630305"
                className="flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <Phone className="h-3.5 w-3.5" />
                <span>+91 88666 30305</span>
              </a>
              <a
                href="mailto:rainbowlaminates.bangalore@gmail.com"
                className="hidden items-center gap-1.5 hover:text-white transition-colors md:flex"
              >
                <Mail className="h-3.5 w-3.5" />
                <span>rainbowlaminates.bangalore@gmail.com</span>
              </a>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" />
              <span>Bangalore, Karnataka, India</span>
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg shadow-stone-200/50"
            : "bg-white"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative h-12 w-12 overflow-hidden rounded-full bg-gradient-to-br from-amber-100 to-amber-200 p-0.5 shadow-md">
                <div className="flex h-full w-full items-center justify-center rounded-full bg-white">
                  <Image
                    src="/logo.png"
                    alt="Rainbow Laminates"
                    width={40}
                    height={40}
                    priority
                    className="h-10 w-10 object-contain"
                  />
                </div>
              </div>
              <div className="leading-tight">
                <div className="text-lg font-bold uppercase tracking-widest text-stone-900 sm:text-xl">
                  Rainbow
                </div>
                <div className="text-[10px] font-medium uppercase tracking-[0.25em] text-amber-600">
                  Laminates
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden items-center gap-1 lg:flex">
              {navItems.map(([label, href]) => (
                <Link
                  key={label}
                  href={href}
                  className="relative px-4 py-2 text-sm font-medium uppercase tracking-wider text-stone-600 transition-colors hover:text-amber-600"
                >
                  {label}
                  <span className="absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 bg-amber-500 transition-all duration-300 group-hover:w-3/4" />
                </Link>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <Link
                href="/contact-us"
                className="inline-flex items-center gap-2 rounded-full bg-stone-900 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-amber-600 hover:shadow-lg hover:shadow-amber-500/25"
              >
                Get in Touch
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
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
                {navItems.map(([label, href]) => (
                  <Link
                    key={label}
                    href={href}
                    onClick={() => setIsMenuOpen(false)}
                    className="rounded-lg px-4 py-3 text-sm font-medium uppercase tracking-wider text-stone-600 transition-colors hover:bg-amber-50 hover:text-amber-600"
                  >
                    {label}
                  </Link>
                ))}
                <Link
                  href="/contact-us"
                  onClick={() => setIsMenuOpen(false)}
                  className="mt-2 flex items-center justify-center gap-2 rounded-full bg-stone-900 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-amber-600"
                >
                  Get in Touch
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </nav>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900">
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -left-1/4 -top-1/4 h-[80%] w-[80%] rounded-full bg-amber-500/5 blur-3xl" />
          <div className="absolute -right-1/4 -bottom-1/4 h-[80%] w-[80%] rounded-full bg-amber-600/5 blur-3xl" />
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4a574' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-xs font-medium uppercase tracking-widest text-amber-400 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
              {intro}
            </div>
            <h1 className="text-4xl font-bold uppercase tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl">
              {title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-stone-300 sm:text-xl">
              {description}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-stone-900 transition-all hover:bg-amber-400 hover:shadow-lg hover:shadow-amber-500/25"
              >
                Explore Collection
                <ChevronRight className="h-4 w-4" />
              </Link>
              <Link
                href="/visualizer"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/30"
              >
                Try Visualizer
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-stone-50 to-transparent" />
      </section>

      {/* Main Content */}
      <div>{children}</div>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-4">
            {/* Brand */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3">
                <div className="relative h-10 w-10 overflow-hidden rounded-full bg-gradient-to-br from-amber-100 to-amber-200 p-0.5">
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-white">
                    <Image
                      src="/logo.png"
                      alt="Rainbow Laminates"
                      width={32}
                      height={32}
                      className="h-8 w-8 object-contain"
                    />
                  </div>
                </div>
                <div>
                  <div className="text-lg font-bold uppercase tracking-widest text-white">
                    Rainbow
                  </div>
                  <div className="text-[9px] font-medium uppercase tracking-[0.25em] text-amber-500">
                    Laminates
                  </div>
                </div>
              </div>
              <p className="mt-6 max-w-md text-sm leading-relaxed">
                Premium decorative laminates for modern interiors. Since 2013,
                we&apos;ve been crafting beautiful surfaces that transform
                spaces with elegance and durability.
              </p>
              <div className="mt-6 flex gap-4">
                <a
                  href="tel:+918866630305"
                  className="flex items-center gap-2 text-sm text-stone-400 transition-colors hover:text-amber-400"
                >
                  <Phone className="h-4 w-4" />
                  +91 88666 30305
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-white">
                Quick Links
              </h4>
              <nav className="mt-4 flex flex-col gap-3">
                {navItems.map(([label, href]) => (
                  <Link
                    key={label}
                    href={href}
                    className="text-sm text-stone-400 transition-colors hover:text-amber-400"
                  >
                    {label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-white">
                Contact
              </h4>
              <div className="mt-4 flex flex-col gap-3 text-sm">
                <a
                  href="mailto:rainbowlaminates.bangalore@gmail.com"
                  className="flex items-start gap-2 text-stone-400 transition-colors hover:text-amber-400"
                >
                  <Mail className="mt-0.5 h-4 w-4 shrink-0" />
                  rainbowlaminates.bangalore@gmail.com
                </a>
                <div className="flex items-start gap-2 text-stone-400">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                  Bangalore, Karnataka, India
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 border-t border-stone-800 pt-8">
            <div className="flex flex-col items-center justify-between gap-4 text-xs text-stone-500 sm:flex-row">
              <p>
                &copy; {new Date().getFullYear()} Rainbow Laminates. All rights
                reserved.
              </p>
              <p className="uppercase tracking-wider">
                Premium Decorative Surfaces
              </p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
