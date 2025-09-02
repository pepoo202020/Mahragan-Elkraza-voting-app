"use server";
import db from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function resetPassword({
  email,
  newPassword,
}: {
  email: string;
  newPassword: string;
}) {
  const user = await db.user.findUnique({ where: { email } });
  if (!user) {
    return { error: "Invalid or expired token" };
  }

  const hashed = await bcrypt.hash(newPassword, 10);

  await db.user.update({
    where: { email },
    data: {
      password: hashed,
      resetToken: null,
      resetTokenExpiry: null,
    },
  });

  return { success: true };
}
