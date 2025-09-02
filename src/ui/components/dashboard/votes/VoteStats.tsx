import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IconType } from "react-icons/lib";

interface IVoteStatsProps {
  stat: {
    title: string;
    icon: IconType;
    value: number;
    description: string;
  };
}

export default function VoteStats({ stat }: IVoteStatsProps) {
  return (
    <Card className="transition-all duration-200 hover:shadow-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
        <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
        <stat.icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{stat.value}</div>
        <p className="text-xs text-muted-foreground">{stat.description}</p>
      </CardContent>
    </Card>
  );
}
