"use server";
import db from "@/lib/prisma";

export default async function getVotingEvent() {
  try {
    const now = new Date();
    const event = await db.votingEvent.findFirst({
      where: { startTime: { lte: now }, endTime: { gte: now } },
      include: { artworks: true },
    });
    return { success: true, event, status: event ? "active" : "inactive" };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}
