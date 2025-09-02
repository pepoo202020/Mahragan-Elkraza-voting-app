import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { ReactNode } from "react";

interface IMenuItem {
  label: string;
  icon?: ReactNode;
  className?: string;
  onClick: () => void;
}

interface ISharedDropdownMenuProps {
  menuItems: IMenuItem[];
  triggerIcon?: ReactNode;
  triggerClassName?: string;
  contentAlign?: "start" | "center" | "end";
  contentClassName?: string;
}

export default function SharedDropdownMenu({
  menuItems,
  triggerIcon = <MoreHorizontal className="w-4 h-4" />,
  triggerClassName = "ghost",
  contentAlign = "end",
  contentClassName = "",
}: ISharedDropdownMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={triggerClassName as any} size="icon">
          {triggerIcon}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={contentAlign} className={contentClassName}>
        {menuItems.map((item, index) => (
          <DropdownMenuItem
            key={index}
            className={item.className}
            onClick={item.onClick}
          >
            {item.icon && <span className="mr-2">{item.icon}</span>}
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
