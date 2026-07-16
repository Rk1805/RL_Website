import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function PageHero({
  eyebrow,
  title,
  description,
  crumbs,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  crumbs?: { label: string; href?: string }[];
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-stone-950 via-stone-900 to-stone-950">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-1/4 -top-1/4 h-[70%] w-[70%] rounded-full bg-amber-500/5 blur-3xl" />
        <div className="absolute -bottom-1/4 -right-1/4 h-[70%] w-[70%] rounded-full bg-amber-600/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        {crumbs && crumbs.length > 0 && (
          <nav className="mb-5 flex flex-wrap items-center gap-1.5 text-xs uppercase tracking-widest text-stone-400">
            {crumbs.map((crumb, index) => (
              <span key={index} className="flex items-center gap-1.5">
                {index > 0 && <ChevronRight className="h-3 w-3" />}
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="transition-colors hover:text-amber-400"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-amber-400">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}

        <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-xs font-medium uppercase tracking-widest text-amber-400 backdrop-blur-sm">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-400" />
          {eyebrow}
        </div>
        <h1 className="font-display mt-5 max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-stone-300 sm:text-lg">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
