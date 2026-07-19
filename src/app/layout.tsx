import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BootLoader from "@/components/ui/BootLoader";
import { FlickeringGrid } from "@/components/magicui/FlickeringGrid";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Antony Kurniawan — Software Engineer",
  description:
    "Personal portfolio of Antony Kurniawan — Software Engineer & Full Stack Developer specializing in clean architectures and scalable backend systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} h-full antialiased scroll-smooth dark`}
    >
      <body className="min-h-full bg-[#121212] text-white antialiased relative">
        <BootLoader>
          <FlickeringGrid
            className="fixed inset-0 z-0 mask-[radial-gradient(1000px_circle_at_center,white,transparent)]"
            squareSize={8}
            gridGap={6}
            color="#FFFFFF"
            maxOpacity={0.3}
            flickerChance={0.1}
          />
          <Navbar />
          <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {children}
          </main>
          <Footer />
          <Analytics />
          <SpeedInsights />
        </BootLoader>
      </body>
    </html>
  );
}
