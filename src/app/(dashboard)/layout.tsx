import AnimatedBackground from "@/ui/components/AnimatedBackground";
import { DashboardHeader } from "@/ui/components/dashboard/DashboardHeader";
import { DashboardNavMenu } from "@/ui/components/dashboard/DashboardNavMenu";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center">
      <AnimatedBackground />
      <div className="relative z-10 flex w-full max-w-7xl flex-1 flex-col px-4 sm:px-6 lg:px-8">
        {/* dashboard header */}
        <DashboardHeader />
        <main className="flex flex-1">{children}</main>
        {/* dashboard nave menu
         */}
        <DashboardNavMenu />
      </div>
    </div>
  );
};

export default DashboardLayout;
