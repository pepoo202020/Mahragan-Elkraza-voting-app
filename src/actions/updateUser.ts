"use server";
import db from "@/lib/prisma";

export default async function updateUser(
  email: string,
  data: Partial<{ name: string; bio: string; image: string }>
) {
  try {
    const updatedUser = await db.user.update({
      where: {
        email,
      },
      data: data,
    });
    return { success: true, user: updatedUser };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}
