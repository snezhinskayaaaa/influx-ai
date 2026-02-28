import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Influx.AI - The First Marketplace for AI Influencers",
  description: "Browse verified virtual talent. Book campaigns in minutes. Track real results. The first dedicated marketplace connecting brands with AI influencers.",
  keywords: ["ai influencers", "virtual influencers", "ai influencer marketplace", "book ai influencers", "ai marketing", "virtual talent"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
