const HERO_WORDS = ["Endangered.", "Precious.", "Alive."]

export function HeroSection() {
  return (
    <section
      className="relative w-full h-screen overflow-hidden"
      id="hero"
    >
      {/* Deep jungle background */}
      <div className="absolute inset-0 camera-zoom">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 80% 60% at 50% 30%, oklch(0.18 0.1 155 / 0.8) 0%, transparent 60%),
              radial-gradient(ellipse 60% 50% at 20% 70%, oklch(0.12 0.08 160 / 0.9) 0%, transparent 50%),
              radial-gradient(ellipse 50% 40% at 80% 60%, oklch(0.14 0.09 150 / 0.7) 0%, transparent 50%),
              linear-gradient(180deg,
                oklch(0.04 0.01 165) 0%,
                oklch(0.08 0.05 158) 20%,
                oklch(0.12 0.08 155) 45%,
                oklch(0.06 0.04 160) 70%,
                oklch(0.03 0.01 165) 100%
              )
            `,
          }}
        />

        {/* Jungle tree silhouettes - left */}
        <div
          className="absolute bottom-0 left-0 w-1/3 h-3/4 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse 80% 100% at 20% 100%, oklch(0.04 0.02 165) 0%, transparent 70%),
              linear-gradient(90deg, oklch(0.03 0.02 165) 0%, transparent 100%)
            `,
          }}
        />
        {/* Jungle tree silhouettes - right */}
        <div
          className="absolute bottom-0 right-0 w-1/3 h-3/4 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse 80% 100% at 80% 100%, oklch(0.04 0.02 165) 0%, transparent 70%),
              linear-gradient(270deg, oklch(0.03 0.02 165) 0%, transparent 100%)
            `,
          }}
        />

        {/* Aurora / light streaks */}
        <div
          className="absolute top-0 left-0 right-0 h-1/2 pointer-events-none"
          style={{
            background: `
              linear-gradient(135deg,
                oklch(0.4 0.12 150 / 0.15) 0%,
                oklch(0.35 0.1 165 / 0.1) 30%,
                oklch(0.45 0.14 140 / 0.12) 60%,
                transparent 100%
              )
            `,
          }}
        />
      </div>

      {/* Main content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6" style={{ zIndex: 10 }}>
        {/* Eyebrow */}
        <div className="mb-6 flex items-center gap-3">
          <div className="h-px w-12 bg-primary/60" />
          <span className="text-xs tracking-[0.3em] uppercase text-primary font-medium">
            Aethon Wildlife Sanctuary
          </span>
          <div className="h-px w-12 bg-primary/60" />
        </div>

        {/* Main Title */}
        <div className="mb-4">
          <h1 className="cinematic-title text-foreground">
            <span className="block">Every Life</span>
            <span className="block text-gold-shimmer">Deserves</span>
            <span className="block">A Sanctuary</span>
          </h1>
        </div>

        {/* Static hero word */}
        <div className="mb-8 h-12 flex items-center gap-3">
          <span className="text-lg text-muted-foreground tracking-widest uppercase">
            Nature is
          </span>
          <span className="text-xl font-bold text-gold-shimmer">{HERO_WORDS[0]}</span>
        </div>

        {/* Subtitle */}
        <p className="max-w-lg text-base text-muted-foreground leading-relaxed mb-10 tracking-wide">
          A 14,000-acre living ark where the world's most endangered species
          thrive, breathe, and reclaim their wild heritage.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={() => document.querySelector("#wildlife")?.scrollIntoView({ behavior: "smooth" })}
            className="group relative px-8 py-4 rounded-full text-sm tracking-[0.15em] uppercase font-bold text-primary-foreground overflow-hidden glow-gold"
            style={{
              background: "linear-gradient(135deg, oklch(0.78 0.14 82) 0%, oklch(0.68 0.16 78) 50%, oklch(0.78 0.14 82) 100%)",
              backgroundSize: "200% 100%",
            }}
          >
            <span className="relative z-10 flex items-center gap-2">
              Explore Wildlife
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </button>

          <button
            onClick={() => document.querySelector("#mission")?.scrollIntoView({ behavior: "smooth" })}
            className="group flex items-center gap-3 px-8 py-4 rounded-full text-sm tracking-[0.15em] uppercase font-semibold glass border border-border/60"
          >
            <span className="w-8 h-8 rounded-full border border-primary/60 flex items-center justify-center flex-shrink-0">
              <svg className="w-3 h-3 text-primary ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                <polygon points="5,3 19,12 5,21" />
              </svg>
            </span>
            Our Mission
          </button>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground">Scroll to Explore</span>
          <div className="w-px h-10 bg-gradient-to-b from-primary/60 to-transparent" />
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent 0%, oklch(0.06 0.012 165) 100%)",
          zIndex: 8,
        }}
      />

      {/* Live badge */}
      <div className="absolute top-24 right-6 lg:right-10 glass rounded-full px-4 py-2 flex items-center gap-2 z-20">
        <div className="w-2 h-2 rounded-full bg-emerald-400" />
        <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
          Live Sanctuary
        </span>
      </div>

      {/* Stats pill */}
      <div className="absolute bottom-16 left-6 lg:left-10 glass rounded-2xl px-5 py-4 z-20 hidden lg:block">
        <div className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-2">
          Species Protected
        </div>
        <div className="text-3xl font-bold text-gold">847</div>
        <div className="text-xs text-muted-foreground">and counting</div>
      </div>
    </section>
  )
}