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
  SiLinux,
  SiGnubash,
  SiGooglecloud,
  SiLaravel,
  SiPhp,
  SiMysql,
} from "react-icons/si";
import { DiMsqlServer } from "react-icons/di";
import { FaAws, FaWindows } from "react-icons/fa";
import { SiPostman } from "react-icons/si";
import { TbBrandPowershell } from "react-icons/tb";
import { VscTerminalCmd } from "react-icons/vsc";
import { IoLogoVercel } from "react-icons/io5";

export interface Skill {
  name: string;
  icon: ReactNode;
  iconColor: string;
}

export const skills: Skill[] = [
  // Programming Languages
  { name: "TypeScript", icon: <SiTypescript />, iconColor: "#3178C6" },
  { name: "JavaScript", icon: <SiJavascript />, iconColor: "#F7DF1E" },
  { name: "Go", icon: <SiGo />, iconColor: "#00ADD8" },
  { name: "PHP", icon: <SiPhp />, iconColor: "#777BB4" },
  { name: "C++", icon: <SiCplusplus />, iconColor: "#00599C" },

  // Frameworks & Libraries
  { name: "React", icon: <SiReact />, iconColor: "#61DAFB" },
  { name: "React Native", icon: <SiReact />, iconColor: "#61DAFB" },
  { name: "Next.js", icon: <SiNextdotjs />, iconColor: "white" },
  { name: "Express.js", icon: <SiExpress />, iconColor: "white" },
  { name: "Laravel", icon: <SiLaravel />, iconColor: "#FF2D20" },
  { name: "Node.js", icon: <SiNodedotjs />, iconColor: "#339933" },
  { name: "Tailwind CSS", icon: <SiTailwindcss />, iconColor: "#06B6D4" },
  { name: "Ant Design", icon: <SiAntdesign />, iconColor: "#1677FF" },

  // Databases
  { name: "PostgreSQL", icon: <SiPostgresql />, iconColor: "#4169E1" },
  { name: "MongoDB", icon: <SiMongodb />, iconColor: "#47A248" },
  { name: "MySQL", icon: <SiMysql />, iconColor: "#4479A1" },
  { name: "SQL Server", icon: <DiMsqlServer />, iconColor: "#CC2927" },
  { name: "Supabase", icon: <SiSupabase />, iconColor: "#3FCF8E" },

  // DevOps & Cloud
  { name: "Git", icon: <SiGit />, iconColor: "#F05032" },
  { name: "Docker", icon: <SiDocker />, iconColor: "#2496ED" },
  { name: "Postman", icon: <SiPostman />, iconColor: "#FF6C37" },
  { name: "AWS", icon: <FaAws />, iconColor: "#FF9900" },
  { name: "GCP", icon: <SiGooglecloud />, iconColor: "#4285F4" },
  { name: "Vercel", icon: <IoLogoVercel />, iconColor: "#000000" },

  // OS & Terminal
  { name: "Linux", icon: <SiLinux />, iconColor: "#FCC624" },
  { name: "Windows", icon: <FaWindows />, iconColor: "#00ADEF" },
  { name: "PowerShell", icon: <TbBrandPowershell />, iconColor: "#5391FE" },
  { name: "Bash", icon: <SiGnubash />, iconColor: "#4EAA25" },
  { name: "CMD", icon: <VscTerminalCmd />, iconColor: "#4D4D4D" },
];
