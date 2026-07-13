import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { PhylaxLogo } from "@/components/brand/phylax-logo";

const links = ["Product", "Security", "Use Cases", "Pricing", "Docs"];

export function MarketingNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/82 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-5 px-6 py-4 lg:px-11">
        <PhylaxLogo />
        <nav className="hidden items-center gap-11 text-sm font-semibold text-main md:flex">
          {links.map((link) => (
            link === "Docs" ? (
              <Link key={link} href="/dashboard/docs" className="inline-flex items-center gap-1 hover:text-primary">
                {link}
              </Link>
            ) : (
              <a key={link} href={`#${link.toLowerCase().replaceAll(" ", "-")}`} className="inline-flex items-center gap-1 hover:text-primary">
                {link}
                {link === "Product" && <ChevronDown className="h-3 w-3" />}
              </a>
            )
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link href="/dashboard"><Button className="px-6">Launch with Phylax <ArrowRight className="h-4 w-4" /></Button></Link>
        </div>
      </div>
      <nav className="mx-auto flex max-w-[1440px] gap-7 overflow-x-auto border-t border-border px-6 py-3 text-xs font-bold text-main md:hidden">
        {links.map((link) => (
          link === "Docs" ? (
            <Link key={link} href="/dashboard/docs" className="inline-flex shrink-0 items-center gap-1 hover:text-primary">
              {link}
            </Link>
          ) : (
            <a key={link} href={`#${link.toLowerCase().replaceAll(" ", "-")}`} className="inline-flex shrink-0 items-center gap-1 hover:text-primary">
              {link}
              {link === "Product" && <ChevronDown className="h-3 w-3" />}
            </a>
          )
        ))}
      </nav>
    </header>
  );
}
