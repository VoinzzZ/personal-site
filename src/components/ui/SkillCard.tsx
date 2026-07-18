"use client";

import { useState } from "react";
import type { ReactNode } from "react";

interface SkillCardProps {
  name: string;
  icon: ReactNode;
  iconColor?: string;
}

export default function SkillCard({ name, icon, iconColor }: SkillCardProps) {
  const [hovered, setHovered] = useState(false);
  const color = hovered && iconColor ? iconColor : "white";

  return (
    <div
      className="flex items-center gap-4 px-5 py-4 border border-white/10 rounded-lg bg-white/5 transition-all duration-300 hover:border-cyan-500 hover:shadow-[0_0_15px_-3px_#06b6d4]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span className="text-2xl transition-colors duration-300" style={{ color }}>
        {icon}
      </span>
      <span className="font-mono text-base text-gray-300">{name}</span>
    </div>
  );
}
