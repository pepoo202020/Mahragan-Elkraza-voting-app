"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LanguageType, TranslationKeys } from "@/ui/contexts/LanguageContext";
import { Calendar, Mail, MessageSquare, ThumbsUp, User } from "lucide-react";
import { format } from "date-fns";
import { IUsersWithVotesAndComments } from "@/ui/types/types";
import { Avatar_C } from "../../shared/Avatar_C";

interface IViewUserDetailsDialog {
  open: boolean;
  onClose: () => void;
  user: IUsersWithVotesAndComments | null;
  t: (key: TranslationKeys) => string;
  language: LanguageType;
}

export const ViewUserDetailsDialog = ({
  open,
  onClose,
  user,
  t,
  language,
}: IViewUserDetailsDialog) => {
  if (!user) return null;

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "ADMIN":
        return <Badge variant="destructive">{t("admin")}</Badge>;
      case "USER":
        return <Badge variant="outline">{t("user")}</Badge>;
      default:
        return <Badge variant="outline">{role}</Badge>;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        dir={language === "ar" ? "rtl" : "ltr"}
        className="max-w-md max-h-[90vh] overflow-y-auto"
      >
        <DialogHeader>
          <DialogTitle className="text-center">
            {t("userDetailsTitle")}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Profile Image and Name */}
          <div className="flex flex-col items-center gap-3">
            <Avatar_C image={user.image!} name={user.name} />
            <div className="text-center">
              <h3 className="text-xl font-semibold">{user.name}</h3>
              <div className="flex items-center justify-center gap-2 mt-2">
                {getRoleBadge(user.role)}
              </div>
            </div>
          </div>

          {/* User Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-muted-foreground" />
              <span>{user.email}</span>
            </div>

            {user.bio && (
              <div className="pt-2">
                <h4 className="text-sm font-medium text-muted-foreground mb-1">
                  {t("bio")}
                </h4>
                <p className="text-sm">{user.bio}</p>
              </div>
            )}

            <div className="pt-2">
              <h4 className="text-sm font-medium text-muted-foreground mb-2">
                {t("userActivity")}
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2">
                  <ThumbsUp className="w-4 h-4 text-muted-foreground" />
                  <span>
                    {user.votes.length} {t("votes")}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-muted-foreground" />
                  <span>
                    {user.comments.length} {t("comments")}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-muted-foreground" />
              <span>
                {t("joined")} {format(new Date(user.createdAt), "PPP")}
              </span>
            </div>
          </div>

          <div className="pt-4">
            <Button onClick={onClose} className="w-full">
              {t("close")}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
