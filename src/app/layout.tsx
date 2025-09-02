import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import Providers from "@/ui/providers/providers";

const cairo = Cairo({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Church Artwork Voting App",
  description:
    "A modern web platform for church communities to showcase artistic creations, enable secure voting, and foster engagement through comments. Admins can manage submissions and view analytics, while visitors enjoy a beautiful, responsive gallery and a seamless voting experience—all powered by Next.js, Prisma, and PostgreSQL.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body className={`${cairo.className} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
