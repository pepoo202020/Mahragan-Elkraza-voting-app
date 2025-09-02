"use server";
import db from "@/lib/prisma";

export default async function getArtworks() {
  const artworks = await db.artwork.findMany({
    take: 5,
    include: {
      votes: true,
    },
    orderBy: {
      votes: {
        _count: "desc",
      },
    },
  });

  return artworks;
}
