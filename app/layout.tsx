import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Suspense } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { Navbar } from "@/app/ui/navbar";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Summarizer",
  description: "A summarizer for youtube videos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">

      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased bg-gray-50",
          fontSans.variable
        )}
      >
        <Navbar />
        <Suspense fallback={<AiOutlineLoading className="spin mx-auto mt-12" />}>
          {children}
        </Suspense>
      </body>
    </html >
  );
}
