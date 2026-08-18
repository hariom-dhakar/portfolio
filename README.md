# Enterprise AI & Agentic Systems Engineer Portfolio

[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=flat-square&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.2-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4.3-38BDF8?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.4-0055FF?style=flat-square&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![License](https://img.shields.io/badge/License-MIT-emerald?style=flat-square)](LICENSE)

A high-performance, production-grade AI Engineer portfolio application designed with a modern Linear/Vercel-inspired design system and an interactive engineering knowledge base.

Designed and engineered by **Hariom Dhakar** (AI Engineer @ Celebal Technologies, Databricks Certified Generative AI Engineer Associate).

---

## Overview

This portfolio goes beyond static resume pages by treating developer portfolio design as a high-end product engineering challenge. It showcases production-grade multi-agent architectures, retrieval-augmented generation (RAG) pipelines, LLM guardrails, and software engineering capabilities through interactive, data-driven components.

### Key Highlights
- **Obsidian Engineering Knowledge Base**: Dual-mode skills view featuring an interactive tree hierarchy with deep code inspectability alongside a recruiter-friendly quick grid view.
- **Interactive System Architecture & Layered Project Stack**: Paired 2-in-a-row project cards with layered stack physics, deep-dive tabs (Problem, Solution, Architecture, Production Guardrails, Lessons Learned), and interactive pipeline flows.
- **Hardware-Accelerated Dual Theme Engine**: Custom semantic design token system switching between a **Charcoal Zinc & Cyan** dark palette and a **Crisp Zinc & Slate** light palette.
- **60+ FPS Motion & Canvas Architecture**: Math-optimized HTML5 Canvas neural backdrop with pre-squared distance checks, synaptic pulse animations, mouse spotlight tracking, and viewport auto-pausing.
- **Verified Credentials & DSA Track Record**: Direct verification redirects for Databricks, Anthropic, Microsoft Azure AI, Udemy, HackerRank, and Codolio 500+ DSA problem solver profile.

---

## Live Demo

- **Portfolio URL**: [https://hariom-dhakar.github.io/portfolio/](https://hariom-dhakar.github.io/portfolio/)
- **GitHub Repository**: [https://github.com/hariom-dhakar/portfolio](https://github.com/hariom-dhakar/portfolio)

---

## Features

- **Tactical Stealth Hero**: High-impact `Rajdhani` typography with custom accent highlighting on `A` and `I` (`H[A]R[I]OM DHAKAR`), animated role rotator, and instant contact CTA.
- **Engineering Metrics & Academic Leadership**: Real-time animated counter metrics (500+ DSA Solved on Codolio, Multi-Agent Systems, Production Automation) alongside CSE degree details and campus leadership (Led Cipher Coding Club & Organized Hackathon).
- **Interactive Project Showcase**:
  - Paired 2-per-row grid with fluid expansion.
  - Interactive background card stack indicator to bring sibling projects forward.
  - Multi-tab breakdown: Problem, Solution, Architecture Diagram, Production Guardrails, and Lessons Learned.
- **Dual-View Skills Explorer**:
  - *Interactive Explorer*: 2-column Obsidian-inspired documentation layout (35% Tree / 65% Inspector) with code snippets, usage guidelines, key concepts, and cross-referenced tech nodes.
  - *Quick Skills View*: Recruiter-friendly categorized grid with official technology brand icons and level badges.
  - *Unified Real-Time Search*: Filter knowledge tree nodes and quick view chips instantly.
- **Verified Certifications Grid**: 3-in-a-row credential cards with verified external redirect links to official issuers.
- **Document Viewer & Resume Download**: Interactive document preview toggle with direct PDF download integration (`Hariom_Dhakar_CV.pdf`).
- **Neural Network Canvas Backdrop**: Custom 2D canvas animation rendering drifting nodes, glowing hub nodes, synaptic signal pulses, and radial mouse spotlighting.

---

## Tech Stack

### Core Frontend
- **React 19** – Component-based UI library
- **TypeScript 6** – Strict static typing and interface definitions
- **Vite 8** – Next-generation frontend build tool and dev server

### Styling & Design System
- **Tailwind CSS v4** – Utility-first CSS framework with native `@theme` configuration
- **Semantic Design Tokens** – Layered surface gradients, rim-light borders, and micro-shadows (`index.css`)

### Animations & Graphics
- **Framer Motion 12** – Declarative layout transitions, spring physics, and entrance animations
- **HTML5 2D Canvas API** – High-frequency neural network backdrop graphics

### Icons & Assets
- **Lucide React** – Clean UI icon system
- **React Icons (`react-icons/si`)** – Official Simple Icons brand logos for technologies

---

## Architecture & Design System

### Reusable Component Architecture
The application follows a feature-folder pattern (`src/features/*`). Components are kept strictly modular and decoupled from global side effects. High-frequency leaf items (e.g. `TreeNode`, `ProjectCard`, `KnowledgeTree`, `InspectorPanel`) are memoized with `React.memo` to eliminate unnecessary React re-renders.

### Theme System (Dark & Light Modes)
The application utilizes a centralized semantic token system defined in `src/index.css`. Components reference CSS variables instead of hardcoded values, ensuring automatic, high-contrast theme switching.

| Theme Token | Dark Mode (`:root`) | Light Mode (`:root.light`) |
| :--- | :--- | :--- |
| **Primary Background** | `#09090b` (Deep Charcoal) | `#fafafa` (Pure Light) |
| **Secondary Background** | `#111114` (Layered Dark Surface) | `#ffffff` (Clean White) |
| **Card Surface** | `linear-gradient(...)` with rim-light | Soft white with subtle elevation |
| **Primary Accent** | `#06b6d4` (Cyan) | `#0891b2` (Deep Cyan) |
| **Secondary Accent** | `#38bdf8` (Sky Blue) | `#0284c7` (Ocean Blue) |
| **Primary Text** | `#fafafa` (High Contrast White) | `#09090b` (Dark Charcoal) |
| **Secondary Text** | `#a1a1aa` (Zinc Muted) | `#52525b` (Zinc Medium) |

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

6. **Deploy to GitHub Pages**:
   ```bash
   npm run deploy
   ```

---

## Author

**Hariom Dhakar**  
*AI Engineer | GenAI & Agentic AI Specialist*

- **Portfolio**: [https://hariom-dhakar.github.io/portfolio/](https://hariom-dhakar.github.io/portfolio/)
- **GitHub**: [@hariom-dhakar](https://github.com/hariom-dhakar)
- **LinkedIn**: [hariomdhakar11](https://linkedin.com/in/hariomdhakar11)
- **Codolio**: [hariom007](https://codolio.com/profile/hariom007)
- **Email**: harudhakar@gmail.com

---

## License

This project is open-source and available under the [MIT License](LICENSE).
