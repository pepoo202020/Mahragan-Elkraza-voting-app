"use client";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LanguageType, TranslationKeys } from "@/ui/contexts/LanguageContext";
import { TArtwork, TUser } from "@/ui/types/types";
import { Eye } from "lucide-react";
import { useEffect, useState } from "react";

interface ArtworkWithLovedBy extends TArtwork {
  lovedBy: TUser[];
}

interface ITopVotedArtworksProps {
  t: (key: TranslationKeys) => string;
  artworks: ArtworkWithLovedBy[];
  years: string[];
  lang: LanguageType;
}

export const TopVotedArtworks = ({
  t,
  lang,
  artworks,
  years,
}: ITopVotedArtworksProps) => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState<string>(
    currentYear.toString()
  );

  const [filteredArtworks, setFilteredArtworks] = useState(artworks);
  useEffect(() => {
    const filtered = artworks.filter((artwork) => {
      if (selectedYear === "all") {
        return true;
      }

      // Otherwise, only show artworks from the selected year
      return artwork.year.toString() === selectedYear;
    });

    setFilteredArtworks(filtered);
  }, [selectedYear, currentYear]);
  return (
    <Card className="max-h-[480px] overflow-y-auto mb-1">
      <CardHeader>
        <CardTitle className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Eye className="w-5 h-5" />
            {t("topVotedArtworks")}
          </div>
          <div>
            {/* Year Selection */}
            <Select
              dir={lang === "en" ? "ltr" : "rtl"}
              value={selectedYear}
              onValueChange={setSelectedYear}
            >
              <SelectTrigger className="w-full sm:w-32">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("allYears")}</SelectItem>
                {years.reverse().map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardTitle>
        <CardDescription>{t("mostPopularArtworks")}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 ">
        {filteredArtworks.length > 0 ? (
          filteredArtworks.map((artwork, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-muted rounded flex items-center justify-center text-sm font-bold">
                  #{index + 1}
                </div>
                <div>
                  <p className="font-medium text-sm">{artwork.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {t("by")} {artwork.author}
                  </p>
                </div>
              </div>
              <Badge variant="outline" className="font-mono">
                {artwork.loves} {t("loves")}
              </Badge>
            </div>
          ))
        ) : (
          <p className="text-center">
            {t("doesNotHaveAnyRecordsYetInThisYear")}
          </p>
        )}
      </CardContent>
    </Card>
  );
};
