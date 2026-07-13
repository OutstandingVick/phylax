import { AppHeader } from "@/components/layout/app-header";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { MobileAppNav } from "@/components/layout/mobile-app-nav";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background text-main">
      <AppSidebar />
      <div className="min-w-0 flex-1">
        <AppHeader />
        <main className="mx-auto max-w-7xl p-4 pb-24 md:p-6 lg:pb-6">{children}</main>
        <MobileAppNav />
      </div>
    </div>
  );
}
