import { TranslationKeys } from "@/ui/contexts/LanguageContext";
import { Search_C } from "../../shared/Search_C";
import AddNewEventVoteDialog from "../../Vote/AddNewEventVoteDialog";
import { VotingEvent } from "@prisma/client";

interface IVoteHeaderProps {
  t: (key: TranslationKeys) => string;
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
  currentActiveEventName: string;
  onEventCreated?: (event: VotingEvent) => void;
}

export default function VoteHeader({
  t,
  searchTerm,
  setSearchTerm,
  currentActiveEventName,
  onEventCreated,
}: IVoteHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      {/* header with title and description  and search input and current event name */}
      <div>
        <h1 className="text-xl font-bold tracking-tight">
          {t("eventPageTitle")}
        </h1>
        <p className="text-muted-foreground text-sm">
          {t("eventPageDescription")}
        </p>
      </div>
      {/* search input*/}
      <div className="flex items-center justify-end gap-2">
        <Search_C
          placeholder={t("searchEventsPlaceholder")}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          resetBtn={() => setSearchTerm("")}
        />
        <div className="bg-green-800 text-white  p-2 rounded-xl shadow drop-shadow-2xl">
          {currentActiveEventName}
        </div>
        <div className="flex justify-end">
          <AddNewEventVoteDialog onEventCreated={onEventCreated} t={t} />
        </div>
      </div>
    </div>
  );
}
