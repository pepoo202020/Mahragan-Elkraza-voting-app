// src/actions/createVotingEvent.ts
"use server";
import db from "@/lib/prisma";
import { CreateEventInput } from "@/schemas/create-event";
import { revalidatePath } from "next/cache";

export default async function createVotingEvent(formData: CreateEventInput) {
  const {
    name,
    votingStartTime,
    votingEndTime,
    description,
    year,
    artworkIds,
  } = formData;
  // Validate artworkIds
  if (!Array.isArray(artworkIds) || artworkIds.length === 0) {
    throw new Error("Invalid input: artworkIds must be a non-empty array");
  }

  const event = await db.votingEvent.create({
    data: {
      // Adjust field names as per your schema
      title: name,
      description,
      startTime: new Date(votingStartTime),
      endTime: new Date(votingEndTime),
      year: parseInt(year, 10),
      artworks: {
        connect: artworkIds.map((id) => ({ id })),
      },
    },
  });

  revalidatePath("/dashboard/votes");

  return { event };
}
