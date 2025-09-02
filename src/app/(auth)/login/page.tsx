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
  const { language } = useLanguage();
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
      toast.error(
        language === "en" ? "Invalid credentials" : "بيانات الدخول غير صحيحة",
        {
          description:
            language === "en"
              ? "Invalid credentials"
              : "بيانات الدخول غير صحيحة",
        }
      );
    } else {
      toast.success(
        language === "en" ? "Login successful!" : "تم تسجيل الدخول بنجاح",
        {
          description:
            language === "en" ? "Login successful!" : "تم تسجيل الدخول بنجاح",
        }
      );
      navigate.push("/gallery");
    }
  };
  return (
    <div className="relative w-full flex items-center justify-center p-4">
      <Card className="w-full max-w-md animate-fade-in">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            {language === "en" ? "Welcome Back" : "مرحباً بك مرة أخرى"}
          </CardTitle>
          <CardDescription>
            {language === "en"
              ? "Sign in to your account to continue"
              : "قم بتسجيل الدخول إلى حسابك للمتابعة"}
          </CardDescription>
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
                label={language === "en" ? "Email" : "البريد الالكتروني"}
                language={language}
                name="email"
                placeholder={
                  language === "en"
                    ? "Enter your email"
                    : "أدخل البريد الالكتروني"
                }
                type="email"
              />

              <SharedFormField
                control={form.control}
                label={language === "en" ? "Password" : "كلمة المرور"}
                language={language}
                name="password"
                placeholder={language === "en" ? "Password" : "كلمة المرور"}
                type="password"
              />

              <Button
                type="submit"
                className="w-full bg-blue-600 text-white hover:bg-blue-700"
                disabled={loading}
              >
                {loading
                  ? language === "en"
                    ? "Signing in..."
                    : "جاري تسجيل الدخول..."
                  : language === "en"
                  ? "Sign in"
                  : "تسجيل الدخول"}
              </Button>
            </form>
          </Form>
          <div className="mt-6 space-y-4 text-center">
            <Link
              href="/forgot-password"
              className="text-sm text-primary hover:underline block"
            >
              {language === "en" ? "Forgot password?" : "هل نسيت كلمة المرور ؟"}
            </Link>

            <div className="text-sm text-muted-foreground">
              {language === "en" ? "Don't have an account?" : "ليس لديك حساب؟"}{" "}
              <Link href="/register" className="text-primary hover:underline">
                {language === "en" ? "Sign up" : "تسجيل"}
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
