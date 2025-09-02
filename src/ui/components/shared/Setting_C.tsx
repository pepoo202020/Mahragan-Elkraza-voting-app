import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LanguageType, TranslationKeys } from "@/ui/contexts/LanguageContext";
import { Globe, Moon, Settings, Sun } from "lucide-react";

interface ISetting_CProps {
  language: LanguageType;
  t: (key: TranslationKeys) => string;
  theme: string | undefined;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
  toggleLanguage: () => void;
}

export const Setting_C = ({
  language,
  t,
  theme,
  setTheme,
  toggleLanguage,
}: ISetting_CProps) => {
  return (
    <DropdownMenu dir={language === "ar" ? "rtl" : "ltr"}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align={language === "ar" ? "start" : "end"}
        className="w-48"
      >
        <DropdownMenuItem
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="flex items-center gap-2"
        >
          {theme === "light" ? (
            <Moon className="h-4 w-4" />
          ) : (
            <Sun className="h-4 w-4" />
          )}
          {theme === "light" ? t("darkMode") : t("lightMode")}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={toggleLanguage}
          className="flex items-center gap-2"
        >
          <Globe className="h-4 w-4" />
          {language === "en" ? t("switchToArabic") : t("switchToEnglish")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
