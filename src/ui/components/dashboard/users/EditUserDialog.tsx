"use client";

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
import { TUser } from "@/ui/types/types";
import { Camera, Upload } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface IEditUserDialog {
  open: boolean;
  onClose: () => void;
  user: TUser | null;
  onUserUpdated: () => void;
  t: (key: TranslationKeys) => string;
  language: LanguageType;
}

export const EditUserDialog = ({
  open,
  onClose,
  user,
  onUserUpdated,
  t,
  language,
}: IEditUserDialog) => {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    bio: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        image: user.image || "https://github.com/shadcn.png",
        bio: user.bio || "",
      });
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.email) return;

    try {
      const result = await updateUser(user.email, {
        name: formData.name,
        bio: formData.bio,
        image: formData.image,
      });

      if (result.success) {
        toast.success(t("userUpdatedSuccess"));
        onUserUpdated();
        onClose();
      } else {
        toast.error(t("userUpdatedFailed"));
      }
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error(t("errorOccuredInUpdateUser"));
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
        toast.error(t("imageUploadFialed"));
      }
    }
  };

  if (!user) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        dir={language === "ar" ? "rtl" : "ltr"}
        className="max-w-md max-h-[90vh] overflow-y-auto"
      >
        <DialogHeader>
          <DialogTitle className="text-center">
            {t("userEditTitle")}
          </DialogTitle>
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
            </div>
          </div>

          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">{t("name")}</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder={t("enterFullName")}
            />
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

          <div className="flex gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              {t("cancel")}
            </Button>
            <Button type="submit" className="flex-1">
              {t("saveChanges")}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
