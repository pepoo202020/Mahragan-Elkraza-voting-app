"use server";
import db from "@/lib/prisma";

export default async function getVotingEvent() {
  try {
    const now = new Date();

    // For production: get the most recent event regardless of dates
    const event = await db.votingEvent.findFirst({
      orderBy: { createdAt: "desc" },
      include: { artworks: true },
    });

    if (!event) {
      return { success: true, event: null, status: "inactive" };
    }

    // Check if event is actually active based on dates
    const isActive = event.startTime <= now && now <= event.endTime;

    return {
      success: true,
      event,
      status: isActive ? "active" : "inactive",
    };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}
