import { cookies } from "next/headers";
import { getPosts } from "@/lib/blog";
import JournalsPageContent from "@/components/journals/JournalsPageContent";
import type { Language } from "@/i18n/translations";

export default async function JournalsPage() {
  const cookieStore = await cookies();
  const language: Language =
    cookieStore.get("preferred-language")?.value === "id" ? "id" : "en";
  const posts = getPosts(language).map(({ metadata, slug }) => ({ metadata, slug }));

  return <JournalsPageContent posts={posts} />;
}
