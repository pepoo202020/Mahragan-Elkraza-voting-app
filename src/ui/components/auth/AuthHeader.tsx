"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/ui/contexts/LanguageContext";
import { Globe, Moon, Settings, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export const AuthHeader = () => {
  const { setTheme, theme } = useTheme();
  const { language, toggleLanguage } = useLanguage();

  return (
    <header
      dir={language === "ar" ? "rtl" : "ltr"}
      className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm"
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Loog */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">C</span>
            </div>
            <h1 className="text-lg lg:text-xl font-bold text-foreground">
              {language === "en"
                ? "Church Artwork Voting App"
                : "تطبيق التصويت على الأعمال الفنية"}
            </h1>
          </div>
          {/* Profile & Settings */}
          <div className="flex items-center gap-2">
            {/* Settings */}
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
                  {theme === "light"
                    ? language === "en"
                      ? "Dark Mode"
                      : "الوضع الداكن"
                    : language === "en"
                    ? "Light Mode"
                    : "الوضع الفاتح"}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={toggleLanguage}
                  className="flex items-center gap-2"
                >
                  <Globe className="h-4 w-4" />
                  {language === "en" ? "العربية" : "English"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};
