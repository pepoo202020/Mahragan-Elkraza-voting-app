import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LanguageType, TranslationKeys } from "@/ui/contexts/LanguageContext";
import { Role } from "@prisma/client";
import { User } from "lucide-react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Link from "next/link";
import { Avatar_C } from "./Avatar_C";

interface IProfile_CProps {
  user:
    | ({
        role?: string;
      } & {
        name?: string | null;
        email?: string | null;
        image?: string | null;
      })
    | undefined;
  language: LanguageType;
  t: (key: TranslationKeys) => string;
  router: AppRouterInstance;
  setIsProfileModalOpen: (value: boolean) => void;
  handleSignOut: () => void;
  dashboard: boolean;
}

export const Profile_C = ({
  user,
  language,
  t,
  router,
  setIsProfileModalOpen,
  handleSignOut,
  dashboard,
}: IProfile_CProps) => {
  return user ? (
    <DropdownMenu dir={language === "ar" ? "rtl" : "ltr"}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          {/* User Image */}
          <Avatar_C image={user.image!} name={user.name!} header={true} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={language === "ar" ? "start" : "end"}>
        <DropdownMenuItem onClick={() => setIsProfileModalOpen(true)}>
          {t("profile")}
        </DropdownMenuItem>
        {user.role === Role.ADMIN && (
          <DropdownMenuItem onClick={() => router.push("/dashboard")}>
            {t("dashboard")}
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onClick={() => handleSignOut()}>
          {t("logout")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <DropdownMenu dir={language === "ar" ? "rtl" : "ltr"}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <User className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={language === "ar" ? "start" : "end"}>
        <DropdownMenuItem>
          <Link href="/login">{t("login")}</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/register">{t("register")}</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
