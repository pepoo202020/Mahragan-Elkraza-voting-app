import {
  artworkCount,
  eventCount,
  userCount,
  voteCount,
} from "@/actions/counts";
import getArtworks from "@/actions/getArtworks";
import getTopArtworks from "@/actions/getTopArtworks";
import getYearsAvailable from "@/actions/getYearsAvailable";
import { DashboardClient } from "@/ui/components/dashboard/overview/DashboardClient";

export default async function DashboardPage() {
  const [
    totalArtworks,
    totalUsers,
    totalVotes,
    artworks,
    allYears,
    topArtWorksData,
    totalEvents,
  ] = await Promise.all([
    artworkCount(),
    userCount(),
    voteCount(),
    getArtworks(),
    getYearsAvailable(),
    getTopArtworks(),
    eventCount(),
  ]);

  return (
    <DashboardClient
      stats={{ totalArtworks, totalUsers, totalVotes, totalEvents }}
      artworks={artworks}
      years={allYears}
      topArtworks={topArtWorksData}
    />
  );
}
