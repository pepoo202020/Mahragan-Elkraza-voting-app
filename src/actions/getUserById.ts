"use server";
import db from "@/lib/prisma";

export default async function getUserById(userId: string) {
  if (!userId) {
    return null;
  }

  try {
    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        votes: true,
        comments: true,
      },
    });

    return user;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    return null;
  }
}