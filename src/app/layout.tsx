import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { Header } from "@/components/Header";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Softbridge Orbit - Premium Domains & Websites",
  description: "Get your premium domain and industry-specific website in one click. Experience the antigravity platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${spaceGrotesk.variable} antialiased h-full`}>
      <body className="min-h-full flex flex-col bg-deep-void text-white font-sans mesh-bg">
        <Header />
        {children}
      </body>
    </html>
  );
}

