import { SiteShell } from "@/components/site-shell";
import { ProductsBrowser } from "@/components/products-browser";
import { getCatalogData } from "@/lib/catalog";

export default async function ProductsPage() {
  const catalog = await getCatalogData();

  return (
    <SiteShell
      intro="Products"
      title="Our brands stand out the quality"
      description="Browse the current laminate range from the local catalogue and finishes folders, with the brand and finish controls arranged in a clean, Rosewood-style layout."
    >
      <ProductsBrowser catalog={catalog} />
    </SiteShell>
  );
}
