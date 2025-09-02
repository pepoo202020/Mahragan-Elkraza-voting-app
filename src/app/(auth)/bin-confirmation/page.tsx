"use client";
import { verifyResetCode } from "@/actions/verifyResetCode";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardTitle,
  CardHeader,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  binConfirmationSchema,
  BinConfirmationSchemaType,
} from "@/schemas/bin-confirmation";
import { SharedFormField } from "@/ui/components/shared/SharedFormField";
import { useLanguage } from "@/ui/contexts/LanguageContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function BinConfirmationPage() {
  const { language } = useLanguage();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useRouter();
  const [attempts, setAttempts] = useState<number>(0);
  const form = useForm<BinConfirmationSchemaType>({
    resolver: zodResolver(binConfirmationSchema(language)),
    defaultValues: {
      bin: "",
    },
  });
  const userEmail = useSearchParams().get("email") || "";

  const onBinConfirmationSubmit = async (data: BinConfirmationSchemaType) => {
    setIsLoading(true);
    const result = await verifyResetCode(userEmail, data.bin);

    setIsLoading(false);

    if (result?.error) {
      setAttempts(attempts + 1);
      toast.error(language === "en" ? "Invalid Code" : "رمز غير صحيح", {
        description:
          language === "en"
            ? `Invalid or expired code. ${2 - attempts} attempts left.`
            : `رمز غير صحيح أو منتهي الصلاحية. متبقي ${2 - attempts} محاولة.`,
      });
      if (attempts >= 2) {
        navigate.push("/login");
        setAttempts(0);
      }
      form.reset();
    } else {
      toast.success(language === "en" ? "Code correct" : "الرمز صحيح", {
        description:
          language === "en"
            ? "Code verified! You can now reset your password."
            : "تم التحقق من الرمز! يمكنك الآن إعادة تعيين كلمة المرور.",
      });
      navigate.push("/reset-password?email=" + encodeURIComponent(userEmail));
      setAttempts(0);
      form.reset();
    }
  };
  return (
    <div className="relative w-full flex items-center justify-center p-4">
      <Card className="w-full max-w-md animate-fade-in">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            {language === "en" ? "BIN Confirmation" : "ارسال الرمز التأكيدي"}
          </CardTitle>
          <CardDescription>
            {language === "en"
              ? "Enter your email and we'll send you a reset link"
              : "أدخل بريدك الإلكتروني وسنرسل لك رابط إعادة التعيين"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onBinConfirmationSubmit)}
              className="space-y-4"
              dir={language === "en" ? "ltr" : "rtl"}
            >
              <SharedFormField
                control={form.control}
                label={language === "en" ? "BIN Number" : "رقم التأكيد"}
                language={language}
                name="bin"
                placeholder={
                  language === "en"
                    ? "Enter your Otp Number"
                    : "أدخل رفم التأكيدي"
                }
                type="otp"
              />

              <Button
                type="submit"
                className="w-full bg-blue-600 text-white hover:bg-blue-700"
                disabled={isLoading}
              >
                {isLoading
                  ? language === "en"
                    ? "Sending..."
                    : "يتم ارسال..."
                  : language === "en"
                  ? "Send"
                  : "ارسال"}
              </Button>
            </form>
          </Form>

          <div className="mt-6 text-center">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
            >
              <ArrowLeft className="h-4 w-4" />
              {language === "en" ? "Back to Login" : "العودة إلى تسجيل الدخول"}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
