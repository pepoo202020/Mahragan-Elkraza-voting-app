import React from "react";

export const GalleryFooter = () => {
  return (
    <footer className="bg-muted/30 border-t border-border mt-auto w-full">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center text-sm text-muted-foreground">
          <p>&copy; Abanob Shenoda Tawfik {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  );
};
