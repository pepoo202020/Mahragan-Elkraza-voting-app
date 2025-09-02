"use client";
import { registerUser } from "@/actions/register";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { registerSchema, RegisterSchemaType } from "@/schemas/register";
import { SharedFormField } from "@/ui/components/shared/SharedFormField";
import { useLanguage } from "@/ui/contexts/LanguageContext";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function RegisterPage() {
  const { language, t } = useLanguage();
  const navigate = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema(language)),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const onRegisterSubmit = async (data: RegisterSchemaType) => {
    setIsLoading(true);
    const result = await registerUser(data);
    if (result?.error) {
      toast.error(t("error"), {
        description:
          language === "en"
            ? result.error
            : result.error === "Email already registered."
            ? "البريد الإلكتروني مسجل بالفعل."
            : "فشل التسجيل. حاول مرة أخرى.",
      });
    } else {
      toast.success(t("registerSuccessTitle"), {
        description: t("registerSuccessDescription"),
      });
      navigate.push("/login");
    }
    setIsLoading(false);
  };
  return (
    <div className="relative w-full flex items-center justify-center p-4">
      <Card className="w-full max-w-md animate-fade-in">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            {t("registerTitle")}
          </CardTitle>
          <CardDescription>{t("registerDescription")}</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onRegisterSubmit)}
              className="space-y-4"
              dir={language === "en" ? "ltr" : "rtl"}
            >
              <SharedFormField
                control={form.control}
                label={t("name")}
                language={language}
                name="name"
                placeholder={t("namePlaceholder")}
              />

              <SharedFormField
                control={form.control}
                label={t("email")}
                language={language}
                name="email"
                placeholder={t("enterEmailAddress")}
                type="email"
              />

              <SharedFormField
                control={form.control}
                label={t("password")}
                language={language}
                name="password"
                placeholder={t("enterPassword")}
                type="password"
              />

              <SharedFormField
                control={form.control}
                label={t("confirmPasswordLabel")}
                language={language}
                name="confirmPassword"
                placeholder={t("confirmPasswordPlaceholder")}
                type="confirmPassword"
              />

              <Button
                type="submit"
                className="w-full bg-blue-600 text-white hover:bg-blue-700"
                disabled={isLoading}
              >
                {isLoading ? t("registering") : t("register")}
              </Button>
            </form>
          </Form>
          <div className="mt-6 text-center">
            <div className="text-sm text-muted-foreground">
              {t("alreadyHaveAccount")}{" "}
              <Link href="/login" className="text-primary hover:underline">
                {t("login")}
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
