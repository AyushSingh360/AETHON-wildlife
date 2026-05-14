import { useEffect, useRef, useState, lazy, Suspense } from "react"
import { motion, useInView } from "framer-motion"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts"

const SanctuaryGlobe = lazy(() =>
  import("@/components/SanctuaryGlobe").then((m) => ({ default: m.SanctuaryGlobe }))
)

function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!start) return
    let startTime: number | null = null
    const step = (time: number) => {
      if (!startTime) startTime = time
      const progress = Math.min((time - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [start, target, duration])
  return count
}

function StatCounter({ value, suffix, prefix, label, description, color, delay }: {
  value: number
  suffix?: string
  prefix?: string
  label: string
  description: string
  color: string
  delay: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const count = useCountUp(value, 2200, isInView)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
    >
      <div className="relative p-8 rounded-3xl glass overflow-hidden hover:border-primary/20 transition-all duration-500">
        {/* Background glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl"
          style={{ background: `radial-gradient(ellipse 80% 60% at 50% 100%, ${color}10 0%, transparent 70%)` }}
        />

        {/* Decorative circle */}
        <div
          className="absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-10"
          style={{ background: `radial-gradient(circle, ${color} 0%, transparent 70%)` }}
        />

        <div
          className="text-5xl lg:text-6xl font-black mb-2 tabular-nums transition-all duration-300 group-hover:scale-105"
          style={{ color }}
        >
          {prefix}{count.toLocaleString()}{suffix}
        </div>

        <div className="text-sm font-bold text-foreground mb-2 tracking-wide">
          {label}
        </div>

        <p className="text-xs text-muted-foreground leading-relaxed">
          {description}
        </p>

        {/* Progress bar */}
        <div className="mt-4 h-0.5 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true }}
            transition={{ delay: delay + 0.5, duration: 1.5, ease: "easeOut" }}
            style={{ background: `linear-gradient(90deg, ${color}, oklch(0.78 0.14 82))` }}
          />
        </div>
      </div>
    </motion.div>
  )
}

const STATS = [
  { value: 847, suffix: "+", label: "Species Protected", description: "Endangered and critically threatened species currently under active sanctuary protection programs.", color: "oklch(0.65 0.18 150)", delay: 0 },
  { value: 14000, suffix: " ac", label: "Acres Preserved", description: "Pristine natural habitat spanning tropical forests, wetlands, and alpine zones.", color: "oklch(0.72 0.15 55)", delay: 0.1 },
  { value: 38, suffix: "", label: "Revivals from Extinction", description: "Species that have been brought back from near-extinction through our breeding programs.", color: "oklch(0.75 0.16 75)", delay: 0.2 },
  { value: 320, suffix: "+", label: "Rangers Deployed", description: "Expert conservation rangers patrolling sanctuary boundaries 24/7 year-round.", color: "oklch(0.6 0.14 220)", delay: 0.3 },
  { value: 140, suffix: "+", label: "Research Projects", description: "Active scientific studies advancing global conservation biology and genetics.", color: "oklch(0.65 0.15 300)", delay: 0.4 },
  { value: 43, suffix: " yrs", label: "Years of Service", description: "Four decades of uninterrupted dedication to wildlife protection and restoration.", color: "oklch(0.7 0.2 25)", delay: 0.5 },
]

const ORBIT_ITEMS = [
  { label: "Breeding", angle: 0 },
  { label: "Patrolling", angle: 60 },
  { label: "Research", angle: 120 },
  { label: "Restoration", angle: 180 },
  { label: "Community", angle: 240 },
  { label: "Education", angle: 300 },
]

const YEARLY_DATA = [
  { year: "2019", species: 620, habitat: 8500, rangers: 180 },
  { year: "2020", species: 680, habitat: 9800, rangers: 210 },
  { year: "2021", species: 730, habitat: 11200, rangers: 250 },
  { year: "2022", species: 780, habitat: 12400, rangers: 280 },
  { year: "2023", species: 820, habitat: 13200, rangers: 300 },
  { year: "2024", species: 847, habitat: 14000, rangers: 320 },
]

export function ConservationStats() {
  const sectionRef = useRef<HTMLDivElement>(null)

  return (
    <section ref={sectionRef} id="conservation" className="relative py-32 px-6 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 100% 70% at 50% 50%, oklch(0.12 0.06 155 / 0.3) 0%, transparent 60%),
            linear-gradient(180deg, oklch(0.06 0.012 165) 0%, oklch(0.04 0.01 165) 100%)
          `,
        }}
      />

      {/* Aurora sweep */}
      <div
        className="absolute top-0 left-0 right-0 h-1 pointer-events-none"
        style={{
          background: "linear-gradient(90deg, transparent 0%, oklch(0.6 0.15 150 / 0.6) 30%, oklch(0.78 0.14 82 / 0.4) 50%, oklch(0.6 0.15 150 / 0.6) 70%, transparent 100%)",
          boxShadow: "0 0 40px oklch(0.6 0.15 150 / 0.4)",
        }}
      />

      <div className="relative max-w-[1400px] mx-auto">
        {/* Section header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary/60" />
            <span className="text-xs tracking-[0.3em] uppercase text-primary">By the Numbers</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary/60" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 1 }}
            className="section-title text-foreground mb-4"
          >
            Impact That{" "}
            <span className="text-gold-shimmer">Defines</span>{" "}
            a Generation
          </motion.h2>
        </div>

        {/* Central 3D globe visualization */}
        <div className="flex flex-col lg:flex-row gap-16 items-center mb-20">
          {/* 3D Globe */}
          <div className="relative w-72 h-72 lg:w-80 lg:h-80 flex-shrink-0 mx-auto lg:mx-0">
            <Suspense fallback={
              <div className="w-full h-full flex items-center justify-center">
                <motion.div
                  className="w-12 h-12 rounded-full border-2 border-primary border-t-transparent"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
              </div>
            }>
              <SanctuaryGlobe />
            </Suspense>

            {/* Overlay labels */}
            <div className="absolute inset-0 pointer-events-none">
              {ORBIT_ITEMS.map((item, i) => {
                const angleRad = (item.angle * Math.PI) / 180
                const r = 148
                const cx = 50 + ((r * Math.cos(angleRad - Math.PI / 2)) / 160) * 50
                const cy = 50 + ((r * Math.sin(angleRad - Math.PI / 2)) / 160) * 50

                return (
                  <div
                    key={i}
                    className="absolute text-[9px] tracking-widest uppercase text-muted-foreground"
                    style={{
                      left: `${cx}%`,
                      top: `${cy}%`,
                      transform: "translate(-50%, -50%)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {item.label}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Text */}
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
                Every Number Has a Name
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Behind every statistic is an animal breathing easier, a habitat reclaimed,
                a species given another generation. Conservation isn't measured in data—
                it's measured in lives.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Aethon's methodology combines traditional wildlife stewardship with
                cutting-edge conservation technology: AI-driven poaching detection,
                genetic diversity mapping, satellite habitat monitoring, and
                community-led protection programs.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {["AI Monitoring", "Genetic Research", "Community Rangers", "Satellite Tracking"].map((tag) => (
                  <span
                    key={tag}
                    className="text-xs tracking-wider px-4 py-2 rounded-full glass border border-primary/20 text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {STATS.map((stat) => (
            <StatCounter key={stat.label} {...stat} />
          ))}
        </div>

        {/* Yearly progress chart */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-16 glass-dark rounded-3xl p-8"
        >
          <div className="text-center mb-8">
            <div className="text-xs tracking-[0.2em] uppercase text-primary mb-2">Growth Over Time</div>
            <h3 className="text-xl font-bold text-foreground">Six Years of Expansion</h3>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={YEARLY_DATA} barGap={4} accessibilityLayer>
                <XAxis
                  dataKey="year"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "oklch(0.62 0.04 165)", fontSize: 11 }}
                />
                <YAxis hide />
                <Tooltip
                  contentStyle={{
                    background: "oklch(0.09 0.018 165 / 0.95)",
                    border: "1px solid oklch(0.78 0.14 82 / 0.2)",
                    borderRadius: "12px",
                    color: "oklch(0.95 0.015 90)",
                    fontSize: 12,
                    backdropFilter: "blur(12px)",
                  }}
                  cursor={{ fill: "oklch(0.78 0.14 82 / 0.05)" }}
                />
                <Bar dataKey="species" fill="oklch(0.65 0.18 150)" radius={[4, 4, 0, 0]} name="Species Protected" />
                <Bar dataKey="rangers" fill="oklch(0.78 0.14 82)" radius={[4, 4, 0, 0]} name="Rangers" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm" style={{ background: "oklch(0.65 0.18 150)" }} />
              <span className="text-xs text-muted-foreground">Species Protected</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm" style={{ background: "oklch(0.78 0.14 82)" }} />
              <span className="text-xs text-muted-foreground">Rangers Deployed</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
