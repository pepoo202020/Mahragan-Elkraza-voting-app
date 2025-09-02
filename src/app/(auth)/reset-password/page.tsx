"use client";

import { resetPassword } from "@/actions/resetPassword";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import {
  resetPasswordSchema,
  ResetPasswordSchemaType,
} from "@/schemas/reset-password";
import { SharedFormField } from "@/ui/components/shared/SharedFormField";
import { useLanguage } from "@/ui/contexts/LanguageContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function ResetPassword() {
  const { language, t } = useLanguage();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const form = useForm<ResetPasswordSchemaType>({
    resolver: zodResolver(resetPasswordSchema(language)),
    defaultValues: {
      password: "",
    },
  });
  const navigate = useRouter();
  const email = useSearchParams().get("email") || "";
  const onResetPasswordSubmit = async (values: ResetPasswordSchemaType) => {
    const result = await resetPassword({
      email,
      newPassword: values.password,
    });

    setIsLoading(false);

    if (result?.error) {
      toast.error(language === "en" ? "Error" : "خطأ", {
        description:
          language === "en"
            ? result.error
            : result.error === "Invalid or expired token"
            ? "رمز غير صالح أو منتهي الصلاحية"
            : "حدث خطأ أثناء إعادة تعيين كلمة المرور",
      });
    } else {
      toast.success(t("resetPasswordSuccessTitle"), {
        description: t("resetPasswordSuccessDescription"),
      });
      navigate.push("/login");
      form.reset();
    }
  };
  return (
    <div className="relative w-full flex items-center justify-center p-4">
      <Card className="w-full max-w-md animate-fade-in">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            {t("resetPasswordTitle")}
          </CardTitle>
          <CardDescription>{t("resetPasswordDescription")}</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onResetPasswordSubmit)}
              className="space-y-4"
              dir={language === "en" ? "ltr" : "rtl"}
            >
              <SharedFormField
                control={form.control}
                label={t("password")}
                language={language}
                name="password"
                placeholder={t("enterPassword")}
                type="password"
              />

              <Button
                type="submit"
                className="w-full bg-blue-600 text-white hover:bg-blue-700"
                disabled={isLoading}
              >
                {isLoading ? t("sending") : t("send")}
              </Button>
            </form>
          </Form>

          <div className="mt-6 text-center">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
            >
              <ArrowLeft className="h-4 w-4" />
              {t("backToLogin")}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
