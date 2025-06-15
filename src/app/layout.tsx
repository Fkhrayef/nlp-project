import type { Metadata } from "next";
import { Tajawal } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Arabic Text Analysis",
  description: "Arabic Text Classification, Summarization, and Analysis Tool",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${tajawal.className} text-sm text-foreground bg-background min-h-screen`}>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
