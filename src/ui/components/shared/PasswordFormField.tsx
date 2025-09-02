import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LanguageType } from "@/ui/contexts/LanguageContext";
import { Eye, EyeOff } from "lucide-react";
import { Path, UseFormReturn } from "react-hook-form";

interface IPasswordFormFieldProps<T extends { password: string }> {
  form: UseFormReturn<T>;
  language: LanguageType;
  showPassword: boolean;
  setShowPassword: (value: boolean) => void;
}

export const PasswordFormField = <T extends { password: string }>({
  form,
  language,
  showPassword,
  setShowPassword,
}: IPasswordFormFieldProps<T>) => {
  return (
    <FormField
      control={form.control}
      name={"password" as Path<T>}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {language === "en" ? "Password" : "كلمة المرور"}
          </FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder={language === "en" ? "Password" : "كلمة المرور"}
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
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
