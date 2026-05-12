// app/layout.tsx
import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});


// 1. Font Optimization: Next.js downloads this font at build time. 
// Result: Zero layout shift (CLS) and no external network calls to Google Fonts.
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

// 2. SEO & Open Graph Metadata
export const metadata: Metadata = {
  title: "Briefly AI | Smart Content Summarizer",
  description: "Instantly summarize articles, meetings, and code using Google Gemini AI.",
  openGraph: {
    title: "Briefly AI | Smart Content Summarizer",
    description: "Instantly summarize articles, meetings, and code using Google Gemini AI.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      {/* We apply the optimized font and some base Tailwind classes to the body */}
      <body className={`${inter.variable} font-sans antialiased bg-slate-50 text-slate-900`}>
        {children}
      </body>
    </html>
  );
}