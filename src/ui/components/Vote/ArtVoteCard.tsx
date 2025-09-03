// components/ArtworkCard.tsx
import Image from "next/image";
import clsx from "clsx";
import { Artwork } from "../../../../lib/generated/prisma";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export const ArtVoteCard = ({
  art,
  selected,
  onClick,
  className,
}: {
  art: Artwork;
  selected: boolean;
  onClick: () => void;
  className?: string;
}) => {
  const [imageLoading, setImageLoading] = useState(true);
  return (
    <div
      onClick={onClick}
      className={clsx(
        "border rounded-lg p-2 cursor-pointer transition",
        selected ? "border-blue-500 ring-2 ring-blue-300" : "hover:shadow",
        className
      )}
    >
      <div className="relative w-full aspect-[3/2] rounded-md overflow-hidden">
        {imageLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}
        <Image
          src={art.images[0] || ""}
          alt={art.title}
          width={300}
          height={200}
          className={`w-full h-full object-cover rounded-md transition-opacity duration-300 ${
            imageLoading ? "opacity-0" : "opacity-100"
          }`}
          onLoadingComplete={() => setImageLoading(false)}
        />
      </div>
      <p className="mt-2 text-center">{art.title}</p>
    </div>
  );
};
