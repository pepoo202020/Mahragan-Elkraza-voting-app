import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TranslationKeys } from "@/ui/contexts/LanguageContext";
import { Eye } from "lucide-react";
import { IArtworksWithVotes } from "@/ui/types/types";

interface ITopArtworksProps {
  t: (key: TranslationKeys) => string;
  artworks: IArtworksWithVotes[];
}

export const TopArtworks = ({ t, artworks }: ITopArtworksProps) => {
  return (
    <Card className="max-h-[480px] overflow-y-auto mb-1">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Eye className="w-5 h-5" />
          {t("topLovedArtworks")}
        </CardTitle>
        <CardDescription>{t("mostPopularArtworks")}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {artworks.map((artwork, index) => (
          <div
            key={artwork.id}
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
              {artwork.votes.length} {t("votes")}
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
