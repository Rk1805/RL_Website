import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Rainbow Laminates | Premium Decorative Laminates in Bengaluru",
    template: "%s | Rainbow Laminates",
  },
  description:
    "Rainbow Laminates is an authorized distributor of Rosewood Laminates in Bengaluru — 450+ premium decorative laminate designs across Ranwood, Ranberry, Arica, Atina, Ranwood Rega and Dazzle Berry.",
  keywords: [
    "laminates",
    "decorative laminates",
    "Rosewood Laminates distributor",
    "laminates Bangalore",
    "sunmica",
    "interior surfaces",
    "Rainbow Laminates",
  ],
  authors: [{ name: "Rainbow Laminates" }],
  openGraph: {
    title: "Rainbow Laminates | Premium Decorative Laminates in Bengaluru",
    description:
      "Authorized distributor of Rosewood Laminates. Explore 450+ premium designs across six designer brands.",
    type: "website",
    locale: "en_IN",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#1c1917",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen antialiased">
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
