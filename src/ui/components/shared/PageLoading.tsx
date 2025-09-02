/**
 * A reusable page loading component that displays a centered loading spinner
 * with an optional custom message.
 */
export const PageLoading = ({ message = "Loading..." }: { message?: string }) => {
  return (
    <div className="absolute top-0 left-0 h-screen w-full max-w-7xl z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="flex flex-col items-center">
        <div className="relative flex h-24 w-24 items-center justify-center">
          <div className="absolute h-20 w-20 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
        </div>
        <p className="mt-4 text-lg font-medium text-muted-foreground">
          {message}
        </p>
      </div>
    </div>
  );
};