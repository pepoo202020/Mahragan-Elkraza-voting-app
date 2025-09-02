import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LanguageType, TranslationKeys } from "@/ui/contexts/LanguageContext";
import { TCategoryFilter } from "@/ui/types/types";
import { ArtworkType } from "@prisma/client";
import { Search } from "lucide-react";
import { SharedSelectItem } from "../../shared/SharedSelectItem";

interface IFilterArtworkProps {
  t: (key: TranslationKeys) => string;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  categoryFilter: TCategoryFilter;
  setCategoryFilter: (value: TCategoryFilter) => void;
  yearFilter: string;
  setYearFilter: (value: string) => void;
  yearsAvailable: { year: string }[];
  language: LanguageType;
}

export default function FilterArtwork({
  t,
  searchTerm,
  setSearchTerm,
  categoryFilter,
  setCategoryFilter,
  yearFilter,
  setYearFilter,
  yearsAvailable,
  language,
}: IFilterArtworkProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex gap-4 flex-wrap">
          {/* Search */}
          <div className="flex-1 min-w-[300px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder={t("searchArtworksOrArtists")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <SharedSelectItem
            language={language}
            onValueChange={(value) =>
              setCategoryFilter(value as TCategoryFilter)
            }
            options={[
              { value: "all", label: { en: "All", ar: "جميع الفئات" } },
              {
                value: `${ArtworkType.INDIVIDUAL}`,
                label: { en: "Individual", ar: " فرد" },
              },
              {
                value: `${ArtworkType.GROUP}`,
                label: { en: "Group", ar: " مجموعة" },
              },
            ]}
            value={categoryFilter}
          />

          <SharedSelectItem
            language={language}
            onValueChange={setYearFilter}
            options={[
              { value: "all", label: { en: "All", ar: "جميع الفئات" } },
              ...yearsAvailable.map((year) => ({
                value: year.year,
                label: { en: year.year, ar: year.year },
              })),
            ]}
            value={yearFilter}
          />
        </div>
      </CardContent>
    </Card>
  );
}
