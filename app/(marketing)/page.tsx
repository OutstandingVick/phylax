import { MarketingNav } from "@/components/layout/marketing-nav";
import { RedesignedHome } from "@/components/marketing/redesigned-home";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-background text-main">
      <MarketingNav />
      <RedesignedHome />
    </main>
  );
}
