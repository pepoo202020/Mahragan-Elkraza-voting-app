"use client";

import updateArtwork from "@/actions/updateArtwork";
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
import { LanguageType, TranslationKeys } from "@/ui/contexts/LanguageContext";
import { Artwork } from "../../../../../lib/generated/prisma";
import { Trash2, Upload, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

interface EditArtworkDialogProps {
  open: boolean;
  onClose: () => void;
  artwork: Artwork | null;
  onArtworkUpdated: () => void;
  t: (key: TranslationKeys) => string;
  language: LanguageType;
}

export const EditArtworkDialog = ({
  open,
  onClose,
  artwork,
  onArtworkUpdated,
  t,
  language,
}: EditArtworkDialogProps) => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    type: "" as "INDIVIDUAL" | "GROUP" | "",
    members: [""] as string[],
    images: [] as string[],
    video: "",
    year: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form data when artwork changes
  useEffect(() => {
    if (artwork) {
      setFormData({
        title: artwork.title,
        author: artwork.author,
        type: artwork.type as "INDIVIDUAL" | "GROUP",
        members: artwork.members.length > 0 ? artwork.members : [""],
        images: artwork.images,
        video: artwork.video || "",
        year: artwork.year,
        description: artwork.description || "",
      });
    }
  }, [artwork]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!artwork) return;

    setIsSubmitting(true);
    try {
      // Filter out empty members
      const payload = {
        ...formData,
        members: formData.members.filter((m) => m.trim() !== ""),
      };

      const response = await updateArtwork(artwork.id, payload);
      if (response.success) {
        toast.success(t("editArtworkSuccess"));
        onArtworkUpdated();
        onClose();
      } else {
        toast.error(t("editArtworkFailed"));
      }
    } catch (error) {
      console.error("Error updating artwork:", error);
      toast.error(t("anErrorOccurred"));
    } finally {
      setIsSubmitting(false);
    }
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

  if (!artwork) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        dir={language === "ar" ? "rtl" : "ltr"}
        className="max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <DialogHeader>
          <DialogTitle className="text-center">
            {t("editArtwokTitle")}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">{`${t("title")} *`}</Label>
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
            <Label htmlFor="author">{`${t("author")} *`}</Label>
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
            <Label>{`${t("artworkType")} *`}</Label>
            <Select
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
            <Label htmlFor="description">{t("description")}</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              placeholder={t("enterArtworkDescription")}
              rows={4}
              className="resize-none"
            />
          </div>

          {/* Images */}
          <div className="space-y-2">
            <Label>{`${t("images")} *`}</Label>
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
                  id="image-upload-edit"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    document.getElementById("image-upload-edit")?.click()
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
            <Label htmlFor="year">{`${t("year")} *`}</Label>
            <Input
              id="year"
              value={formData.year}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, year: e.target.value }))
              }
              placeholder={t("enterArtworkYear")}
              pattern="[0-9]{4}"
              maxLength={4}
              required
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
            <Button type="submit" className="flex-1" disabled={isSubmitting}>
              {isSubmitting ? t("saving") : t("saveChanges")}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
