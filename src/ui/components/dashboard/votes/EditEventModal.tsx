// src/ui/components/dashboard/votes/EditEventModal.tsx
"use client";

import { EditEventInput, editEventSchema } from "@/schemas/edit-event";
import { LanguageType, TranslationKeys } from "@/ui/contexts/LanguageContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { Artwork, VotingEvent } from "@prisma/client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

// Returns YYYY-MM-DDTHH:mm for <input type="datetime-local" />
function toDatetimeLocalString(date: Date) {
  return new Date(date).toISOString().slice(0, 16);
}

interface IEditEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: VotingEvent & { artworks: Artwork[] };
  onEventUpdate: (id: string, updateEvent: Partial<VotingEvent>) => void;
  t: (key: TranslationKeys) => string;
  language: LanguageType;
}

export default function EditEventModal({
  isOpen,
  onClose,
  event,
  onEventUpdate,
  t,
  language,
}: IEditEventModalProps) {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const form = useForm<EditEventInput>({
    resolver: zodResolver(editEventSchema(language)),
    defaultValues: {
      title: event.title ?? "",
      description: event.description ?? "",
      votingStartTime: toDatetimeLocalString(event.startTime),
      votingEndTime: toDatetimeLocalString(event.endTime),
      year: event.year ?? new Date().getFullYear(),
      // Keep artworkIds in form shape for future server update; not edited here.
      artworkIds: event.artworks?.map((a) => a.id) ?? [],
    },
  });

  // Reset form whenever modal opens or event changes
  useEffect(() => {
    if (!isOpen) return;
    form.reset({
      title: event.title ?? "",
      description: event.description ?? "",
      votingStartTime: toDatetimeLocalString(event.startTime),
      votingEndTime: toDatetimeLocalString(event.endTime),
      year: event.year ?? new Date().getFullYear(),
      artworkIds: event.artworks?.map((a) => a.id) ?? [],
    });
  }, [isOpen, event, form]);

  const handleSubmit = async (data: EditEventInput) => {
    setIsSubmitting(true);
    try {
      onEventUpdate(event.id, {
        title: data.title,
        description: data.description,
        startTime: new Date(data.votingStartTime),
        endTime: new Date(data.votingEndTime),
        year: data.year,
        // artwork updates are handled via server actions elsewhere
      });
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      form.reset();
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent
        className="sm:max-w-lg"
        dir={language === "ar" ? "rtl" : "ltr"}
      >
        <DialogHeader>
          <DialogTitle>{'t("edit")'}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("eventTitle")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("eventTitlePlaceholder")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("eventDescription")}</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={3}
                      placeholder={t("eventDescriptionPlaceholder")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="votingStartTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("votingStartTime")}</FormLabel>
                    <FormControl>
                      <Input
                        type="datetime-local"
                        {...field}
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="votingEndTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("votingEndTime")}</FormLabel>
                    <FormControl>
                      <Input
                        type="datetime-local"
                        {...field}
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("votingYear")}</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      value={field.value}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <p className="text-xs font-bold text-red-500">
                    {t("votingYearNote")}
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isSubmitting}
                className="flex-1"
              >
                {t("cancel")}
              </Button>
              <Button type="submit" disabled={isSubmitting} className="flex-1">
                {isSubmitting ? t("saving") : t("save")}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
