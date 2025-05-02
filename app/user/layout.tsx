import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Service Marketplace",
  description: "Find and book services from trusted providers",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full">
      <div className="flex flex-col w-full min-h-screen items-center">
        <Navbar />
        <main className="max-w-[1400px] w-full">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
