"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { loginSchema, LoginSchemaType } from "@/schemas/login";
import { useLanguage } from "@/ui/contexts/LanguageContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SharedFormField } from "@/ui/components/shared/SharedFormField";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const { language, t } = useLanguage();
  const navigate = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema(language)),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onLoginSubmit = async (data: LoginSchemaType) => {
    setLoading(true);
    const res = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    setLoading(false);

    if (res?.error) {
      toast.error(t("invalidCredentialsTitle"), {
        description: t("invalidCredentialsDescription"),
      });
    } else {
      toast.success(t("loginSuccessTitle"), {
        description: t("loginSuccessDescription"),
      });
      navigate.push("/gallery");
    }
  };
  return (
    <div className="relative w-full flex items-center justify-center p-4">
      <Card className="w-full max-w-md animate-fade-in">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            {t("loginTitle")}
          </CardTitle>
          <CardDescription>{t("loginDescription")}</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onLoginSubmit)}
              className="space-y-4"
              dir={language === "en" ? "ltr" : "rtl"}
            >
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

              <Button
                type="submit"
                className="w-full bg-blue-600 text-white hover:bg-blue-700"
                disabled={loading}
              >
                {loading ? t("signingIn") : t("signIn")}
              </Button>
            </form>
          </Form>
          <div className="mt-6 space-y-4 text-center">
            <Link
              href="/forgot-password"
              className="text-sm text-primary hover:underline block"
            >
              {t("forgetPassword")}
            </Link>

            <div className="text-sm text-muted-foreground">
              {t("doNotHaveAccount")}{" "}
              <Link href="/register" className="text-primary hover:underline">
                {t("signUp")}
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
