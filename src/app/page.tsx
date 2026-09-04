import { cookies } from "next/headers";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import CareersSection from "@/components/sections/CareersSection";
import JournalsSection from "@/components/sections/JournalsSection";
import ContactSection from "@/components/sections/ContactSection";
import { getPosts } from "@/lib/blog";
import type { Language } from "@/i18n/translations";

export default async function Home() {
  const cookieStore = await cookies();
  const language: Language =
    cookieStore.get("preferred-language")?.value === "id" ? "id" : "en";

  // Read posts on the server so the homepage doesn't wait on /api/posts (TTFB)
  const posts = getPosts(language)
    .slice(0, 3)
    .map(({ metadata, slug }) => ({ metadata, slug }));

  return (
    <>
      <HeroSection />
      <AboutSection />
      <CareersSection />
      <JournalsSection posts={posts} />
      <ContactSection />
    </>
  );
}
