"use client";
import {
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
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Path, Control, FieldValues } from "react-hook-form";
import { LanguageType } from "@/ui/contexts/LanguageContext";
import { Textarea } from "@/components/ui/textarea";

interface SharedFormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  type?: "text" | "email" | "password" | "confirmPassword" | "otp" | "textarea";
  label: string;
  placeholder: string;
  language: LanguageType;
  otpLength?: number;
}
export const SharedFormField = <T extends FieldValues>({
  control,
  name,
  type = "text",
  label,
  placeholder,
  language = "en",
  otpLength = 8,
}: SharedFormFieldProps<T>) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password" || type === "confirmPassword";
  const isOtp = type === "otp";
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {isOtp ? (
              <div className="flex items-center justify-center w-full">
                <InputOTP maxLength={otpLength} className="w-full" {...field}>
                  <InputOTPGroup dir={language === "en" ? "ltr" : "rtl"}>
                    {[...Array(otpLength / 2)].map((_, i) => (
                      <InputOTPSlot
                        className={`${
                          language === "en"
                            ? "first:rounded-l-md first:border-l last:rounded-r-md"
                            : "first:rounded-r-md first:border-r last:rounded-l-md first:rounded-l-none first:border-l-0 last:rounded-r-none"
                        }`}
                        key={i}
                        index={i}
                      />
                    ))}
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    {[...Array(otpLength / 2)].map((_, i) => (
                      <InputOTPSlot
                        key={i + otpLength / 2}
                        index={i + otpLength / 2}
                        className={`${
                          language === "en"
                            ? "first:rounded-l-md first:border-l last:rounded-r-md"
                            : "first:rounded-r-md first:border-r last:rounded-l-md first:rounded-l-none first:border-l-0 last:rounded-r-none"
                        }`}
                      />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </div>
            ) : isPassword ? (
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder={placeholder}
                  {...field}
                />
                <button
                  type="button"
                  tabIndex={-1}
                  className={`absolute inset-y-0 ${
                    language === "en" ? "right-3" : "left-3"
                  } flex items-center`}
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            ) : type === "textarea" ? (
              <Textarea placeholder={placeholder} rows={4} {...field} />
            ) : (
              <Input type={type} placeholder={placeholder} {...field} />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
