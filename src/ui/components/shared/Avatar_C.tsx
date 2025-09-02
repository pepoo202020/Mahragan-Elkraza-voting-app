import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface IAvatar_CProps {
  image: string;
  name: string;
  header?: boolean;
  artWork?: boolean;
  table?: boolean;
}

export const Avatar_C = ({
  image,
  name,
  header = false,
  artWork = false,
  table = false,
}: IAvatar_CProps) => {
  return (
    <Avatar
      className={cn(
        header ? "w-8 h-8" : "w-24 h-24",
        artWork && "w-8 h-8",
        table && "w-10 h-10 rounded-md"
      )}
    >
      <AvatarImage src={image} />
      <AvatarFallback>{name.charAt(0)}</AvatarFallback>
    </Avatar>
  );
};
