import { SiteShell } from "@/components/site-shell";
import { VisualizerStudio } from "@/components/visualizer-studio";
import { getCatalogData } from "@/lib/catalog";

export default async function VisualizerPage() {
  const catalog = await getCatalogData();

  return (
    <SiteShell
      intro="Visualizer"
      title="Fix laminates in design room application"
      description="Upload an image, choose a laminate, and click the surface to preview the result. The internal working logic is preserved, with the layout wrapped in the Rainbow brand."
    >
      <VisualizerStudio catalog={catalog} />
    </SiteShell>
  );
}
