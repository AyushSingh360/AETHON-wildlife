import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

const RAIN_DROPS = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  delay: Math.random() * 3,
  duration: Math.random() * 0.8 + 0.6,
  height: Math.random() * 25 + 12,
  opacity: Math.random() * 0.4 + 0.2,
}))

const LEAVES = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  top: Math.random() * 60 + 10,
  delay: i * 3.5 + Math.random() * 2,
  duration: 14 + Math.random() * 8,
  size: Math.random() * 24 + 16,
  rotate: Math.random() * 360,
}))

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
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  // Scene transitions based on scroll
  const dayOpacity = useTransform(scrollYProgress, [0, 0.25, 0.5], [1, 0.5, 0])
  const rainOpacity = useTransform(scrollYProgress, [0.2, 0.4, 0.65, 0.85], [0, 1, 1, 0])
  const nightOpacity = useTransform(scrollYProgress, [0.6, 0.8, 1], [0, 1, 1])
  const leftTreeX = useTransform(scrollYProgress, [0, 1], ["-5%", "-12%"])
  const rightTreeX = useTransform(scrollYProgress, [0, 1], ["5%", "12%"])
  const fogY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"])

  return (
    <section ref={sectionRef} className="relative" style={{ minHeight: "300vh" }}>
      <div className="sticky top-0 h-screen overflow-hidden">
{/* Dynamic background - translucent */}
         <motion.div
           className="absolute inset-0"
           style={{
             background: `
               radial-gradient(ellipse 70% 50% at 50% 30%,
                 oklch(0.2 0.1 155 / 0.35) 0%, transparent 60%),
               linear-gradient(180deg,
                 oklch(0.05 0.015 165 / 0.2) 0%,
                 oklch(0.1 0.06 158 / 0.25) 40%,
                 oklch(0.06 0.03 162 / 0.2) 70%,
                 oklch(0.04 0.01 165 / 0.1) 100%
               )
             `,
           }}
         />

        {/* Daylight layer */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: dayOpacity,
            background: `
              radial-gradient(ellipse 80% 60% at 60% 15%,
                oklch(0.85 0.15 75 / 0.2) 0%,
                oklch(0.6 0.12 90 / 0.1) 30%,
                transparent 60%
              )
            `,
          }}
        />

        {/* Rain layer */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ opacity: rainOpacity }}
        >
          {/* Rain overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(170deg, oklch(0.45 0.05 210 / 0.15) 0%, transparent 70%)",
            }}
          />
          {/* Rain drops */}
          {RAIN_DROPS.map((drop) => (
            <div
              key={drop.id}
              className="rain-drop absolute"
              style={{
                left: `${drop.left}%`,
                height: drop.height,
                opacity: drop.opacity,
                animationDuration: `${drop.duration}s`,
                animationDelay: `${drop.delay}s`,
                animationName: "rainFall",
                animationIterationCount: "infinite",
              }}
            />
          ))}
          {/* Leaves blowing */}
          {LEAVES.map((leaf) => (
            <div
              key={leaf.id}
              className="leaf absolute"
              style={{
                top: `${leaf.top}%`,
                animationDuration: `${leaf.duration}s`,
                animationDelay: `${leaf.delay}s`,
                animationName: "leafBlow",
                animationIterationCount: "infinite",
              }}
            >
              <svg
                viewBox="0 0 40 40"
                width={leaf.size}
                height={leaf.size}
                style={{ transform: `rotate(${leaf.rotate}deg)` }}
              >
                <path
                  d="M20 4 C30 8 36 18 32 28 C28 36 10 36 6 28 C2 18 10 0 20 4Z"
                  fill="oklch(0.45 0.14 148 / 0.75)"
                />
                <path
                  d="M20 4 C20 4 20 36 20 36"
                  stroke="oklch(0.35 0.1 150 / 0.4)"
                  strokeWidth="1"
                  fill="none"
                />
              </svg>
            </div>
          ))}
        </motion.div>

        {/* Night layer */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: nightOpacity,
            background: `
              radial-gradient(ellipse 60% 50% at 50% 20%, oklch(0.25 0.08 240 / 0.3) 0%, transparent 60%),
              linear-gradient(180deg, oklch(0.03 0.01 220 / 0.7) 0%, transparent 100%)
            `,
          }}
        >
          {/* Stars */}
          {Array.from({ length: 40 }, (_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: Math.random() * 2 + 0.5,
                height: Math.random() * 2 + 0.5,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 45}%`,
                opacity: Math.random() * 0.6 + 0.3,
                animation: `glowPulse ${Math.random() * 3 + 2}s ease-in-out infinite ${Math.random() * 2}s`,
              }}
            />
          ))}
          {/* Moon glow */}
          <div
            className="absolute"
            style={{
              top: "10%",
              right: "15%",
              width: 80,
              height: 80,
              borderRadius: "50%",
              background: "radial-gradient(circle, oklch(0.92 0.04 85 / 0.9) 0%, oklch(0.78 0.06 90 / 0.4) 40%, transparent 70%)",
              boxShadow: "0 0 60px oklch(0.92 0.04 85 / 0.3), 0 0 120px oklch(0.92 0.04 85 / 0.1)",
            }}
          />
        </motion.div>

        {/* Tree silhouettes left */}
        <motion.div
          className="absolute bottom-0 left-0 h-full pointer-events-none"
          style={{ x: leftTreeX, zIndex: 5 }}
        >
          <svg viewBox="0 0 300 800" className="h-full" fill="oklch(0.03 0.01 165)">
            <path d="M0 800 L0 400 Q50 350 40 250 Q80 150 60 50 Q90 150 120 200 Q100 300 140 400 Q160 450 150 500 L300 500 L300 800 Z" />
            <path d="M100 800 L100 550 Q130 480 120 380 Q150 280 130 160 Q155 280 180 340 Q170 440 200 520 L300 520 L300 800 Z" opacity="0.7" />
          </svg>
        </motion.div>

        {/* Tree silhouettes right */}
        <motion.div
          className="absolute bottom-0 right-0 h-full pointer-events-none"
          style={{ x: rightTreeX, zIndex: 5 }}
        >
          <svg viewBox="0 0 300 800" className="h-full" fill="oklch(0.03 0.01 165)" style={{ transform: "scaleX(-1)" }}>
            <path d="M0 800 L0 400 Q50 350 40 250 Q80 150 60 50 Q90 150 120 200 Q100 300 140 400 Q160 450 150 500 L300 500 L300 800 Z" />
            <path d="M100 800 L100 550 Q130 480 120 380 Q150 280 130 160 Q155 280 180 340 Q170 440 200 520 L300 520 L300 800 Z" opacity="0.7" />
          </svg>
        </motion.div>

        {/* Fog */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{ y: fogY, zIndex: 6 }}
        >
          <div className="fog-layer" />
          <div className="fog-layer-2" />
        </motion.div>

        {/* Content */}
        <div className="absolute inset-0 flex items-center justify-center z-10 px-6">
          <div className="max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
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
              <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-12">
                Every dawn, dusk, and storm is part of a greater story—
                one that Aethon Sanctuary has protected for over four decades.
                Scroll to experience the transformation.
              </p>

              {/* Story timeline */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                {STORY_POINTS.map((point, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15, duration: 0.8 }}
                    className="glass rounded-2xl p-6 text-left group hover:border-primary/30 transition-all duration-500"
                  >
                    <div className="text-3xl mb-3">{point.icon}</div>
                    <div className="text-xs tracking-[0.2em] uppercase text-primary mb-2">{point.label}</div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{point.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
