"use server";

import db from "@/lib/prisma";
import { Role } from "@prisma/client";
import bcrypt from "bcryptjs";

export async function addNewUSer(data: {
  name: string;
  email: string;
  password: string;
  image: string;
  bio: string;
  role: string;
}) {
  const { name, email, password, image, bio, role } = data;
  const existingUser = await db.user.findUnique({
    where: {
      email,
    },
  });
  if (existingUser) {
    return { error: "Email already registered." };
  }
  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    await db.user.create({
      data: {
        email,
        password: hashedPassword,
        role: role === "USER" ? Role.USER : Role.ADMIN,
        name,
        image,
        bio,
      },
    });
    return { success: true };
  } catch (err) {
    return { error: "Create failed. Please try again.", success: false };
  }
}
