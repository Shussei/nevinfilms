import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import AnimatedBackground from "@/components/AnimatedBackground";
import SmoothScroller from "@/components/SmoothScroller";
import CustomCursor from "@/components/CustomCursor";

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nevin Joseph — Director & Cinematographer",
  description:
    "Portfolio of Nevin Joseph, a film director and cinematographer crafting visual stories through emotion, tension, and scale.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${playfair.variable} ${inter.variable}`} suppressHydrationWarning>
        <CustomCursor />
        <AnimatedBackground />
        <div className="cinematic-overlay" />
        <SmoothScroller>
          {children}
        </SmoothScroller>
      </body>
    </html>
  );
}
