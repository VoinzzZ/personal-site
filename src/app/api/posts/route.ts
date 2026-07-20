import { NextResponse } from "next/server";
import { getPosts } from "@/lib/blog";

// Static content from disk — cache aggressively for any remaining clients
export const revalidate = 3600;

export async function GET() {
  const posts = getPosts();
  const list = posts.map(({ metadata, slug }) => ({ metadata, slug }));
  return NextResponse.json(list, {
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
