import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RotateCcw } from "lucide-react";

interface ISearch_CProps {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  resetBtn: () => void;
}

export const Search_C = ({
  placeholder,
  value,
  onChange,
  resetBtn,
}: ISearch_CProps) => {
  return (
    <div className="flex gap-2 w-full lg:flex-1 lg:max-w-md">
      <Input
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e)}
        className="flex-1"
      />
      <Button
        variant="outline"
        size="icon"
        onClick={() => resetBtn}
        className="shrink-0"
      >
        <RotateCcw className="h-4 w-4" />
      </Button>
    </div>
  );
};
