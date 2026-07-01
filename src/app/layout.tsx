import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/Header";
import { Preloader } from "@/components/Preloader";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.softbridgesolutions.com'),
  title: {
    template: '%s | Softbridge Solutions',
    default: 'Softbridge Solutions - Premium Domains & Websites',
  },
  description: "Get your premium domain and industry-specific website in one click. Experience the antigravity platform.",
  openGraph: {
    title: 'Softbridge Solutions',
    description: "Get your premium domain and industry-specific website in one click.",
    url: 'https://www.softbridgesolutions.com',
    siteName: 'Softbridge Solutions',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Softbridge Solutions',
    description: "Get your premium domain and industry-specific website in one click.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Softbridge Solutions",
    "url": "https://www.softbridgesolutions.com",
    "logo": "https://www.softbridgesolutions.com/logo.png"
  };

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased h-full`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-midnight-void text-star-white font-sans mesh-bg">
        <Preloader />
        <Header />
        {children}
      </body>
    </html>
  );
}
