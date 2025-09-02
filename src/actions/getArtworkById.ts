"use server";
import db from "@/lib/prisma";

export default async function getArtworkById(artworkId: string) {
  try {
    const artwork = await db.artwork.findUnique({
      where: { id: artworkId },
      include: {
        votes: true,
        lovedBy: true,
      },
    });

    if (!artwork) {
      return { success: false, message: "Artwork not found" };
    }

    return { success: true, artwork };
  } catch (error) {
    console.error("Error fetching artwork:", error);
    return { success: false, message: "Failed to fetch artwork" };
  }
}