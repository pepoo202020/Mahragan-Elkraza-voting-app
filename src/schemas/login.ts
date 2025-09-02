import { LanguageType } from "@/ui/contexts/LanguageContext";
import { z } from "zod";

export const loginSchema = (language: LanguageType) => {
  return z.object({
    email: z
      .string()
      .email(
        language === "en"
          ? "Invalid email address"
          : "البريد الإلكتروني غير صالح"
      ),
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

export type LoginSchemaType = z.infer<ReturnType<typeof loginSchema>>;
