import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/nav/Navbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Himba Coffee — Born in the Himalayas. Brewed Everywhere.",
    template: "%s — Himba Coffee",
  },
  description:
    "The ultimate French Press travel tumbler. Customize yours and order via WhatsApp for 99 AED.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-[#0A0A0A] text-[#F2F2F2]">
        <Navbar />
        <div className="flex flex-1 flex-col pt-16 md:pt-[4.25rem]">
          {children}
        </div>
      </body>
    </html>
  );
}
