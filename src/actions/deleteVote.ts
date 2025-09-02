// src/actions/deleteVote.ts
"use server";
import db from "@/lib/prisma";

export default async function deleteVote(voteId: string) {
  try {
    await db.vote.delete({ where: { id: voteId } });
    return { success: true };
  } catch (error) {
    console.error("deleteVote error:", error);
    return { success: false, error: "DELETE_FAILED" as const };
  }
}
