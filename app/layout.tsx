import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Phylax | Autonomous Portfolio Guardian",
  description: "A2MCP-first Agent Service Provider for xStocks and RWA portfolio risk."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
