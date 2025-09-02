import { IAllYears } from "../types/types";

export const getAllYears = (years: string[]): IAllYears[] => {
  const customizedYears = [
    { value: "all", label: { en: "All Years", ar: "كل السنين" } },
    ...years.reverse().map((year) => ({
      value: year,
      label: { en: year, ar: year },
    })),
  ];
  return customizedYears;
};
