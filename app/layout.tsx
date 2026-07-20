import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const socialImageUrl = `${siteUrl.replace(/\/$/, "")}/og.png`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: siteUrl,
  },
  title: "Moralis — Discover Your Celestial Familiar",
  description:
    "A cinematic moral alignment and zodiac quiz that reveals your anime-style celestial animal familiar.",
  applicationName: "Moralis",
  keywords: [
    "D&D alignment quiz",
    "moral alignment",
    "zodiac",
    "animal avatar",
    "celestial familiar",
  ],
  openGraph: {
    url: siteUrl,
    siteName: "Moralis",
    title: "Moralis — What Shape Does Your Soul Take?",
    description:
      "Discover the celestial animal familiar formed by your moral alignment, zodiac, and a thread of chance.",
    type: "website",
    images: [
      {
        url: socialImageUrl,
        width: 1733,
        height: 909,
        alt: "Moralis celestial fox familiar beneath the words What Shape Does Your Soul Take?",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Moralis — What Shape Does Your Soul Take?",
    description:
      "Discover the celestial animal familiar formed by your ethics and your stars.",
    images: [socialImageUrl],
  },
};

export const viewport: Viewport = {
  themeColor: "#060711",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
