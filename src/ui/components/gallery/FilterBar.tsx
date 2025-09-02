import { LanguageType, TranslationKeys } from "@/ui/contexts/LanguageContext";
import { Search_C } from "../shared/Search_C";
import { SharedSelectItem } from "../shared/SharedSelectItem";
import { getAllYears } from "@/ui/services/getAllYears";

interface IFilterBarProps {
  selectedYear: string;
  setSelectedYear: (year: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  years: string[];
  language: LanguageType;
  categories: { value: string; label: { en: string; ar: string } }[];
  sortBy: string;
  setSortBy: (sortBy: string) => void;
  sortOptions: { value: string; label: { en: string; ar: string } }[];
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
  resetFilters: () => void;
  t: (key: TranslationKeys) => string;
}

export const FilterBar = ({
  selectedYear,
  setSelectedYear,
  selectedCategory,
  setSelectedCategory,
  years,
  categories,
  language,
  sortBy,
  setSortBy,
  sortOptions,
  searchTerm,
  setSearchTerm,
  resetFilters,
  t,
}: IFilterBarProps) => {
  const allYears = getAllYears(years);

  return (
    <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm w-full">
      <div className="container mx-auto px-1 py-4">
        <div className="flex flex-col lg:flex-row gap-4 justify-between">
          {/* Search and Reset */}
          <Search_C
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
            resetBtn={resetFilters}
            placeholder={t("searchArtworks")}
          />

          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            {/* Year Selection */}
            <SharedSelectItem
              language={language}
              options={allYears}
              value={selectedYear}
              onValueChange={setSelectedYear}
            />

            {/* Category Filter */}
            <SharedSelectItem
              language={language}
              options={categories}
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            />

            {/* Sort By */}
            <SharedSelectItem
              language={language}
              options={sortOptions}
              value={sortBy}
              onValueChange={setSortBy}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
