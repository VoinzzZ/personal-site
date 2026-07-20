"use client";

import dynamic from "next/dynamic";

// Defer canvas + gsap chunks until after first paint / idle.
// They are not required for LCP — only for the visual layer once content is on screen.

export const LazyFlickeringGrid = dynamic(
  () =>
    import("@/components/magicui/FlickeringGrid").then(
      (m) => ({ default: m.FlickeringGrid })
    ),
  { ssr: false }
);

export const LazyTerminal = dynamic(
  () =>
    import("@/components/ui/terminal").then((m) => ({ default: m.Terminal })),
  { ssr: false }
);

export const LazyTypingAnimation = dynamic(
  () =>
    import("@/components/ui/terminal").then((m) => ({
      default: m.TypingAnimation,
    })),
  { ssr: false }
);

export const LazyAnimatedSpan = dynamic(
  () =>
    import("@/components/ui/terminal").then((m) => ({
      default: m.AnimatedSpan,
    })),
  { ssr: false }
);

export const LazyScrambledText = dynamic(
  () =>
    import("@/components/effects/ScrambledText").then((m) => ({
      default: m.default,
    })),
  { ssr: false }
);

export const LazyScrambledContent = dynamic(
  () =>
    import("@/components/shared/ScrambledContent").then((m) => ({
      default: m.default,
    })),
  { ssr: false }
);
