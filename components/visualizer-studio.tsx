"use client";

import type { CatalogData, CatalogFinish, CatalogImage } from "@/lib/catalog";
import {
  ChevronDown,
  Image as ImageIcon,
  Monitor,
  Sparkles,
  Upload,
} from "lucide-react";
import { useMemo, useState } from "react";

type VisualizerStudioProps = {
  catalog: CatalogData;
};

function getImageLabel(image: CatalogImage) {
  return image.fileName.replace(/\.[^.]+$/, "");
}

async function fetchImageFile(imageUrl: string, fileName: string) {
  const response = await fetch(imageUrl);

  if (!response.ok) {
    throw new Error(`Failed to fetch image: ${fileName}`);
  }

  const blob = await response.blob();
  const mimeType =
    response.headers.get("content-type") ?? blob.type ?? "image/jpeg";

  return new File([blob], fileName, { type: mimeType });
}

export function VisualizerStudio({ catalog }: VisualizerStudioProps) {
  const [file, setFile] = useState<File | null>(null);
  const [workingImage, setWorkingImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [resultImage, setResultImage] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  const [selectedBrandSlug, setSelectedBrandSlug] = useState(
    catalog.brands[0]?.slug ?? "",
  );
  const [selectedFinishCode, setSelectedFinishCode] = useState("all");
  const [selectedProductFile, setSelectedProductFile] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const selectedBrand = useMemo(
    () =>
      catalog.brands.find((brand) => brand.slug === selectedBrandSlug) ??
      catalog.brands[0],
    [catalog.brands, selectedBrandSlug],
  );

  const selectedFinishes: CatalogFinish[] = selectedBrand?.finishes ?? [];

  const visibleProducts = useMemo(() => {
    const products = selectedBrand?.images ?? [];
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return products.filter((product) => {
      const finishMatches =
        selectedFinishCode === "all" ||
        product.finishCode === selectedFinishCode;

      if (!finishMatches) return false;

      if (!normalizedSearch) return true;

      const haystack = [
        product.fileName,
        product.code,
        product.finishCode ?? "",
        product.finishName ?? "",
        selectedBrand?.name ?? "",
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(normalizedSearch);
    });
  }, [searchTerm, selectedBrand, selectedFinishCode]);

  const selectedProduct = useMemo(() => {
    return (
      visibleProducts.find(
        (product) => product.fileName === selectedProductFile,
      ) ??
      visibleProducts[0] ??
      null
    );
  }, [selectedProductFile, visibleProducts]);

  const selectedProductValue = visibleProducts.some(
    (product) => product.fileName === selectedProductFile,
  )
    ? selectedProductFile
    : (visibleProducts[0]?.fileName ?? "");

  const activeFinish =
    selectedFinishCode === "all"
      ? "All finishes"
      : (selectedFinishes.find((finish) => finish.code === selectedFinishCode)
          ?.name ?? selectedFinishCode);

  async function handleImageClick(e: React.MouseEvent<HTMLImageElement>) {
    if (!workingImage || !selectedProduct) return;

    const img = e.currentTarget;

    const rect = img.getBoundingClientRect();

    const displayWidth = img.clientWidth;
    const displayHeight = img.clientHeight;

    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const x =
    (clickX / displayWidth) *
    img.naturalWidth;

    const y =
    (clickY / displayHeight) *
    img.naturalHeight;

    console.log({
    x,
    y,
    naturalWidth: img.naturalWidth,
    naturalHeight: img.naturalHeight,
    displayWidth,
    displayHeight,
    });

    const formData = new FormData();
    formData.append("image", workingImage);
    formData.append("x", String(Math.round(x)));
    formData.append("y", String(Math.round(y)));
    formData.append("brand", selectedBrand?.slug ?? "");
    formData.append("brand_name", selectedBrand?.name ?? "");
    formData.append("finish", selectedFinishCode);
    formData.append("product", selectedProduct.fileName);
    formData.append("product_name", getImageLabel(selectedProduct));
    formData.append("laminate_image_url", selectedProduct.imageUrl);

    try {
      const laminateFile = await fetchImageFile(
        selectedProduct.imageUrl,
        selectedProduct.fileName,
      );
      formData.append("laminate_image", laminateFile);
    } catch {
      // Backend can still use the URL/name metadata if the image blob fetch fails.
    }

    const res = await fetch("http://localhost:8000/segment", {
      method: "POST",
      body: formData,
    });

    const blob = await res.blob();

    const nextFile = new File([blob], "working.png", {
      type: "image/png",
    });

    setWorkingImage(nextFile);

    const nextImageUrl = URL.createObjectURL(blob);

    setResultImage(nextImageUrl);

    // IMPORTANT:
    // show latest image on left side too
    setImageUrl(nextImageUrl);
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const selected = e.dataTransfer.files?.[0];
    if (selected && selected.type.startsWith("image/")) {
      processFile(selected);
    }
  };

  const processFile = (selected: File) => {
    setFile(selected);
    setWorkingImage(selected);

    const uploadedUrl = URL.createObjectURL(selected);
    setImageUrl(uploadedUrl);
    setResultImage("");
  };

  return (
    <section className="bg-stone-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-amber-700">
            <Monitor className="h-4 w-4" />
            Interactive Visualizer
          </div>
          <h2 className="mt-4 text-3xl font-bold uppercase tracking-tight text-stone-900 sm:text-4xl">
            Visualize Your Space
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-stone-600">
            Upload an image of your room, select a laminate finish, and click on
            surfaces to see how they transform.
          </p>
        </div>

        {/* Controls Card */}
        <div className="mb-8 overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-xl shadow-stone-200/50">
          <div className="grid gap-4 border-b border-stone-100 bg-gradient-to-r from-stone-50 to-stone-100/50 p-6 sm:p-8 xl:grid-cols-[0.9fr_0.8fr_0.8fr_1.1fr] xl:items-end">
            <div>
              <label className="mb-3 block text-xs font-bold uppercase tracking-widest text-stone-500">
                Brand
              </label>
              <div className="relative">
                <select
                  value={selectedBrandSlug}
                  onChange={(event) => {
                    setSelectedBrandSlug(event.target.value);
                    setSelectedFinishCode("all");
                    setSelectedProductFile("");
                    setSearchTerm("");
                  }}
                  className="w-full appearance-none rounded-xl border border-stone-200 bg-white px-4 py-4 pr-10 text-sm font-semibold text-stone-900 outline-none transition-all focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                >
                  {catalog.brands.map((brand) => (
                    <option key={brand.slug} value={brand.slug}>
                      {brand.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
              </div>
            </div>

            <div>
              <label className="mb-3 block text-xs font-bold uppercase tracking-widest text-stone-500">
                Finish
              </label>
              <div className="relative">
                <select
                  value={selectedFinishCode}
                  onChange={(event) => {
                    setSelectedFinishCode(event.target.value);
                    setSelectedProductFile("");
                  }}
                  className="w-full appearance-none rounded-xl border border-stone-200 bg-white px-4 py-4 pr-10 text-sm font-semibold text-stone-900 outline-none transition-all focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                >
                  <option value="all">All Finishes</option>
                  {selectedFinishes.map((finish) => (
                    <option key={finish.code} value={finish.code}>
                      {finish.name} ({finish.code})
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
              </div>
            </div>

            <div>
              <label className="mb-3 block text-xs font-bold uppercase tracking-widest text-stone-500">
                Product
              </label>
              <div className="relative">
                <select
                  value={selectedProductValue}
                  onChange={(event) =>
                    setSelectedProductFile(event.target.value)
                  }
                  className="w-full appearance-none rounded-xl border border-stone-200 bg-white px-4 py-4 pr-10 text-sm font-semibold text-stone-900 outline-none transition-all focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                >
                  {visibleProducts.map((product) => (
                    <option key={product.fileName} value={product.fileName}>
                      {getImageLabel(product)}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
              </div>
            </div>

            <div>
              <label className="mb-3 block text-xs font-bold uppercase tracking-widest text-stone-500">
                Search
              </label>
              <div className="relative">
                <Sparkles className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-amber-500" />
                <input
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Search products"
                  className="w-full rounded-xl border border-stone-200 bg-white py-4 pl-10 pr-4 text-sm font-medium text-stone-900 outline-none transition-all placeholder:text-stone-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                />
              </div>
            </div>
          </div>

          <div className="border-b border-stone-100 bg-white p-6 sm:p-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
              <div className="flex-1">
                <div className="rounded-xl bg-stone-50 px-4 py-3">
                  <p className="text-xs font-bold uppercase tracking-widest text-stone-500">
                    Selected
                  </p>
                  <p className="mt-1 text-sm font-semibold text-stone-900">
                    {selectedBrand?.name ?? "Rainbow Laminates"} /{" "}
                    {activeFinish} /{" "}
                    {selectedProduct
                      ? getImageLabel(selectedProduct)
                      : "No product"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-xl bg-stone-50 px-4 py-3">
                <div className="text-sm text-stone-600">
                  <span className="font-semibold text-stone-900">
                    {visibleProducts.length}
                  </span>{" "}
                  products found
                </div>
              </div>
            </div>
          </div>

          <div className="border-b border-stone-100 bg-white p-6 sm:p-8">
            <div className="max-w-xl">
              <label className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-stone-500">
                <ImageIcon className="h-4 w-4 text-amber-500" />
                Upload Room Image
              </label>
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`relative rounded-xl border-2 border-dashed p-6 transition-all duration-300 ${
                  isDragging
                    ? "border-amber-500 bg-amber-50"
                    : "border-stone-300 hover:border-amber-400 hover:bg-stone-50"
                }`}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) => {
                    const selected = event.target.files?.[0];
                    if (selected) processFile(selected);
                  }}
                  className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                />
                <div className="flex flex-col items-center text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                    <Upload className="h-6 w-6" />
                  </div>
                  <p className="mt-3 text-sm font-semibold text-stone-900">
                    Click to upload or drag and drop
                  </p>
                  <p className="mt-1 text-xs text-stone-500">
                    PNG, JPG up to 10MB
                  </p>
                </div>
              </div>
              {file ? (
                <div className="mt-2 flex items-center gap-2 text-xs text-stone-500">
                  <span className="inline-flex h-2 w-2 rounded-full bg-green-500" />
                  Loaded: {file.name}
                </div>
              ) : null}
            </div>
          </div>
        </div>

        {/* Preview Area */}
        {imageUrl ? (
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Working Image */}
            <div className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-xl shadow-stone-200/50">
              <div className="border-b border-stone-100 bg-gradient-to-r from-stone-50 to-stone-100/50 px-6 py-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold uppercase tracking-tight text-stone-900">
                    Current View
                  </h3>
                  <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-700">
                    Click to Apply
                  </span>
                </div>
              </div>
             <div className="flex items-center justify-center bg-stone-50 p-4">
                <img
                    src={imageUrl}
                    alt="Input"
                    onClick={handleImageClick}
                    className="w-full h-auto cursor-crosshair rounded-lg"
                />
            </div>
              <div className="border-t border-stone-100 bg-stone-50 px-6 py-4">
                <p className="text-sm text-stone-600">
                  <span className="font-semibold">Tip:</span> Click on any
                  surface to apply the selected laminate finish. Keep clicking
                  to apply to multiple areas.
                </p>
              </div>
            </div>

            {/* Result Preview */}
            <div className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-xl shadow-stone-200/50">
              <div className="border-b border-stone-100 bg-gradient-to-r from-stone-50 to-stone-100/50 px-6 py-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold uppercase tracking-tight text-stone-900">
                    Preview Result
                  </h3>
                  <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-stone-600">
                    {selectedProduct
                      ? getImageLabel(selectedProduct)
                      : "Selected product"}
                  </span>
                </div>
              </div>
             <div className="flex items-center justify-center bg-stone-50 p-4">
                {resultImage ? (
                    <img
                    src={resultImage}
                    alt="Result"
                    className="w-full h-auto rounded-lg"
                    />
                ) : (
                  <div className="flex h-[500px] flex-col items-center justify-center bg-gradient-to-br from-stone-100 to-stone-50">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-stone-200 text-stone-400">
                      <ImageIcon className="h-8 w-8" />
                    </div>
                    <p className="mt-4 text-sm font-medium text-stone-500">
                      Click on the left image to apply laminate
                    </p>
                    <p className="mt-1 text-xs text-stone-400">
                      The result will appear here
                    </p>
                  </div>
                )}
              </div>
              <div className="border-t border-stone-100 bg-stone-50 px-6 py-4">
                <p className="text-sm text-stone-600">
                  <span className="font-semibold">Note:</span> This is a
                  preview. Actual finish may vary slightly based on lighting and
                  screen settings.
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-stone-200 bg-white py-20 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-stone-100 text-stone-400">
              <ImageIcon className="h-10 w-10" />
            </div>
            <h3 className="mt-6 text-xl font-bold uppercase tracking-tight text-stone-900">
              No Image Uploaded
            </h3>
            <p className="mt-2 max-w-md text-stone-600">
              Upload a photo of your room or space to get started with the
              visualizer.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
