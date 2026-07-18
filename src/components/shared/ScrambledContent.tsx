"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

gsap.registerPlugin(SplitText, ScrambleTextPlugin);

export default function ScrambledContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    let split: gsap.plugins.SplitText | null = null;

    const init = () => {
      // Cari paragraf dan heading yang ada di dalam
      const targets = el.querySelectorAll<HTMLElement>(
        "p, h1, h2, h3, h4, h5, h6, li, blockquote, td, th"
      );

      targets.forEach((t) => {
        if (t.dataset._scrambleDone) return;
        t.dataset._scrambleDone = "1";
      });
    };

    init();
    const mo = new MutationObserver(init);
    mo.observe(el, { childList: true, subtree: true });

    const handleMove = (e: PointerEvent) => {
      const targets = el.querySelectorAll<HTMLElement>(
        "p, h1, h2, h3, h4, h5, h6, li, blockquote, td, th"
      );

      targets.forEach((t) => {
        const rect = t.getBoundingClientRect();
        if (rect.width === 0) return;

        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);
        const dist = Math.hypot(dx, dy);

        if (dist < 120) {
          // Split jadi karakter dulu untuk efek per karakter
          split?.revert();
          split = SplitText.create(t, {
            type: "chars",
            charsClass: "inline-block",
          });

          split.chars.forEach((c) => {
            const ch = c as HTMLElement;
            const charDist = Math.hypot(
              e.clientX - (ch.getBoundingClientRect().left + ch.getBoundingClientRect().width / 2),
              e.clientY - (ch.getBoundingClientRect().top + ch.getBoundingClientRect().height / 2)
            );

            if (charDist < 100) {
              gsap.to(ch, {
                duration: 0.6,
                scrambleText: {
                  text: ch.dataset.content || ch.textContent || "",
                  chars: "!<>-_\\/[]{}—=+*^?#__ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
                  speed: 0.5,
                  revealDelay: 0.2,
                },
                ease: "none",
              });
            }
          });
        }
      });
    };

    el.addEventListener("pointermove", handleMove);

    return () => {
      mo.disconnect();
      el.removeEventListener("pointermove", handleMove);
      split?.revert();
    };
  }, []);

  return <div ref={rootRef}>{children}</div>;
}
