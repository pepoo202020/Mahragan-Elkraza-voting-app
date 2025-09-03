declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      role: string;
      image?: string | null;
    };
  }

  interface User {
    id: string;
    role: string;
    image?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
    picture?: string | null;
  }
}

declare module "next-auth/adapters" {
  interface AdapterUser extends User {
    id: string;
    email: string;
    emailVerified: Date | null;
    name?: string | null;
    role: string;
    image?: string | null;
  }
}
