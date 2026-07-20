import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import CareersSection from "@/components/sections/CareersSection";
import JournalsSection from "@/components/sections/JournalsSection";
import ContactSection from "@/components/sections/ContactSection";
import { getPosts } from "@/lib/blog";

export default function Home() {
  // Read posts on the server so the homepage doesn't wait on /api/posts (TTFB)
  const posts = getPosts()
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
