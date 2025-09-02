"use client";
import { translations } from "@/lib/translation";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export type LanguageType = "en" | "ar";
export type TranslationKeys = keyof typeof translations.en;

interface LanguageContextProps {
  language: LanguageType;
  toggleLanguage: () => void;
  t: (key: TranslationKeys) => string;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(
  undefined
);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<LanguageType>("en");

  // ✅ Load saved language
  useEffect(() => {
    const saved = localStorage.getItem("lang") as LanguageType;
    if (saved) setLanguage(saved);
  }, []);

  const toggleLanguage = () => {
    setLanguage((prev) => {
      const newLang = prev === "en" ? "ar" : "en";
      localStorage.setItem("lang", newLang);
      return newLang;
    });
  };

  const t = (key: TranslationKeys) => translations[language][key] || key;

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      <div dir={language === "ar" ? "rtl" : "ltr"}>{children}</div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context)
    throw new Error("useLanguage must be used within a LanguageProvider");
  return context;
};
