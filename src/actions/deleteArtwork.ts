"use server";
import db from "@/lib/prisma";

export default async function deleteArtwork(artworkId: string) {
  try {
    // First check if the artwork exists
    const artwork = await db.artwork.findUnique({
      where: { id: artworkId },
    });

    if (!artwork) {
      return { success: false, message: "Artwork not found" };
    }

    // Delete the artwork
    await db.artwork.delete({
      where: { id: artworkId },
    });

    return { success: true };
  } catch (error) {
    console.error("Error deleting artwork:", error);
    return { success: false, message: "Failed to delete artwork" };
  }
}