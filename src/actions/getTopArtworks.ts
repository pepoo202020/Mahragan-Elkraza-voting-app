"use server";
import db from "@/lib/prisma";

export default async function getTopArtworks() {
  const topArtworks = await db.artwork.findMany({
    include: { lovedBy: true },
    orderBy: { lovedBy: { _count: "desc" } },
    take: 10,
  });

  return topArtworks;
}
