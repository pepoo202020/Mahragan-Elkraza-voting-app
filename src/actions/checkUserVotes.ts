"use server";
import db from "@/lib/prisma";

export default async function checkUserVotes(
  votingEventId: string,
  email: string
) {
  const user = await db.user.findUnique({ where: { email } });
  if (!user) return null;
  const votes = await db.vote.findMany({
    where: { votingEventId, userId: user.id },
  });
  return {
    individual: votes.find((v) => v.category === "INDIVIDUAL")?.artworkId,
    group: votes.find((v) => v.category === "GROUP")?.artworkId,
  };
}
