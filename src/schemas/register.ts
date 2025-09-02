import { LanguageType } from "@/ui/contexts/LanguageContext";
import { z } from "zod";

export const registerSchema = (language: LanguageType) => {
  return z
    .object({
      name: z
        .string()
        .min(
          3,
          language === "en"
            ? "Name must be at least 3 characters"
            : "الاسم يجب ان تكون من 3 حروف او اكثر"
        ),
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
      confirmPassword: z
        .string()
        .min(
          8,
          language === "en"
            ? "Password must be at least 6 characters"
            : "كلمة السر يجب ان تكون من 6 حروف او اكثر"
        ),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message:
        language === "en" ? "Passwords do not match" : "كلمة السر غير متطابقة",
      path: ["confirmPassword"],
    });
};

export type RegisterSchemaType = z.infer<ReturnType<typeof registerSchema>>;
