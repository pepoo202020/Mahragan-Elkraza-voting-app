"use server";
import db from "@/lib/prisma";
import { ArtworkType } from "@prisma/client";

export default async function AddNewArtwork(data: {
  title: string;
  author: string;
  type: string;
  description: string;
  members: string[];
  images: string[];
  video: string;
  year: string;
}) {
  try {
    const newArtwork = await db.artwork.create({
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

    return { success: true, artwork: newArtwork };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}
