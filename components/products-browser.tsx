"use client";

import type { CatalogData, CatalogFinish, CatalogImage } from "@/lib/catalog";
import {
  Palette,
  Sparkles,
  X,
  Grid,
  List,
  Filter,
  ChevronDown,
} from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";

type ProductsBrowserProps = {
  catalog: CatalogData;
};

export function ProductsBrowser({ catalog }: ProductsBrowserProps) {
  const [selectedBrandSlug, setSelectedBrandSlug] = useState(
    catalog.brands[0]?.slug ?? "",
  );
  const [selectedFinishCode, setSelectedFinishCode] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedImage, setExpandedImage] = useState<CatalogImage | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const selectedBrand = useMemo(
    () =>
      catalog.brands.find((brand) => brand.slug === selectedBrandSlug) ??
      catalog.brands[0],
    [catalog.brands, selectedBrandSlug],
  );

  const selectedFinishes: CatalogFinish[] = selectedBrand?.finishes ?? [];

  const visibleImages: CatalogImage[] = useMemo(() => {
    const images = selectedBrand?.images ?? [];
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return images.filter((image) => {
      const finishMatches =
        selectedFinishCode === "all" || image.finishCode === selectedFinishCode;

      if (!finishMatches) return false;

      if (!normalizedSearch) return true;

      const haystack = [
        image.fileName,
        image.code,
        image.finishCode ?? "",
        image.finishName ?? "",
        selectedBrand?.name ?? "",
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(normalizedSearch);
    });
  }, [searchTerm, selectedBrand, selectedFinishCode]);

  const activeFinish =
    selectedFinishCode === "all"
      ? "All finishes"
      : (selectedFinishes.find((finish) => finish.code === selectedFinishCode)
          ?.name ?? selectedFinishCode);

  return (
    <section className="relative overflow-hidden bg-stone-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-amber-700">
            <Palette className="h-4 w-4" />
            Product Catalogue
          </div>
          <h2 className="mt-4 text-3xl font-bold uppercase tracking-tight text-stone-900 sm:text-4xl">
            Explore Our Collection
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-stone-600">
            Browse through our premium range of decorative laminates with
            advanced filtering options
          </p>
        </div>

        {/* Main Container */}
        <div className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-xl shadow-stone-200/50">
          {/* Top Bar with Selection Info */}
          <div className="flex flex-col gap-4 border-b border-stone-100 bg-gradient-to-r from-stone-50 to-stone-100/50 p-6 sm:p-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2">
                <div className="h-8 w-1 rounded-full bg-amber-500" />
                <h3 className="text-xl font-bold uppercase tracking-tight text-stone-900">
                  {selectedBrand?.name ?? "Rainbow Laminates"}
                </h3>
              </div>
              <p className="mt-2 text-sm text-stone-600">
                Viewing {activeFinish} &bull; {visibleImages.length} products
                available
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden rounded-xl border border-stone-200 bg-white px-4 py-2 text-sm shadow-sm sm:flex">
                <span className="text-stone-500">Finish:</span>
                <span className="ml-2 font-semibold text-stone-900">
                  {activeFinish}
                </span>
              </div>
              <div className="flex items-center gap-1 rounded-xl border border-stone-200 bg-white p-1 shadow-sm">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`rounded-lg p-2 transition-colors ${
                    viewMode === "grid"
                      ? "bg-amber-100 text-amber-600"
                      : "text-stone-400 hover:text-stone-600"
                  }`}
                  aria-label="Grid view"
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`rounded-lg p-2 transition-colors ${
                    viewMode === "list"
                      ? "bg-amber-100 text-amber-600"
                      : "text-stone-400 hover:text-stone-600"
                  }`}
                  aria-label="List view"
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="border-b border-stone-100 bg-white p-6 sm:p-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
              {/* Brand Selector */}
              <div className="flex-1">
                <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-stone-500">
                  Select Brand
                </label>
                <div className="relative">
                  <select
                    value={selectedBrandSlug}
                    onChange={(event) => {
                      setSelectedBrandSlug(event.target.value);
                      setSelectedFinishCode("all");
                      setSearchTerm("");
                      setExpandedImage(null);
                    }}
                    className="w-full appearance-none rounded-xl border border-stone-200 bg-white px-4 py-3 pr-10 text-sm font-medium text-stone-900 outline-none transition-all focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                  >
                    {catalog.brands.map((brand) => (
                      <option key={brand.slug} value={brand.slug}>
                        {brand.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
                </div>
              </div>

              {/* Finish Selector */}
              <div className="flex-1">
                <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-stone-500">
                  Finish Type
                </label>
                <div className="relative">
                  <select
                    value={selectedFinishCode}
                    onChange={(event) =>
                      setSelectedFinishCode(event.target.value)
                    }
                    className="w-full appearance-none rounded-xl border border-stone-200 bg-white px-4 py-3 pr-10 text-sm font-medium text-stone-900 outline-none transition-all focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                  >
                    <option value="all">All Finishes</option>
                    {selectedFinishes.map((finish) => (
                      <option key={finish.code} value={finish.code}>
                        {finish.name} ({finish.code})
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
                </div>
              </div>

              {/* Search */}
              <div className="flex-[1.5]">
                <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-stone-500">
                  Search Products
                </label>
                <div className="relative">
                  <Sparkles className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-amber-500" />
                  <input
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    placeholder="Search by code, name, or finish..."
                    className="w-full rounded-xl border border-stone-200 bg-white py-3 pl-10 pr-4 text-sm font-medium text-stone-900 outline-none transition-all placeholder:text-stone-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                  />
                </div>
              </div>
            </div>

            {/* Results Count */}
            <div className="mt-4 flex items-center justify-between rounded-xl bg-stone-50 px-4 py-3">
              <div className="flex items-center gap-2 text-sm text-stone-600">
                <Filter className="h-4 w-4" />
                <span className="font-semibold text-stone-900">
                  {visibleImages.length}
                </span>
                <span>products found</span>
              </div>
              <div className="text-xs text-stone-500">
                {selectedBrand?.images.length ?? 0} total in{" "}
                {selectedBrand?.name}
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="p-6 sm:p-8">
            {visibleImages.length > 0 ? (
              <div
                className={
                  viewMode === "grid"
                    ? "grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                    : "flex flex-col gap-3"
                }
              >
                {visibleImages.map((image) => (
                  <button
                    key={`${selectedBrand?.slug ?? "brand"}-${image.fileName}`}
                    type="button"
                    onClick={() => setExpandedImage(image)}
                    className={`group text-left transition-all duration-300 ${
                      viewMode === "grid"
                        ? "overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm hover:-translate-y-1 hover:shadow-xl hover:shadow-stone-200/50"
                        : "flex items-center gap-4 rounded-xl border border-stone-200 bg-white p-3 shadow-sm hover:-translate-x-1 hover:shadow-lg hover:shadow-stone-200/50"
                    }`}
                  >
                    {viewMode === "grid" ? (
                      <>
                        <div className="relative aspect-square overflow-hidden bg-stone-100">
                          <Image
                            src={image.imageUrl}
                            alt={image.fileName}
                            fill
                            unoptimized
                            sizes="(max-width: 1536px) 25vw, 20vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/0 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-20" />
                        </div>
                        <div className="p-4">
                          <div className="text-sm font-bold uppercase tracking-tight text-stone-900">
                            {image.fileName.replace(/\.[^.]+$/, "")}
                          </div>
                          {image.finishName && (
                            <div className="mt-1 text-xs text-stone-500">
                              {image.finishName}
                            </div>
                          )}
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-stone-100">
                          <Image
                            src={image.imageUrl}
                            alt={image.fileName}
                            fill
                            unoptimized
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-bold text-stone-900">
                            {image.fileName.replace(/\.[^.]+$/, "")}
                          </div>
                          {image.finishName && (
                            <div className="text-xs text-stone-500">
                              {image.finishName}
                            </div>
                          )}
                        </div>
                        <div className="pr-2">
                          <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-700">
                            View
                          </span>
                        </div>
                      </>
                    )}
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-stone-200 bg-stone-50 py-16 text-center">
                <Palette className="h-12 w-12 text-stone-300" />
                <h3 className="mt-4 text-lg font-bold text-stone-900">
                  No products found
                </h3>
                <p className="mt-2 text-sm text-stone-500">
                  Try adjusting your filters or search term
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Expanded Image Modal */}
      {expandedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/80 px-4 py-8 backdrop-blur-sm"
          onClick={() => setExpandedImage(null)}
        >
          <div
            className="relative w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setExpandedImage(null)}
              className="absolute right-4 top-4 z-10 rounded-full bg-white p-2 text-stone-600 shadow-lg transition-colors hover:bg-stone-100"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="grid lg:grid-cols-[1.2fr_0.8fr]">
              {/* Image */}
              <div className="relative min-h-[400px] bg-stone-100 sm:min-h-[500px]">
                <Image
                  src={expandedImage.imageUrl}
                  alt={expandedImage.fileName}
                  fill
                  unoptimized
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-contain p-8"
                />
              </div>

              {/* Details */}
              <div className="flex flex-col justify-center bg-gradient-to-br from-stone-50 to-stone-100 p-8 sm:p-10">
                <div className="inline-flex w-fit items-center gap-2 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-amber-700">
                  {selectedBrand?.name}
                </div>
                <h3 className="mt-4 text-2xl font-bold uppercase tracking-tight text-stone-900 sm:text-3xl">
                  {expandedImage.fileName.replace(/\.[^.]+$/, "")}
                </h3>
                {expandedImage.finishName && (
                  <p className="mt-2 text-lg text-stone-600">
                    Finish: {expandedImage.finishName}
                  </p>
                )}
                {expandedImage.finishCode && (
                  <p className="mt-1 text-sm text-stone-500">
                    Code: {expandedImage.finishCode}
                  </p>
                )}
                <div className="mt-8 flex gap-3">
                  <a
                    href={`https://wa.me/918866630305?text=${encodeURIComponent(
                      `Hi, I'm interested in ${expandedImage.fileName.replace(/\.[^.]+$/, "")} from ${selectedBrand?.name ?? "Rainbow Laminates"}.`,
                    )}`}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="flex-1 rounded-xl bg-stone-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-amber-600"
                  >
                    Enquire Now
                  </a>
                  <button className="rounded-xl border-2 border-stone-200 px-6 py-3 text-sm font-semibold text-stone-900 transition-colors hover:border-amber-500 hover:text-amber-600">
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
