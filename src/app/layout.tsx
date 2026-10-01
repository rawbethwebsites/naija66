import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Naija 66 — Celebrate Nigeria's Achievements",
  description:
    "Play mini-games powered by Nigeria's real achievements. 66 seconds. 66 stories. One nation. Happy 66th Independence Day!",
  openGraph: {
    title: "Naija 66 — What's Your 66?",
    description:
      "Nigeria's 66th Independence Day celebration game. Discover real achievements through play.",
    type: "website",
    locale: "en_NG",
    siteName: "Naija 66",
  },
  twitter: {
    card: "summary_large_image",
    title: "Naija 66 — What's Your 66?",
    description:
      "Nigeria's 66th Independence Day celebration game. Discover real achievements through play.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#1B1464",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
