"use client";
import { useState } from "react";
import { useTheme } from "next-themes";
import { useLanguage } from "@/ui/contexts/LanguageContext";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Logo_C } from "./Logo_C";
import { Profile_C } from "../../shared/Profile_C";
import { Setting_C } from "../../shared/Setting_C";
import { ProfileModal } from "../ProfileModal";

export const GalleryHeader = () => {
  const { setTheme, theme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();
  const { data: session } = useSession();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);
  const user = session?.user;
  const router = useRouter();

  const handleSignOut = () => {
    signOut();
  };

  return (
    <header
      dir={language === "ar" ? "rtl" : "ltr"}
      className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm"
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Logo_C t={t} />
          {/* Profile & Settings */}
          <div className="flex items-center gap-2">
            <Profile_C
              dashboard={false}
              user={user}
              language={language}
              t={t}
              router={router}
              setIsProfileModalOpen={setIsProfileModalOpen}
              handleSignOut={handleSignOut}
            />
            {/* Settings */}
            <Setting_C
              language={language}
              t={t}
              theme={theme}
              setTheme={setTheme}
              toggleLanguage={toggleLanguage}
            />
          </div>
        </div>
      </div>
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        email={user?.email!}
        language={language}
        t={t}
      />
    </header>
  );
};
