import { getServerSession } from "next-auth/next";
import { signIn, signOut } from "next-auth/react";
import { authOptions } from "@/lib/authOptions";

export { signIn, signOut, getServerSession as auth };
export { authOptions };
