import getArtworks from "@/actions/getArtworks";
import { sortOptions } from "@/constant/data";
import ArtsPageClient from "@/ui/components/gallery/ArtsPageClient";

export default async function ArtsPage() {
  const artworks = await getArtworks();
  const categories = [
    { value: "all", label: { en: "All", ar: "كل" } },
    { value: "GROUP", label: { en: "Group", ar: "فريق" } },
    { value: "INDIVIDUAL", label: { en: "Individual", ar: "فرد" } },
  ];

  return (
    <ArtsPageClient
      artworks={artworks}
      categories={categories}
      sortOptions={sortOptions}
    />
  );
}
