# Antony Kurniawan — Personal Portfolio

> Software Engineer & Full Stack Developer specializing in clean software architectures and scalable backend systems.

Built with [Next.js](https://nextjs.org) (App Router), TypeScript, and Tailwind CSS v4.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS v4, shadcn/ui, tw-animate-css |
| **UI / Effects** | react-icons, custom canvas-based glitch & flickering-grid effects |
| **Fonts** | Geist (Vercel), Space Grotesk |
| **Tooling** | pnpm, ESLint, Prettier |

## Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles, CSS variables, keyframes
│   ├── layout.tsx           # Root layout — fonts, Navbar, FlickeringGrid background
│   └── page.tsx             # Home page — Hero + About sections
├── components/
│   ├── effects/             # Visual effects
│   │   ├── LetterGlitch.tsx
│   │   └── TypingHeading.tsx
│   ├── layout/              # Layout components
│   │   └── Navbar.tsx
│   ├── magicui/             # Third-party-style effects
│   │   └── FlickeringGrid.tsx
│   ├── sections/            # Page sections
│   │   └── AboutSection.tsx
│   └── ui/                  # Shared UI primitives
│       └── SkillCard.tsx
├── constants/               # Static data & site config
│   ├── index.ts             # Barrel exports
│   ├── navigation.ts        # Nav items array
│   ├── site.ts              # Site metadata (name, tagline, location)
│   └── skills.ts            # Skills list with icons
└── lib/
    └── utils.ts             # Utility helpers (cn, etc.)
```

## Getting Started

```bash
pnpm install       # Install dependencies
pnpm dev           # Start development server at localhost:3000
pnpm build         # Production build
pnpm lint          # Run ESLint
pnpm format        # Format code with Prettier
```

## Author

**Antony Kurniawan** — Surabaya City, Indonesia

Available for Remote & Local WFO opportunities.
