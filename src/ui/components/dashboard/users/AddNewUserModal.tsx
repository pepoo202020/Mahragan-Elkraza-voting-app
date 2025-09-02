"use client";

import { addNewUSer } from "@/actions/addNewUser";
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
import { Camera, Eye, EyeOff, Upload } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { SharedSelectItem } from "../../shared/SharedSelectItem";

interface IAddNewUserModal {
  open: boolean;
  onClose: () => void;
  t: (key: TranslationKeys) => string;
  language: LanguageType;
}
export const AddNewUserModal = ({
  open,
  onClose,
  t,
  language,
}: IAddNewUserModal) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    image: "https://github.com/shadcn.png",
    bio: "",
    role: "USER" as "USER" | "ADMIN",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
      };
      const response = await addNewUSer(payload);
      if (response.success) {
        toast.success(t("addedUserSuccess"));
        onOpenChange(); // Close modal and trigger refresh
      } else {
        toast.error(response.error || t("somethingWentWrong"));
      }
    } catch (error) {
      console.error("Error adding user:", error);
      toast.error(t("addedUserFailed"));
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      // Upload to Cloudinary via your API route
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.secure_url) {
        setFormData((prev) => ({
          ...prev,
          image: data.secure_url,
        }));
      } else {
        // Optionally handle error
        alert(t("imageUploadFialed"));
      }
    }
  };

  const resetToDefault = () => {
    setFormData((prev) => ({
      ...prev,
      image: "https://github.com/shadcn.png",
    }));
  };
  const onOpenChange = () => {
    resetToDefault();
    onClose();
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        dir={language === "ar" ? "rtl" : "ltr"}
        className="max-w-md max-h-[90vh] overflow-y-auto"
      >
        <DialogHeader>
          <DialogTitle className="text-center">{t("addUserTitle")}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Image */}
          <div className="space-y-2">
            <Label>{t("profileImageLabel")}</Label>
            <div className="flex flex-col items-center gap-4">
              <Avatar className="w-24 h-24">
                <AvatarImage src={formData.image} alt={t("profileImageAlt")} />
                <AvatarFallback>
                  <Camera className="w-8 h-8" />
                </AvatarFallback>
              </Avatar>

              <div className="flex gap-2">
                <div className="relative">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="profile-image-upload"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      document.getElementById("profile-image-upload")?.click()
                    }
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    {t("upload")}
                  </Button>
                </div>

                {formData.image !== "https://github.com/shadcn.png" && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={resetToDefault}
                  >
                    {t("reset")}
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">{`${t("name")} *`}</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder={t("enterFullName")}
              required
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">{`${t("email")} *`}</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
              placeholder={t("enterEmailAddress")}
              required
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password">{`${t("password")} *`}</Label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, password: e.target.value }))
                }
                placeholder={t("enterPassword")}
                required
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
          </div>

          {/* Bio */}
          <div className="space-y-2">
            <Label htmlFor="bio">{t("bio")}</Label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, bio: e.target.value }))
              }
              placeholder={t("bioPlaceholder")}
              rows={4}
              className="resize-none"
            />
          </div>

          {/* Role */}
          <div className="space-y-2">
            <Label>{t("role")}</Label>
            <SharedSelectItem
              language={language}
              onValueChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  role: value as "USER" | "ADMIN",
                }))
              }
              options={[
                { value: `${"ADMIN"}`, label: { en: "Admin", ar: "مسؤول" } },
                { value: `${"USER"}`, label: { en: "User", ar: "مستخدم" } },
              ]}
              value={formData.role}
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange()}
              className="flex-1"
            >
              {t("cancel")}
            </Button>
            <Button type="submit" className="flex-1">
              {t("addUserBtn")}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
