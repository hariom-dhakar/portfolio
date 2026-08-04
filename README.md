# Enterprise AI Engineer Portfolio

[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=flat-square&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.2-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4.3-38BDF8?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.4-0055FF?style=flat-square&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![License](https://img.shields.io/badge/License-MIT-emerald?style=flat-square)](LICENSE)

A high-performance, enterprise-grade AI Engineer portfolio application designed like a modern product landing page and interactive engineering knowledge base. Inspired by Apple, OpenAI, Linear, Vercel, and Obsidian.

Designed and engineered by **Hariom Dhakar** (AI Engineer @ Celebal Technologies, Databricks Certified Generative AI Engineer Associate).

---

## Overview

This portfolio goes beyond static resume pages by treating developer portfolio design as a high-end product engineering challenge. It showcases production-grade multi-agent architectures, retrieval-augmented generation (RAG) pipelines, LLM guardrails, and software engineering capabilities through interactive, data-driven components.

### Key Highlights
- **Obsidian Engineering Knowledge Base**: Dual-mode skills view featuring an interactive tree hierarchy with deep code inspectability alongside a recruiter-friendly quick grid view.
- **Sticky Live Architecture Pipelines**: Per-project execution flow diagrams that visualize FHIR record parsing, vector indexing, multi-agent delegation, and RAGAS evaluations step-by-step.
- **Hardware-Accelerated Dual Theme Engine**: Custom semantic design token system switching between a **Deep Navy & Warm Gold** dark palette and an **Indira Prieto-inspired Warm Cream & Pink** light palette.
- **60+ FPS Motion & Canvas Architecture**: Math-optimized HTML5 Canvas neural backdrop with pre-squared distance checks, mouse spotlight tracking, and viewport auto-pausing.

---

## Live Demo

- **Portfolio URL**: [https://hariomdhakar.dev](https://github.com/hariom-dhakar/portfolio) *(Update with live deployment link)*
- **GitHub Repository**: [https://github.com/hariom-dhakar/portfolio](https://github.com/hariom-dhakar/portfolio)

---

## Features

- **Interactive Hero & Role Ticker**: Animated role rotator (`AI Engineer`, `GenAI Engineer`, `Agentic AI Engineer`) with radial ambient lighting and smooth scroll prompts.
- **Engineering Metrics & Education**: Real-time spring-animated counter metrics highlighting production systems, deployed agents, automation percentages, and DSA problem counts alongside CSE degree details.
- **Selected Work & Live Architecture Sidebar**: Detailed project breakdown cards paired with a sticky desktop sidebar that updates live as users click through individual workflow steps.
- **Dual-View Skills Explorer**:
  - *Interactive Explorer*: 2-column Obsidian-inspired documentation layout (35% Tree / 65% Inspector) with code snippets, usage guidelines, key concepts, and cross-referenced tech nodes.
  - *Quick Skills View*: Recruiter-friendly categorized grid with official technology brand icons (`react-icons/si`) and level/certification badges.
  - *Unified Real-Time Search*: Filter both knowledge tree nodes and quick view chips instantly.
  - *Segmented View Toggle*: Prominent Apple-style glassmorphic mode switch with Framer Motion sliding pill indicator.
- **Databricks Credentials Showcase**: Verified accreditation badge for Databricks Certified Generative AI Engineer Associate.
- **Collapsible Resume Viewer**: Interactive document preview toggle with direct PDF download integration (`Hariom_Dhakar_CV.pdf`).
- **Contact & Availability Dispatch**: Direct dispatch links for Email, GitHub, LinkedIn, and Phone with live availability indicator.
- **Neural Network Canvas Backdrop**: Custom 2D canvas animation rendering drift nodes, connector lines, and radial mouse spotlighting with noise texture overlays.
- **Zero-Layout-Thrashing Navigation**: Fixed header with passive RAF scroll detection, active section tracking powered by `IntersectionObserver`, theme toggle, and mobile menu overlay.

---

## Screenshots

> *Add application screenshots below*

| Hero & Cinematic Intro | Projects & Sticky Architecture |
| :---: | :---: |
| `![Hero Screenshot](./docs/hero.png)` | `![Projects Screenshot](./docs/projects.png)` |

| Obsidian Skills Explorer | Quick Skills View Mode |
| :---: | :---: |
| `![Skills Tree Screenshot](./docs/skills-tree.png)` | `![Quick Skills Screenshot](./docs/simple-skills.png)` |

---

## Tech Stack

### Core Frontend
- **React 19** – Component-based UI library
- **TypeScript 6** – Strict static typing and interface definitions
- **Vite 8** – Next-generation frontend build tool and dev server

### Styling & Design System
- **Tailwind CSS v4** – Utility-first CSS framework with native `@theme` configuration
- **Vanilla CSS Tokens** – Semantic CSS custom properties for dual-theme variables (`index.css`)

### Animations & Graphics
- **Framer Motion 12** – Declarative layout transitions, spring physics, and entrance animations
- **HTML5 2D Canvas API** – High-frequency neural network backdrop graphics

### Icons & Assets
- **Lucide React** – Clean UI icon system
- **React Icons (`react-icons/si`)** – Official Simple Icons brand logos for technologies

### Quality & Performance
- **Oxlint** – Ultra-fast JavaScript/TypeScript linter (0 warnings, 0 errors)
- **IntersectionObserver API** – Offscreen animation pausing and zero-thrash section tracking

---

## Folder Structure

```
n-portfolio/
├── public/
│   ├── favicon.svg
│   └── sitemap.xml
├── src/
│   ├── assets/
│   │   └── Hariom_Dhakar_CV.pdf
│   ├── components/
│   │   ├── ArchitectureSidebar.tsx   # Sticky live project pipeline sidebar
│   │   ├── Footer.tsx                # Page footer & quick navigation
│   │   ├── Navigation.tsx            # Header with IntersectionObserver section tracking
│   │   └── icons.tsx                 # Custom SVG icons (GitHub, LinkedIn)
│   ├── data/
│   │   ├── knowledgeData.ts          # Single source of truth for skills & code snippets
│   │   └── projectsData.ts           # Project metadata & step breakdowns
│   ├── features/
│   │   ├── about/                    # Engineer metrics & education details
│   │   ├── background/               # Optimized HTML5 Neural Background canvas
│   │   ├── certifications/           # Databricks accreditation display
│   │   ├── contact/                  # Dispatch links & availability status
│   │   ├── experience/               # Deployment history & timeline deliverables
│   │   ├── hero/                     # Cinematic header & role rotator
│   │   ├── projects/                 # Work showcase grid & step interaction
│   │   ├── resume/                   # Collapsible CV viewer iframe toggle
│   │   └── skills/                   # Dual-view skills module
│   │       ├── Skills.tsx            # Main parent container & search state
│   │       └── components/
│   │           ├── InspectorPanel.tsx # Obsidian detail panel with code blocks
│   │           ├── KnowledgeTree.tsx  # Obsidian category & file tree view
│   │           ├── SimpleSkills.tsx   # Recruiter-friendly chip grid
│   │           ├── TreeNode.tsx       # Tree items with official brand icons
│   │           └── ViewToggle.tsx     # Segmented mode toggle
│   ├── hooks/
│   │   └── useTheme.ts               # Theme state management & class switcher
│   ├── utils/
│   ├── App.tsx                       # Main application layout entry
│   ├── index.css                     # Global semantic design tokens & utilities
│   └── main.tsx                      # React root rendering entry
├── index.html                        # Application HTML entry with SEO metadata
├── package.json                      # Dependencies & scripts
├── tsconfig.json                     # TypeScript compiler configuration
└── vite.config.ts                    # Vite build configuration
```

---

## Architecture & Design System

### Reusable Component Architecture
The application follows a feature-folder pattern (`src/features/*`). Components are kept strictly modular and decoupled from global side effects. High-frequency leaf items (e.g. `TreeNode`, `StepItemCard`, `ArchitectureSidebar`) are memoized with `React.memo` to eliminate unnecessary React re-renders.

### Theme System (Dark & Light Modes)
The application utilizes a centralized semantic token system defined in `src/index.css`. Components reference CSS variables instead of hardcoded hex values, ensuring automatic, high-contrast theme switching.

| Theme Token | Dark Mode (`:root`) | Light Mode (`:root.light`) |
| :--- | :--- | :--- |
| **Primary Background** | `#0A1828` (Deep Navy) | `#F2F0EA` (Warm Cream) |
| **Secondary Background** | `#0e2035` (Navy Surface) | `#FAF9F5` (Soft Cream) |
| **Card Surface** | `rgba(14, 32, 53, 0.78)` | `rgba(255, 255, 255, 0.75)` |
| **Primary Accent** | `#178582` (Turquoise) | `#FF78AC` (Pink) |
| **Secondary Accent** | `#BFA181` (Warm Gold) | `#0284c7` (Soft Teal) |
| **Primary Text** | `#F4F6F8` (Near White) | `#1F2937` (Dark Charcoal) |
| **Secondary Text** | `#94A3B8` (Muted Blue-Gray)| `#4B5563` (Muted Gray) |

---

## Installation & Setup

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Installation Commands

1. **Clone the repository**:
   ```bash
   git clone https://github.com/hariom-dhakar/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start local development server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

4. **Verify code quality with Oxlint**:
   ```bash
   npm run lint
   ```

5. **Build for production**:
   ```bash
   npm run build
   ```

6. **Preview production build locally**:
   ```bash
   npm run preview
   ```

---

## Performance Optimizations

- **Zero Layout Thrashing**: Replaced `.offsetTop` queries inside scroll loops with an asynchronous `IntersectionObserver`, ensuring scroll events run at 60 FPS without layout recalculations.
- **Pre-Squared Math Thresholding**: `NeuralBackground.tsx` calculates `distSq < maxDistanceSq` before performing `Math.sqrt()`, skipping 85%+ of square-root math calls during background particle rendering.
- **Viewport Auto-Pausing**: The canvas `requestAnimationFrame` animation loop automatically pauses when the canvas is scrolled off-screen or when the document is hidden.
- **React Tree Memoization**: Wrapped high-frequency UI elements (`TreeNode`, `TechIcon`, `KnowledgeTree`, `InspectorPanel`, `ArchitectureSidebar`, `ProjectCard`, `AnimatedNumber`) in `React.memo` and memoized search filters using `useMemo`.
- **GPU Compositing**: Promoted backdrop blur panels to dedicated GPU compositor layers using `transform: translateZ(0)` and `backface-visibility: hidden`.

---

## Accessibility (a11y)

- **Semantic HTML5**: Utilizes `<main>`, `<section>`, `<header>`, `<footer>`, `<nav>`, `<aside>`, `<article>`, and `<h1>`-`<h4>` hierarchy.
- **ARIA Attributes**: `aria-label`, `aria-expanded`, `aria-controls`, `aria-current`, `aria-hidden`, and `aria-pressed` used across interactive controls, modals, and toggles.
- **Focus Indicators**: Customized 2px accent focus outlines (`:focus-visible`) for keyboard navigation.
- **High Contrast Ratios**: Color combinations pass WCAG AA standards in both Dark and Light themes.

---

## Deployment

The application is a pure static single-page application (SPA) optimized for zero-configuration deployment on modern edge hosting platforms:

### Vercel
```bash
npx vercel
```

### Netlify
```bash
npx netlify deploy --build
```

---

## Author

**Hariom Dhakar**  
*AI Engineer | GenAI & Agentic AI Specialist*

- **Portfolio**: [https://hariomdhakar.dev](https://github.com/hariom-dhakar/portfolio)
- **GitHub**: [@hariom-dhakar](https://github.com/hariom-dhakar)
- **LinkedIn**: [hariom-dhakar](https://linkedin.com/in/hariom-dhakar)
- **Email**: hariomdhakar85@gmail.com

---

## License

This project is open-source and available under the [MIT License](LICENSE).
