"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Heart, Play } from "lucide-react";
import Image from "next/image";
import { Avatar_C } from "../shared/Avatar_C";
import { TArtwork } from "@/ui/types/types";
import { useRef, useState } from "react";
import { Session } from "next-auth";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useLanguage } from "@/ui/contexts/LanguageContext";

interface IArtWorkCardProps {
  artwork: TArtwork;
  onLove: (artworkId: string) => void;
  isLoved?: boolean;
  session: Session | null;
}
export const ArtWorkCard = ({
  artwork,
  onLove,
  isLoved,
  session,
}: IArtWorkCardProps) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [videoDialogOpen, setVideoDialogOpen] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const images = artwork.images;
  const { t } = useLanguage();

  const goPrev = () => setCurrentIndex((i) => Math.max(i - 1, 0));
  const goNext = () =>
    setCurrentIndex((i) => Math.min(i + 1, images.length - 1));

  const handlePlayVideo = () => {
    setVideoDialogOpen(true);
  };

  const handleDialogClose = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setVideoDialogOpen(false);
  };
  return (
    <>
      <Card
        className="overflow-hidden hover:shadow-lg transition-all duration-300 animate-fade-in border-border/50 w-full"
        style={{ animationDelay: `${Number(artwork.id) - 1 * 100}ms` }}
      >
        {/* Artist Name and image  */}
        <div className="flex items-center justify-between px-5">
          {/* Name And Image Of User */}
          <div className="flex items-center gap-2">
            {/* User Image */}
            <Avatar_C
              image="https://github.com/shadcn.png"
              name={artwork.author.slice(0, 2)}
              artWork={true}
            />

            {/* User Name */}
            <div className="flex flex-col">
              <h1 className="font-bold text-sm">{artwork.author}</h1>
              <h5 className="font-normal text-xs text-gray-500">
                {artwork.members
                  ? `${artwork.members.map(
                      (member) => ` ${member.toUpperCase()} `
                    )}   ${artwork.year}`
                  : `${artwork.year}`}
              </h5>
            </div>
          </div>
        </div>
        {/* Artwork Image/Video Slider */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            layout="fill"
            src={images[currentIndex]}
            alt={artwork.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          {images.length > 1 && (
            <>
              <Button
                size="icon"
                variant="ghost"
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10"
                onClick={goPrev}
                disabled={currentIndex === 0}
              >
                <ChevronLeft />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10"
                onClick={goNext}
                disabled={currentIndex === images.length - 1}
              >
                <ChevronRight />
              </Button>
            </>
          )}
          {artwork.video && (
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <Button
                size="icon"
                variant="secondary"
                className="rounded-full bg-white/90"
                onClick={handlePlayVideo}
              >
                <Play className="h-5 w-5 ml-0.5" />
              </Button>
            </div>
          )}
          <Badge
            variant="secondary"
            className="absolute top-2 right-2 bg-background/90"
          >
            {artwork.type}
          </Badge>
        </div>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg leading-tight">
            {artwork.title}
          </CardTitle>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{artwork.createdAt.toLocaleDateString()}</span>
            {/* Love Button */}
            <div className="flex items-center gap-2">
              {session?.user?.email ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onLove(artwork.id)}
                  className={`flex items-center gap-2 transition-colors ${
                    isLoved
                      ? "bg-red-500 dark:bg-red-800 text-white border-red-500 hover:bg-red-600"
                      : "hover:bg-destructive/10 hover:text-destructive hover:border-destructive/50"
                  }`}
                >
                  <Heart
                    className={`h-4 w-4 ${isLoved ? "fill-current" : ""}`}
                  />
                  {t("loves")} ({artwork.loves})
                </Button>
              ) : (
                <div
                  className={`flex items-center gap-2 transition-colors
                }`}
                >
                  <Heart
                    className={`h-4 w-4 ${isLoved ? "fill-current" : ""}`}
                  />
                  {t("loves")} ({artwork.loves})
                </div>
              )}
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Video Dialog */}
      {artwork.video && (
        <Dialog open={videoDialogOpen} onOpenChange={handleDialogClose}>
          <DialogContent className="sm:max-w-[800px] max-h-[90vh] p-0 overflow-hidden">
            <div className="relative w-full aspect-video">
              <iframe
                src={artwork.video.replace("watch?v=", "embed/")}
                className="w-full h-full"
                title={artwork.title}
                allowFullScreen
              ></iframe>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};
