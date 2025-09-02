import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { LanguageType } from "@/ui/contexts/LanguageContext";

interface ISharedSelectItemProps {
  language: LanguageType;
  value: string;
  onValueChange: (value: string) => void;
  options: { value: string; label: { en: string; ar: string } }[];
}

export const SharedSelectItem = ({
  language,
  value,
  onValueChange,
  options,
}: ISharedSelectItemProps) => {
  return (
    <Select
      dir={language === "en" ? "ltr" : "rtl"}
      value={value}
      onValueChange={onValueChange}
    >
      <SelectTrigger className="w-full sm:w-32">
        <SelectValue placeholder="Year" />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label[language]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
