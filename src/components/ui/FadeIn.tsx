"use client";

import type { ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  visible: boolean;
  /** Delay in ms before the transition starts. Default: 0 */
  delay?: number;
  /** Custom className merged onto the wrapper div */
  className?: string;
}

/**
 * FadeIn — wraps children with a CSS opacity + translateY transition
 * that activates when `visible` becomes true. The actual transition is
 * driven by Tailwind utility classes so it stays in the same styling
 * layer as the rest of the project.
 *
 * Usage:
 *   <FadeIn visible={inView} delay={200}>
 *     <YourComponent />
 *   </FadeIn>
 */
export default function FadeIn({ children, visible, delay = 0, className = "" }: FadeInProps) {
  return (
    <div
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.7s ease-out ${delay}ms, transform 0.7s ease-out ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}