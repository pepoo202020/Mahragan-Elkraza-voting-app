import { TranslationKeys } from "@/ui/contexts/LanguageContext";
import Link from "next/link";

interface INoVotingEventProps {
  t: (key: TranslationKeys) => string;
}

export default function NoVotingEvent({ t }: INoVotingEventProps) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
      <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-4">
        🎨 {t("noVoteEventTitle")}
      </h2>
      <p className="text-lg text-gray-600 max-w-md mb-6">
        {t("noVoteEventParagraph")}
      </p>
      <Link href="/gallery">
        <button className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">
          🔙 {t("noVoteEventBtn")}
        </button>
      </Link>
    </div>
  );
}
