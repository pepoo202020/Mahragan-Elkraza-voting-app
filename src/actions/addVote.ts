"use server";

import db from "@/lib/prisma";
import { ArtworkType } from "../../lib/generated/prisma";

export default async function addVote(
  artworkId: string,
  category: string,
  userEmail: string
) {
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
    const existingVote = await db.vote.findFirst({
      where: {
        userId: user.id,
        votingEventId: event.id,
        category:
          category === "GROUP" ? ArtworkType.GROUP : ArtworkType.INDIVIDUAL,
      },
    });
    if (existingVote) {
      return {
        success: false,
        message: "You have already voted in this category.",
      };
    }

    await db.vote.create({
      data: {
        userId: user.id,
        artworkId,
        votingEventId: event.id,
        category:
          category === "GROUP" ? ArtworkType.GROUP : ArtworkType.INDIVIDUAL,
      },
    });
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, message: "internal server error" };
  }
}
