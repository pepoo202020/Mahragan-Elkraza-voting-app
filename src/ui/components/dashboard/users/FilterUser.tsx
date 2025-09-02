import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { LanguageType, TranslationKeys } from "@/ui/contexts/LanguageContext";
import { Search } from "lucide-react";
import { SharedSelectItem } from "../../shared/SharedSelectItem";
import { Role } from "@prisma/client";

interface IFilterUserProps {
  t: (key: TranslationKeys) => string;
  language: LanguageType;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  roleFilter: string;
  setRoleFilter: (value: Role | "all") => void;
}

export default function FilterUser({
  t,
  language,
  searchTerm,
  setSearchTerm,
  roleFilter,
  setRoleFilter,
}: IFilterUserProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex gap-4 flex-wrap">
          <div className="flex-1 min-w-[300px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder={t("searchUsers")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <SharedSelectItem
            language={language}
            onValueChange={(value) => setRoleFilter(value as Role | "all")}
            options={[
              { value: "all", label: { en: "All Roles", ar: "جميع الأدوار" } },
              { value: `${Role.ADMIN}`, label: { en: "Admin", ar: "مسؤول" } },
              { value: `${Role.USER}`, label: { en: "User", ar: "مستخدم" } },
            ]}
            value={roleFilter}
          />
        </div>
      </CardContent>
    </Card>
  );
}
