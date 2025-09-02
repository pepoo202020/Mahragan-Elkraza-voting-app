// src/actions/getVotingEventDetails.ts
"use server";
import db from "@/lib/prisma";

export default async function getVotingEventDetails(eventId: string) {
  try {
    const event = await db.votingEvent.findUnique({
      where: { id: eventId },
      include: {
        artworks: true,
        votes: {
          include: {
            user: { select: { id: true, name: true, email: true } },
            artwork: { select: { id: true, title: true } },
          },
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!event) return { success: false, error: "NOT_FOUND" as const };

    return { success: true, event };
  } catch (error) {
    console.error("getVotingEventDetails error:", error);
    return { success: false, error: "FETCH_FAILED" as const };
  }
}
