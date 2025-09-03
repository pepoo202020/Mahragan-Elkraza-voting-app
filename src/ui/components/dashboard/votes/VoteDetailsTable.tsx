"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import type { UiVoteRow } from "@/ui/types/types";
import { LanguageType, TranslationKeys } from "@/ui/contexts/LanguageContext";
import { cn } from "@/lib/utils";

interface VoteDetailsTableProps {
  title: string;
  rows: UiVoteRow[];
  onDelete: (id: string) => void;
  t: (key: TranslationKeys) => string;
  language: LanguageType;
}

export default function VoteDetailsTable({
  title,
  rows,
  onDelete,
  t,
  language,
}: VoteDetailsTableProps) {
  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold">{title}</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead
              className={cn(language === "ar" ? "text-right" : "text-left")}
            >
              {t("user")}
            </TableHead>
            <TableHead
              className={cn(language === "ar" ? "text-right" : "text-left")}
            >
              {t("artwork")}
            </TableHead>
            <TableHead
              className={cn(language === "ar" ? "text-right" : "text-left")}
            >
              {t("category")}
            </TableHead>
            <TableHead
              className={cn(language === "ar" ? "text-right" : "text-left")}
            >
              {t("voteTime")}
            </TableHead>
            <TableHead
              className={cn(language === "ar" ? "text-right" : "text-left")}
            >
              {t("actions")}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>
                <div className="flex flex-col">
                  <span className="font-medium">{row.userName}</span>
                  <span className="text-muted-foreground text-xs">
                    {row.userEmail}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span className="font-medium">{row.artworkTitle}</span>
                  <span className="text-muted-foreground text-xs">
                    {row.createdAt.toLocaleDateString()}
                  </span>
                </div>
              </TableCell>
              <TableCell className="uppercase text-xs">
                {row.category}
              </TableCell>
              <TableCell className="text-xs">
                {row.createdAt.toLocaleString()}
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => onDelete(row.id)}
                >
                  {t("delete")}
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {rows.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-center text-muted-foreground"
              >
                {t("noVotesForThisEvent")}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
