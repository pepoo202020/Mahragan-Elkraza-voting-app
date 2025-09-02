"use client";

import { TranslationKeys } from "@/ui/contexts/LanguageContext";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

interface IScrollToTopButtonProps {
  t: (key: TranslationKeys) => string;
}

export const ScrollToTopButton = ({ t }: IScrollToTopButtonProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 100) {
        setIsVisible(true); // Show button if scrolled down
      } else {
        setIsVisible(false); // Hide button if at top
      }
    };

    window.addEventListener("scroll", toggleVisibility); // Add scroll event listener

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-white font-medium shadow-lg transition-opacity duration-300 hover:bg-blue-600/90 cursor-pointer ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <ArrowUp className="h-6 w-6" />
      <span className="sr-only">{t("goToTop")}</span>
    </button>
  );
};
