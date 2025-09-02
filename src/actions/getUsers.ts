"use server";
import db from "@/lib/prisma";

export default async function getUsers() {
  const users = await db.user.findMany({
    include: {
      votes: true,
      comments: true,
    },
    orderBy: { createdAt: "desc" },
    take: 10,
  });
  return users;
}
