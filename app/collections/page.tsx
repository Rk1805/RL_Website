import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import {
  CatalogueBrowser,
  type BrowserProduct,
} from "@/components/catalogue-browser";
import { getCatalogData } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Collections",
  description:
    "Browse the complete Rosewood Laminates range at Rainbow Laminates — filter 300+ designs by brand, collection and thickness.",
};

export default async function CollectionsPage() {
  const catalog = await getCatalogData();

  const products: BrowserProduct[] = catalog.products.map((product) => ({
    id: product.id,
    code: product.code,
    brand: product.brand,
    brandSlug: product.brandSlug,
    collection: product.collection,
    thickness: product.thickness,
    finish: product.finish,
    imageUrl: product.imageUrl,
    has360: product.panoramaUrl !== null,
  }));

  return (
    <main className="bg-stone-50 text-stone-900">
      <PageHero
        eyebrow="Collections"
        title="Explore the complete collection"
        description={`Every current design from the Rosewood family — ${catalog.products.length} decors across ${catalog.brands.length} brands. Filter by brand, collection or thickness, or search a design code.`}
        crumbs={[{ label: "Home", href: "/" }, { label: "Collections" }]}
      />
      <CatalogueBrowser
        products={products}
        facets={{
          brands: catalog.brands,
          collections: catalog.collections,
          thicknesses: catalog.thicknesses,
        }}
      />
    </main>
  );
}
