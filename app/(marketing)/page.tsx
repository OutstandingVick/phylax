import { MarketingNav } from "@/components/layout/marketing-nav";
import { RedesignedHome } from "@/components/marketing/redesigned-home";

export default function Home() {
  return (
    <main className="phylax-page-gradient min-h-screen overflow-x-hidden text-main">
      <MarketingNav />
      <RedesignedHome />
    </main>
  );
}
