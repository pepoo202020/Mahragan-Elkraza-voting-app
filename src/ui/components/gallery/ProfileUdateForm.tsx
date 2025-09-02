import { Form } from "@/components/ui/form";
import { SharedFormField } from "../shared/SharedFormField";
import { UseFormReturn } from "react-hook-form";
import { EditProfileSchemaType } from "@/schemas/edit-profile";
import { LanguageType, TranslationKeys } from "@/ui/contexts/LanguageContext";

interface IProfileModalProps {
  form: UseFormReturn<EditProfileSchemaType>;
  onEditProfileSubmit: () => void;
  language: LanguageType;
  t: (key: TranslationKeys) => string;
}

export const ProfileUdateForm = ({
  form,
  onEditProfileSubmit,
  language,
  t,
}: IProfileModalProps) => {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onEditProfileSubmit)}
        className="space-y-4"
        dir={language === "en" ? "ltr" : "rtl"}
      >
        <SharedFormField
          control={form.control}
          label={t("name")}
          language={language}
          name="name"
          placeholder={t("namePlaceholder")}
          type="text"
        />
        <SharedFormField
          control={form.control}
          label={t("bio")}
          language={language}
          name="bio"
          placeholder={t("bioPlaceholder")}
          type="textarea"
        />
      </form>
    </Form>
  );
};
