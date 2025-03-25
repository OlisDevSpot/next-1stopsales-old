import type { Metadata } from "next";
import "./globals.css";
import { Nunito, Syne } from "next/font/google";
import FinalClerkConvexProvider from "@/components/final-clerk-convex-provider";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
});

export const metadata: Metadata = {
  title: "Next 1StopSales",
  description: "The leading construction assessment platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <FinalClerkConvexProvider>
      <html lang="en">
        <body className={`${nunito.className} ${syne.variable} antialiased`}>
          {children}
        </body>
      </html>
    </FinalClerkConvexProvider>
  );
}
