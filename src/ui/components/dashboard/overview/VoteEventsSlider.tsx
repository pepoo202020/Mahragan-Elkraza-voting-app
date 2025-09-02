import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Edit, Trash2 } from "lucide-react";
import { BiSolidParty } from "react-icons/bi";
import React from "react";

interface IVoteEventSliderProps {
  events: {
    title: string;
    id: string;
    numberOfVotes: number;
    description: string;
    year: string;
    currentEvent: boolean;
    active: boolean;
  }[];
  onEventSelect: (id: string) => void;
  onEventEdit: (id: string) => void;
  onEventDelete?: (id: string) => void;
}

export default function VoteEventsSlider({
  events,
  onEventSelect,
  onEventEdit,
  onEventDelete,
}: IVoteEventSliderProps) {
  return (
    <div className="py-2  flex items-center justify-start gap-3 hover:overflow-x-auto overflow-x-hidden max-w-7xl">
      {events.map((event) => (
        <Card
          className={cn(
            "transition-all duration-200 hover:shadow-md cursor-pointer hover:border-blue-400 h-[170px]",
            event.active && "border-blue-500"
          )}
          key={event.id}
          onClick={() => onEventSelect(event.id)}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
            <CardTitle className="text-sm font-medium">{event.title}</CardTitle>
            <div className="flex items-center justify-end gap-2">
              <BiSolidParty className="h-4 w-4 text-muted-foreground" />
              <Edit
                className="h-4 w-4 text-muted-foreground hover:text-blue-500"
                onClick={(e) => {
                  e.stopPropagation();
                  onEventEdit(event.id);
                }}
              />
              {onEventDelete && (
                <Trash2
                  className="h-4 w-4 text-muted-foreground hover:text-red-500"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEventDelete(event.id);
                  }}
                />
              )}
            </div>
          </CardHeader>
          <CardContent className="w-[200px] relative end-0">
            <div className="text-2xl font-bold">{event.numberOfVotes}</div>
            <div className="flex justify-between items-center">
              <p className="text-xs text-muted-foreground">{event.year}</p>
              <div
                className={cn(
                  "text-xs px-1 rounded font-bold",
                  event.currentEvent
                    ? "bg-green-800 text-white"
                    : "bg-red-800 text-white"
                )}
              >
                {event.currentEvent ? "active" : "inactive"}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
