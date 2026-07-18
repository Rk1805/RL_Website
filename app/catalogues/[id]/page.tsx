import { redirect } from "next/navigation";

export default async function LegacyCatalogueDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  redirect(`/collections/${id}`);
}
