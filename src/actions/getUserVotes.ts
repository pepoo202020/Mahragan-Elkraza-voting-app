"use server";
import db from "@/lib/prisma";

export default async function getUserVotes(userEmail: string) {
  try {
    const event = await db.votingEvent.findFirst({
      where: { startTime: { lte: new Date() }, endTime: { gte: new Date() } },
    });
    if (!event) {
      return { success: false, message: "no active event" };
    }
    const user = await db.user.findUnique({ where: { email: userEmail } });
    if (!user) {
      return { success: false, message: "user not found" };
    }
    const votes = await db.vote.findMany({
      where: { userId: user.id, votingEventId: event.id },
      select: { category: true },
    });
    if (!votes) {
      return { success: false, message: "no votes found" };
    }
    return { success: true, votes: votes };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}
