"use client";
import React from "react";
import { ThemeProvider } from "./theme-provider";
import { LanguageProvider } from "../contexts/LanguageContext";
import { Toaster } from "@/components/ui/sonner";
import { SessionProvider } from "next-auth/react";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <LanguageProvider>
          {children}
          <Toaster richColors position="bottom-right" />
        </LanguageProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
