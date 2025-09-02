"use client";
import VoteHeader from "@/ui/components/dashboard/votes/VoteHeader";
import { useLanguage } from "@/ui/contexts/LanguageContext";
import { useEffect, useMemo, useState } from "react";
import { BiSolidParty } from "react-icons/bi";
import { MdOutlineWhereToVote } from "react-icons/md";
import { LuVote } from "react-icons/lu";
import VoteStats from "@/ui/components/dashboard/votes/VoteStats";
import VoteEventsSlider from "../../../../ui/components/dashboard/overview/VoteEventsSlider";
import EditEventModal from "@/ui/components/dashboard/votes/EditEventModal";
import type { TArtwork, TVotingEvent } from "@/ui/types/types";
import VoteDetailsTable from "@/ui/components/dashboard/votes/VoteDetailsTable";
import type { UiVoteEvent, UiVoteRow, VoteCategory } from "@/ui/types/types";
import { toast } from "sonner";
import getVotingEventDetails from "@/actions/getVotingEventDetails";
import deleteVote from "@/actions/deleteVote";
import deleteVotingEvent from "@/actions/deleteVotingEvent";
import updateVotingEvent from "@/actions/updateVotingEvent";
import { eventCount, voteCount } from "@/actions/counts";
import getAllVotingEvents from "@/actions/getAllVotingEvents";
import { Loading } from "@/ui/components/shared/Loading";
import SharedAlertDialog from "@/ui/components/shared/SharedAlertDialog";

const stats = [
  {
    title: "number of events",
    icon: BiSolidParty,
    value: 0,
    description: "total number of events",
  },
  {
    title: "average votes",
    icon: MdOutlineWhereToVote,
    value: 0,
    description: "average number of votes per events",
  },
  {
    title: "total number of votes",
    icon: LuVote,
    value: 0,
    description: "total number of votes for all events",
  },
];

export default function VotesPage() {
  const { language, t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [allEvents, setAllEvents] = useState<UiVoteEvent[]>([]);
  const [editingEvent, setEditingEvent] = useState<UiVoteEvent | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [activeEventData, setActiveEventData] = useState<TVotingEvent | null>(
    null
  );
  const [votes, setVotes] = useState<UiVoteRow[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedEventId, setSelectedEventId] = useState<string>("");
  const [deleteEventOpen, setDeleteEventOpen] = useState<boolean>(false);

  // Global stats
  const [totalEvents, setTotalEvents] = useState<number>(0);
  const [totalVotes, setTotalVotes] = useState<number>(0);
  const averageVotes = useMemo(
    () => (totalEvents > 0 ? Math.round(totalVotes / totalEvents) : 0),
    [totalEvents, totalVotes]
  );

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        // Fetch global counts in parallel
        const [evCount, vtCount] = await Promise.all([
          eventCount(),
          voteCount(),
        ]);
        setTotalEvents(evCount ?? 0);
        setTotalVotes(vtCount ?? 0);

        // Load all events
        const res = await getAllVotingEvents();
        if (!res.success || !res.eventsInterface) {
          setAllEvents([]);
          setActiveEventData(null);
          setVotes([]);
          return;
        }

        // Set all events, with the first one active by default
        const events = res.eventsInterface.map((event, index) => ({
          ...event,
          active: event.currentEvent,
          startTime: new Date(event.startTime),
          endTime: new Date(event.endTime),
        }));
        setAllEvents(events);

        // Load details for the first event (if any)
        const defaultEvent = events.find((e) => e.active) || events[0];
        if (events.length > 0) {
          const details = await getVotingEventDetails(defaultEvent.id);
          if (details.success && details.event) {
            setActiveEventData(details.event);
            const rows: UiVoteRow[] = details.event.votes.map((v) => ({
              id: v.id,
              createdAt: new Date(v.createdAt),
              userName: v.user?.name ?? "Unknown",
              userEmail: v.user?.email ?? "",
              artworkTitle: v.artwork?.title ?? "",
              artworkId: v.artworkId,
              votingEventId: v.votingEventId,
              category: v.category as VoteCategory,
            }));
            setVotes(rows);
          }
        }
      } catch (e) {
        toast.error("Failed to load events");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const activeEvent = useMemo(
    () => allEvents.find((e) => e.active) ?? null,
    [allEvents]
  );

  const currentEvent = useMemo(
    () => allEvents.find((e) => e.currentEvent),
    [allEvents]
  );
  const currentEventName = currentEvent
    ? currentEvent.title
    : t("noCurrentEvent");
  const activeEventName = activeEvent ? activeEvent.title : t("noActiveEvent");
  const activeEventId = activeEvent?.id ?? "";

  const filteredEvents = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return allEvents;
    return allEvents.filter((e) => e.title.toLowerCase().includes(q));
  }, [allEvents, searchTerm]);

  const eventSelectHandler = async (id: string) => {
    // Set the selected event as active
    setAllEvents((prev) =>
      prev.map((e) => ({
        ...e,
        active: e.id === id,
      }))
    );

    // Fetch details for the selected event
    setLoading(true);
    try {
      const details = await getVotingEventDetails(id);
      if (details.success && details.event) {
        setActiveEventData(details.event);
        const rows: UiVoteRow[] = details.event.votes.map((v) => ({
          id: v.id,
          createdAt: new Date(v.createdAt),
          userName: v.user?.name ?? "Unknown",
          userEmail: v.user?.email ?? "",
          artworkTitle: v.artwork?.title ?? "",
          artworkId: v.artworkId,
          votingEventId: v.votingEventId,
          category: v.category as VoteCategory,
        }));
        setVotes(rows);
      } else {
        setVotes([]);
        toast.error("Failed to load event details");
      }
    } catch (e) {
      toast.error("Failed to load event details");
    } finally {
      setLoading(false);
    }
  };

  const eventEditHandler = (id: string) => {
    const event = allEvents.find((e) => e.id === id);
    if (!event || !activeEventData) return;
    setEditingEvent(event);
    setIsEditModalOpen(true);
  };

  const handleDeleteEvent = (eventId: string) => {
    if (selectedEventId) return; // Prevent opening if another dialog is active
    setSelectedEventId(eventId);
    setDeleteEventOpen(true);
  };

  const confirmDeleteEvent = async () => {
    if (!selectedEventId) return;
    setLoading(true);
    try {
      const res = await deleteVotingEvent(selectedEventId);
      if (!res.success) {
        toast.error(t("deleteEventFailed"));
        return;
      }

      // Update UI state
      const deletedEvent = allEvents.find((e) => e.id === selectedEventId);
      const deletedEventVoteCount = deletedEvent?.numberOfVotes || 0;

      // Remove the event from the list
      setAllEvents((prev) => prev.filter((e) => e.id !== selectedEventId));

      // Update total counts
      setTotalEvents((prev) => Math.max(0, prev - 1));
      setTotalVotes((prev) => Math.max(0, prev - deletedEventVoteCount));

      // If the deleted event was the active one, select another event
      if (activeEventData && activeEventData.id === selectedEventId) {
        const nextEvent = allEvents.find((e) => e.id !== selectedEventId);
        if (nextEvent) {
          eventSelectHandler(nextEvent.id);
        } else {
          setActiveEventData(null);
          setVotes([]);
        }
      }

      toast.success(t("deleteEventSuccess"));
    } catch (error) {
      toast.error(t("deleteEventFailed"));
      console.error(error);
    } finally {
      setLoading(false);
      setDeleteEventOpen(false);
      setSelectedEventId("");
    }
  };

  const handleEventUpdate = async (
    id: string,
    updatedEvent: Partial<TVotingEvent>
  ) => {
    try {
      setLoading(true);
      const payload = {
        eventId: id,
        title: updatedEvent.title ?? activeEventData?.title ?? "",
        description:
          (updatedEvent as Partial<TVotingEvent>).description ??
          activeEventData?.description ??
          "",
        votingStartTime: (
          updatedEvent.startTime ??
          activeEventData?.startTime ??
          new Date()
        ).toISOString(),
        votingEndTime: (
          updatedEvent.endTime ??
          activeEventData?.endTime ??
          new Date()
        ).toISOString(),
        year:
          updatedEvent.year ??
          activeEventData?.year ??
          new Date().getFullYear(),
        artworkIds: undefined as string[] | undefined,
      };

      const res = await updateVotingEvent(payload);
      if (!res.success) {
        toast.error(t("updateEventFailed"));
        return;
      }

      toast.success(t("updateEventSuccess"));
      setIsEditModalOpen(false);
      setEditingEvent(null);

      // Update the specific event in allEvents
      setAllEvents((prev) =>
        prev.map((event) =>
          event.id === id
            ? {
                ...event,
                title: updatedEvent.title ?? event.title,
                description: updatedEvent.description ?? event.description,
                startTime: updatedEvent.startTime
                  ? new Date(updatedEvent.startTime)
                  : event.startTime,
                endTime: updatedEvent.endTime
                  ? new Date(updatedEvent.endTime)
                  : event.endTime,
                year: updatedEvent.year
                  ? String(updatedEvent.year)
                  : event.year,
                active: true,
              }
            : event
        )
      );

      // Update activeEventData if it's the currently active event
      if (activeEventData && activeEventData.id === id) {
        setActiveEventData((prev) =>
          prev
            ? {
                ...prev,
                title: updatedEvent.title ?? prev.title,
                description: updatedEvent.description ?? prev.description,
                startTime: updatedEvent.startTime
                  ? new Date(updatedEvent.startTime)
                  : prev.startTime,
                endTime: updatedEvent.endTime
                  ? new Date(updatedEvent.endTime)
                  : prev.endTime,
                year: updatedEvent.year ?? prev.year,
              }
            : prev
        );
      }

      // Refresh the event details to ensure we have the latest data
      await eventSelectHandler(id);
    } catch (error) {
      console.error("Update event error:", error);
      toast.error(t("updateEventFailed"));
    } finally {
      setLoading(false);
    }
  };

  const activeEventVotes = useMemo(
    () => votes.filter((v) => v.votingEventId === activeEventId),
    [votes, activeEventId]
  );

  const handleEventCreated = async (event: TVotingEvent) => {
    setLoading(true);
    try {
      // Update total events count
      setTotalEvents((prev) => prev + 1);

      // Add the new event to the events list
      const newEvent = {
        id: event.id,
        title: event.title,
        description: event.description || "",
        numberOfVotes: 0,
        year: String(event.year),
        currentEvent: false,
        active: false,
        startTime: new Date(event.startTime),
        endTime: new Date(event.endTime),
      };

      setAllEvents((prev) => [...prev, newEvent]);

      // Select the new event to display its details
      await eventSelectHandler(event.id);

      toast.success(t("createEventSuccess"));
    } catch (error) {
      console.error("Error handling new event:", error);
      toast.error(t("createEventFailed"));
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteVote = async (id: string) => {
    setLoading(true);
    try {
      const prev = votes;
      setVotes((p) => p.filter((v) => v.id !== id)); // Optimistic update
      const res = await deleteVote(id);
      if (!res.success) {
        setVotes(prev); // Revert
        toast.error(t("deleteVoteFailed"));
        return;
      }
      toast.success(t("deleteVoteSuccess"));

      // Update the vote count in the events list
      setAllEvents((prevE) =>
        prevE.map((e) =>
          e.id === activeEventId
            ? { ...e, numberOfVotes: Math.max(0, e.numberOfVotes - 1) }
            : e
        )
      );

      // Update the total votes count
      setTotalVotes((v) => Math.max(0, v - 1));

      // If we're viewing the active event, refresh its data to ensure consistency
      if (activeEventData && activeEventData.id === activeEventId) {
        const details = await getVotingEventDetails(activeEventId);
        if (details.success && details.event) {
          setActiveEventData(details.event);
        }
      }
    } catch (error) {
      console.error("Delete vote error:", error);
      toast.error("Failed to delete vote");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <main
      className="flex-1 p-6 animate-fade-in space-y-5"
      dir={language === "en" ? "ltr" : "rtl"}
    >
      <VoteHeader
        t={t}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        currentActiveEventName={currentEventName}
        onEventCreated={handleEventCreated}
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat, i) => (
          <VoteStats
            stat={{
              ...stat,
              value:
                stat.title === "number of events"
                  ? totalEvents
                  : stat.title === "average votes"
                  ? averageVotes
                  : stat.title === "total number of votes"
                  ? totalVotes
                  : stat.value,
            }}
            key={i}
          />
        ))}
      </div>

      <VoteEventsSlider
        events={filteredEvents}
        onEventSelect={eventSelectHandler}
        onEventEdit={eventEditHandler}
        onEventDelete={handleDeleteEvent}
      />

      <VoteDetailsTable
        title={`${activeEventName} — ${t("votes")}`}
        rows={activeEventVotes}
        onDelete={handleDeleteVote}
        t={t}
        language={language}
      />

      {isEditModalOpen && editingEvent && activeEventData && (
        <EditEventModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setEditingEvent(null);
          }}
          event={activeEventData as TVotingEvent & { artworks: TArtwork[] }}
          onEventUpdate={handleEventUpdate}
          t={t}
          language={language}
        />
      )}
      <SharedAlertDialog
        action={confirmDeleteEvent}
        cancel
        description={t("deleteUserDescription")}
        isLoading={loading}
        onClose={() => {
          setDeleteEventOpen(false);
          setSelectedEventId("");
        }} // Use custom handler
        open={deleteEventOpen}
        t={t}
        title={t("deleteTitle")}
        lang={language}
      />
    </main>
  );
}
