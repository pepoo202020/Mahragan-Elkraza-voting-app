"use client";

import { Button } from "@/components/ui/button";
import { ArtWorkCard } from "./ArtWorkCard";
import { FilterBar } from "./FilterBar";
import { GalleryFooter } from "./Footer";
import { ScrollToTopButton } from "./ScrollToTopButton";
import { useLanguage } from "@/ui/contexts/LanguageContext";
import { useEffect, useRef, useState } from "react";
import { Artwork } from "../../../../lib/generated/prisma";
import { Loading } from "../shared/Loading";
import { useSession } from "next-auth/react";
import setLoveArtwork from "@/actions/setLoveArtwork";
import { VoteBanner } from "./VoteBanner";
import getVotingEvent from "@/actions/getVotingEvent";
import getUser from "@/actions/getUser";

interface ArtsPageClientProps {
  artworks: Artwork[];
  categories: { value: string; label: { en: string; ar: string } }[];
  sortOptions: { value: string; label: { en: string; ar: string } }[];
}

export default function ArtsPageClient({
  artworks: initialArtworks,
  categories,
  sortOptions,
}: ArtsPageClientProps) {
  const { language, t } = useLanguage();
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState<string>(
    currentYear.toString()
  );
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("latest");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [artworks, setArtworks] = useState<Artwork[]>(initialArtworks);
  const [filteredArtworks, setFilteredArtworks] =
    useState<Artwork[]>(initialArtworks);
  const [lovedArtworks, setLovedArtworks] = useState<Set<string>>(new Set());
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();
  const [hasActiveVotingEvent, setHasActiveVotingEvent] =
    useState<boolean>(false);

  const years = Array.from({ length: currentYear - 2000 + 3 }, (_, i) =>
    (2000 + i).toString()
  );

  useEffect(() => {
    async function initializeLovedArtworks() {
      if (session?.user?.email) {
        try {
          const user = await getUser(session.user.email);
          if (user?.lovedBy) {
            const lovedIds = new Set(user.lovedBy.map((artwork) => artwork.id));
            setLovedArtworks(lovedIds);
          }
        } catch (error) {
          console.error("Error fetching user loved artworks:", error);
        }
      }
    }

    initializeLovedArtworks();
  }, [session]);

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedYear(currentYear.toString());
    setSelectedCategory("all");
    setSortBy("latest");
  };

  // Check for active voting event
  useEffect(() => {
    async function checkVotingEvent() {
      try {
        const result = await getVotingEvent();
        if (result.success && result.status === "active") {
          setHasActiveVotingEvent(true);
        }
      } catch (error) {
        console.error("Error checking voting event:", error);
      }
    }

    checkVotingEvent();
  }, []);

  useEffect(() => {
    const filtered = [...artworks].filter((artwork) => {
      const matchesSearch =
        artwork.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        artwork.author.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesYear =
        selectedYear === "all" || artwork.year.toString() === selectedYear;

      const matchesCategory =
        selectedCategory === "all" || artwork.type === selectedCategory;

      return matchesSearch && matchesYear && matchesCategory;
    });

    if (sortBy === "most-loved") {
      filtered.sort((a, b) => b.loves - a.loves);
    } else if (sortBy === "alphabetical") {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    }

    setFilteredArtworks(filtered);
  }, [artworks, searchTerm, selectedYear, selectedCategory, sortBy]);

  const handleLove = async (id: string) => {
    if (!session?.user?.email) return;
    // Call the server action
    const result = await setLoveArtwork(id, session.user.email);

    // Update local state
    setArtworks((prev) =>
      prev.map((art) =>
        art.id === id ? { ...art, loves: result.totalLoves! } : art
      )
    );
    setLovedArtworks((prev) => {
      const newSet = new Set(prev);
      if (result.loved) {
        newSet.add(id);
      } else {
        newSet.delete(id);
      }
      return newSet;
    });
  };
  if (!artworks) {
    return <Loading />;
  }

  return (
    <div
      dir={language === "ar" ? "rtl" : "ltr"}
      className="relative w-full flex h-full flex-col gap-5"
    >
      <ScrollToTopButton t={t} />
      <div className="sticky top-0 z-20 w-full bg-background/80 pb-4 pt-2 backdrop-blur-sm">
        <FilterBar
          t={t}
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
          years={years}
          language={language}
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          sortBy={sortBy}
          setSortBy={setSortBy}
          sortOptions={sortOptions}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          resetFilters={resetFilters}
        />
      </div>

      {/* Only show VoteBanner if there's an active voting event */}
      {hasActiveVotingEvent && <VoteBanner t={t} />}

      <div ref={scrollContainerRef} className="w-full flex-1 overflow-y-auto">
        <div className="flex flex-col gap-5">
          {filteredArtworks.map((art) => (
            <ArtWorkCard
              key={art.id}
              artwork={art}
              onLove={handleLove}
              isLoved={lovedArtworks.has(art.id)}
              session={session as any}
            />
          ))}
          {filteredArtworks.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">
                {t("noArtworksFound")}
              </p>
              <Button onClick={resetFilters} variant="outline" className="mt-4">
                {t("resetFilter")}
              </Button>
            </div>
          )}
        </div>
        <GalleryFooter />
      </div>
    </div>
  );
}
