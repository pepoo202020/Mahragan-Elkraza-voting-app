import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Path, UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { LanguageType } from "@/ui/contexts/LanguageContext";

interface IEmailFormFieldPops<T extends { email: string }> {
  form: UseFormReturn<T>;
  language: LanguageType;
}

export const EmailFormField = <T extends { email: string }>({
  form,
  language,
}: IEmailFormFieldPops<T>) => {
  return (
    <FormField
      control={form.control}
      name={"email" as Path<T>}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {language === "en" ? "Email" : "البريد الإلكتروني"}
          </FormLabel>
          <FormControl>
            <Input
              type="email"
              placeholder={language === "en" ? "Email" : "البريد الإلكتروني"}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
