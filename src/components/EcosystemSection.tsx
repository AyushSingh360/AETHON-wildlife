import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const BIOMES = [
  {
    id: "rainforest",
    name: "Tropical Rainforest",
    area: "6,200 ac",
    species: 312,
    color: "oklch(0.55 0.18 148)",
    description: "The densest zone of biodiversity. Canopy reaches 45m, creating micro-ecosystems at every layer.",
    residents: ["Bengal Tiger", "Black Panther", "Red Panda"],
    position: { x: "25%", y: "40%" },
    size: 120,
  },
  {
    id: "wetlands",
    name: "Mangrove Wetlands",
    area: "2,800 ac",
    species: 198,
    color: "oklch(0.5 0.14 190)",
    description: "Tidal habitats where land meets sea. Critical nursery zones for 60% of our marine species.",
    residents: ["Sea Turtles", "Saltwater Croc", "Flamingo"],
    position: { x: "65%", y: "65%" },
    size: 90,
  },
  {
    id: "alpine",
    name: "Alpine Highlands",
    area: "3,400 ac",
    species: 156,
    color: "oklch(0.6 0.08 220)",
    description: "High-altitude grasslands above 3,000m. Home to the ghost cat and migratory raptors.",
    residents: ["Snow Leopard", "Himalayan Wolf", "Golden Eagle"],
    position: { x: "45%", y: "20%" },
    size: 75,
  },
  {
    id: "savanna",
    name: "Open Savanna",
    area: "1,600 ac",
    species: 89,
    color: "oklch(0.65 0.14 70)",
    description: "Golden grasslands supporting the elephant herds and their ancient migratory routes.",
    residents: ["Asian Elephant", "Wild Buffalo", "Painted Dog"],
    position: { x: "75%", y: "30%" },
    size: 65,
  },
]

const MAP_PATHS = [
  "M 80 200 Q 200 120 350 160 Q 450 180 500 250 Q 520 320 480 380 Q 420 440 320 420 Q 200 400 140 340 Q 60 280 80 200 Z",
  "M 350 160 Q 480 140 580 200 Q 640 240 620 310 Q 600 370 540 400 Q 480 430 420 400 Q 480 380 500 320 Q 520 260 480 200 Z",
  "M 200 100 Q 290 60 370 80 Q 440 100 450 170 Q 350 160 290 130 Q 240 110 200 100 Z",
  "M 500 250 Q 580 270 620 310 Q 650 360 620 410 Q 580 440 540 430 Q 600 400 600 350 Q 600 300 560 270 Z",
]

export function EcosystemSection() {
  const [selected, setSelected] = useState<typeof BIOMES[0] | null>(null)

  return (
    <section id="ecosystem" className="relative py-32 px-6 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
background: `
             radial-gradient(ellipse 80% 60% at 30% 50%, oklch(0.15 0.08 155 / 0.15) 0%, transparent 60%),
             linear-gradient(180deg, oklch(0.06 0.012 165 / 0.2) 0%, oklch(0.05 0.01 165 / 0.1) 100%)
           `,
        }}
      />

      <div className="relative max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary/60" />
            <span className="text-xs tracking-[0.3em] uppercase text-primary">Sanctuary Map</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary/60" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 1 }}
            className="section-title text-foreground mb-4"
          >
            The Living{" "}
            <span className="text-gold-shimmer">Ecosystem</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-muted-foreground text-lg max-w-xl mx-auto"
          >
            14,000 acres divided into four distinct biomes. Click each zone to explore.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative aspect-square max-w-lg mx-auto w-full"
          >
            {/* Map SVG */}
            <div className="relative w-full h-full rounded-3xl overflow-hidden glass">
              {/* Grid lines */}
              <svg
                className="absolute inset-0 w-full h-full opacity-10"
                viewBox="0 0 700 700"
                preserveAspectRatio="xMidYMid slice"
              >
                {Array.from({ length: 10 }, (_, i) => (
                  <g key={i}>
                    <line
                      x1={i * 70}
                      y1="0"
                      x2={i * 70}
                      y2="700"
                      stroke="oklch(0.78 0.14 82)"
                      strokeWidth="0.5"
                    />
                    <line
                      x1="0"
                      y1={i * 70}
                      x2="700"
                      y2={i * 70}
                      stroke="oklch(0.78 0.14 82)"
                      strokeWidth="0.5"
                    />
                  </g>
                ))}

                {/* Biome regions */}
                {MAP_PATHS.map((path, i) => (
                  <path
                    key={i}
                    d={path}
                    fill={BIOMES[i]?.color.replace("oklch(", "oklch(").replace(")", " / 0.15)")}
                    stroke={BIOMES[i]?.color.replace("oklch(", "oklch(").replace(")", " / 0.4)")}
                    strokeWidth="1"
                    className="cursor-pointer transition-all duration-300"
                    onClick={() => setSelected(selected?.id === BIOMES[i].id ? null : BIOMES[i])}
                    style={{
                      filter: selected?.id === BIOMES[i].id ? `drop-shadow(0 0 20px ${BIOMES[i].color})` : undefined,
                      opacity: selected && selected.id !== BIOMES[i].id ? 0.5 : 1,
                    }}
                  />
                ))}
              </svg>

              {/* Biome dots */}
              {BIOMES.map((biome) => (
                <button
                  key={biome.id}
                  className="absolute group"
                  style={{
                    left: biome.position.x,
                    top: biome.position.y,
                    transform: "translate(-50%, -50%)",
                  }}
                  onClick={() => setSelected(selected?.id === biome.id ? null : biome)}
                >
                  <motion.div
                    className="relative"
                    animate={{ scale: selected?.id === biome.id ? 1.3 : 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div
                      className="rounded-full border-2 flex items-center justify-center font-bold text-xs"
                      style={{
                        width: biome.size * 0.5,
                        height: biome.size * 0.5,
                        background: `${biome.color}30`,
                        borderColor: biome.color,
                        color: biome.color,
                        boxShadow: `0 0 20px ${biome.color}40`,
                      }}
                    >
                      {biome.species}
                    </div>
                    {/* Ripple */}
                    <div
                      className="absolute inset-0 rounded-full"
                      style={{
                        border: `1px solid ${biome.color}`,
                        animation: `rippleOut 3s ease-out infinite ${BIOMES.indexOf(biome) * 0.8}s`,
                      }}
                    />
                  </motion.div>
                </button>
              ))}

              {/* Compass */}
              <div className="absolute bottom-4 right-4 w-12 h-12 opacity-40">
                <svg viewBox="0 0 50 50" fill="none">
                  <circle cx="25" cy="25" r="24" stroke="oklch(0.78 0.14 82)" strokeWidth="0.5" />
                  <path d="M25 5 L28 22 L25 20 L22 22 Z" fill="oklch(0.78 0.14 82)" />
                  <path d="M25 45 L28 28 L25 30 L22 28 Z" fill="oklch(0.5 0.05 165)" />
                  <text x="25" y="3" textAnchor="middle" fill="oklch(0.78 0.14 82)" fontSize="5" fontWeight="bold">N</text>
                </svg>
              </div>
            </div>
          </motion.div>

          {/* Info panel */}
          <div>
            {/* Biome list */}
            <div className="space-y-4 mb-8">
              {BIOMES.map((biome, i) => (
                <motion.button
                  key={biome.id}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setSelected(selected?.id === biome.id ? null : biome)}
                  className={`w-full text-left p-4 rounded-2xl transition-all duration-500 ${
                    selected?.id === biome.id
                      ? "glass border border-primary/30"
                      : "hover:glass hover:border-border/60"
                  }`}
                  style={{
                    borderColor: selected?.id === biome.id ? biome.color + "60" : undefined,
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-3 h-3 rounded-full flex-shrink-0"
                        style={{
                          background: biome.color,
                          boxShadow: `0 0 10px ${biome.color}`,
                        }}
                      />
                      <span className="font-semibold text-foreground text-sm">{biome.name}</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>{biome.area}</span>
                      <span style={{ color: biome.color }}>{biome.species} species</span>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Selected biome detail */}
            <AnimatePresence mode="wait">
              {selected && (
                <motion.div
                  key={selected.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="glass rounded-3xl p-6"
                  style={{ borderColor: `${selected.color}30` }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ background: selected.color, boxShadow: `0 0 8px ${selected.color}` }}
                    />
                    <span className="text-xs tracking-widest uppercase" style={{ color: selected.color }}>
                      {selected.name}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {selected.description}
                  </p>
                  <div>
                    <div className="text-xs tracking-widest uppercase text-muted-foreground mb-2">Key Residents</div>
                    <div className="flex flex-wrap gap-2">
                      {selected.residents.map((r) => (
                        <span
                          key={r}
                          className="text-xs px-3 py-1 rounded-full"
                          style={{
                            background: `${selected.color}15`,
                            border: `1px solid ${selected.color}30`,
                            color: selected.color,
                          }}
                        >
                          {r}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
