import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LanguageType } from "@/ui/contexts/LanguageContext";
import { Image, Vote, Users, Calendar } from "lucide-react";
import React from "react";
interface IStatsProps {
  lang: LanguageType;
  stats: {
    totalArtworksCount: number;
    totalUsersCount: number;
    totalVotesCount: number;
    totalEventsCount: number;
  };
}

export const DashboardStats = ({ lang, stats }: IStatsProps) => {
  const statsData = [
    {
      title: { en: "Total Artworks", ar: "مجموع الأعمال الفنية" },
      value: stats.totalArtworksCount,
      icon: Image,
    },
    {
      title: { en: "Total Users", ar: "إجمالي المستخدمين" },
      value: stats.totalUsersCount,
      icon: Users,
    },
    {
      title: { en: "Total Votes", ar: "إجمالي الأصوات" },
      value: stats.totalVotesCount,
      icon: Vote,
    },
    {
      title: { en: "Total Events", ar: "إجمالي الفعاليات" },
      value: stats.totalEventsCount,
      icon: Calendar,
    },
  ];
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-5">
      {statsData.map((stat) => (
        <Card
          key={stat.title.en}
          className="transition-all duration-200 hover:shadow-md"
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
            <CardTitle className="text-sm font-medium">
              {stat.title[lang]}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
