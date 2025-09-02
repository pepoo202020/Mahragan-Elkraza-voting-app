import { LanguageType } from "@/ui/contexts/LanguageContext";
import { z } from "zod";

export const resetPasswordSchema = (language: LanguageType) => {
  return z.object({
    password: z
      .string()
      .min(
        8,
        language === "en"
          ? "Password must be at least 6 characters"
          : "كلمة السر يجب ان تكون من 6 حروف او اكثر"
      ),
  });
};

export type ResetPasswordSchemaType = z.infer<
  ReturnType<typeof resetPasswordSchema>
>;
