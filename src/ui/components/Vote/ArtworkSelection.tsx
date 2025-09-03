"use client";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import Image from "next/image";
import getArtworks from "@/actions/getArtworks";
import { Artwork } from "../../../../lib/generated/prisma";
import { Badge } from "@/components/ui/badge";
import { Loading } from "../shared/Loading";
import { TranslationKeys } from "@/ui/contexts/LanguageContext";

export default function ArtworkSelection({
  selectedIds,
  setSelectedIds,
  t,
}: {
  selectedIds: string[];
  setSelectedIds: (ids: string[]) => void;
  t: (key: TranslationKeys) => string;
}) {
  const [individual, setIndividual] = useState<Artwork[]>([]);
  const [group, setGroup] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArtworks() {
      setLoading(true);
      const data = await getArtworks();
      setIndividual(data.filter((artwork) => artwork.type === "INDIVIDUAL"));
      setGroup(data.filter((artwork) => artwork.type === "GROUP"));
      setLoading(false);
    }
    fetchArtworks();
  }, []);

  const toggleSelect = (id: string) => {
    setSelectedIds(
      selectedIds.includes(id)
        ? selectedIds.filter((i) => i !== id)
        : [...selectedIds, id]
    );
  };

  if (loading) return <Loading />;

  const renderArtworks = (items: Artwork[]) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[400px] overflow-y-auto p-2">
      {items.map((artwork) => (
        <div
          key={artwork.id}
          onClick={() => toggleSelect(artwork.id)}
          className={`group relative cursor-pointer rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 ${
            selectedIds.includes(artwork.id)
              ? "ring-2 ring-blue-500 ring-offset-2"
              : "hover:ring-2 hover:ring-gray-300 hover:ring-offset-2"
          }`}
        >
          {/* Background Image */}
          <div className="relative h-48 w-full">
            <Image
              src={artwork.images[0]}
              alt={artwork.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            {/* Selection Indicator */}
            {selectedIds.includes(artwork.id) && (
              <div className="absolute top-3 left-3 z-20">
                <Badge className="bg-blue-500 text-white border-0">
                  {t("selected")}
                </Badge>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <div className="space-y-1">
              <h3 className="font-semibold text-sm leading-tight">
                {artwork.title}
              </h3>
              <div className="flex items-center justify-between">
                <span className="text-xs opacity-90">{artwork.author}</span>
                <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                  {artwork.year}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t("selectArtworks")}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          {t("selectArtworksDescription")}
        </p>
      </div>

      <Tabs defaultValue="individual" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
          <TabsTrigger
            value="individual"
            className="rounded-md transition-all data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow-sm"
          >
            {t("individualArtworks")}
          </TabsTrigger>
          <TabsTrigger
            value="group"
            className="rounded-md transition-all data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow-sm"
          >
            {t("groupArtworks")}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="individual" className="mt-6">
          {individual.length > 0 ? (
            renderArtworks(individual)
          ) : (
            <div className="text-center py-12 text-gray-500">
              No individual artworks available
            </div>
          )}
        </TabsContent>

        <TabsContent value="group" className="mt-6">
          {group.length > 0 ? (
            renderArtworks(group)
          ) : (
            <div className="text-center py-12 text-gray-500">
              No group artworks available
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Selection Summary */}
      {selectedIds.length > 0 && (
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            <span className="font-semibold">{selectedIds.length}</span> artwork
            {selectedIds.length !== 1 ? "s" : ""} {t("selected")}
          </p>
        </div>
      )}
    </div>
  );
}
