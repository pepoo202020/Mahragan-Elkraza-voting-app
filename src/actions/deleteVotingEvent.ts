"use server";
import db from "@/lib/prisma";

export default async function deleteVotingEvent(eventId: string) {
  try {
    // First delete all votes associated with this event
    await db.vote.deleteMany({ where: { votingEventId: eventId } });

    // Then delete the event itself
    await db.votingEvent.delete({ where: { id: eventId } });

    return { success: true };
  } catch (error) {
    console.error("deleteVotingEvent error:", error);
    return { success: false, error: "DELETE_FAILED" as const };
  }
}
