import { NextResponse } from "next/server";
import { getPosts } from "@/lib/blog";

export async function GET() {
  const posts = getPosts();
  const list = posts.map(({ metadata, slug }) => ({ metadata, slug }));
  return NextResponse.json(list);
}
