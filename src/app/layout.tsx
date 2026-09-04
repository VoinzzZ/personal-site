import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { cookies } from "next/headers";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BootLoader from "@/components/ui/BootLoader";
import { FlickeringGrid } from "@/components/magicui/FlickeringGrid";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import type { Language } from "@/i18n/translations";
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
  title: "Antony — Site",
  description:
    "Personal portfolio of Antony Kurniawan — Software Engineer & Full Stack Developer specializing in clean architectures and scalable backend systems.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const language: Language =
    cookieStore.get("preferred-language")?.value === "id" ? "id" : "en";

  return (
    <html
      lang={language}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth dark`}
    >
      <body className="min-h-full bg-[#121212] text-white antialiased relative">
        <LanguageProvider initialLanguage={language}>
          <BootLoader>
            <FlickeringGrid
              className="fixed inset-0 z-0 mask-[radial-gradient(1000px_circle_at_center,white,transparent)]"
              squareSize={8}
              gridGap={6}
              color="#FFFFFF"
              maxOpacity={0.15}
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
        </LanguageProvider>
      </body>
    </html>
  );
}
