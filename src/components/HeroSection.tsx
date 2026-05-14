import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"

const PARTICLES = Array.from({ length: 55 }, (_, i) => ({
  id: i,
  size: Math.random() * 3.5 + 1,
  left: Math.random() * 100,
  delay: Math.random() * 12,
  duration: Math.random() * 14 + 10,
  color: Math.random() > 0.5
    ? "oklch(0.78 0.14 82 / 0.7)"
    : "oklch(0.6 0.12 150 / 0.6)",
}))

const BIRDS = Array.from({ length: 4 }, (_, i) => ({
  id: i,
  top: 15 + Math.random() * 30,
  delay: i * 6 + Math.random() * 3,
  duration: 18 + Math.random() * 8,
  scale: 0.7 + Math.random() * 0.6,
}))

const HERO_WORDS = ["Endangered.", "Precious.", "Alive."]

const VOLUMETRIC_RAYS = [12, 22, 35, 48, 58, 68, 78, 88]

function BirdSVG({ scale }: { scale: number }) {
  return (
    <svg
      viewBox="0 0 80 30"
      width={60 * scale}
      height={22 * scale}
      fill="none"
    >
      <path
        d="M40 15 Q25 5 10 12 Q25 8 40 15 Q55 8 70 12 Q55 5 40 15Z"
        fill="oklch(0.75 0.04 200 / 0.85)"
      />
    </svg>
  )
}

function WaterRipple({ x, y }: { x: number; y: number }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: `${x}%`, top: `${y}%` }}
      initial={{ scale: 0, opacity: 0.7 }}
      animate={{ scale: 8, opacity: 0 }}
      transition={{ duration: 3, ease: "easeOut" }}
    >
      <div
        className="w-20 h-20 rounded-full border border-primary/30"
        style={{ transform: "translate(-50%, -50%)" }}
      />
    </motion.div>
  )
}

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [wordIndex, setWordIndex] = useState(0)
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([])
  const rippleCounter = useRef(0)
  const mouseRef = useRef({ x: 0.5, y: 0.5 })
  const parallaxRef = useRef<HTMLDivElement>(null)

  const { scrollY } = useScroll()
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0])
  const heroScale = useTransform(scrollY, [0, 600], [1, 1.08])
  const textY = useTransform(scrollY, [0, 600], [0, -120])

  // Cycle hero words
  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((i) => (i + 1) % HERO_WORDS.length)
    }, 2800)
    return () => clearInterval(interval)
  }, [])

  // Mouse parallax
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      }
      if (parallaxRef.current) {
        const dx = (mouseRef.current.x - 0.5) * 30
        const dy = (mouseRef.current.y - 0.5) * 20
        parallaxRef.current.style.transform = `translate(${dx}px, ${dy}px)`
      }
    }
    window.addEventListener("mousemove", onMouseMove)
    return () => window.removeEventListener("mousemove", onMouseMove)
  }, [])

  // Canvas water ripple effect
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")!
    let W = window.innerWidth
    let H = window.innerHeight
    canvas.width = W
    canvas.height = H

    const rippleNodes: { x: number; y: number; r: number; alpha: number }[] = []
    let animId: number

    const addRipple = () => {
      rippleNodes.push({
        x: Math.random() * W,
        y: H * 0.75 + Math.random() * H * 0.25,
        r: 0,
        alpha: 0.35,
      })
    }

    const rippleInterval = setInterval(addRipple, 1600)

    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      for (let i = rippleNodes.length - 1; i >= 0; i--) {
        const n = rippleNodes[i]
        n.r += 1.8
        n.alpha -= 0.004
        if (n.alpha <= 0) {
          rippleNodes.splice(i, 1)
          continue
        }
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx.strokeStyle = `oklch(0.78 0.14 82 / ${n.alpha})`
        ctx.lineWidth = 1
        ctx.stroke()
      }
      animId = requestAnimationFrame(draw)
    }

    draw()

    const onResize = () => {
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight
    }
    window.addEventListener("resize", onResize)

    return () => {
      cancelAnimationFrame(animId)
      clearInterval(rippleInterval)
      window.removeEventListener("resize", onResize)
    }
  }, [])

  // Click ripple
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    const id = rippleCounter.current++
    setRipples((r) => [...r, { id, x, y }])
    setTimeout(() => {
      setRipples((r) => r.filter((rip) => rip.id !== id))
    }, 3200)
  }

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden"
      onClick={handleClick}
      id="hero"
    >
      {/* Deep jungle background */}
      <motion.div
        className="absolute inset-0 camera-zoom"
        style={{ scale: heroScale }}
      >
        {/* Base dark jungle gradient */}
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
          className="absolute top-0 left-0 right-0 h-1/2 aurora pointer-events-none"
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

        {/* Volumetric light rays */}
        {VOLUMETRIC_RAYS.map((left, i) => (
          <div
            key={i}
            className="volumetric-ray"
            style={{
              left: `${left}%`,
              animationDelay: `${i * 1.1}s`,
              animationDuration: `${7 + i * 0.5}s`,
              transform: `rotate(${(left - 50) * 0.15}deg)`,
              opacity: 0.06 + (i % 3) * 0.03,
            }}
          />
        ))}

        {/* Glowing orbs / bokeh */}
        {[
          { x: 15, y: 25, size: 180, color: "oklch(0.6 0.15 150 / 0.08)" },
          { x: 75, y: 20, size: 220, color: "oklch(0.6 0.15 150 / 0.06)" },
          { x: 50, y: 60, size: 300, color: "oklch(0.5 0.1 165 / 0.07)" },
          { x: 30, y: 75, size: 150, color: "oklch(0.78 0.14 82 / 0.04)" },
          { x: 85, y: 55, size: 140, color: "oklch(0.5 0.1 165 / 0.06)" },
        ].map((orb, i) => (
          <div
            key={i}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: `${orb.x}%`,
              top: `${orb.y}%`,
              width: orb.size,
              height: orb.size,
              background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
              transform: "translate(-50%, -50%)",
              animation: `fogDrift ${10 + i * 2}s ease-in-out infinite ${i * 1.5}s`,
              filter: "blur(8px)",
            }}
          />
        ))}
      </motion.div>

      {/* Canvas water ripple */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ mixBlendMode: "screen", opacity: 0.7 }}
      />

      {/* Fog layers */}
      <div className="fog-layer pointer-events-none" style={{ zIndex: 2 }} />
      <div className="fog-layer-2 pointer-events-none" style={{ zIndex: 2 }} />
      <div className="fog-layer-3 pointer-events-none" style={{ zIndex: 2 }} />

      {/* Particles */}
      {PARTICLES.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: `${p.left}%`,
            bottom: "-5px",
            width: p.size,
            height: p.size,
            background: p.color,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            zIndex: 3,
          }}
        />
      ))}

      {/* Birds */}
      {BIRDS.map((bird) => (
        <div
          key={bird.id}
          className="absolute pointer-events-none"
          style={{
            top: `${bird.top}%`,
            left: 0,
            zIndex: 4,
            animation: `birdFly1 ${bird.duration}s linear infinite ${bird.delay}s`,
          }}
        >
          <BirdSVG scale={bird.scale} />
        </div>
      ))}

      {/* Click ripples */}
      {ripples.map((r) => (
        <WaterRipple key={r.id} x={r.x} y={r.y} />
      ))}

      {/* Main content */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
        style={{ y: textY, opacity: heroOpacity, zIndex: 10 }}
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mb-6 flex items-center gap-3"
        >
          <div className="h-px w-12 bg-primary/60" />
          <span className="text-xs tracking-[0.3em] uppercase text-primary font-medium">
            Aethon Wildlife Sanctuary
          </span>
          <div className="h-px w-12 bg-primary/60" />
        </motion.div>

        {/* Main Title */}
        <div className="overflow-hidden mb-4" ref={parallaxRef} style={{ transition: "transform 0.15s ease-out" }}>
          <motion.h1
            className="cinematic-title text-foreground"
            initial={{ y: 120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.4, delay: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="block">Every Life</span>
            <span className="block text-gold-shimmer">Deserves</span>
            <span className="block">A Sanctuary</span>
          </motion.h1>
        </div>

        {/* Animated cycling word */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="mb-8 h-12 flex items-center gap-3"
        >
          <span className="text-lg text-muted-foreground tracking-widest uppercase">
            Nature is
          </span>
          <div className="relative h-10 overflow-hidden" style={{ minWidth: "160px" }}>
            <AnimatePresence mode="wait">
              <motion.span
                key={wordIndex}
                className="absolute inset-0 flex items-center text-xl font-bold text-gold-shimmer"
                initial={{ y: 40, opacity: 0, filter: "blur(8px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                exit={{ y: -40, opacity: 0, filter: "blur(8px)" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                {HERO_WORDS[wordIndex]}
              </motion.span>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="max-w-lg text-base text-muted-foreground leading-relaxed mb-10 tracking-wide"
        >
          A 14,000-acre living ark where the world's most endangered species
          thrive, breathe, and reclaim their wild heritage.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.1, duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => document.querySelector("#wildlife")?.scrollIntoView({ behavior: "smooth" })}
            className="group relative px-8 py-4 rounded-full text-sm tracking-[0.15em] uppercase font-bold text-primary-foreground overflow-hidden glow-gold"
            style={{
              background: "linear-gradient(135deg, oklch(0.78 0.14 82) 0%, oklch(0.68 0.16 78) 50%, oklch(0.78 0.14 82) 100%)",
              backgroundSize: "200% 100%",
            }}
          >
            <span className="relative z-10 flex items-center gap-2">
              Explore Wildlife
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => document.querySelector("#mission")?.scrollIntoView({ behavior: "smooth" })}
            className="group flex items-center gap-3 px-8 py-4 rounded-full text-sm tracking-[0.15em] uppercase font-semibold glass border border-border/60"
          >
            <span className="w-8 h-8 rounded-full border border-primary/60 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:border-primary group-hover:bg-primary/10">
              <svg className="w-3 h-3 text-primary ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                <polygon points="5,3 19,12 5,21" />
              </svg>
            </span>
            Our Mission
          </motion.button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.8, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground">Scroll to Explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-10 bg-gradient-to-b from-primary/60 to-transparent"
          />
        </motion.div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent 0%, oklch(0.06 0.012 165) 100%)",
          zIndex: 8,
        }}
      />

      {/* Live badge */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2.5, duration: 0.8 }}
        className="absolute top-24 right-6 lg:right-10 glass rounded-full px-4 py-2 flex items-center gap-2 z-20"
      >
        <div
          className="w-2 h-2 rounded-full bg-emerald-400"
          style={{ animation: "glowPulse 2s ease-in-out infinite" }}
        />
        <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
          Live Sanctuary
        </span>
      </motion.div>

      {/* Stats pill */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2.7, duration: 0.8 }}
        className="absolute bottom-16 left-6 lg:left-10 glass rounded-2xl px-5 py-4 z-20 hidden lg:block"
      >
        <div className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-2">
          Species Protected
        </div>
        <div className="text-3xl font-bold text-gold">847</div>
        <div className="text-xs text-muted-foreground">and counting</div>
      </motion.div>
    </section>
  )
}
