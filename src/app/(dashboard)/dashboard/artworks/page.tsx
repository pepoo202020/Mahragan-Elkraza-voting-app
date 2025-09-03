"use client";

import deleteArtwork from "@/actions/deleteArtwork";
import getArtworkById from "@/actions/getArtworkById";
import getArtworks from "@/actions/getArtworks";
import getYearsAvailable from "@/actions/getYearsAvailable";
import { Button } from "@/components/ui/button";
import { AddArtworkModal } from "@/ui/components/dashboard/artworks/AddArtworkModal";
import { EditArtworkDialog } from "@/ui/components/dashboard/artworks/EditArtworkDialog";
import { ViewArtworkDetailsDialog } from "@/ui/components/dashboard/artworks/ViewArtworkDetailsDialog";
import { useLanguage } from "@/ui/contexts/LanguageContext";
import { ArtworkType } from "../../../../../lib/generated/prisma";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import FilterArtwork from "@/ui/components/dashboard/artworks/FilterArtwork";
import { IArtworksWithVotes } from "@/ui/types/types";
import ArtworkDataShow from "@/ui/components/dashboard/artworks/ArtworkTable";
import SharedAlertDialog from "@/ui/components/shared/SharedAlertDialog";

export default function ArtworksPage() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<ArtworkType | "all">(
    "all"
  );
  const [yearFilter, setYearFilter] = useState<string>("all");
  const { language, t } = useLanguage();
  const [artworksData, setArtworksData] = useState<IArtworksWithVotes[]>([]);
  const [yearsAvailable, setYearsAvailable] = useState<{ year: string }[]>([]);
  const [addArtworkModalOpen, setAddArtworkModalOpen] =
    useState<boolean>(false);
  const [editArtworkModalOpen, setEditArtworkModalOpen] =
    useState<boolean>(false);
  const [viewDetailsOpen, setViewDetailsOpen] = useState<boolean>(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [selectedArtwork, setSelectedArtwork] =
    useState<IArtworksWithVotes | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchArtworks = async () => {
    try {
      setIsLoading(true);
      const [artworks, allYears] = await Promise.all([
        getArtworks(),
        getYearsAvailable(),
      ]);
      setArtworksData(artworks);
      setYearsAvailable(allYears.map((year) => ({ year })));
    } catch (error) {
      console.error(error);
      toast.error(t("failedToLoadArtworks"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewArtworkDetails = async (artworkId: string) => {
    if (selectedArtwork) return; // Prevent opening if another dialog is active
    try {
      setIsLoading(true);
      const artwork = await getArtworkById(artworkId);
      if (artwork) {
        setSelectedArtwork(artwork.artwork as unknown as IArtworksWithVotes);
        setViewDetailsOpen(true);
      }
    } catch (error) {
      toast.error(t("failedToLoadArtworkDetails"));
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditArtwork = async (artworkId: string) => {
    if (selectedArtwork) return; // Prevent opening if another dialog is active
    try {
      setIsLoading(true);
      const artwork = await getArtworkById(artworkId);
      if (artwork) {
        setSelectedArtwork(artwork.artwork as unknown as IArtworksWithVotes);
        setEditArtworkModalOpen(true);
      }
    } catch (error) {
      toast.error(t("failedToLoadArtworkForEditing"));
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteArtwork = (artwork: IArtworksWithVotes) => {
    if (selectedArtwork) return; // Prevent opening if another dialog is active
    setSelectedArtwork(artwork);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteArtwork = async () => {
    if (!selectedArtwork) return;

    try {
      setIsLoading(true);
      const result = await deleteArtwork(selectedArtwork.id);

      if (result.success) {
        toast.success(t("artworkDeletedSuccessfully"));
        fetchArtworks();
      } else {
        toast.error(t("failedToDeleteArtwork"));
      }
    } catch (error) {
      toast.error(t("anErrorOccurred"));
      console.error(error);
    } finally {
      setSelectedArtwork(null); // Clear selectedArtwork
      setIsLoading(false);
      setDeleteDialogOpen(false); // Ensure dialog is closed
      fetchArtworks();
    }
  };

  useEffect(() => {
    fetchArtworks();
  }, [fetchArtworks]);

  // Handle artwork added event
  const handleArtworkAdded = () => {
    fetchArtworks();
  };

  const filteredArtworks = artworksData.filter((artwork) => {
    const matchesSearch =
      artwork.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artwork.author.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      categoryFilter === "all" || artwork.type === categoryFilter;

    const matchesYear = yearFilter === "all" || artwork.year === yearFilter;

    return matchesSearch && matchesCategory && matchesYear;
  });

  return (
    <main
      className="flex-1 p-6 animate-fade-in"
      dir={language === "en" ? "ltr" : "rtl"}
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold tracking-tight">
              {t("artworkManagement")}
            </h1>
            <p className="text-muted-foreground">
              {t("manageAllArtworksInYourGallery")}
            </p>
          </div>
          <Button
            className="flex items-center gap-2"
            onClick={() => setAddArtworkModalOpen(true)}
            disabled={isLoading}
          >
            <Plus className="w-4 h-4" />
            {t("addArtwork")}
          </Button>
        </div>
        {/* Filters */}
        <FilterArtwork
          categoryFilter={categoryFilter}
          searchTerm={searchTerm}
          setCategoryFilter={setCategoryFilter}
          setSearchTerm={setSearchTerm}
          setYearFilter={setYearFilter}
          t={t}
          yearFilter={yearFilter}
          yearsAvailable={yearsAvailable}
          language={language}
        />
        {/* Artworks Table */}
        <ArtworkDataShow
          filteredArtworks={filteredArtworks}
          handleDeleteArtwork={handleDeleteArtwork}
          handleEditArtwork={handleEditArtwork}
          handleViewArtworkDetails={handleViewArtworkDetails}
          isLoading={isLoading}
          t={t}
          language={language}
        />
      </div>
      <AddArtworkModal
        open={addArtworkModalOpen}
        onClose={() => setAddArtworkModalOpen(false)}
        onArtworkAdded={handleArtworkAdded}
      />
      {selectedArtwork && (
        <>
          <ViewArtworkDetailsDialog
            open={viewDetailsOpen}
            onClose={() => {
              setViewDetailsOpen(false);
              setSelectedArtwork(null); // Clear selectedArtwork when closing
            }}
            artwork={{ ...selectedArtwork, lovedBy: [] }}
            language={language}
            t={t}
          />
          <EditArtworkDialog
            open={editArtworkModalOpen}
            onClose={() => {
              setEditArtworkModalOpen(false);
              setSelectedArtwork(null); // Clear selectedArtwork when closing
            }}
            artwork={selectedArtwork}
            onArtworkUpdated={fetchArtworks}
            t={t}
            language={language}
          />
        </>
      )}
      <SharedAlertDialog
        action={confirmDeleteArtwork}
        cancel
        description={t("deleteArtworkDescription")}
        isLoading={isLoading}
        onClose={() => {
          setDeleteDialogOpen(false);
          setSelectedArtwork(null);
        }} // Use custom handler
        open={deleteDialogOpen}
        t={t}
        title={t("deleteTitle")}
        lang={language}
      />
    </main>
  );
}
