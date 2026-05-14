import { useState, useRef } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"

type Animal = {
  id: string
  name: string
  species: string
  status: string
  statusColor: string
  population: string
  habitat: string
  description: string
  traits: string[]
  threat: number
  bgGradient: string
  accentColor: string
  svgPath: string
}

const ANIMALS: Animal[] = [
  {
    id: "tiger",
    name: "Bengal Tiger",
    species: "Panthera tigris tigris",
    status: "Endangered",
    statusColor: "oklch(0.65 0.22 28)",
    population: "3,900",
    habitat: "Tropical Forest",
    description: "The apex predator of the Asian jungle—territorial, solitary, and breathtakingly powerful. Each stripe is a fingerprint, unique to its bearer.",
    traits: ["Nocturnal Hunter", "Solo Predator", "Territorial Marker"],
    threat: 78,
    bgGradient: "linear-gradient(135deg, oklch(0.15 0.08 50) 0%, oklch(0.1 0.05 30) 50%, oklch(0.06 0.02 165) 100%)",
    accentColor: "oklch(0.72 0.18 55)",
    svgPath: "M12 4 Q16 2 20 4 L26 8 Q28 12 26 16 Q30 18 28 22 Q24 26 20 24 Q18 28 12 28 Q8 26 6 22 Q4 18 6 16 Q2 12 6 8 Z",
  },
  {
    id: "snow-leopard",
    name: "Snow Leopard",
    species: "Panthera uncia",
    status: "Vulnerable",
    statusColor: "oklch(0.72 0.15 55)",
    population: "4,500",
    habitat: "Alpine Mountains",
    description: "Ghost of the mountains. This phantom cat glides across treacherous high-altitude terrain with supernatural grace and invisibility.",
    traits: ["High Altitude Specialist", "Camouflage Master", "Long Tail Balance"],
    threat: 62,
    bgGradient: "linear-gradient(135deg, oklch(0.18 0.04 220) 0%, oklch(0.12 0.06 200) 50%, oklch(0.06 0.02 165) 100%)",
    accentColor: "oklch(0.8 0.06 220)",
    svgPath: "M10 8 Q16 4 22 8 L26 14 Q24 20 20 22 Q22 26 16 28 Q10 28 8 24 Q4 20 8 14 Z",
  },
  {
    id: "red-panda",
    name: "Red Panda",
    species: "Ailurus fulgens",
    status: "Endangered",
    statusColor: "oklch(0.65 0.22 28)",
    population: "10,000",
    habitat: "Temperate Forest",
    description: "The original panda—a rust-colored marvel of evolution with a raccoon's face and a bear's diet. Acrobatic, shy, and utterly captivating.",
    traits: ["Arboreal Acrobat", "Bamboo Specialist", "Crepuscular"],
    threat: 71,
    bgGradient: "linear-gradient(135deg, oklch(0.2 0.12 40) 0%, oklch(0.12 0.08 30) 50%, oklch(0.06 0.02 165) 100%)",
    accentColor: "oklch(0.65 0.18 35)",
    svgPath: "M16 4 Q22 6 24 12 Q28 14 26 20 Q22 24 18 22 Q16 26 12 24 Q6 22 4 18 Q2 12 8 8 Z",
  },
  {
    id: "elephant",
    name: "Asian Elephant",
    species: "Elephas maximus",
    status: "Endangered",
    statusColor: "oklch(0.65 0.22 28)",
    population: "40,000",
    habitat: "Tropical Grassland",
    description: "Ancient architects of the forest. Their memory spans decades, their herds are complex matriarchies, and their footsteps shape ecosystems.",
    traits: ["Herd Intelligence", "Ecosystem Engineer", "Empathic Memory"],
    threat: 68,
    bgGradient: "linear-gradient(135deg, oklch(0.16 0.04 200) 0%, oklch(0.1 0.03 180) 50%, oklch(0.06 0.02 165) 100%)",
    accentColor: "oklch(0.6 0.06 200)",
    svgPath: "M8 10 Q14 4 20 8 L28 12 Q30 18 26 22 Q22 28 16 26 Q10 28 6 24 Q2 18 6 14 Z",
  },
  {
    id: "black-panther",
    name: "Black Panther",
    species: "Panthera pardus",
    status: "Vulnerable",
    statusColor: "oklch(0.72 0.15 55)",
    population: "12,000",
    habitat: "Dense Jungle",
    description: "Not a species but a legend—a melanistic leopard draped in darkness. Pure shadow given predatory form, invisible until the moment of the strike.",
    traits: ["Melanistic Coat", "Supreme Stealth", "Climber & Swimmer"],
    threat: 55,
    bgGradient: "linear-gradient(135deg, oklch(0.12 0.02 280) 0%, oklch(0.07 0.01 250) 50%, oklch(0.04 0.01 165) 100%)",
    accentColor: "oklch(0.55 0.1 280)",
    svgPath: "M14 3 Q20 2 24 8 L28 14 Q26 20 22 22 Q24 28 16 28 Q8 28 6 22 Q2 16 6 10 Z",
  },
  {
    id: "birds",
    name: "Philippine Eagle",
    species: "Pithecophaga jefferyi",
    status: "Critical",
    statusColor: "oklch(0.6 0.25 25)",
    population: "800",
    habitat: "Tropical Rainforest",
    description: "One of the world's most powerful eagles and the national bird of Philippines. With eyes that see three times sharper than humans—nothing escapes its vigil.",
    traits: ["Apex Avian Hunter", "Massive 7ft Wingspan", "Lifelong Pair Bonds"],
    threat: 91,
    bgGradient: "linear-gradient(135deg, oklch(0.18 0.1 80) 0%, oklch(0.12 0.08 60) 50%, oklch(0.06 0.02 165) 100%)",
    accentColor: "oklch(0.75 0.16 75)",
    svgPath: "M16 2 L24 10 Q28 16 24 22 Q20 28 16 26 Q12 28 8 22 Q4 16 8 10 Z",
  },
  {
    id: "marine",
    name: "Blue Whale",
    species: "Balaenoptera musculus",
    status: "Endangered",
    statusColor: "oklch(0.65 0.22 28)",
    population: "10,000",
    habitat: "Open Ocean",
    description: "The largest creature to have ever existed on Earth. Its heartbeat can be detected from 2 miles away. A single breath is the size of a small car.",
    traits: ["Largest Living Animal", "Sonar Communication", "Krill Filter Feeder"],
    threat: 73,
    bgGradient: "linear-gradient(135deg, oklch(0.12 0.08 220) 0%, oklch(0.08 0.1 210) 50%, oklch(0.05 0.04 200) 100%)",
    accentColor: "oklch(0.55 0.14 220)",
    svgPath: "M4 14 Q8 8 16 8 Q26 8 30 14 Q28 20 22 22 Q20 26 16 24 Q8 26 4 20 Z",
  },
]

function AnimalCardSVG({ path, color }: { path: string; color: string }) {
  return (
    <svg viewBox="0 0 32 32" className="w-full h-full" fill="none">
      <path
        d={path}
        stroke={color}
        strokeWidth="1"
        fill={`${color}15`}
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ThreatMeter({ value }: { value: number }) {
  const color =
    value > 80 ? "oklch(0.6 0.25 25)" :
    value > 60 ? "oklch(0.72 0.15 55)" :
    "oklch(0.65 0.18 150)"

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-[10px] tracking-widest uppercase">
        <span className="text-muted-foreground">Threat Level</span>
        <span style={{ color }}>{value}%</span>
      </div>
      <div className="h-1 rounded-full bg-muted overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
          style={{ background: `linear-gradient(90deg, ${color} 0%, oklch(0.78 0.14 82) 100%)` }}
        />
      </div>
    </div>
  )
}

function WaveformViz({ color }: { color: string }) {
  return (
    <div className="flex items-center gap-0.5 h-6">
      {Array.from({ length: 12 }, (_, i) => (
        <div
          key={i}
          className="wave-bar"
          style={{
            animationDelay: `${i * 0.08}s`,
            animationDuration: `${0.8 + Math.sin(i) * 0.3}s`,
            background: color,
            opacity: 0.7,
          }}
        />
      ))}
    </div>
  )
}

export function WildlifeShowcase() {
  const [selected, setSelected] = useState<Animal | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"])

  return (
    <section ref={ref} id="wildlife" className="relative py-32 px-6 overflow-hidden">
      {/* Animated background */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: bgY }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 80% 60% at 20% 30%, oklch(0.18 0.1 150 / 0.2) 0%, transparent 60%),
              radial-gradient(ellipse 60% 50% at 80% 70%, oklch(0.15 0.08 160 / 0.15) 0%, transparent 50%),
              linear-gradient(180deg, oklch(0.06 0.012 165) 0%, oklch(0.05 0.01 165) 100%)
            `,
          }}
        />
      </motion.div>

      <div className="relative max-w-[1500px] mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary/60" />
            <span className="text-xs tracking-[0.3em] uppercase text-primary">Our Residents</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary/60" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 1 }}
            className="section-title text-foreground mb-4"
          >
            Meet the{" "}
            <span className="text-gold-shimmer">Guardians</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-muted-foreground text-lg max-w-xl mx-auto"
          >
            Seven species. Seven stories. Each one a battle against extinction that Aethon refuses to lose.
          </motion.p>
        </div>

        {/* Animal grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-8">
          {ANIMALS.slice(0, 7).map((animal, i) => (
            <motion.div
              key={animal.id}
              initial={{ opacity: 0, y: 60, rotateX: 15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.08, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -10, scale: 1.02, transition: { duration: 0.3 } }}
              onClick={() => setSelected(animal)}
              className={`group relative rounded-3xl overflow-hidden cursor-pointer ${i === 3 ? "sm:col-span-2 lg:col-span-1" : ""}`}
              style={{ perspective: "1000px" }}
            >
              {/* Card background */}
              <div
                className="absolute inset-0 transition-all duration-700"
                style={{ background: animal.bgGradient }}
              />

              {/* Hover glow */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(ellipse 70% 50% at 50% 100%, ${animal.accentColor}20 0%, transparent 70%)`,
                }}
              />

              {/* Neon border on hover */}
              <div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  boxShadow: `inset 0 0 0 1px ${animal.accentColor}40, 0 0 40px ${animal.accentColor}15`,
                }}
              />

              <div className="relative p-6 h-full min-h-64 flex flex-col">
                {/* Status badge */}
                <div className="flex items-center justify-between mb-auto">
                  <span
                    className="text-[9px] tracking-[0.2em] uppercase font-bold px-3 py-1 rounded-full"
                    style={{
                      background: `${animal.statusColor}20`,
                      color: animal.statusColor,
                      border: `1px solid ${animal.statusColor}40`,
                    }}
                  >
                    {animal.status}
                  </span>
                  <span className="text-[9px] tracking-widest uppercase text-muted-foreground">
                    {animal.population} left
                  </span>
                </div>

                {/* Large icon area */}
                <div className="flex-1 flex items-center justify-center py-6">
                  <motion.div
                    className="w-28 h-28 opacity-60 group-hover:opacity-90 transition-opacity duration-500"
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
                  >
                    <AnimalCardSVG path={animal.svgPath} color={animal.accentColor} />
                  </motion.div>
                </div>

                {/* Info */}
                <div>
                  <WaveformViz color={animal.accentColor} />
                  <h3 className="text-lg font-bold text-foreground mt-3 mb-0.5 group-hover:text-gold transition-colors duration-300">
                    {animal.name}
                  </h3>
                  <p className="text-[10px] italic text-muted-foreground mb-3">
                    {animal.species}
                  </p>
                  <ThreatMeter value={animal.threat} />
                </div>

                {/* "View" indicator */}
                <div className="absolute bottom-4 right-4 w-8 h-8 rounded-full border border-border/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:border-primary/60">
                  <svg className="w-3 h-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}

          {/* 8th card - CTA */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.56, duration: 0.8 }}
            className="relative rounded-3xl overflow-hidden"
            style={{
              background: "linear-gradient(135deg, oklch(0.12 0.06 82) 0%, oklch(0.08 0.03 82) 100%)",
              border: "1px solid oklch(0.78 0.14 82 / 0.2)",
            }}
          >
            <div className="absolute inset-0 morph-border opacity-10" style={{ background: "radial-gradient(circle, oklch(0.78 0.14 82) 0%, transparent 70%)" }} />
            <div className="relative p-6 h-full min-h-64 flex flex-col items-center justify-center text-center">
              <div className="text-4xl mb-4 hover-float">🌍</div>
              <h3 className="text-lg font-bold text-gold mb-2">+840 More Species</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Discover the full ecosystem of endangered wildlife we protect.
              </p>
              <button
                className="px-5 py-2 rounded-full text-xs tracking-widest uppercase font-bold text-primary-foreground glow-gold"
                style={{
                  background: "linear-gradient(135deg, oklch(0.78 0.14 82) 0%, oklch(0.65 0.15 78) 100%)",
                }}
              >
                View All
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Animal Detail Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-[2000] flex items-center justify-center p-4 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-background/90 backdrop-blur-2xl" />

            <motion.div
              className="relative max-w-4xl w-full rounded-3xl overflow-hidden glass z-10"
              initial={{ scale: 0.85, y: 60, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.85, y: 60, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Background */}
              <div className="absolute inset-0" style={{ background: selected.bgGradient, opacity: 0.7 }} />
              <div
                className="absolute inset-0"
                style={{
                  boxShadow: `inset 0 0 0 1px ${selected.accentColor}30`,
                  background: `radial-gradient(ellipse 60% 50% at 80% 20%, ${selected.accentColor}15 0%, transparent 60%)`,
                }}
              />

              {/* Close button */}
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full glass flex items-center justify-center z-10 hover:border-primary/60 transition-all"
              >
                <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="relative p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left */}
                <div className="flex flex-col justify-center">
                  <span
                    className="inline-flex w-fit text-[10px] tracking-[0.2em] uppercase font-bold px-3 py-1 rounded-full mb-6"
                    style={{
                      background: `${selected.statusColor}20`,
                      color: selected.statusColor,
                      border: `1px solid ${selected.statusColor}40`,
                    }}
                  >
                    {selected.status}
                  </span>

                  <h2 className="text-3xl md:text-4xl font-black text-foreground mb-1">{selected.name}</h2>
                  <p className="text-sm italic text-muted-foreground mb-6">{selected.species}</p>
                  <p className="text-muted-foreground leading-relaxed mb-8">{selected.description}</p>

                  <div className="space-y-4">
                    <div className="flex gap-6">
                      <div>
                        <div className="text-[10px] tracking-widest uppercase text-muted-foreground">Population</div>
                        <div className="text-xl font-bold" style={{ color: selected.accentColor }}>{selected.population}</div>
                      </div>
                      <div>
                        <div className="text-[10px] tracking-widest uppercase text-muted-foreground">Habitat</div>
                        <div className="text-xl font-bold text-foreground">{selected.habitat}</div>
                      </div>
                    </div>

                    <ThreatMeter value={selected.threat} />

                    <div className="flex flex-wrap gap-2 pt-2">
                      {selected.traits.map((trait) => (
                        <span
                          key={trait}
                          className="text-[10px] tracking-wider px-3 py-1 rounded-full"
                          style={{
                            background: `${selected.accentColor}15`,
                            border: `1px solid ${selected.accentColor}30`,
                            color: selected.accentColor,
                          }}
                        >
                          {trait}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right - illustration */}
                <div className="flex flex-col items-center justify-center">
                  <motion.div
                    className="w-48 h-48 md:w-64 md:h-64"
                    animate={{ y: [0, -12, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <AnimalCardSVG path={selected.svgPath} color={selected.accentColor} />
                  </motion.div>

                  <WaveformViz color={selected.accentColor} />

                  <button
                    className="mt-8 px-8 py-3 rounded-full text-sm tracking-widest uppercase font-bold text-primary-foreground glow-gold w-full"
                    style={{
                      background: "linear-gradient(135deg, oklch(0.78 0.14 82) 0%, oklch(0.65 0.15 78) 100%)",
                    }}
                    onClick={() => {
                      setSelected(null)
                      document.querySelector("#donate")?.scrollIntoView({ behavior: "smooth" })
                    }}
                  >
                    Protect This Species
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
