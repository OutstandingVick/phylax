import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: {
    default: "Phylax — Autonomous Guardian for xStocks & RWA Portfolios",
    template: "%s — Phylax"
  },
  description:
    "Monitor portfolio risk, detect unsafe approvals, simulate safer allocations, and give autonomous agents a security check before they move tokenized capital.",
  openGraph: {
    title: "Phylax — Autonomous Guardian for xStocks & RWA Portfolios",
    description:
      "Risk, approval, payment, and execution preflight infrastructure for autonomous xStocks and RWA portfolios.",
    images: ["/brand/phylax-og.svg"]
  },
  twitter: {
    card: "summary_large_image",
    title: "Phylax — Autonomous Guardian for xStocks & RWA Portfolios",
    description: "Before autonomous agents move tokenized capital, they should ask Phylax whether the action is safe."
  },
  icons: {
    icon: "/brand/phylax-app-icon.svg",
    apple: "/brand/phylax-app-icon.svg"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(()=>{try{const t=localStorage.getItem('phylax-theme');const light=t==='light'||(!t&&matchMedia('(prefers-color-scheme: light)').matches);document.documentElement.classList.toggle('light',light);document.documentElement.classList.toggle('dark',!light)}catch{}})();"
          }}
        />
        {children}
      </body>
    </html>
  );
}
