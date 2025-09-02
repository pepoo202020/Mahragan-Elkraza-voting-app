"use server";
import db from "@/lib/prisma";

export async function verifyResetCode(email: string, code: string) {
  const user = await db.user.findUnique({ where: { email } });
  if (
    !user ||
    !user.resetToken ||
    !user.resetTokenExpiry ||
    user.resetToken !== code ||
    new Date() > user.resetTokenExpiry
  ) {
    return { error: "Invalid or expired code" };
  }
  return { success: true };
}
