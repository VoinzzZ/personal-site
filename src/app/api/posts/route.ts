import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getPosts } from "@/lib/blog";
import type { Language } from "@/i18n/translations";

// Static content from disk — cache aggressively for any remaining clients
export const revalidate = 3600;

export async function GET(request: Request) {
  const cookieStore = await cookies();
  const language: Language =
    cookieStore.get("preferred-language")?.value === "id" ? "id" : "en";
  const posts = getPosts(language);
  const list = posts.map(({ metadata, slug }) => ({ metadata, slug }));
  return NextResponse.json(list, {
    headers: {
      "Cache-Control": "private, no-store",
    },
  });
}
