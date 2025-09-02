"use server";
import db from "@/lib/prisma";

export default async function getUser(email: string) {
  if (!email) {
    return null; // or throw new Error("Email is required")
  }

  const user = await db.user.findUnique({
    where: {
      email,
    },
    include: {
      votes: true,
      comments: true,
      lovedBy: true,
    },
  });

  return user;
}
