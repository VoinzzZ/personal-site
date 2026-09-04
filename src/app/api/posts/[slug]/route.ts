import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { findPostBySlug } from "@/lib/blog";
import type { Language } from "@/i18n/translations";

export const revalidate = 3600;

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const cookieStore = await cookies();
  const language: Language =
    cookieStore.get("preferred-language")?.value === "id" ? "id" : "en";
  const post = findPostBySlug(slug, language);

  if (!post) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(post, {
    headers: {
      "Cache-Control": "private, no-store",
    },
  });
}
