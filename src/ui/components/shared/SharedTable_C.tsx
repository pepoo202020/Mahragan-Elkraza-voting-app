import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { LanguageType } from "@/ui/contexts/LanguageContext";
import { ITableHeadRow } from "@/ui/types/types";
import { ReactNode } from "react";

interface ISharedTableComponentProps<T> {
  headRows: ITableHeadRow[];
  data: T[];
  keyExtractor: (item: T) => string | number; // To extract unique key for each row
  renderCells: (item: T) => ReactNode[]; // To render cells for each row
  renderActions?: (item: T) => ReactNode; // Optional: Render action dropdown or other controls
  language: LanguageType;
}

export default function SharedTable_C<T>({
  headRows,
  data,
  keyExtractor,
  renderCells,
  renderActions,
  language,
}: ISharedTableComponentProps<T>) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {headRows.map((headRow) => (
            <TableHead
              key={headRow.title}
              className={cn(
                headRow.className,
                language === "ar" ? "text-right" : "text-left"
              )}
            >
              {headRow.title}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={keyExtractor(item)} className="hover:bg-muted/50">
            {renderCells(item).map((cell, index) => (
              <TableCell key={index}>{cell}</TableCell>
            ))}
            {renderActions && <TableCell>{renderActions(item)}</TableCell>}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
