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
import {
  Form,
  FormLabel,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { registerSchema, RegisterSchemaType } from "@/schemas/register";
import { SharedFormField } from "@/ui/components/shared/SharedFormField";
import { useLanguage } from "@/ui/contexts/LanguageContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function RegisterPage() {
  const { language } = useLanguage();
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
      toast.error(language === "en" ? "Error" : "خطأ", {
        description:
          language === "en"
            ? result.error
            : result.error === "Email already registered."
            ? "البريد الإلكتروني مسجل بالفعل."
            : "فشل التسجيل. حاول مرة أخرى.",
      });
    } else {
      toast.success(language === "en" ? "Success" : "نجاح", {
        description:
          language === "en"
            ? "Account created successfully! Please sign in."
            : "تم إنشاء الحساب بنجاح! يرجى تسجيل الدخول.",
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
            {language === "en" ? "Create New Account" : "إنشاء حساب جديد"}
          </CardTitle>
          <CardDescription>
            {language === "en"
              ? "Sign up to start voting in the artworks"
              : "سجل للبدء في التصويت للأعمال الفنية الافضل بالنسبة لك"}
          </CardDescription>
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
                label={language === "en" ? "Name" : "الاسم"}
                language={language}
                name="name"
                placeholder={
                  language === "en" ? "Enter your name" : "أدخل الاسم"
                }
              />

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

              <SharedFormField
                control={form.control}
                label={
                  language === "en" ? "Confirm Password" : "تأكيد كلمة المرور"
                }
                language={language}
                name="confirmPassword"
                placeholder={
                  language === "en" ? "Confirm Password" : "تأكيد كلمة المرور"
                }
                type="confirmPassword"
              />

              <Button
                type="submit"
                className="w-full bg-blue-600 text-white hover:bg-blue-700"
                disabled={isLoading}
              >
                {isLoading
                  ? language === "en"
                    ? "Loading..."
                    : "يتم تحميل..."
                  : language === "en"
                  ? "Register"
                  : "تسجيل"}
              </Button>
            </form>
          </Form>
          <div className="mt-6 text-center">
            <div className="text-sm text-muted-foreground">
              {language === "en"
                ? "Already have an account?"
                : "هل لديك حساب بالفعل؟"}{" "}
              <Link href="/login" className="text-primary hover:underline">
                {language === "en" ? "login" : "تسجيل الدخول"}
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
