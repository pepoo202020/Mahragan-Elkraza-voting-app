"use server";
import { sendResetCode } from "@/lib/mail";
import db from "@/lib/prisma";
import { addMinutes } from "date-fns";

export async function requestPasswordReset(email: string) {
  const user = await db.user.findUnique({ where: { email } });
  if (!user) return { error: "User not found" };

  // Generate 8-digit code
  const code = Math.floor(10000000 + Math.random() * 90000000).toString();
  const expiry = addMinutes(new Date(), 10);

  await db.user.update({
    where: { email },
    data: { resetToken: code, resetTokenExpiry: expiry },
  });

  await sendResetCode(email, code);
  // Mock send: return code for now
  return { success: true, code };
}
