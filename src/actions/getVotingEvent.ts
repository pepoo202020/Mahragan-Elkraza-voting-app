"use server";
import db from "@/lib/prisma";

export default async function getVotingEvent() {
  try {
    const now = new Date();

    const event = await db.votingEvent.findFirst({
      where: {
        startTime: { lte: now },
        endTime: { gte: now },
      },
      include: { artworks: true },
    });

    // If no active event found, get the most recent event for testing
    if (!event) {
      const recentEvent = await db.votingEvent.findFirst({
        orderBy: { createdAt: "desc" },
        include: { artworks: true },
      });
      return { success: true, event: recentEvent, status: "inactive" };
    }

    return { success: true, event, status: "active" };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}
