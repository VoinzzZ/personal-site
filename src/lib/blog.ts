import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Language } from "@/i18n/translations";

export interface BlogPost {
  metadata: {
    title: string;
    publishedAt: string;
    summary: string;
    tag: string;
    image: string;
    github?: string;
    site?: string;
    stack: string[];
  };
  slug: string;
  content: string;
}

const POSTS_DIR = path.join(process.cwd(), "content", "blog");

function getMDXFiles(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs.readdirSync(POSTS_DIR).filter((file) => path.extname(file) === ".mdx");
}

function postFileName(slug: string, language: Language): string {
  return language === "id" ? `${slug}.id.mdx` : `${slug}.mdx`;
}

function readMDXFile(filePath: string): BlogPost {
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    metadata: {
      title: data.title || "",
      publishedAt: data.publishedAt || "",
      summary: data.summary || "",
      tag: data.tag || "",
      image: data.image || "",
      github: data.github || "",
      site: data.site || "",
      stack: data.stack || [],
    },
    slug: path.basename(filePath, path.extname(filePath)).replace(/\.id$/, ""),
    content,
  };
}

function postFilePath(slug: string, language: Language): string {
  return path.join(POSTS_DIR, language === "id" ? `${slug}.id.mdx` : `${slug}.mdx`);
}

export function getPosts(language: Language = "en"): BlogPost[] {
  const files = getMDXFiles();
  const posts = files
    .filter((file) =>
      language === "id" ? file.endsWith(".id.mdx") : !file.endsWith(".id.mdx"),
    )
    .map((file) => readMDXFile(path.join(POSTS_DIR, file)));

  // Sort by publishedAt descending
  return posts.sort(
    (a, b) =>
      new Date(b.metadata.publishedAt).getTime() -
      new Date(a.metadata.publishedAt).getTime(),
  );
}

export function findPostBySlug(slug: string, language: Language = "en"): BlogPost | null {
  const preferred = postFilePath(slug, language);
  const fallback = postFilePath(slug, language === "id" ? "en" : "id");

  if (fs.existsSync(preferred)) return readMDXFile(preferred);
  if (fs.existsSync(fallback)) return readMDXFile(fallback);
  return null;
}
