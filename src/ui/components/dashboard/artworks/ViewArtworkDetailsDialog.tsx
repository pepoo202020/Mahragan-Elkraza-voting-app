"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { LanguageType, TranslationKeys } from "@/ui/contexts/LanguageContext";
import { CalendarIcon, Heart, Users } from "lucide-react";
import { IArtworkWithDetails } from "@/ui/types/types";
import SharedImageSlider from "../../shared/sharedImageSlider";

interface ViewArtworkDetailsDialogProps {
  open: boolean;
  onClose: () => void;
  artwork: IArtworkWithDetails | null;
  language: LanguageType;
  t: (key: TranslationKeys) => string;
}

export const ViewArtworkDetailsDialog = ({
  open,
  onClose,
  artwork,
  language,
  t,
}: ViewArtworkDetailsDialogProps) => {
  if (!artwork) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        dir={language === "ar" ? "rtl" : "ltr"}
        className="max-w-3xl max-h-[90vh] overflow-y-auto"
      >
        <DialogHeader>
          <DialogTitle className="text-center">
            {t("artworkDetailsTitle")}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Image Gallery */}
          <SharedImageSlider
            artwork={artwork}
            aspectRatio="square"
            images={artwork.images}
          />

          {/* Video (if available) */}
          {artwork.video && (
            <div className="space-y-2">
              <h3 className="font-medium">{t("video")}</h3>
              <div className="aspect-video rounded-lg overflow-hidden">
                <iframe
                  src={artwork.video.replace("watch?v=", "embed/")}
                  className="w-full h-full"
                  title={artwork.title}
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}

          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm text-muted-foreground">{t("title")}</h3>
                <p className="text-lg font-medium">{artwork.title}</p>
              </div>

              <div>
                <h3 className="text-sm text-muted-foreground">{t("artist")}</h3>
                <p className="text-lg">{artwork.author}</p>
              </div>

              <div className="flex items-center gap-2">
                <Badge variant="outline">{artwork.type}</Badge>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <CalendarIcon className="w-4 h-4" />
                  <span>{artwork.year}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <Heart className="w-4 h-4 text-rose-500" />
                  <span className="font-medium">{artwork.loves}</span>
                  <span className="text-muted-foreground">{t("loves")}</span>
                </div>

                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4 text-blue-500" />
                  <span className="font-medium">{artwork.votes.length}</span>
                  <span className="text-muted-foreground">{t("votes")}</span>
                </div>
              </div>

              {/* Group Members (if applicable) */}
              {artwork.type === "GROUP" && artwork.members.length > 0 && (
                <div>
                  <h3 className="text-sm text-muted-foreground">
                    {t("groupMembers")}
                  </h3>
                  <ul className="list-disc list-inside">
                    {artwork.members.map((member, index) => (
                      <li key={index}>{member}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          {artwork.description && (
            <div className="space-y-2">
              <h3 className="font-medium">{t("description")}</h3>
              <p className="text-muted-foreground whitespace-pre-wrap">
                {artwork.description}
              </p>
            </div>
          )}

          <Separator />

          {/* Creation Info */}
          <div className="text-sm text-muted-foreground">
            <p>
              {`${t("createdOn")} ${new Date(
                artwork.createdAt
              ).toLocaleDateString()}`}
            </p>
            {artwork.createdAt.toString() !== artwork.updatedAt.toString() && (
              <p>
                {`${t("lastUpdatedOn")} ${new Date(
                  artwork.updatedAt
                ).toLocaleDateString()}`}
              </p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
