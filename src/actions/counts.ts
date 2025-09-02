"use server";

import db from "@/lib/prisma";

export const artworkCount = async () => {
  return await db.artwork.count();
};

export const userCount = async () => {
  return await db.user.count();
};
export const voteCount = async () => {
  return await db.vote.count();
};

export const eventCount = async () => {
  return await db.votingEvent.count();
};
