"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Artwork } from "@prisma/client";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { useState } from "react";

interface ISharedImageSliderProps {
  aspectRatio: "[4/3]" | "square";
  images: string[];
  artwork: Artwork;
  withVideo?: boolean;
  setVideoDialogOpen?: (value: boolean) => void;
  withBadge?: boolean;
}

export default function SharedImageSlider({
  aspectRatio,
  images,
  artwork,
  withVideo = false,
  setVideoDialogOpen,
  withBadge = false,
}: ISharedImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const goPrev = () => setCurrentIndex((i) => Math.max(i - 1, 0));
  const goNext = () =>
    setCurrentIndex((i) => Math.min(i + 1, images.length - 1));

  const handlePlayVideo = () => {
    setVideoDialogOpen?.(true);
  };
  return (
    <div className={cn("relative overflow-hidden", `aspect-${aspectRatio}`)}>
      <img
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
      {withVideo && artwork.video && (
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
      {withBadge && (
        <Badge
          variant="secondary"
          className="absolute top-2 right-2 bg-background/90"
        >
          {artwork.type}
        </Badge>
      )}
    </div>
  );
}
