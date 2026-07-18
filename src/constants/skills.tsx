import type { ReactNode } from "react";
import {
  SiTypescript,
  SiGo,
  SiReact,
  SiNextdotjs,
  SiPostgresql,
  SiDocker,
  SiNodedotjs,
  SiExpress,
  SiGit,
  SiSupabase,
  SiTailwindcss,
  SiMongodb,
  SiAntdesign,
  SiJavascript,
  SiCplusplus,
} from "react-icons/si";
import { DiMsqlServer } from "react-icons/di";
import { FaAws } from "react-icons/fa";

export interface Skill {
  name: string;
  icon: ReactNode;
  iconColor: string;
}

export const skills: Skill[] = [
  { name: "TypeScript", icon: <SiTypescript />, iconColor: "#3178C6" },
  { name: "JavaScript", icon: <SiJavascript />, iconColor: "#F7DF1E" },
  { name: "Go", icon: <SiGo />, iconColor: "#00ADD8" },
  { name: "C++", icon: <SiCplusplus />, iconColor: "#00599C" },
  { name: "React", icon: <SiReact />, iconColor: "#61DAFB" },
  { name: "React Native", icon: <SiReact />, iconColor: "#61DAFB" },
  { name: "Next.js", icon: <SiNextdotjs />, iconColor: "white" },
  { name: "Express.js", icon: <SiExpress />, iconColor: "white" },
  { name: "Tailwind CSS", icon: <SiTailwindcss />, iconColor: "#06B6D4" },
  { name: "Ant Design", icon: <SiAntdesign />, iconColor: "#1677FF" },
  { name: "Node.js", icon: <SiNodedotjs />, iconColor: "#339933" },
  { name: "PostgreSQL", icon: <SiPostgresql />, iconColor: "#4169E1" },
  { name: "MongoDB", icon: <SiMongodb />, iconColor: "#47A248" },
  { name: "SQL Server", icon: <DiMsqlServer />, iconColor: "#CC2927" },
  { name: "Supabase", icon: <SiSupabase />, iconColor: "#3FCF8E" },
  { name: "Git", icon: <SiGit />, iconColor: "#F05032" },
  { name: "Docker", icon: <SiDocker />, iconColor: "#2496ED" },
  { name: "AWS", icon: <FaAws />, iconColor: "#FF9900" },
];
