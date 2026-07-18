import { MDXRemote } from "next-mdx-remote/rsc";
import type { MDXRemoteProps } from "next-mdx-remote/rsc";

const components = {
  h2: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="text-xl font-bold text-white font-mono mt-10 mb-4"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className="text-lg font-semibold text-white font-mono mt-8 mb-3"
      {...props}
    >
      {children}
    </h3>
  ),
  p: ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="text-gray-300 font-mono text-sm leading-relaxed mb-4" {...props}>
      {children}
    </p>
  ),
  a: ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      href={href}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2"
      {...props}
    >
      {children}
    </a>
  ),
  ul: ({ children, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="list-disc list-inside text-gray-300 font-mono text-sm space-y-1 mb-4 ml-2" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="list-decimal list-inside text-gray-300 font-mono text-sm space-y-1 mb-4 ml-2" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="text-gray-300 font-mono text-sm leading-relaxed" {...props}>
      {children}
    </li>
  ),
  code: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <code
      className="bg-white/5 text-cyan-300 px-1.5 py-0.5 rounded text-xs font-mono"
      {...props}
    >
      {children}
    </code>
  ),
  pre: ({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      className="bg-black/40 border border-white/10 rounded-lg p-4 overflow-x-auto mb-6 text-sm font-mono text-gray-200"
      {...props}
    >
      {children}
    </pre>
  ),
  blockquote: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <blockquote
      className="border-l-4 border-cyan-500/50 pl-4 italic text-gray-400 font-mono text-sm mb-4"
      {...props}
    >
      {children}
    </blockquote>
  ),
  hr: (props: React.HTMLAttributes<HTMLHRElement>) => (
    <hr className="border-white/10 my-8" {...props} />
  ),
  table: ({ children, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="overflow-x-auto mb-6">
      <table className="w-full text-sm font-mono text-gray-300 border-collapse" {...props}>
        {children}
      </table>
    </div>
  ),
  th: ({ children, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th className="border border-white/10 px-3 py-2 text-left text-white font-semibold bg-white/5" {...props}>
      {children}
    </th>
  ),
  td: ({ children, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td className="border border-white/10 px-3 py-2" {...props}>
      {children}
    </td>
  ),
  img: ({ alt, src, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img
      alt={alt || ""}
      src={src}
      className="w-full rounded-lg border border-white/10 my-6"
      loading="lazy"
      {...props}
    />
  ),
  strong: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <strong className="text-white font-semibold" {...props}>
      {children}
    </strong>
  ),
};

type CustomMDXProps = MDXRemoteProps & {
  components?: typeof components;
};

export function CustomMDX(props: CustomMDXProps) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
    />
  );
}
