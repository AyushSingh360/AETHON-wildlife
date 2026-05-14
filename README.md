<div align="center">

<br/>

```
     ╔══════════════════════════════════════════════════════════╗
     ║                                                          ║
     ║     ░█████╗░███████╗████████╗██╗░░██╗░█████╗░███╗░░██╗  ║
     ║     ██╔══██╗██╔════╝╚══██╔══╝██║░░██║██╔══██╗████╗░██║  ║
     ║     ███████║█████╗░░░░░██║░░░███████║██║░░██║██╔██╗██║  ║
     ║     ██╔══██║██╔══╝░░░░░██║░░░██╔══██║██║░░██║██║╚████║  ║
     ║     ██║░░██║███████╗░░░██║░░░██║░░██║╚█████╔╝██║░╚███║  ║
     ║     ╚═╝░░╚═╝╚══════╝░░░╚═╝░░░╚═╝░░╚═╝░╚════╝░╚═╝░░╚══╝  ║
     ║                                                          ║
     ║          W I L D L I F E   S A N C T U A R Y             ║
     ║                                                          ║
     ╚══════════════════════════════════════════════════════════╝
```

<br/>

### *Every Life Deserves a Sanctuary*

<br/>

[![React](https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite_7-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Three.js](https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=threedotjs&logoColor=white)](https://threejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com)

<br/>

*A cinematic, award-level web experience for wildlife conservation.*
*Built with obsessive attention to detail and a reverence for the natural world.*

<br/>

---

<br/>

</div>

## 🌿 The Vision

**Aethon** isn't a website. It's a **living, breathing digital sanctuary** — a cinematic tribute to the 847+ endangered species that depend on conservation efforts to survive.

Every scroll, every hover, every transition has been handcrafted to evoke the feeling of stepping into an ancient forest at dawn: the fog drifting through the trees, golden light filtering through the canopy, and the subtle pulse of life everywhere you look.

> *"We don't build websites. We build experiences that make people care."*

<br/>

## ✦ Features

<table>
<tr>
<td width="50%" valign="top">

### 🎬 Cinematic Hero
Parallax jungle scene with volumetric light rays, flying bird SVGs, canvas-driven water ripple physics, animated fog layers, floating particles, and a mouse-reactive parallax system. Cycling text animations with blur transitions.

### 📜 Scroll Story
A sticky-scroll narrative with three atmospheric acts — **Dawn**, **Monsoon**, and **Twilight** — featuring procedural rain, blowing leaf SVGs, dynamic star fields, moon glow, and animated tree silhouettes that part as you scroll deeper.

### 🐅 Wildlife Showcase
Interactive card gallery of 7 endangered species with per-card gradient backgrounds, animated SVG silhouettes, live waveform visualizations, threat-level meters, and a full-detail modal with glassmorphic overlays.

### 📊 Conservation Stats
Animated count-up statistics, a 3D rotating globe rendered with `@react-three/fiber`, orbital labels, and an interactive Recharts bar chart tracking 6 years of growth data.

</td>
<td width="50%" valign="top">

### 🌍 Ecosystem Explorer
Interactive biome selector with animated ring indicators, accordion content reveals, and per-ecosystem SVG illustrations. Tab-driven navigation between tropical forest, wetlands, alpine, and savanna zones.

### 💰 Donation System
Full-stack donation flow with 4 tiers (Guardian → Founder), custom amounts, monthly/one-time toggle, form validation via Zod + React Hook Form, and real-time persistence to Supabase. Impact tracker grid shows exactly what each dollar funds.

### 📹 Live Cams
Simulated live surveillance HUD with CRT scanline effects, animated bokeh lights, corner bracket overlays, real-time timestamps, activity indicators, and waveform audio visualizations. 4 switchable camera feeds.

### 🧬 Advanced Sections
Breeding programs, habitat restoration tracking, field research journals, species database with filters, testimonials carousel, and a cinematic footer with newsletter signup.

</td>
</tr>
</table>

<br/>

## ⚡ Design System

<div align="center">

```
╭──────────────────────────────────────────────────────────╮
│                                                          │
│   OKLCH Color Space                                      │
│   ─────────────────                                      │
│                                                          │
│   Gold     ████  oklch(0.78 0.14 82)      Accent         │
│   Jungle   ████  oklch(0.28 0.12 150)     Deep Green     │
│   Mist     ████  oklch(0.70 0.04 200)     Cool Blue      │
│   Surface  ████  oklch(0.09 0.018 165)    Card BG        │
│   Base     ████  oklch(0.06 0.012 165)    Page BG        │
│                                                          │
│   Typography: Inter · 900/800/700 weights                │
│   Radius: 0.625rem base · rounded-3xl cards              │
│   Scrollbar: 3px gold-accent custom                      │
│                                                          │
╰──────────────────────────────────────────────────────────╯
```

</div>

<br/>

### 🎨 Animation Catalog

| Animation | Purpose | Duration |
|:----------|:--------|:---------|
| `shimmerGold` | Gold text gradient sweep | `3s linear ∞` |
| `fogDrift` / `fogDriftReverse` | Atmospheric fog movement | `14–20s ease ∞` |
| `volumetricRay` | Light ray pulsing | `8s ease ∞` |
| `auroraShift` | Hue-rotating aurora overlay | `10s ease ∞` |
| `birdFly1` / `birdFly2` | SVG bird flight paths | `18–26s linear ∞` |
| `rainFall` | Procedural rain drops | `0.6–1.4s linear ∞` |
| `leafBlow` | Wind-blown leaf physics | `14–22s linear ∞` |
| `glowPulse` | Neon glow pulsation | `3s ease ∞` |
| `morphBorder` | Organic border-radius morph | `9s ease ∞` |
| `cameraZoom` | Ken Burns slow zoom | `22s ease alt` |
| `hoverFloat` | Idle floating motion | `4.5s ease ∞` |
| `waveform` | Audio bar visualization | `1s ease ∞` |

<br/>

## 🏗️ Architecture

```
src/
├── App.tsx                    # Root compositor — lazy-loaded sections
├── main.tsx                   # React 19 entry point
├── index.css                  # Design tokens, animations, utilities
│
├── components/
│   ├── GrainientBackground    # Fixed animated gradient + SVG grain filter
│   ├── HeroSection            # Cinematic parallax hero with canvas effects
│   ├── ScrollStory            # Sticky scroll narrative (3 acts)
│   ├── Navigation             # Scroll-reactive glassmorphic navbar
│   ├── CustomCursor           # Custom dot + ring cursor system
│   ├── MissionSection         # Four pillars with animated SVG icons
│   ├── WildlifeShowcase       # Species gallery + detail modal
│   ├── ConservationStats      # Count-up stats + 3D globe + charts
│   ├── EcosystemSection       # Biome explorer with ring indicators
│   ├── DonationSection        # Full donation flow + Supabase
│   ├── LiveCamsSection        # Simulated live camera HUD
│   ├── SpeciesList            # Filterable species database
│   ├── BreedingPrograms       # Conservation breeding tracker
│   ├── HabitatRestoration     # Restoration progress visualization
│   ├── FieldResearch          # Research journal entries
│   ├── TestimonialsSection    # Supporter testimonials
│   ├── CinematicFooter        # Full footer with newsletter
│   ├── SanctuaryGlobe         # React Three Fiber 3D globe
│   ├── ErrorBoundary          # Graceful error handling
│   ├── SectionLoader          # Lazy-load fallback spinner
│   ├── SkipLink               # Accessibility skip navigation
│   └── ui/                    # shadcn/ui component library
│
├── hooks/                     # Custom React hooks
└── lib/                       # Supabase client, utilities
```

<br/>

## 🛠️ Tech Stack Deep Dive

<details>
<summary><strong>⚛️ Frontend Core</strong></summary>

| Technology | Version | Role |
|:-----------|:--------|:-----|
| React | 19.2 | UI framework with Suspense + lazy loading |
| TypeScript | 5.9 | Type safety across the entire codebase |
| Vite | 7.3 | Lightning-fast HMR and optimized builds |

</details>

<details>
<summary><strong>🎨 Styling & Animation</strong></summary>

| Technology | Version | Role |
|:-----------|:--------|:-----|
| Tailwind CSS | 4.2 | Utility-first styling with OKLCH colors |
| Framer Motion | 12.38 | Scroll-driven animations, gestures, layout |
| GSAP | 3.15 | High-performance timeline animations |
| Custom CSS | — | 15+ keyframe animations, 3 fog layers |

</details>

<details>
<summary><strong>🌐 3D & Visualization</strong></summary>

| Technology | Version | Role |
|:-----------|:--------|:-----|
| Three.js | 0.184 | WebGL 3D rendering engine |
| React Three Fiber | 9.6 | Declarative Three.js via React |
| React Three Drei | 10.7 | Pre-built 3D helpers and controls |
| Recharts | 3.8 | SVG data visualization charts |
| Canvas API | — | Custom water ripple physics |

</details>

<details>
<summary><strong>🗄️ Backend & Data</strong></summary>

| Technology | Version | Role |
|:-----------|:--------|:-----|
| Supabase | 2.105 | PostgreSQL database + auth |
| Zod | 4.3 | Runtime schema validation |
| React Hook Form | 7.72 | Performant form state management |

</details>

<details>
<summary><strong>🧩 UI Components</strong></summary>

| Technology | Version | Role |
|:-----------|:--------|:-----|
| Radix UI | 1.4 | Accessible primitive components |
| shadcn/ui | — | Customized component collection |
| Lucide React | 1.6 | Beautiful consistent iconography |
| Embla Carousel | 8.6 | Touch-friendly carousel engine |
| Lenis | 1.3 | Buttery smooth scroll engine |

</details>

<br/>

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/AyushSingh360/wildlife.git
cd wildlife

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Add your Supabase URL and anon key

# Start development server
npm run dev
```

Open **http://localhost:5173** — the sanctuary awaits.

<br/>

## 📋 Scripts

| Command | Description |
|:--------|:------------|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | TypeScript check + production build |
| `npm run preview` | Preview production build locally |
| `npm run typecheck` | Run TypeScript compiler checks |

<br/>

## 🌟 Performance

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│   ✦ Code-split via React.lazy — 14 async chunks     │
│   ✦ SVG-based graphics — zero image dependencies    │
│   ✦ OKLCH colors — perceptually uniform palette     │
│   ✦ Suspense boundaries — per-section error gates   │
│   ✦ CSS animations — GPU-accelerated transforms     │
│   ✦ Canvas API — hardware-accelerated ripple FX     │
│   ✦ 3D globe lazy-loaded — only when visible        │
│   ✦ Custom cursor — RAF-driven 60fps tracking       │
│                                                     │
└─────────────────────────────────────────────────────┘
```

<br/>

## 🌱 Environment

Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

The Supabase backend powers the donation system with a `donations` table storing:
- `amount` — Donation amount in cents
- `frequency` — `"once"` or `"monthly"`
- `tier` — Guardian / Protector / Champion / Founder
- `donor_email` — Validated email address
- `donor_name` — Donor's full name

<br/>

---

<div align="center">

<br/>

```
    🌿 ─── ·  ·  · ─── 🐾 ─── ·  ·  · ─── 🌿
```

<br/>

**Built with 🤎 for the wild**

*Nature is Endangered. Precious. Alive.*

<br/>

<sub>
Designed & Developed by <a href="https://github.com/AyushSingh360"><strong>Ayush Singh</strong></a>
<br/>
<br/>
<a href="#-the-vision">↑ Back to Top</a>
</sub>

<br/>
<br/>

</div>
