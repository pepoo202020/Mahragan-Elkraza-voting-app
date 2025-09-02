import { getServerSession } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export { signIn, signOut, getServerSession as auth };
export { authOptions };
