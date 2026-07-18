export interface NavItem {
  name: string;
  href: string;
  sectionId?: string;
}

export const navItems: NavItem[] = [
  { name: "Home", href: "/", sectionId: "hero" },
  { name: "About", href: "/about", sectionId: "about" },
  { name: "Careers", href: "/careers", sectionId: "careers" },
  { name: "Journals", href: "/journals", sectionId: "journals" },
  { name: "Contact", href: "/contact", sectionId: "contact" },
];
