"use server";
import db from "@/lib/prisma";
import { Role } from "../../lib/generated/prisma";

export default async function promoteUserToAdmin(userId: string) {
  try {
    const updatedUser = await db.user.update({
      where: { id: userId },
      data: { role: Role.ADMIN },
    });

    return { success: true, user: updatedUser };
  } catch (error) {
    console.error("promoteUserToAdmin error:", error);
    return { success: false, error: "PROMOTE_FAILED" as const };
  }
}
