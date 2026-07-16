import Link from "next/link";
import { Github, Linkedin, Send, Twitter } from "lucide-react";
import { PhylaxLogo } from "@/components/brand/phylax-logo";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const groups = {
  Product: [["Guardian", "/dashboard"], ["Monitoring", "/dashboard/portfolio"], ["Rebalancing", "/dashboard/rebalance"], ["Payments", "/docs#business-model"]],
  Company: [["About", "/docs#overview"], ["Security", "/docs#verification"], ["Contact", "https://github.com/OutstandingVick/phylax"]],
  Resources: [["Docs", "/docs"], ["API", "/docs#api"], ["SDK", "/docs#sdk"], ["Evidence", "/dashboard/evidence"]],
  Legal: [["Limitations", "/docs#limitations"], ["Disclosures", "/docs#limitations"]]
} as const;

export function Footer() {
  return (
    <footer className="border-t border-border bg-background py-10">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-6 lg:grid-cols-[1.2fr_2fr_1fr] lg:px-11">
        <div>
          <PhylaxLogo />
          <p className="mt-5 max-w-xs text-sm leading-6 text-muted">Protecting value. Empowering agents. Securing the future.</p>
          <p className="mt-6 text-xs leading-5 text-muted">Phylax provides portfolio risk analysis, not financial advice. Execution is simulated in the MVP unless a verified wallet adapter is configured.</p>
          <p className="mt-10 text-xs text-muted">© 2026 Phylax. All rights reserved.</p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {Object.entries(groups).map(([group, links]) => (
            <div key={group}>
              <h3 className="text-sm font-black">{group}</h3>
              <div className="mt-4 grid gap-3 text-sm text-muted">
                {links.map(([label, href]) => href.startsWith("http") ? (
                  <a key={label} href={href} target="_blank" rel="noreferrer" className="hover:text-main">{label}</a>
                ) : (
                  <Link key={label} href={href} className="hover:text-main">{label}</Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div>
          <h3 className="text-sm font-black">Stay updated</h3>
          <p className="mt-3 text-sm leading-6 text-muted">Get the latest product updates and security insights.</p>
          <div className="mt-5 flex gap-2">
            <Input placeholder="Enter your email" />
            <Button className="h-10 w-12 p-0"><Send className="h-4 w-4" /></Button>
          </div>
          <div className="mt-7 flex gap-2">
            {[Twitter, Github, Linkedin].map((Icon, index) => <Button key={index} variant="ghost" className="h-9 w-9 p-0"><Icon className="h-4 w-4" /></Button>)}
          </div>
        </div>
      </div>
    </footer>
  );
}
