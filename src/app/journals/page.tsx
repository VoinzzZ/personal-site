import Link from "next/link";
import { getPosts } from "@/lib/blog";
import TypingHeading from "@/components/effects/TypingHeading";
import FlipCard from "@/components/journals/FlipCard";

export default function JournalsPage() {
  const posts = getPosts().map(({ metadata, slug }) => ({ metadata, slug }));

  return (
    <section className="min-h-screen py-10 sm:py-20 px-4">
      <div className="w-full max-w-5xl mx-auto">
        <div className="mb-2">
          <TypingHeading text="$ LS -LA /JOURNALS" inView={true} />
        </div>
        <p className="text-gray-500 font-mono text-sm mt-1 mb-6 sm:mb-10">
          Total entries: {posts.length}
        </p>

        <div className="hidden md:block mb-8">
          <Link
            href="/#journals"
            className="inline-flex items-center gap-1 font-mono text-sm text-cyan-400 transition-colors subtle-blink"
          >
            <span className="text-cyan-400">root@personal-site:~/journals$</span>
            <span className="text-white">cd ..</span>
            <span className="text-cyan-400"> →</span>
          </Link>
        </div>

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {posts.map((post, index) => (
              <FlipCard key={post.slug} post={post} priority={index < 2} />
            ))}
          </div>
        ) : (
          <div className="border border-dashed border-gray-700 rounded-lg p-12 text-center">
            <p className="text-gray-500 font-mono text-base">
              <span className="text-yellow-500">$</span> No entries yet — currently
              building...
            </p>
          </div>
        )}

        <div className="hidden md:flex justify-end mt-8">
          <Link
            href="/#journals"
            className="inline-flex items-center gap-1 font-mono text-sm text-cyan-400 transition-colors subtle-blink"
          >
            <span className="text-cyan-400">root@personal-site:~/journals$</span>
            <span className="text-white">cd ..</span>
            <span className="text-cyan-400"> →</span>
          </Link>
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link
            href="/#journals"
            className="inline-flex items-center gap-1 font-mono text-sm text-cyan-400 transition-colors subtle-blink"
          >
            <span className="text-cyan-400">root@personal-site:~/journals$</span>
            <span className="text-white">cd ..</span>
            <span className="text-cyan-400"> →</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
