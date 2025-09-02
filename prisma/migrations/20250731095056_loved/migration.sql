-- CreateTable
CREATE TABLE "_ArtworkLikes" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ArtworkLikes_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ArtworkLikes_B_index" ON "_ArtworkLikes"("B");

-- AddForeignKey
ALTER TABLE "_ArtworkLikes" ADD CONSTRAINT "_ArtworkLikes_A_fkey" FOREIGN KEY ("A") REFERENCES "Artwork"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArtworkLikes" ADD CONSTRAINT "_ArtworkLikes_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
