"use client";
import getUser from "@/actions/getUser";
import updateUser from "@/actions/updateUser";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { LanguageType, TranslationKeys } from "@/ui/contexts/LanguageContext";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Loading } from "../shared/Loading";
import { Avatar_C } from "../shared/Avatar_C";
import {
  editProfileSchema,
  EditProfileSchemaType,
} from "@/schemas/edit-profile";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { SharedFormField } from "../shared/SharedFormField";
import { ProfileUdateForm } from "./ProfileUdateForm";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
  language: LanguageType;
  t: (key: TranslationKeys) => string;
}
export const ProfileModal = ({
  isOpen,
  onClose,
  email,
  language,
  t,
}: ProfileModalProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [userData, setUserData] = useState<User | null>(null);
  const [editData, setEditData] = useState(userData);
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<EditProfileSchemaType>({
    resolver: zodResolver(editProfileSchema()),
    defaultValues: {
      name: editData?.name ?? "",
      bio: editData?.bio ?? "",
    },
  });

  const router = useRouter();
  useEffect(() => {
    if (!isOpen) return;
    const userGet = async () => {
      setLoading(true);
      const user = await getUser(email);
      setUserData(user);
      setLoading(false);
    };

    userGet();
  }, [isOpen]);

  const onEditProfileSubmit = async (values: EditProfileSchemaType) => {
    if (!editData) return;
    setLoading(true);
    const res = await updateUser(email, values);
    setLoading(false);
    if (res.success && res.user) {
      setUserData(res.user);
      router.refresh();
      handleClose();

      toast.success(t("profileUpdateSuccess"));
    } else {
      toast.error(t("profileUpdateFail"));
    }
  };

  const handleCancel = () => {
    setEditData(userData);
    setIsEditing(false);
  };

  const handleClose = () => {
    setIsEditing(false);
    onClose();
  };

  if (loading) return <Loading />;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent
        className="sm:max-w-md"
        dir={language === "ar" ? "rtl" : "ltr"}
      >
        <DialogHeader>
          <DialogTitle>
            {isEditing ? t("editProfile") : t("profile")}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          {/* Avatar Section */}
          <div className="flex flex-col items-center space-y-4">
            <Avatar_C image={userData?.image!} name={userData?.name!} />
          </div>
          {/* Profile Information */}
          <div className="space-y-4">
            {isEditing ? (
              <ProfileUdateForm
                form={form}
                onEditProfileSubmit={() => onEditProfileSubmit}
                language={language}
                t={t}
              />
            ) : (
              <>
                <div className="text-center space-y-2">
                  <h3 className="text-lg font-semibold">{userData?.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {userData?.email}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>{t("bio")}</Label>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {userData?.bio}
                  </p>
                </div>
              </>
            )}
          </div>
          {/* Action Buttons */}
          <div className="flex gap-2 pt-4">
            {isEditing ? (
              <>
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  className="flex-1"
                >
                  {t("cancel")}
                </Button>
                <Button
                  type="submit"
                  onClick={form.handleSubmit(onEditProfileSubmit)}
                  className="flex-1"
                >
                  {language === "en" ? "Save" : "حفظ"}
                </Button>
              </>
            ) : (
              <Button
                onClick={() => {
                  setEditData(userData);
                  form.setValue("name", editData?.name ?? "");
                  form.setValue("bio", userData?.bio ?? "");
                  setIsEditing(true);
                }}
                className="w-full bg-blue-600 text-white hover:bg-blue-700"
              >
                {t("editProfile")}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
