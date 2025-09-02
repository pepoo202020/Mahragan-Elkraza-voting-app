import AnimatedBackground from "@/ui/components/AnimatedBackground";
import { AuthHeader } from "@/ui/components/auth/AuthHeader";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center">
      <AnimatedBackground />
      <div className="relative z-10 flex w-full max-w-7xl flex-1 flex-col px-4 sm:px-6 lg:px-8">
        <AuthHeader />
        <main className="flex flex-1 mb-5">{children}</main>
      </div>
    </div>
  );
};

export default AuthLayout;
