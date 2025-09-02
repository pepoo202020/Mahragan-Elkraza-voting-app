"use server";
import db from "@/lib/prisma";

export default async function deleteUser(userId: string) {
  try {
    // First delete all votes associated with this user
    await db.vote.deleteMany({ where: { userId } });
    
    // Delete all comments associated with this user
    await db.comment.deleteMany({ where: { userId } });
    
    // Then delete the user
    await db.user.delete({ where: { id: userId } });
    
    return { success: true };
  } catch (error) {
    console.error("deleteUser error:", error);
    return { success: false, error: "DELETE_FAILED" as const };
  }
}