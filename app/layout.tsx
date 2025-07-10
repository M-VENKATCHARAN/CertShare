import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Header } from "../components/header/header";
import { Footer } from "../components/footer/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mailmodo Achievers | Find & Share Your Course Certificates Easily",
  description:
    "Find your Mailmodo certificates on Achievers. Download, verify, and share them to showcase your email marketing skills.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}

        <Toaster />
        <Footer />
      </body>
    </html>
  );
}
