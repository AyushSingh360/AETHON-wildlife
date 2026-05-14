import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const TESTIMONIALS = [
  {
    quote: "Aethon doesn't just protect animals—it protects the future of our planet. I've witnessed the Bengal tigers flourish under their care. It's a miracle in motion.",
    name: "Dr. Priya Sharma",
    title: "Wildlife Biologist, WWF India",
    avatar: "PS",
    color: "oklch(0.72 0.18 55)",
  },
  {
    quote: "I've visited 34 sanctuaries worldwide. Aethon operates at a level of scientific rigor and environmental empathy that I've never seen replicated anywhere else on Earth.",
    name: "Marcus Chen",
    title: "National Geographic Photographer",
    avatar: "MC",
    color: "oklch(0.6 0.14 200)",
  },
  {
    quote: "The snow leopard program here has taught us more about high-altitude ecology in 5 years than the previous 30 years of scattered research. Revolutionary.",
    name: "Prof. Elena Vasquez",
    title: "Director, Global Conservation Institute",
    avatar: "EV",
    color: "oklch(0.65 0.18 148)",
  },
  {
    quote: "As a donor, seeing my contributions translate into actual species recovery—not just on paper but with my own eyes—has been the most profound experience of my life.",
    name: "James Whitfield",
    title: "Conservation Philanthropist",
    avatar: "JW",
    color: "oklch(0.78 0.14 82)",
  },
  {
    quote: "The community ranger program transformed our village from potential poachers into proud protectors. We are the sanctuary now. We always were.",
    name: "Amara Nkosi",
    title: "Chief Ranger, Eastern Zone",
    avatar: "AN",
    color: "oklch(0.55 0.18 150)",
  },
]

export function TestimonialsSection() {
  const [active, setActive] = useState(0)
  const [direction, setDirection] = useState(1)

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1)
      setActive((a) => (a + 1) % TESTIMONIALS.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const goTo = (i: number) => {
    setDirection(i > active ? 1 : -1)
    setActive(i)
  }

  const current = TESTIMONIALS[active]

  return (
    <section className="relative py-32 px-6 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 50% 50%, oklch(0.12 0.05 165 / 0.4) 0%, transparent 60%),
            linear-gradient(180deg, oklch(0.05 0.01 165) 0%, oklch(0.06 0.012 165) 100%)
          `,
        }}
      />

      {/* Large quote mark decoration */}
      <div
        className="absolute top-16 left-1/2 -translate-x-1/2 text-[20rem] font-black leading-none pointer-events-none select-none"
        style={{ color: "oklch(0.78 0.14 82 / 0.03)", fontFamily: "Georgia, serif" }}
      >
        "
      </div>

      <div className="relative max-w-4xl mx-auto text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-3 mb-6"
        >
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary/60" />
          <span className="text-xs tracking-[0.3em] uppercase text-primary">Voices of the Wild</span>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary/60" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="section-title text-foreground mb-16"
        >
          Words from the{" "}
          <span className="text-gold-shimmer">Field</span>
        </motion.h2>

        {/* Testimonial card */}
        <div className="relative min-h-64">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={active}
              custom={direction}
              initial={{ opacity: 0, x: direction * 80, filter: "blur(10px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: direction * -80, filter: "blur(10px)" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="glass rounded-3xl p-8 md:p-12"
              style={{ borderColor: `${current.color}20` }}
            >
              {/* Stars */}
              <div className="flex items-center justify-center gap-1 mb-6">
                {Array.from({ length: 5 }, (_, i) => (
                  <svg key={i} className="w-4 h-4" fill="oklch(0.78 0.14 82)" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>

              <blockquote
                className="text-lg md:text-xl font-light text-foreground leading-relaxed mb-8 italic"
                style={{ fontFamily: "Georgia, serif" }}
              >
                "{current.quote}"
              </blockquote>

              <div className="flex items-center justify-center gap-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold text-primary-foreground"
                  style={{
                    background: `linear-gradient(135deg, ${current.color} 0%, oklch(0.78 0.14 82) 100%)`,
                  }}
                >
                  {current.avatar}
                </div>
                <div className="text-left">
                  <div className="font-semibold text-foreground">{current.name}</div>
                  <div className="text-xs text-muted-foreground">{current.title}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation dots */}
        <div className="flex items-center justify-center gap-3 mt-8">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="transition-all duration-300"
            >
              <div
                className="h-1 rounded-full transition-all duration-500"
                style={{
                  width: active === i ? "32px" : "8px",
                  background: active === i ? "oklch(0.78 0.14 82)" : "oklch(0.35 0.02 165)",
                }}
              />
            </button>
          ))}
        </div>

        {/* All avatars */}
        <div className="flex items-center justify-center gap-3 mt-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.button
              key={i}
              onClick={() => goTo(i)}
              whileHover={{ scale: 1.1 }}
              className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300"
              style={{
                background: active === i
                  ? `linear-gradient(135deg, ${t.color} 0%, oklch(0.78 0.14 82) 100%)`
                  : "oklch(0.18 0.022 165)",
                opacity: active === i ? 1 : 0.5,
                border: active === i ? `1px solid ${t.color}40` : "1px solid transparent",
              }}
            >
              <span className="text-[10px] text-white">{t.avatar}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  )
}
