import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

const MISSION_PILLARS = [
  {
    num: "01",
    title: "Preserve",
    desc: "Protecting 14,000 acres of pristine habitat across 3 biomes, creating sanctuaries where nature leads.",
    color: "oklch(0.5 0.15 150)",
    icon: (
      <svg viewBox="0 0 32 32" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M16 3 C10 8 4 12 4 19 C4 26 10 30 16 30 C22 30 28 26 28 19 C28 12 22 8 16 3Z" />
        <path d="M16 3 L16 22" />
        <path d="M16 14 Q12 10 8 12" />
        <path d="M16 10 Q20 6 24 9" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Protect",
    desc: "24/7 anti-poaching patrols, satellite monitoring, and community ranger programs guard every corner.",
    color: "oklch(0.55 0.14 75)",
    icon: (
      <svg viewBox="0 0 32 32" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M16 3 L28 8 L28 20 C28 26 22 30 16 30 C10 30 4 26 4 20 L4 8 Z" />
        <path d="M12 16 L15 19 L21 13" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Revive",
    desc: "Breeding programs, habitat restoration, and rewilding have returned 38 species from the edge.",
    color: "oklch(0.6 0.12 200)",
    icon: (
      <svg viewBox="0 0 32 32" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M6 16 A10 10 0 0 1 26 16" />
        <path d="M26 16 A10 10 0 0 1 6 16" />
        <path d="M26 10 L26 16 L20 16" />
        <path d="M6 22 L6 16 L12 16" />
        <circle cx="16" cy="16" r="3" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "Research",
    desc: "World-class scientists collaborate on 140+ active studies advancing conservation science globally.",
    color: "oklch(0.65 0.1 300)",
    icon: (
      <svg viewBox="0 0 32 32" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="13" cy="13" r="8" />
        <path d="M19 19 L28 28" strokeLinecap="round" />
        <path d="M13 9 L13 17 M9 13 L17 13" />
      </svg>
    ),
  },
]

export function MissionSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const lineWidth = useTransform(scrollYProgress, [0.1, 0.5], ["0%", "100%"])

  return (
    <section ref={ref} id="mission" className="relative py-32 px-6 overflow-hidden">
{/* BG */}
       <div
         className="absolute inset-0 pointer-events-none"
         style={{
           background: `
             radial-gradient(ellipse 60% 50% at 80% 50%, oklch(0.18 0.08 150 / 0.15) 0%, transparent 60%),
             linear-gradient(180deg, oklch(0.06 0.012 165 / 0.3) 0%, oklch(0.08 0.04 160 / 0.2) 50%, oklch(0.06 0.012 165 / 0.3) 100%)
           `,
         }}
       />

      <div className="relative max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="max-w-3xl mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="h-px w-10 bg-primary/60" />
            <span className="text-xs tracking-[0.3em] uppercase text-primary">Driven by Purpose</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="section-title text-foreground mb-6"
          >
            Our Four{" "}
            <span className="text-gold-shimmer">Pillars</span>{" "}
            of Action
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-muted-foreground text-lg leading-relaxed"
          >
            Since 1981, Aethon has stood at the forefront of wildlife conservation—
            not through charity, but through rigorous, science-backed action.
          </motion.p>

          {/* Animated line */}
          <div className="mt-8 h-px bg-border overflow-hidden">
            <motion.div className="h-full bg-primary/60" style={{ width: lineWidth }} />
          </div>
        </div>

        {/* Pillars grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {MISSION_PILLARS.map((pillar, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group relative glass rounded-3xl p-8 overflow-hidden cursor-pointer"
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
                style={{
                  background: `radial-gradient(ellipse 80% 60% at 50% 100%, ${pillar.color} / 0.08) 0%, transparent 70%)`,
                }}
              />

              {/* Number */}
              <div
                className="text-7xl font-black absolute -top-2 -right-2 opacity-5 leading-none select-none"
                style={{ color: pillar.color }}
              >
                {pillar.num}
              </div>

              {/* Icon */}
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110"
                style={{
                  background: `${pillar.color} / 0.12)`,
                  border: `1px solid ${pillar.color} / 0.3)`,
                  color: pillar.color,
                  backgroundColor: `oklch(from ${pillar.color} l c h / 0.12)`,
                  borderColor: `oklch(from ${pillar.color} l c h / 0.3)`,
                  boxShadow: `0 0 30px ${pillar.color.replace(")", " / 0.15)")}`,
                }}
              >
                {pillar.icon}
              </div>

              <div className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-2">
                {pillar.num}
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-gold transition-colors duration-300">
                {pillar.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {pillar.desc}
              </p>

              {/* Bottom accent */}
              <div
                className="absolute bottom-0 left-6 right-6 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `linear-gradient(90deg, transparent, ${pillar.color}, transparent)` }}
              />
            </motion.div>
          ))}
        </div>

        {/* Impact numbers */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-16 glass-dark rounded-3xl p-8 lg:p-12"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: "Species Protected", value: "847+", suffix: "" },
              { label: "Acres of Habitat", value: "14K", suffix: "" },
              { label: "Rangers on Patrol", value: "320", suffix: "" },
              { label: "Years of Service", value: "43", suffix: "" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.6 }}
                className="text-center group"
              >
                <div className="text-4xl lg:text-5xl font-black text-gold mb-2 group-hover:glow-text transition-all duration-300">
                  {stat.value}
                </div>
                <div className="text-xs tracking-[0.15em] uppercase text-muted-foreground">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
