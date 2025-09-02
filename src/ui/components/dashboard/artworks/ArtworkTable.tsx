import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LanguageType, TranslationKeys } from "@/ui/contexts/LanguageContext";
import { IArtworksWithVotes, ITableHeadRow } from "@/ui/types/types";
import { ImageIcon, Loader2 } from "lucide-react";
import { Avatar_C } from "../../shared/Avatar_C";
import { Badge } from "@/components/ui/badge";
import SharedDropdownMenu from "../../shared/SharedDropdownMenu";
import { Eye, Edit, Trash2 } from "lucide-react";
import DataShow from "../DataShow";

interface IArtworkDataShowProps {
  t: (key: TranslationKeys) => string;
  filteredArtworks: IArtworksWithVotes[];
  isLoading: boolean;
  handleViewArtworkDetails: (value: string) => void;
  handleEditArtwork: (value: string) => void;
  handleDeleteArtwork: (value: IArtworksWithVotes) => void;
  language: LanguageType;
}

export default function ArtworkDataShow({
  t,
  filteredArtworks,
  isLoading,
  handleViewArtworkDetails,
  handleEditArtwork,
  handleDeleteArtwork,
  language,
}: IArtworkDataShowProps) {
  const artworkTableHeadRows: ITableHeadRow[] = [
    { title: t("image"), className: "w-[60px] align-middle" },
    { title: t("title"), className: "align-middle" },
    { title: t("artist"), className: "align-middle" },
    { title: t("year"), className: "align-middle" },
    { title: t("category"), className: "align-middle" },
    { title: t("votes"), className: "align-middle" },
    { title: t("actions"), className: "w-[80px] align-middle" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ImageIcon className="w-5 h-5" />
          {t("artworks")} ({filteredArtworks.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2 text-muted-foreground">
              {t("loadingArtworks")}
            </span>
          </div>
        ) : filteredArtworks.length > 0 ? (
          <div className="rounded-md border">
            <DataShow<IArtworksWithVotes>
              language={language}
              headRows={artworkTableHeadRows}
              data={filteredArtworks}
              keyExtractor={(artwork) => artwork.id}
              renderCells={(artwork) => [
                <div key="image" className="flex items-center justify-center">
                  <Avatar_C
                    image={artwork.images[0]}
                    name={artwork.author}
                    table
                  />
                </div>,
                <div key="title" className="font-medium">
                  {artwork.title}
                </div>,
                <div key="author" className="align-middle">
                  {artwork.author}
                </div>,
                <div key="year" className="align-middle">
                  {artwork.year}
                </div>,
                <Badge key="type" variant="outline" className="align-middle">
                  {artwork.type}
                </Badge>,
                <span key="votes" className="font-mono align-middle">
                  {artwork.votes.length}
                </span>,
              ]}
              renderActions={(artwork) => (
                <div className="flex justify-center">
                  <SharedDropdownMenu
                    menuItems={[
                      {
                        label: t("viewDetails"),
                        icon: <Eye className="h-4 w-4" />,
                        onClick: () => handleViewArtworkDetails(artwork.id),
                      },
                      {
                        label: t("edit"),
                        icon: <Edit className="h-4 w-4" />,
                        onClick: () => handleEditArtwork(artwork.id),
                      },
                      {
                        label: t("delete"),
                        icon: <Trash2 className="h-4 w-4" />,
                        className: "text-destructive",
                        onClick: () => handleDeleteArtwork(artwork),
                      },
                    ]}
                  />
                </div>
              )}
            />
          </div>
        ) : (
          <p className="text-center text-muted-foreground">
            {t("noArtworksFound")}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
