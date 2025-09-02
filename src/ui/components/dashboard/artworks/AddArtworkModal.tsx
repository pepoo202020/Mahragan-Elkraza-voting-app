"use client";
import AddNewArtwork from "@/actions/addNewArtwork";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/ui/contexts/LanguageContext";
import { Play, Trash2, Upload, X } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

interface IAddArtworkModal {
  open: boolean;
  onClose: () => void;
  onArtworkAdded?: () => void;
}

export const AddArtworkModal = ({
  open,
  onClose,
  onArtworkAdded,
}: IAddArtworkModal) => {
  const currentYear = new Date().getFullYear();
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    type: "" as "INDIVIDUAL" | "GROUP" | "",
    members: [""],
    images: [] as string[],
    video: "",
    year: currentYear.toString(),
    description: "",
  });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would handle the form submission
    const payload = {
      ...formData,
      // Optionally, filter out empty members if needed
      members: formData.members.filter((m) => m.trim() !== ""),
    };
    const response = await AddNewArtwork(payload);
    if (response.success) {
      toast.success(t("artworkAddedSuccessfully"));
      // Call the onArtworkAdded callback if provided
      if (onArtworkAdded) {
        onArtworkAdded();
      }
    } else {
      toast.error(t("somethingWentWrong"));
    }

    onOpenChange();
  };

  const addMember = () => {
    setFormData((prev) => ({
      ...prev,
      members: [...prev.members, ""],
    }));
  };

  const removeMember = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      members: prev.members.filter((_, i) => i !== index),
    }));
  };

  const updateMember = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      members: prev.members.map((member, i) => (i === index ? value : member)),
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();
        if (data.secure_url) {
          setFormData((prev) => ({
            ...prev,
            images: [...prev.images, data.secure_url],
          }));
        }
      }
    }
  };

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };
  const onOpenChange = () => {
    setFormData({
      title: "",
      author: "",
      type: "",
      members: [""],
      images: [],
      video: "",
      year: currentYear.toString(),
      description: "",
    });
    onClose();
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        dir={language === "ar" ? "rtl" : "ltr"}
        className="max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <DialogHeader>
          <DialogTitle className="text-center">
            {t("addNewArtwork")}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">{t("title")} *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              placeholder={t("enterArtworkTitle")}
              required
            />
          </div>

          {/* Author */}
          <div className="space-y-2">
            <Label htmlFor="author">{t("author")} *</Label>
            <Input
              id="author"
              value={formData.author}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, author: e.target.value }))
              }
              placeholder={t("enterAuthorName")}
              required
            />
          </div>

          {/* Type */}
          <div className="space-y-2">
            <Label>{t("artworkType")} *</Label>
            <Select
              dir={language === "ar" ? "rtl" : "ltr"}
              value={formData.type}
              onValueChange={(value: "INDIVIDUAL" | "GROUP") =>
                setFormData((prev) => ({ ...prev, type: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder={t("selectArtworkType")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="INDIVIDUAL">{t("individual")}</SelectItem>
                <SelectItem value="GROUP">{t("group")}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Members (only show for GROUP type) */}
          {formData.type === "GROUP" && (
            <div className="space-y-2">
              <Label>{t("members")}</Label>
              <div className="space-y-2">
                {formData.members.map((member, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={member}
                      onChange={(e) => updateMember(index, e.target.value)}
                      placeholder={`${t("member")} ${index + 1}`}
                    />
                    {formData.members.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => removeMember(index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button type="button" variant="outline" onClick={addMember}>
                  {t("addMember")}
                </Button>
              </div>
            </div>
          )}

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="bio">{t("description")}</Label>
            <Textarea
              id="bio"
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              placeholder={t("enterUserBiography")}
              rows={4}
              className="resize-none"
            />
          </div>

          {/* Images */}
          <div className="space-y-2">
            <Label>{t("images")} *</Label>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mb-2">
                  {t("clickToUploadImagesOrDragAndDrop")}
                </p>
                <Input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    document.getElementById("image-upload")?.click()
                  }
                >
                  {t("chooseImages")}
                </Button>
              </div>

              {formData.images.length > 0 && (
                <div className="grid grid-cols-3 gap-4">
                  {formData.images.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-1 right-1 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => removeImage(index)}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Video */}
          <div className="space-y-2">
            <Label htmlFor="video">{t("videoURLOptional")}</Label>
            <Input
              id="video"
              value={formData.video}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, video: e.target.value }))
              }
              placeholder={t("enterVideoURLYouTubeVimeoEtc")}
              type="url"
            />
            {formData.video && (
              <div className="mt-2 aspect-video rounded-lg overflow-hidden">
                <iframe
                  src={formData.video.replace("watch?v=", "embed/")}
                  className="w-full h-full"
                  title={formData.title}
                  allowFullScreen
                ></iframe>
              </div>
            )}
          </div>

          {/* Year */}
          <div className="space-y-2">
            <Label htmlFor="year">{t("year")} *</Label>
            <Input
              id="year"
              value={formData.year}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, year: e.target.value }))
              }
              placeholder="Enter year (e.g., 2024)"
              pattern="[0-9]{4}"
              maxLength={4}
              required
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
              {t("addArtwork")}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
