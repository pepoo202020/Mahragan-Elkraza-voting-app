"use client";
import { useLanguage } from "@/ui/contexts/LanguageContext";
import { TArtwork, TUser } from "@/ui/types/types";
import { DashboardStats } from "./DashboardStats";
import { TopArtworks } from "./TopArtworks";
import { TopVotedArtworks } from "./TopVotedArtworks";

interface ArtworkWithLovedBy extends TArtwork {
  lovedBy: TUser[];
}

interface IDashboardClientProps {
  stats: {
    totalArtworks: number;
    totalUsers: number;
    totalVotes: number;
    totalEvents: number;
  };
  artworks: TArtwork[];
  years: string[];
  topArtworks: ArtworkWithLovedBy[];
}

export const DashboardClient = ({
  stats,
  artworks,
  years,
  topArtworks,
}: IDashboardClientProps) => {
  const { language, t } = useLanguage();
  return (
    <main
      className="flex-1 p-6 animate-fade-in"
      dir={language === "en" ? "ltr" : "rtl"}
    >
      {/* Header */}
      <div className="mb-5">
        <h1 className="text-xl font-bold tracking-tight">
          {t("dashboardOverview")}
        </h1>
        <p className="text-muted-foreground text-sm">
          {t("welcomeBackHereWhatHappingWithYourChurchArtGallery")}
        </p>
      </div>
      <DashboardStats
        lang={language}
        stats={{
          totalArtworksCount: stats.totalArtworks,
          totalUsersCount: stats.totalUsers,
          totalVotesCount: stats.totalVotes,
          totalEventsCount: stats.totalEvents,
        }}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
        <TopArtworks t={t} artworks={artworks} />
        <TopVotedArtworks
          lang={language}
          t={t}
          artworks={topArtworks}
          years={years}
        />
      </div>
    </main>
  );
};
