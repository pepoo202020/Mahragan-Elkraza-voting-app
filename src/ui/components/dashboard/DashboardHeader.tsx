"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/ui/contexts/LanguageContext";
import { BarChart3, Globe, Moon, Search, Sun } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";

export const DashboardHeader = () => {
  const { setTheme, theme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();
  const { data: session } = useSession();
  const user = session?.user;
  const router = useRouter();

  const handleLogout = () => {
    signOut({ callbackUrl: "/gallery" });
  };

  return (
    <header className="sticky inset-0 z-5 bg-black/50 h-16 border-b border-border px-6 flex items-center justify-between">
      {/* Logo Section */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-700 rounded-lg flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-sidebar-primary-foreground" />
          </div>
        </div>
      </div>
      {/* Search Bar */}
      <div className="flex items-center gap-4 flex-1 max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder={t("dashboardHeaderSearchPlaceholder")}
            className="pl-10 bg-background border-border"
          />
        </div>
      </div>
      {/* Right Side */}
      <div className="flex items-center gap-4 pl-2">
        {/* Admin Profile */}
        <DropdownMenu dir={language === "ar" ? "rtl" : "ltr"}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              {/* User Image */}
              <Avatar>
                <AvatarImage src={user?.image!} />
                {/* get first character of each name */}
                <AvatarFallback>{user?.name?.split(" ")[0][0]}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align={language === "ar" ? "start" : "end"}>
            <div className="flex flex-col space-y-1 p-2">
              <p className="text-sm font-medium leading-none">{user?.name}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {user?.email}
              </p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push("/gallery")}>
              {t("gallery")}
            </DropdownMenuItem>
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
              {language === "en" ? "العربية" : "English"}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>
              {t("logout")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
