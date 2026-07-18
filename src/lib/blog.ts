import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface BlogPost {
  metadata: {
    title: string;
    publishedAt: string;
    summary: string;
    tag: string;
    image: string;
    github?: string;
  };
  slug: string;
  content: string;
}

const POSTS_DIR = path.join(process.cwd(), "content", "blog");

function getMDXFiles(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((file) => path.extname(file) === ".mdx");
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
    },
    slug: path.basename(filePath, path.extname(filePath)),
    content,
  };
}

export function getPosts(): BlogPost[] {
  const files = getMDXFiles();
  const posts = files.map((file) => readMDXFile(path.join(POSTS_DIR, file)));

  // Sort by publishedAt descending
  return posts.sort(
    (a, b) =>
      new Date(b.metadata.publishedAt).getTime() -
      new Date(a.metadata.publishedAt).getTime()
  );
}

export function findPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  return readMDXFile(filePath);
}
