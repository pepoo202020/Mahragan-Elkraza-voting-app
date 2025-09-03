"use server";
import db from "@/lib/prisma";
import { CreateEventInput } from "@/schemas/create-event";

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

  // Convert ISO strings to Date objects (they're already in UTC)
  const startTime = new Date(votingStartTime);
  const endTime = new Date(votingEndTime);

  const event = await db.votingEvent.create({
    data: {
      title: name,
      description,
      startTime: startTime,
      endTime: endTime,
      year: parseInt(year, 10),
      artworks: {
        connect: artworkIds.map((id) => ({ id })),
      },
    },
  });

  return { event };
}
