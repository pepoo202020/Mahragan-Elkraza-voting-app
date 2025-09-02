"use server";
import db from "@/lib/prisma";

export default async function getYearsAvailable() {
  const allYears = await db.artwork.findMany({
    distinct: ["year"],
    select: { year: true },
    orderBy: { year: "desc" },
  });

  return allYears.map((y) => y.year);
}
