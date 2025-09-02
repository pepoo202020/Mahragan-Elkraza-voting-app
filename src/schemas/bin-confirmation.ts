import { LanguageType } from "@/ui/contexts/LanguageContext";
import { z } from "zod";

export const binConfirmationSchema = (language: LanguageType) => {
  return z.object({
    bin: z
      .string()
      .min(
        8,
        language === "en"
          ? "BIN number must be 8 digits"
          : "الرقم يجب يكون 8 أرقام"
      )
      .regex(
        /^\d+$/,
        language === "en"
          ? "BIN number must contain only digits"
          : "الرقم يجب أن يحتوي على أرقام فقط"
      ),
  });
};

export type BinConfirmationSchemaType = z.infer<
  ReturnType<typeof binConfirmationSchema>
>;
