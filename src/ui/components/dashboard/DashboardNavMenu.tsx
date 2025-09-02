"use client";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/ui/contexts/LanguageContext";
import { Home, Users, Image, BarChart3 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
const menuItems = [
  {
    id: "overview",
    label: { en: "Overview", ar: "نظرة عامة" },
    icon: Home,
    href: "/dashboard",
  },
  {
    id: "artworks",
    label: { en: "Artworks", ar: "الاعمال" },
    icon: Image,
    href: "/dashboard/artworks",
  },
  {
    id: "users",
    label: { en: "Users", ar: "المستخدمين" },
    icon: Users,
    href: "/dashboard/users",
  },
  {
    id: "events",
    label: { en: "Votes Events", ar: "احداث التصويت" },
    icon: BarChart3,
    href: "/dashboard/votes",
  },
];

export const DashboardNavMenu = () => {
  const pathname = usePathname();
  const { language } = useLanguage();
  return (
    <div className="sticky bottom-0 inset-x-0 bg-black/50 h-16 border-t border-border px-6 flex items-center justify-between overflow-x-auto overflow-y-hidden">
      {menuItems.map((item) => (
        <Link
          href={item.href}
          key={item.id}
          className={cn(
            "w-full justify-center flex flex-col items-center  py-3 rounded-lg transition-all duration-200",
            "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
            pathname === item.href
              ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
              : "text-sidebar-foreground"
          )}
        >
          <item.icon className="w-5 h-5 shrink-0" />
          <span className="text-xs font-medium">{item.label[language]}</span>
        </Link>
      ))}
    </div>
  );
};
