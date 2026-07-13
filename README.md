<div align="center">

# Cinematic Wildlife Sanctuary Experience

> *A 14,000‑acre living ark where the world's most endangered species thrive, breathe, and reclaim their wild heritage.*

<p align="center">
  <strong>Aethon Wildlife Sanctuary</strong> — Every Life Deserves a Sanctuary
</p>

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](#) 
[![Vite](https://img.shields.io/badge/Vite-7.3-646CFF?logo=vite)](#) 
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript)](#) 
[![Tailwind](https://img.shields.io/badge/Tailwind-4.2-06B6D4?logo=tailwindcss)](#) 
[![License](https://img.shields.io/badge/License-MIT-blue)](#)

</div>

---

## Table of Contents

- [Overview](#overview)
- [Quick Start](#quick-start)
- [Tech Stack](#tech-stack)
- [Design System](#design-system)
- [Architecture](#architecture)
- [Feature Highlights](#feature-highlights)
- [Component Map](#component-map)
- [Conservation Data](#conservation-data)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Browser Support](#browser-support)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

---

## Overview

A cinematic, immersive web app that showcases global wildlife‑conservation initiatives. It pairs a **dark jungle palette** with **gold shimmer accents** and **glass‑morphic UI** to deliver a zero‑jitter, high‑performance experience.

Key sections include:

- Hero experience with gold‑shimmer title and aurora light streaks
- Scroll‑driven narrative (ScrollStory)
- Wildlife Showcase – interactive cards for flagship species
- Conservation Stats – animated data visualisations and a 3D sanctuary globe
- Live‑Cam feeds, Species List, Breeding Programs, Habitat Restoration, Field Research
- Donation & Membership sections with impact‑driven calls‑to‑action
- Testimonials and a cinematic footer

All heavy background animations are disabled by default to keep the experience buttery‑smooth.

---

## Quick Start

```bash
# Clone the repo
git clone https://github.com/AyushSingh360/wildlife.git
cd wildlife

# Install dependencies (ci ensures a clean lockfile)
npm ci

# Run the dev server (http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview the production build
npm run preview
```

---

## Tech Stack

| Layer          | Technology                              |
|----------------|----------------------------------------|
| **Framework**  | React 19 + TypeScript 5.9               |
| **Bundler**    | Vite 7.3                               |
| **Styling**    | Tailwind CSS 4.2 + OKLCH colour tokens |
| **UI Kit**     | Radix UI + shadcn/ui                    |
| **Animations**| Framer Motion 12, GSAP 3, Lenis Scroll |
| **3D**         | Three.js + React‑Three‑Fiber + Drei   |
| **Charts**     | Recharts 3                              |
| **Backend**    | Supabase (Auth + Postgres)             |
| **Forms**      | React‑Hook‑Form + Zod                  |
| **Icons**      | Lucide React                           |
| **Carousel**   | Embla Carousel                         |

---

## Design System

### Colour Palette (OKLCH)

```text
Background   oklch(0.06 0.012 165)   // Deep jungle
Card         oklch(0.09 0.018 165)   // Dark canopy
Gold/Primary oklch(0.78 0.14  82)   // Shimmer gold
Jungle       oklch(0.28 0.12 150)   // Forest green
Mist         oklch(0.70 0.04 200)   // Morning fog
Foreground   oklch(0.95 0.015  90)   // Warm white
```

### Typography

- **Cinematic Title** – `clamp(3.5rem, 10vw, 10rem)`, weight 900, tracking ‑0.03em
- **Section Title** – `clamp(2.5rem, 6vw, 6rem)`, weight 800, tracking ‑0.02em
- **Body** – *Inter* (system‑ui fallback)

### Core Animations

| Animation      | Visual Effect                         |
|---------------|---------------------------------------|
| `shimmerGold` | Subtle gold text shimmer               |
| `auroraShift`| Soft colour‑shifting aurora bands      |
| `fogDrift`    | Ambient fog movement                  |
| `volumetricRay`| Light‑ray sweep                     |
| `morphBorder`| Organic shape morphing                 |
| `glowPulse`   | Gold glow pulse around UI elements    |
| `textGlow`    | Breathing text glow                   |
| `hoverFloat`  | Gentle lift on hover                  |

---

## Architecture

```text
┌─────────────────────────────────────────────┐
│                 Client (Browser)             │
│   ┌─────────────────────────────────────┐   │
│   │           React 19 Application        │   │
│   │  ┌─────┬───────┬───────┬─────────────┐ │   │
│   │  │Hero │Scroll │Wild‑ │Conserva‑   │ │   │
│   │  │Sec  │Story  │life   │tion Stats   │ │   │
│   │  └─────┴───────┴───────┴─────────────┘ │   │
│   │  ┌─────┬───────┬───────┬───────┐      │   │
│   │  │Eco‑ │Donate │Live‑  │Spec‑  │      │   │
│   │  │sys   │tion   │Cams   │ies    │      │   │
│   │  └─────┴───────┴───────┴───────┘      │   │
│   └─────────────────────────────────────┘   │
└─────────────────────────────────────────────┘
         │                 │
         ▼                 ▼
 ┌─────────────┐   ┌─────────────────────┐
 │ Vite Dev    │   │ TypeScript 5.9      │
 │ Server 7.3  │   │ Strict Mode (no‑any)│
 └─────────────┘   └─────────────────────┘
```

---

## Feature Highlights

| Feature | Description |
|--------|-------------|
| Hero Section | Gold‑shimmer title, aurora light streaks, jungle silhouettes |
| ScrollStory | Narrative driven scroll experience with lazy‑loaded sections |
| Wildlife Showcase | Interactive cards for eight flagship species, modal detail view |
| Conservation Stats | Real‑time counters, animated bar chart, 3D sanctuary globe |
| Live‑Cam Feed | Optimised thumbnail feed for live habitat cameras |
| Species List | Filterable grid with status badges (Critical, Endangered, …) |
| Breeding Programs | Progress bars & milestone markers for captive breeding |
| Habitat Restoration | Timeline visualisation of ecosystem recovery |
| Field Research | Card‑based scientific study showcase |
| Ecosystem Section | Three.js globe with markers for sanctuary projects |
| Donation Section | Tiered giving cards with impact metrics |
| Testimonials | Cinematic cards featuring conservationists |
| Cinematic Footer | Atmospheric closing with navigation links |

---

## Component Map

| Area | Primary Components |
|------|--------------------|
| Layout | `App.tsx`, `Navigation.tsx`, `BottomNav.tsx`, `SkipLink.tsx` |
| Hero | `HeroSection.tsx`, `CustomCursor.tsx` |
| Story | `ScrollStory.tsx`, `MissionSection.tsx` |
| Showcase | `WildlifeShowcase.tsx`, `AnimalCardSVG.tsx`, `ThreatMeter.tsx` |
| Stats | `ConservationStats.tsx`, `SanctuaryGlobe.tsx`, `StatCounter.tsx` |
| Media | `LiveCamsSection.tsx`, `GrainientBackground.tsx` |
| Data | `SpeciesList.tsx`, `BreedingPrograms.tsx`, `HabitatRestoration.tsx`, `FieldResearch.tsx` |
| UI Extras | `TestimonialsSection.tsx`, `CinematicFooter.tsx`, `DonationSection.tsx` |
| Utilities | `hooks/`, `lib/`, `ErrorBoundary.tsx`, `SectionLoader.tsx` |

---

## Conservation Data

### Species Status Distribution

```
Critically Endangered  ██░░░░░░░░ 12  (5.4 %)
Endangered             ████░░░░░░ 36  (16.1 %)
Vulnerable             ██████░░░░ 54  (24.1 %)
Least Concern          ██████████ 122 (54.5 %)
```

### Project Progress Matrix

```
                     High Impact
                         │
   Q2: High/Low ────────┼─────── Q1: High/High
   (2 initiatives)       │     (4 initiatives)
                         │
 ───────────────────────┼──────────────────────
                         │
   Q3: Low/Low ──────── ─┼─────── Q4: Low/High
   (1 initiative)        │     (0 initiatives)
                         │
                     Low Impact
        ◄── Low Progress ───► High Progress ──►
```

---

## Project Structure

```
wildlife/
├─ src/
│  ├─ main.tsx                # Entry point
│  ├─ App.tsx                 # Root component (lazy‑loaded sections)
│  ├─ index.css               # OKLCH tokens, animations, utilities
│  ├─ components/
│  │  ├─ HeroSection.tsx
│  │  ├─ Navigation.tsx
│  │  ├─ CustomCursor.tsx
│  │  ├─ ScrollStory.tsx
│  │  ├─ MissionSection.tsx
│  │  ├─ WildlifeShowcase.tsx
│  │  ├─ ConservationStats.tsx
│  │  ├─ EcosystemSection.tsx
│  │  ├─ DonationSection.tsx
│  │  ├─ LiveCamsSection.tsx
│  │  ├─ SpeciesList.tsx
│  │  ├─ BreedingPrograms.tsx
│  │  ├─ HabitatRestoration.tsx
│  │  ├─ FieldResearch.tsx
│  │  ├─ TestimonialsSection.tsx
│  │  ├─ CinematicFooter.tsx
│  │  ├─ SanctuaryGlobe.tsx
│  │  ├─ GrainientBackground.tsx
│  │  ├─ ErrorBoundary.tsx
│  │  ├─ SectionLoader.tsx
│  │  ├─ SkipLink.tsx
│  │  ├─ BottomNav.tsx
│  │  └─ ui/                  # shadcn/ui components
│  ├─ hooks/                  # Custom React hooks
│  └─ lib/                    # Supabase client & utilities
├─ public/                     # Static assets (images, favicons)
├─ supabase/                  # Supabase migrations & config
├─ index.html                 # HTML entry with meta tags
├─ vite.config.ts             # Vite configuration
├─ tsconfig.json              # TypeScript configuration
├─ components.json            # shadcn/ui component registry
└─ package.json
```

---

## Configuration

### Environment Variables

Create a `.env` file at the project root:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### TypeScript Strictness

- `noUnusedLocals: true`
- `noUnusedParameters: true`
- No implicit `any` – explicit typing enforced throughout the codebase

### Tailwind Theme

Custom OKLCH tokens are defined in `src/index.css` (e.g. `--color-gold`, `--color-jungle`, `--color-mist`). Adjust them to re‑skin the UI.

---

## Browser Support

| Browser | Minimum Version |
|---------|-----------------|
| Chrome  | 120+            |
| Firefox | 120+            |
| Safari  | 17+             |
| Edge    | 120+            |

Requires CSS `oklch()` support and modern JavaScript (ES2022).

---

## Contributing

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/your‑feature`.
3. Ensure the build passes: `npm run build`.
4. Run type checking: `npm run typecheck`.
5. Open a pull request with a concise description of the changes.

### Code Style Guidelines

- Follow existing naming conventions and folder layout.
- Keep TypeScript strict – avoid `any`.
- Use functional components with explicit return types.
- Import paths via `@/` alias.
- Prioritise performant animations (no layout thrashing).

---

## License

MIT – see the `LICENSE` file for full terms.

---

## Acknowledgements

- **Lucide Icons** – Open‑source icon set
- **Framer Motion** – Declarative animation library
- **Tailwind Labs** – Utility‑first CSS framework
- **Vite** – Fast dev server & bundler
- **Three.js** – 3D graphics in the browser
- **GSAP** – Professional animation toolkit
- **Radix UI** – Accessible component primitives
- **shadcn/ui** – Beautiful, composable UI components
- **Supabase** – Open‑source backend platform
- **Lenis** – Smooth scroll library

---

<div align="center">

**Built with care for the creatures who need it most.**

[⬆ Back to Top](#cinematic-wildlife-sanctuary-experience)

</div>
