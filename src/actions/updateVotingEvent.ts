"use server";
import db from "@/lib/prisma";
import { EditEventInput } from "@/schemas/edit-event";
import { revalidatePath } from "next/cache";

interface UpdateVotingEventParams extends EditEventInput {
  eventId: string;
}

export default async function updateVotingEvent(
  input: UpdateVotingEventParams
) {
  const {
    eventId,
    title,
    description,
    votingStartTime,
    votingEndTime,
    year,
    artworkIds,
  } = input;

  try {
    const updated = await db.votingEvent.update({
      where: { id: eventId },
      data: {
        title,
        description,
        startTime: new Date(votingStartTime),
        endTime: new Date(votingEndTime),
        year,
        ...(Array.isArray(artworkIds)
          ? {
              artworks: {
                set: artworkIds.map((id) => ({ id })),
              },
            }
          : {}),
      },
    });

    revalidatePath("/dashboard/votes");

    return { success: true, event: updated };
  } catch (error) {
    console.error("updateVotingEvent error:", error);
    return { success: false, error: "UPDATE_FAILED" as const };
  }
}
