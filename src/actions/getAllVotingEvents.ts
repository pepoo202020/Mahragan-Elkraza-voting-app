"use server";
import { UiVoteEvent } from "@/ui/types/types";
import db from "@/lib/prisma";

export default async function getAllVotingEvents() {
  try {
    const now = new Date();
    const events = await db.votingEvent.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        votes: true, // Include votes to count them
      },
    });

    const eventsInterface: UiVoteEvent[] = events.map((event) => ({
      startTime: event.startTime,
      endTime: event.endTime,
      id: event.id,
      title: event.title,
      description: event.description ?? "",
      year: `${event.year}`, // Convert to string to match UiVoteEvent
      numberOfVotes: event.votes.length, // Actual count of votes
      currentEvent: event.startTime <= now && now <= event.endTime, // True if now is within startTime and endTime
      active: false, // Client will set the active event
    }));

    console.log("eventsInterface:", eventsInterface);

    return {
      success: true,
      events: eventsInterface, // Changed from 'event' to 'events'
      status: events.length > 0 ? "active" : "inactive",
    };
  } catch (error) {
    console.error("Error fetching voting events:", error);
    return { success: false };
  }
}
