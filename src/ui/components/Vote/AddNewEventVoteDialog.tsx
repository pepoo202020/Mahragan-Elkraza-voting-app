// src/ui/components/Vote/AddNewEventVoteDialog.tsx
"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createEventSchema, CreateEventInput } from "@/schemas/create-event";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import createVotingEvent from "@/actions/createVotingEvent";
import { TranslationKeys, useLanguage } from "@/ui/contexts/LanguageContext";
import ArtworkSelection from "./ArtworkSelection";
import { VotingEvent } from "../../../../lib/generated/prisma";

function toDatetimeLocalString(date: Date) {
  // Returns YYYY-MM-DDTHH:mm
  return date.toISOString().slice(0, 16);
}

interface AddNewEventVoteDialogProps {
  onEventCreated?: (event: VotingEvent) => void;
  t: (key: TranslationKeys) => string;
}

export default function AddNewEventVoteDialog({
  onEventCreated,
  t,
}: AddNewEventVoteDialogProps) {
  const [open, setOpen] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [selectedArtworkIds, setSelectedArtworkIds] = useState<string[]>([]);
  const { language } = useLanguage();
  const currentYear = new Date().getFullYear();

  const form = useForm<CreateEventInput>({
    resolver: zodResolver(createEventSchema()),
    defaultValues: {
      name: "",
      votingStartTime: toDatetimeLocalString(new Date()),
      votingEndTime: toDatetimeLocalString(new Date()),
      description: "",
      year: `${currentYear}`,
      artworkIds: [],
    },
  });

  const onSubmit = async (data: CreateEventInput) => {
    setServerError(null);
    try {
      // Pass the object directly, not FormData
      const result = await createVotingEvent({
        ...data,
        artworkIds: selectedArtworkIds,
      });

      if ("error" in result) {
        setServerError("Please check your input.");
      } else {
        // Call the callback if provided
        if (onEventCreated && result.event) {
          onEventCreated(result.event);
        }

        setOpen(false);
        form.reset();
        setSelectedArtworkIds([]);
      }
    } catch (error) {
      console.error("Error creating event:", error);
      setServerError("An error occurred while creating the event.");
    }
  };

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
    if (!open) {
      form.reset();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="bg-blue-800 text-white" variant="default">
          {t("createEventTitle")}
        </Button>
      </DialogTrigger>
      <DialogContent
        className="overflow-auto max-h-[80vh]"
        dir={language === "ar" ? "rtl" : "ltr"}
      >
        <DialogHeader>
          <DialogTitle className="text-center">
            {t("createEventTitle")}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
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
            <FormField
              control={form.control}
              name="year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("votingYear")}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <p className="text-xs font-bold text-red-500">
                    {t("votingYearNote")}
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />
            <ArtworkSelection
              selectedIds={selectedArtworkIds}
              setSelectedIds={setSelectedArtworkIds}
              t={t}
            />
            {serverError && (
              <div className="text-destructive">{serverError}</div>
            )}
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {t("createEventTitle")}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
