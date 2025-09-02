"use server";
import db from "@/lib/prisma";
import { ArtworkType } from "../../lib/generated/prisma";

export default async function updateArtwork(
  artworkId: string,
  data: {
    title: string;
    author: string;
    type: string;
    description: string;
    members: string[];
    images: string[];
    video: string;
    year: string;
  }
) {
  try {
    // Check if artwork exists
    const existingArtwork = await db.artwork.findUnique({
      where: { id: artworkId },
    });

    if (!existingArtwork) {
      return { success: false, message: "Artwork not found" };
    }

    // Update the artwork
    const updatedArtwork = await db.artwork.update({
      where: { id: artworkId },
      data: {
        title: data.title,
        author: data.author,
        type:
          data.type === "INDIVIDUAL"
            ? ArtworkType.INDIVIDUAL
            : ArtworkType.GROUP,
        description: data.description,
        members: data.members,
        images: data.images,
        video: data.video,
        year: data.year,
      },
    });

    return { success: true, artwork: updatedArtwork };
  } catch (error) {
    console.error("Error updating artwork:", error);
    return { success: false, message: "Failed to update artwork" };
  }
}
