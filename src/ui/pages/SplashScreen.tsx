"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Cross, Sparkles } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

interface ISplashScreenProp {
  redirectPageName: string;
}

export const SplashScreen = ({ redirectPageName }: ISplashScreenProp) => {
  const router = useRouter();
  const { t } = useLanguage();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push(`/${redirectPageName}`); // Navigate to the arts gallery page
    }, 3000); // A bit longer to appreciate the beauty

    return () => clearTimeout(timer); // Cleanup the timer
  }, [router, redirectPageName]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-rose-50 to-stone-100 relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        className="absolute inset-0 opacity-10"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          backgroundImage:
            "radial-gradient(circle at top left, rgba(212, 175, 55, 0.1), transparent 40%), radial-gradient(circle at bottom right, rgba(212, 175, 55, 0.1), transparent 40%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 text-center">
        {/* Logo Area */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="mb-10 p-6 rounded-full bg-white/80 backdrop-blur-md shadow-2xl border border-amber-200/50"
        >
          <div className="relative">
            <Cross
              className="w-16 h-16 sm:w-20 sm:h-20 text-amber-700 drop-shadow-lg"
              strokeWidth={1}
              aria-label="Christian Cross Icon"
            />
            <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-amber-400 opacity-80" />
          </div>
        </motion.div>

        {/* Welcome Message */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-4xl sm:text-5xl md:text-6xl font-extralight mb-5 text-stone-800 tracking-tight"
        >
          {t("splashScreenWelcome")}
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-6 bg-gradient-to-r from-amber-800 via-amber-600 to-stone-700 bg-clip-text text-transparent"
        >
          {t("appName")}
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="text-base sm:text-lg text-stone-600 mb-12 max-w-md md:max-w-lg leading-relaxed"
        >
          {t("subtitle")}
        </motion.p>

        {/* Loading Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.5 }}
          className="mt-16 flex items-center space-x-3 text-stone-500"
        >
          <motion.div
            className="w-2 h-2 bg-amber-400 rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <p className="text-sm font-light">{t("splashScreenAction")}</p>
        </motion.div>

        {/* Bottom verse */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="absolute bottom-6 text-xs sm:text-sm text-stone-500/80 italic font-light"
        >
          &quot;{t("verse")}&quot;
        </motion.div>
      </div>
    </div>
  );
};
