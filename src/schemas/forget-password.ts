import { LanguageType } from "@/ui/contexts/LanguageContext";
import { z } from "zod";

export const forgetPasswordSchema = (language: LanguageType) => {
  return z.object({
    email: z
      .string()
      .email(
        language === "en"
          ? "Invalid email address"
          : "البريد الإلكتروني غير صالح"
      ),
  });
};

export type ForgetPasswordShemaType = z.infer<
  ReturnType<typeof forgetPasswordSchema>
>;
