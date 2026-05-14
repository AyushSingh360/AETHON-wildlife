const STORY_POINTS = [
  {
    icon: "🌿",
    label: "Dawn Awakening",
    description: "As first light breaks through the canopy, the sanctuary stirs with life.",
  },
  {
    icon: "🌧️",
    label: "Monsoon Ritual",
    description: "Sacred rains replenish the ancient ecosystem, feeding every root.",
  },
  {
    icon: "🌙",
    label: "Twilight Migration",
    description: "Under protective darkness, rare species move freely through their domain.",
  },
]

export function ScrollStory() {
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 70% 50% at 50% 30%, oklch(0.2 0.1 155 / 0.6) 0%, transparent 60%),
            linear-gradient(180deg, oklch(0.05 0.015 165) 0%, oklch(0.1 0.06 158) 40%, oklch(0.06 0.03 162) 70%, oklch(0.04 0.01 165) 100%)
          `,
        }}
      />

      <div className="relative max-w-4xl mx-auto text-center">
        {/* Header */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary/60" />
          <span className="text-xs tracking-[0.3em] uppercase text-primary">Our Story</span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary/60" />
        </div>

        <h2 className="section-title text-foreground mb-6">
          A Living{" "}
          <span className="text-gold-shimmer">Chronicle</span>{" "}
          of Nature
        </h2>

        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-16">
          Every dawn, dusk, and storm is part of a greater story—
          one that Aethon Sanctuary has protected for over four decades.
          Experience the transformation.
        </p>

        {/* Story timeline */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STORY_POINTS.map((point, i) => (
            <div
              key={i}
              className="glass rounded-2xl p-6 text-left"
            >
              <div className="text-3xl mb-3">{point.icon}</div>
              <div className="text-xs tracking-[0.2em] uppercase text-primary mb-2">{point.label}</div>
              <p className="text-sm text-muted-foreground leading-relaxed">{point.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}