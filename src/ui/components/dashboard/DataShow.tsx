import { ITableHeadRow } from "@/ui/types/types";
import SharedTable_C from "../shared/SharedTable_C";
import { ReactNode } from "react";
import { LanguageType } from "@/ui/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface IDataShowProps<T> {
  headRows: ITableHeadRow[];
  data: T[];
  keyExtractor: (item: T) => string | number; // To extract unique key for each row
  renderCells: (item: T) => ReactNode[]; // To render cells for each row
  renderActions?: (item: T) => ReactNode; // Optional: Render action dropdown or other controls
  language: LanguageType;
}

export default function DataShow<T>({
  headRows,
  data,
  keyExtractor,
  renderCells,
  renderActions,
  language,
}: IDataShowProps<T>) {
  return (
    <>
      <div className="hidden sm:block">
        <SharedTable_C<T>
          data={data}
          headRows={headRows}
          keyExtractor={keyExtractor}
          language={language}
          renderCells={renderCells}
          renderActions={renderActions}
        />
      </div>
      <div className="block sm:hidden space-y-4">
        {data.map((item) => (
          <Card key={keyExtractor(item)} className="w-full">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                {/* Image (First cell) */}
                <div className="flex-shrink-0">{renderCells(item)[0]}</div>
                {/* Stacked Data (Remaining cells) */}
                <div className="flex-1 space-y-2">
                  {renderCells(item)
                    .slice(1)
                    .map((cell, index) => (
                      <div
                        key={index}
                        className={cn(
                          "text-sm",
                          language === "ar" ? "text-right" : "text-left"
                        )}
                      >
                        <span className="font-medium">
                          {headRows[index + 1]?.title}:{" "}
                        </span>
                        {cell}
                      </div>
                    ))}
                </div>
                {/* Actions */}
                {renderActions && (
                  <div className="flex-shrink-0">{renderActions(item)}</div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
