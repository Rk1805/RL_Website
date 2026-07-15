import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rainbow Laminates | Premium Decorative Surfaces",
  description:
    "Rainbow Laminates - Premium decorative laminates for modern interiors. Since 2013, we've been crafting beautiful surfaces with refined texture, quality, and modern color stories.",
  keywords: [
    "laminates",
    "decorative surfaces",
    "interior design",
    "wood finishes",
    "premium laminates",
    "Rainbow Laminates",
  ],
  authors: [{ name: "Rainbow Laminates" }],
  openGraph: {
    title: "Rainbow Laminates | Premium Decorative Surfaces",
    description:
      "Premium decorative laminates for modern interiors. Explore our collection of designer finishes.",
    type: "website",
    locale: "en_IN",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <meta name="theme-color" content="#1c1917" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}