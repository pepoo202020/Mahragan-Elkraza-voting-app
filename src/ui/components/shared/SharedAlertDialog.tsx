import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LanguageType, TranslationKeys } from "@/ui/contexts/LanguageContext";
import { Loader2, Trash2 } from "lucide-react";

interface ISharedAlertDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description: string;
  t: (key: TranslationKeys) => string;
  cancel?: boolean; // Made optional for flexibility
  action: () => void;
  isLoading: boolean;
  lang: LanguageType;
}

export default function SharedAlertDialog({
  open,
  onClose,
  title,
  description,
  t,
  cancel = true, // Default to true
  action,
  isLoading,
  lang,
}: ISharedAlertDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent dir={lang === "ar" ? "rtl" : "ltr"}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          {cancel && (
            <Button variant="outline" onClick={onClose} disabled={isLoading}>
              {t("cancel")}
            </Button>
          )}
          <Button
            onClick={action}
            className="bg-destructive hover:bg-destructive/90"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Trash2 className="mr-2 h-4 w-4" />
            )}
            {t("delete")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
