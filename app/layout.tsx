import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Inter, Lora, Noto_Sans_Devanagari } from "next/font/google";
import "./globals.css";

// Fonts: Inter for the interface, Lora for headlines, Noto Sans Devanagari for हिन्दी and मराठी.
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const lora = Lora({ subsets: ["latin"], style: ["normal", "italic"], variable: "--font-lora" });
const devanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-devanagari",
});

export const metadata: Metadata = {
  title: { default: "Bhavishya — School, connected", template: "%s · Bhavishya" },
  description:
    "Attendance, marks, leave, certificates and announcements — one app for principals, teachers and parents, with an AI assistant built in.",
};

export const viewport: Viewport = {
  themeColor: "#17113D",
};

/** Shared by both versions. Version-specific layouts are in app/desktop and app/mobile. */
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${lora.variable} ${devanagari.variable}`}>
      <body className="bg-white font-sans text-ink antialiased">{children}</body>
    </html>
  );
}
