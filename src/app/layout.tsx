import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tamba Las Vegas | Contemporary Indian Fine Dining",
  description:
    "Rooted in Tradition. Experience Michelin-recognized Chef Anand Singh's bold flavors, innovative techniques, and the vibrant spirit of India through live-fire cooking. Town Square, Las Vegas.",
  keywords: [
    "Tamba Las Vegas",
    "Indian restaurant Las Vegas",
    "fine dining Las Vegas",
    "tandoor",
    "contemporary Indian cuisine",
    "Bar Jadu",
    "Chef Anand Singh",
    "Town Square Las Vegas",
    "live fire cooking",
    "Josper",
    "Indian cocktails",
  ],
  openGraph: {
    title: "Tamba Las Vegas | Contemporary Indian Fine Dining",
    description:
      "Rooted in Tradition. Bold flavors, innovative techniques, and the vibrant spirit of India.",
    url: "https://www.tambalasvegas.com",
    siteName: "Tamba Las Vegas",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tamba Las Vegas | Contemporary Indian Fine Dining",
    description:
      "Rooted in Tradition. Experience live-fire cooking at its finest.",
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
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${playfair.variable} antialiased bg-tamba-obsidian text-tamba-cream`}
      >
        {children}
      </body>
    </html>
  );
}
