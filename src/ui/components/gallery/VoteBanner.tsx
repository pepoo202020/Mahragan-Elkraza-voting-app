import { TranslationKeys } from "@/ui/contexts/LanguageContext";
import Link from "next/link";

interface IVoteBannerProps {
  t: (key: TranslationKeys) => string;
}
export const VoteBanner = ({ t }: IVoteBannerProps) => {
  return (
    <div className="relative bg-gradient-to-r from-pink-100 via-rose-200 to-amber-100 p-6 rounded-2xl shadow-lg text-center my-8">
      <h2 className="text-2xl md:text-3xl font-bold text-rose-800">
        ❤️ {t("voteBannerTitle")}
      </h2>
      <p className="mt-2 text-gray-700">{t("voteBannerParagraph")}</p>
      <Link
        href="/vote"
        className="inline-block mt-4 px-6 py-2 rounded-full bg-rose-600 text-white hover:bg-rose-700 transition"
      >
        {t("voteBannerBtn")}
      </Link>
    </div>
  );
};
