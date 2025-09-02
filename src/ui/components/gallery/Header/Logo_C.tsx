import { TranslationKeys } from "@/ui/contexts/LanguageContext";

interface ILogo_CProps {
  t: (key: TranslationKeys) => string;
}
export const Logo_C = ({ t }: ILogo_CProps) => {
  return (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
        <span className="text-white font-bold text-sm">C</span>
      </div>
      <h1 className="text-lg lg:text-xl font-bold text-foreground">
        {t("appName")}
      </h1>
    </div>
  );
};
