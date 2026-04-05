# Soham — Portfolio

Vite + React 18 + TypeScript + Tailwind portfolio with a WebGL shader background (NeuralNoise), Lenis smooth scroll, and Framer Motion reveal animations.

## Quick start

```bash
npm install
npm run dev
```

Visit `http://localhost:5173`.

## Build

```bash
npm run build
npm run preview
```

## Structure

```
src/
├── App.tsx                  # shell: shader bg + nav + sections
├── main.tsx
├── index.css                # tailwind + lenis styles
├── components/
│   ├── ui/
│   │   └── neural-noise.tsx # WebGL shader background (21st.dev component)
│   ├── Nav.tsx              # fixed top nav w/ scroll-to-section
│   ├── GradientBlob.tsx     # optional accent (not mounted by default)
│   ├── Reveal.tsx           # fade-up on scroll wrapper
│   └── SectionTitle.tsx     # big section labels
├── sections/
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Skills.tsx
│   ├── Projects.tsx
│   ├── Education.tsx
│   └── Contact.tsx
├── hooks/
│   └── useSmoothScroll.ts   # Lenis setup + scrollToId helper
└── data/
    └── content.ts           # ALL copy lives here — edit this file
```

## Editing content

All copy (name, tagline, about, skills, projects, education, contact) lives in **`src/data/content.ts`**. You shouldn't need to touch section components to update text.

## Tweaking the shader

In `App.tsx`, adjust the `NeuralNoise` props:

```tsx
<NeuralNoise
  color={[0.9, 0.2, 0.4]}  // RGB 0-1, try [0.4, 0.3, 0.9] for violet
  opacity={0.95}
  speed={0.001}             // higher = faster drift
/>
```

## Adding 21st.dev components later

The project follows shadcn conventions: drop new components into `src/components/ui/`. The `@/*` path alias is already configured in `tsconfig.app.json` and `vite.config.ts`, so `import { X } from '@/components/ui/x'` works out of the box.

## Smooth scroll

Lenis is initialized once in `App.tsx` via `useSmoothScroll()`. Any nav click uses the `scrollToId(id)` helper for buttery scrolling. To anchor a new section, give it an `id` and add an entry in `Nav.tsx`'s `NAV_ITEMS`.
