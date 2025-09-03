"use server";
import db from "@/lib/prisma";

export default async function getVotingEvent() {
  try {
    const now = new Date();
    console.log("Current date:", now);

    // For production: get the most recent event regardless of dates
    const event = await db.votingEvent.findFirst({
      orderBy: { createdAt: "desc" },
      include: { artworks: true },
    });

    console.log("Found event:", event);

    if (!event) {
      console.log("No events found in database");
      return { success: true, event: null, status: "inactive" };
    }

    // Check if event is actually active based on dates
    const isActive = event.startTime <= now && now <= event.endTime;
    console.log("Event is active:", isActive);
    console.log("Event start time:", event.startTime);
    console.log("Event end time:", event.endTime);
    console.log("Event artworks count:", event.artworks?.length || 0);

    return {
      success: true,
      event,
      status: isActive ? "active" : "inactive",
    };
  } catch (error) {
    console.error("Error in getVotingEvent:", error);
    return { success: false, error: error };
  }
}
