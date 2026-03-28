import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SolanaProvider } from "@/providers/SolanaProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "./global.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Trustless Work — Escrow-as-a-Service on Solana",
  description:
    "Programmable stablecoin escrow payments on Solana. Build trustless payment flows with KYC/AML compliance, milestone tracking, and instant USDC settlement.",
  icons: {
    icon: "/tw.ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geist.variable} ${geistMono.variable} font-sans`}>
        <SolanaProvider>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </SolanaProvider>
      </body>
    </html>
  );
}
