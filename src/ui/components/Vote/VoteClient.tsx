"use client";

import { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ArtVoteCard } from "./ArtVoteCard";
import addVote from "@/actions/addVote";
import { useSession } from "next-auth/react";
import { Artwork, ArtworkType } from "@prisma/client";
import getVotingEvent from "@/actions/getVotingEvent";
import { Loading } from "../shared/Loading";
import checkUserVotes from "@/actions/checkUserVotes";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { useLanguage } from "@/ui/contexts/LanguageContext";

export default function VoteClient() {
  const { t } = useLanguage();
  const [userVotes, setUserVotes] = useState<{
    individual: string;
    group: string;
  }>({
    individual: "",
    group: "",
  });
  const [individualArts, setIndividualArts] = useState<Artwork[]>([]);
  const [groupArts, setGroupArts] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [checkingVotes, setCheckingVotes] = useState<boolean>(true);
  const [submittingVotes, setSubmittingVotes] = useState<boolean>(false);
  const router = useRouter();
  const session = useSession();
  const [alreadyVoted, setAlreadyVoted] = useState<boolean>(false);

  const fetchEventAndVotes = useCallback(async () => {
    setLoading(true);

    try {
      // Get voting event data
      const result = await getVotingEvent();
      if (!result.success || !result.event) {
        toast.error(t("noActiveVotingEvent"));
        setLoading(false);
        return;
      }

      const { artworks, id: votingEventId } = result.event;

      // Set artwork data
      setIndividualArts(
        artworks.filter((a: Artwork) => a.type === "INDIVIDUAL")
      );
      setGroupArts(artworks.filter((a: Artwork) => a.type === "GROUP"));

      // Check if user already voted
      const email = session.data?.user?.email;
      if (email) {
        try {
          const userVotes = await checkUserVotes(votingEventId, email);
          if (userVotes && (userVotes.individual || userVotes.group)) {
            setAlreadyVoted(true);
          }
        } catch (error) {
          console.error("Error checking votes:", error);
          toast.error(t("failedToCheckYourVotingStatus"));
        }
      }
    } catch (error) {
      console.error("Error fetching voting event:", error);
      toast.error(t("failedToLoadVotingEvent"));
    } finally {
      setLoading(false);
      setCheckingVotes(false);
    }
  }, [session.data?.user?.email, t]);

  useEffect(() => {
    fetchEventAndVotes();
  }, [fetchEventAndVotes]);

  const handleVote = async () => {
    const email = session.data?.user?.email;
    if (!email) return toast.error(t("pleaseLogInToVote"));

    // Check if at least one vote is selected
    const hasIndividualVote = Boolean(userVotes.individual);
    const hasGroupVote = Boolean(userVotes.group);

    if (!hasIndividualVote && !hasGroupVote) {
      return toast.error(t("pleaseSelectAtLeastOneArtwork"));
    }

    try {
      setSubmittingVotes(true);
      let success = false;
      let errorMessage = "";

      // Submit individual vote if selected
      if (hasIndividualVote) {
        const res = await addVote(userVotes.individual, "INDIVIDUAL", email);
        success = success || res.success;
        if (!res.success) errorMessage = res.message!;
      }

      // Submit group vote if selected
      if (hasGroupVote) {
        const res = await addVote(userVotes.group, "GROUP", email);
        success = success || res.success;
        if (!res.success) errorMessage = res.message!;
      }

      if (success) {
        toast.success(t("votesSubmitted"));
        router.push("/gallery");
      } else {
        toast.error(errorMessage || t("failedToSubmitVotes"));
      }
    } catch (error) {
      console.error("Error submitting votes:", error);
      toast.error(t("anErrorOccurredWhileSubmittingYourVotes"));
    } finally {
      setSubmittingVotes(false);
    }
  };
  if (loading) {
    return <Loading />;
  }

  if (checkingVotes) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] p-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-lg font-medium text-center">
          {t("checkingYourVotingStatus")}
        </p>
      </div>
    );
  }

  if (alreadyVoted) {
    return (
      <div className="max-w-xl mx-auto py-16 text-center">
        <h2 className="text-2xl font-bold mb-4 text-green-600">
          {t("youHaveAlreadyVoted")}
        </h2>
        <p className="text-gray-600 mb-5">
          {t("thankYouForParticipatingInTheVotingEvent")}
        </p>
        <Link
          href="/gallery"
          className="inline-block px-6 py-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition"
        >
          {t("backToGallery")}
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-12 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        {t("voteForYourFavoriteArtworks")}
      </h1>
      {/* Individual */}
      <section>
        <h2 className="text-xl font-semibold mb-4">
          {t("individualArtworks")}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {individualArts.map((art) => (
            <ArtVoteCard
              key={art.id}
              art={art}
              selected={userVotes.individual === art.id}
              onClick={() =>
                setUserVotes((prev) => ({
                  ...prev,
                  individual: prev.individual === art.id ? "" : art.id,
                }))
              }
              className={`transition-all duration-200 ${
                userVotes.individual === art.id
                  ? "ring-2 ring-blue-500 scale-105"
                  : "hover:ring-2 hover:ring-gray-300"
              }`}
            />
          ))}
          {individualArts.length === 0 && (
            <div className="col-span-full text-center text-gray-500">
              {t("noIndividualArtworksAvailable")}
            </div>
          )}
        </div>
      </section>
      {/* Group */}
      <section>
        <h2 className="text-xl font-semibold mb-4">{t("groupArtworks")}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {groupArts.map((art) => (
            <ArtVoteCard
              key={art.id}
              art={art}
              selected={userVotes.group === art.id}
              onClick={() =>
                setUserVotes((prev) => ({
                  ...prev,
                  group: prev.group === art.id ? "" : art.id,
                }))
              }
              className={`transition-all duration-200 ${
                userVotes.group === art.id
                  ? "ring-2 ring-blue-500 scale-105"
                  : "hover:ring-2 hover:ring-gray-300"
              }`}
            />
          ))}
          {groupArts.length === 0 && (
            <div className="col-span-full text-center text-gray-500">
              {t("noGroupArtworksAvailable")}
            </div>
          )}
        </div>
      </section>
      {/* Submit */}
      <div className="text-center">
        <Button
          disabled={
            (!userVotes.group && !userVotes.individual) || submittingVotes
          }
          onClick={handleVote}
          className="px-8 py-3 text-lg rounded-full shadow-lg bg-gradient-to-r from-blue-500 to-rose-500 hover:from-blue-600 hover:to-rose-600 transition"
        >
          {submittingVotes ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {t("submitting")}
            </>
          ) : (
            t("submitVote")
          )}
        </Button>
      </div>
    </div>
  );
}
