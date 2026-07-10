import { Github, Linkedin, Send, Twitter } from "lucide-react";
import { PhylaxLogo } from "@/components/brand/phylax-logo";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const groups = {
  Product: ["Guardian", "Monitoring", "Rebalancing", "Payments"],
  Company: ["About", "Careers", "Security", "Contact"],
  Resources: ["Docs", "API", "Webhooks", "Status"],
  Legal: ["Privacy", "Terms", "Disclosures", "DPA"]
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-background py-10">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-6 lg:grid-cols-[1.2fr_2fr_1fr] lg:px-11">
        <div>
          <PhylaxLogo />
          <p className="mt-5 max-w-xs text-sm leading-6 text-muted">Protecting value. Empowering investors. Securing the future.</p>
          <p className="mt-10 text-xs text-muted">© 2025 Phylax. All rights reserved.</p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {Object.entries(groups).map(([group, links]) => (
            <div key={group}>
              <h3 className="text-sm font-black">{group}</h3>
              <div className="mt-4 space-y-3 text-sm text-muted">{links.map((link) => <p key={link}>{link}</p>)}</div>
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
