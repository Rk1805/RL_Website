"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Filter,
  Layers,
  Search,
  X,
} from "lucide-react";

export type BrowserProduct = {
  id: string;
  code: string;
  brand: string;
  brandSlug: string;
  collection: string | null;
  thickness: string | null;
  finish: string | null;
  imageUrl: string;
  has360: boolean;
};

export type BrowserFacets = {
  brands: { slug: string; name: string; count: number }[];
  collections: { name: string; count: number }[];
  thicknesses: { name: string; count: number }[];
};

const PAGE_SIZE = 24;

function toggle(list: string[], value: string) {
  return list.includes(value)
    ? list.filter((item) => item !== value)
    : [...list, value];
}

export function CatalogueBrowser({
  products,
  facets,
  initialBrand,
  initialCollection,
}: {
  products: BrowserProduct[];
  facets: BrowserFacets;
  initialBrand?: string;
  initialCollection?: string;
}) {
  const [brands, setBrands] = useState<string[]>(
    initialBrand && facets.brands.some((b) => b.slug === initialBrand)
      ? [initialBrand]
      : [],
  );
  const [collections, setCollections] = useState<string[]>(
    initialCollection &&
      facets.collections.some((c) => c.name === initialCollection)
      ? [initialCollection]
      : [],
  );
  const [thicknesses, setThicknesses] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return products.filter((product) => {
      if (brands.length && !brands.includes(product.brandSlug)) return false;
      if (
        collections.length &&
        (!product.collection || !collections.includes(product.collection))
      )
        return false;
      if (
        thicknesses.length &&
        (!product.thickness || !thicknesses.includes(product.thickness))
      )
        return false;
      if (query) {
        const haystack =
          `${product.code} ${product.brand} ${product.finish ?? ""}`.toLowerCase();
        if (!haystack.includes(query)) return false;
      }
      return true;
    });
  }, [products, brands, collections, thicknesses, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageItems = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const activeFilterCount =
    brands.length + collections.length + thicknesses.length;

  const resetPage = () => setPage(1);

  const clearAll = () => {
    setBrands([]);
    setCollections([]);
    setThicknesses([]);
    setSearch("");
    setPage(1);
  };

  const pageNumbers = useMemo(() => {
    const numbers: number[] = [];
    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, start + 4);
    for (let i = Math.max(1, end - 4); i <= end; i++) numbers.push(i);
    return numbers;
  }, [currentPage, totalPages]);

  const filterGroup = (
    title: string,
    options: { value: string; label: string; count: number }[],
    selected: string[],
    onToggle: (value: string) => void,
  ) => (
    <div>
      <h3 className="text-xs font-bold uppercase tracking-widest text-stone-900">
        {title}
      </h3>
      <div className="mt-3 space-y-2.5">
        {options.map((option) => (
          <label
            key={option.value}
            className="group flex cursor-pointer items-center gap-3"
          >
            <span
              className={`flex h-5 w-5 items-center justify-center rounded-full border-2 transition-colors ${
                selected.includes(option.value)
                  ? "border-amber-600"
                  : "border-stone-300 group-hover:border-amber-400"
              }`}
            >
              <span
                className={`h-2.5 w-2.5 rounded-full bg-amber-600 transition-transform ${
                  selected.includes(option.value) ? "scale-100" : "scale-0"
                }`}
              />
            </span>
            <input
              type="checkbox"
              className="sr-only"
              checked={selected.includes(option.value)}
              onChange={() => {
                onToggle(option.value);
                resetPage();
              }}
            />
            <span className="flex-1 text-sm text-stone-700 transition-colors group-hover:text-stone-900">
              {option.label}
            </span>
            <span className="text-xs text-stone-400">{option.count}</span>
          </label>
        ))}
      </div>
    </div>
  );

  const filterPanel = (
    <div className="space-y-8">
      {filterGroup(
        "Brands",
        facets.brands.map((b) => ({
          value: b.slug,
          label: b.name,
          count: b.count,
        })),
        brands,
        (value) => setBrands((prev) => toggle(prev, value)),
      )}
      {filterGroup(
        "Collection",
        facets.collections.map((c) => ({
          value: c.name,
          label: c.name,
          count: c.count,
        })),
        collections,
        (value) => setCollections((prev) => toggle(prev, value)),
      )}
      {filterGroup(
        "Thickness",
        facets.thicknesses.map((t) => ({
          value: t.name,
          label: t.name,
          count: t.count,
        })),
        thicknesses,
        (value) => setThicknesses((prev) => toggle(prev, value)),
      )}
      {activeFilterCount > 0 && (
        <button
          onClick={clearAll}
          className="inline-flex items-center gap-2 text-sm font-semibold text-amber-700 transition-colors hover:text-amber-600"
        >
          <X className="h-4 w-4" />
          Clear All Filters
        </button>
      )}
    </div>
  );

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Toolbar */}
      <div className="mb-8 flex flex-wrap items-center gap-3">
        <div className="relative min-w-0 flex-1 sm:max-w-sm">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
          <input
            type="search"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              resetPage();
            }}
            placeholder="Search by design code or name…"
            className="w-full rounded-full border border-stone-200 bg-white py-3 pl-11 pr-4 text-sm text-stone-900 shadow-sm outline-none transition-all placeholder:text-stone-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
          />
        </div>
        <button
          onClick={() => setFiltersOpen((open) => !open)}
          className={`inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-medium transition-all lg:hidden ${
            filtersOpen || activeFilterCount > 0
              ? "border-amber-600 bg-amber-50 text-amber-700"
              : "border-stone-200 bg-white text-stone-700 hover:border-amber-400"
          }`}
        >
          <Filter className="h-4 w-4" />
          Filters
          {activeFilterCount > 0 && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-600 text-[10px] font-bold text-white">
              {activeFilterCount}
            </span>
          )}
        </button>
        <p className="ml-auto flex items-center gap-2 text-sm text-stone-500">
          <Layers className="h-4 w-4" />
          {filtered.length} design{filtered.length === 1 ? "" : "s"}
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-[240px_1fr]">
        {/* Sidebar filters (desktop) */}
        <aside className="hidden lg:block">
          <div className="sticky top-28 rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
            {filterPanel}
          </div>
        </aside>

        {/* Mobile filters */}
        {filtersOpen && (
          <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm lg:hidden">
            {filterPanel}
          </div>
        )}

        {/* Grid */}
        <div>
          {pageItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-stone-300 bg-white py-24 text-center">
              <Search className="h-10 w-10 text-stone-300" />
              <p className="mt-4 font-semibold text-stone-700">
                No designs match your filters
              </p>
              <p className="mt-1 text-sm text-stone-500">
                Try a different code or clear some filters.
              </p>
              <button
                onClick={clearAll}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-stone-900 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-amber-700"
              >
                Clear All
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 xl:grid-cols-4">
              {pageItems.map((product) => (
                <Link
                  key={product.id}
                  href={`/catalogues/${product.id}`}
                  className="group overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-stone-200/60"
                >
                  <div className="relative aspect-[283/352] overflow-hidden bg-stone-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={product.imageUrl}
                      alt={`${product.brand} laminate ${product.code}`}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    {product.has360 && (
                      <span className="absolute right-3 top-3 rounded-full bg-stone-950/70 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
                        360° view
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex items-baseline justify-between gap-2">
                      <p className="font-semibold text-stone-900">
                        {product.code}
                      </p>
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-amber-700">
                        {product.brand}
                      </p>
                    </div>
                    {product.finish && (
                      <p className="mt-0.5 truncate text-xs text-stone-500">
                        {product.finish}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex items-center justify-center gap-2">
              <button
                onClick={() => setPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-stone-200 bg-white text-stone-600 transition-colors hover:border-amber-400 hover:text-amber-700 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Previous page"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              {pageNumbers.map((num) => (
                <button
                  key={num}
                  onClick={() => setPage(num)}
                  className={`h-10 w-10 rounded-xl text-sm font-medium transition-colors ${
                    num === currentPage
                      ? "bg-stone-900 text-white shadow-sm"
                      : "border border-stone-200 bg-white text-stone-600 hover:border-amber-400 hover:text-amber-700"
                  }`}
                >
                  {num}
                </button>
              ))}
              <button
                onClick={() => setPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-stone-200 bg-white text-stone-600 transition-colors hover:border-amber-400 hover:text-amber-700 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Next page"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
