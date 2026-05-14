import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const CAMS = [
  {
    id: "tiger-den",
    name: "Tiger Den",
    location: "Sector 4 — Rainforest Core",
    status: "LIVE",
    viewers: 1284,
    description: "Primary habitat of our resident Bengal tigers. Dawn and dusk activity peaks.",
    bgGradient: "linear-gradient(135deg, oklch(0.15 0.08 50) 0%, oklch(0.08 0.04 30) 100%)",
    accentColor: "oklch(0.72 0.18 55)",
    activity: "High",
  },
  {
    id: "elephant-trail",
    name: "Elephant Trail",
    location: "Sector 7 — Open Savanna",
    status: "LIVE",
    viewers: 892,
    description: "The ancient migration corridor used by our 30-strong elephant herd.",
    bgGradient: "linear-gradient(135deg, oklch(0.14 0.04 180) 0%, oklch(0.08 0.02 160) 100%)",
    accentColor: "oklch(0.6 0.06 200)",
    activity: "Medium",
  },
  {
    id: "alpine-watch",
    name: "Alpine Watch",
    location: "Sector 2 — Highland Ridge",
    status: "LIVE",
    viewers: 546,
    description: "High-altitude surveillance of snow leopard territory. Rare sightings at dawn.",
    bgGradient: "linear-gradient(135deg, oklch(0.16 0.05 210) 0%, oklch(0.08 0.03 200) 100%)",
    accentColor: "oklch(0.75 0.06 220)",
    activity: "Low",
  },
  {
    id: "waterhole",
    name: "Main Waterhole",
    location: "Sector 5 — Wetland Border",
    status: "LIVE",
    viewers: 2150,
    description: "The convergence point where every species meets. Peak activity at noon and dusk.",
    bgGradient: "linear-gradient(135deg, oklch(0.14 0.1 200) 0%, oklch(0.07 0.06 210) 100%)",
    accentColor: "oklch(0.55 0.14 200)",
    activity: "Very High",
    featured: true,
  },
]

const ACTIVITY_COLORS: Record<string, string> = {
  "Low": "oklch(0.6 0.14 220)",
  "Medium": "oklch(0.72 0.15 55)",
  "High": "oklch(0.65 0.22 28)",
  "Very High": "oklch(0.6 0.25 25)",
}

function ScanlineEffect() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-inherit">
      <motion.div
        className="absolute left-0 right-0 h-px"
        style={{ background: "oklch(0.8 0.05 165 / 0.12)" }}
        animate={{ top: ["0%", "100%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />
      {/* CRT overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, oklch(0 0 0 / 0.5) 2px, oklch(0 0 0 / 0.5) 4px)",
        }}
      />
    </div>
  )
}

function CamDisplay({ cam }: { cam: typeof CAMS[0] }) {
  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden" style={{ background: cam.bgGradient }}>
      <ScanlineEffect />

      {/* Simulated cam content - ambient lighting effects */}
      <div className="absolute inset-0">
        {/* Bokeh lights */}
        {Array.from({ length: 8 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: Math.random() * 40 + 10,
              height: Math.random() * 40 + 10,
              background: `radial-gradient(circle, ${cam.accentColor}30 0%, transparent 70%)`,
              filter: "blur(8px)",
            }}
            animate={{
              opacity: [0.3, 0.7, 0.3],
              scale: [0.9, 1.1, 0.9],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* Silhouette suggestion */}
        <div
          className="absolute bottom-0 left-0 right-0 h-2/3"
          style={{
            background: `linear-gradient(to top, oklch(0.04 0.01 165 / 0.8) 0%, transparent 100%)`,
          }}
        />

        {/* Tree line */}
        <svg className="absolute bottom-0 left-0 right-0 w-full" viewBox="0 0 400 120" preserveAspectRatio="none">
          <path
            d="M0 120 L0 60 Q30 30 60 50 Q80 20 100 40 Q120 10 140 35 Q160 15 180 45 Q200 25 220 50 Q240 10 260 40 Q280 20 300 45 Q320 30 340 50 Q360 20 380 45 L400 50 L400 120 Z"
            fill={`${cam.accentColor}15`}
          />
          <path
            d="M0 120 L0 80 Q40 50 80 65 Q110 35 140 60 Q170 40 200 70 Q230 45 260 65 Q290 40 320 65 Q350 45 380 65 L400 70 L400 120 Z"
            fill={`${cam.accentColor}20`}
          />
        </svg>
      </div>

      {/* HUD elements */}
      <div className="absolute inset-0 p-4 flex flex-col">
        {/* Top bar */}
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: cam.status === "LIVE" ? "oklch(0.65 0.22 28)" : "oklch(0.6 0.04 165)", animation: "glowPulse 2s infinite" }}
              />
              <span className="text-[9px] tracking-[0.25em] font-bold" style={{ color: cam.status === "LIVE" ? "oklch(0.65 0.22 28)" : undefined }}>
                {cam.status}
              </span>
            </div>
            <div className="text-[9px] text-muted-foreground tracking-wider">{cam.location}</div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 text-[9px] text-muted-foreground">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              {cam.viewers.toLocaleString()} watching
            </div>
            <div
              className="text-[9px] tracking-wider"
              style={{ color: ACTIVITY_COLORS[cam.activity] }}
            >
              {cam.activity} Activity
            </div>
          </div>
        </div>

        {/* Crosshair center */}
        <div className="flex-1 flex items-center justify-center">
          <div
            className="w-8 h-8 opacity-25"
            style={{ border: `1px solid ${cam.accentColor}`, borderRadius: "2px" }}
          >
            <div className="absolute top-1/2 left-0 right-0 h-px" style={{ background: cam.accentColor, transform: "translateY(-50%)" }} />
            <div className="absolute left-1/2 top-0 bottom-0 w-px" style={{ background: cam.accentColor, transform: "translateX(-50%)" }} />
          </div>
        </div>

        {/* Bottom timestamp */}
        <div className="flex items-center justify-between">
          <div className="text-[9px] text-muted-foreground font-mono">
            {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}
          </div>
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }, (_, i) => (
              <div
                key={i}
                className="wave-bar"
                style={{
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: `${0.6 + i * 0.1}s`,
                  background: cam.accentColor,
                  opacity: 0.6,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Corner brackets */}
      {[
        "top-2 left-2 border-t border-l",
        "top-2 right-2 border-t border-r",
        "bottom-2 left-2 border-b border-l",
        "bottom-2 right-2 border-b border-r",
      ].map((classes, i) => (
        <div
          key={i}
          className={`absolute w-4 h-4 ${classes}`}
          style={{ borderColor: `${cam.accentColor}60` }}
        />
      ))}
    </div>
  )
}

export function LiveCamsSection() {
  const [activeCam, setActiveCam] = useState(CAMS[3])

  return (
    <section id="livecams" className="relative py-32 px-6 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(180deg, oklch(0.05 0.01 165) 0%, oklch(0.07 0.04 165) 50%, oklch(0.05 0.01 165) 100%)",
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
            <span className="text-xs tracking-[0.3em] uppercase text-primary">Live Feeds</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary/60" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 1 }}
            className="section-title text-foreground mb-4"
          >
            Watch Nature{" "}
            <span className="text-gold-shimmer">Unfold</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-muted-foreground text-lg max-w-xl mx-auto"
          >
            24/7 live feeds from 84 camera positions across the sanctuary. Real wildlife, real time.
          </motion.p>
        </div>

        {/* Main featured cam */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <motion.div
            className="lg:col-span-2 rounded-3xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            style={{ height: "360px" }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCam.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="h-full"
              >
                <CamDisplay cam={activeCam} />
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Cam info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass rounded-3xl p-6 flex flex-col"
          >
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-2 h-2 rounded-full"
                style={{ background: "oklch(0.65 0.22 28)", animation: "glowPulse 2s infinite" }}
              />
              <span className="text-xs tracking-widest uppercase text-muted-foreground">Now Watching</span>
            </div>

            <h3 className="text-xl font-bold text-foreground mb-1">{activeCam.name}</h3>
            <p className="text-xs text-muted-foreground mb-4">{activeCam.location}</p>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">{activeCam.description}</p>

            <div className="mt-auto space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Live Viewers</span>
                <span className="text-foreground font-semibold">{activeCam.viewers.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Activity</span>
                <span
                  className="font-semibold"
                  style={{ color: ACTIVITY_COLORS[activeCam.activity] }}
                >
                  {activeCam.activity}
                </span>
              </div>

              <button
                className="w-full mt-4 py-3 rounded-xl text-xs tracking-widest uppercase font-bold text-primary-foreground"
                style={{
                  background: "linear-gradient(135deg, oklch(0.78 0.14 82) 0%, oklch(0.65 0.15 78) 100%)",
                }}
              >
                Full Screen
              </button>
            </div>
          </motion.div>
        </div>

{/* Camera thumbnails */}
         <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
           {CAMS.map((cam, i) => (
             <motion.button
               key={cam.id}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: i * 0.08 }}
               onClick={() => setActiveCam(cam)}
               className={`relative rounded-2xl overflow-hidden transition-all duration-300 ${
                 activeCam.id === cam.id
                   ? "ring-1 ring-primary/60 scale-[1.02]"
                   : "opacity-70 hover:opacity-100"
               }`}
               style={{ height: "160px" }}
             >
               {/* Scale the full-size CamDisplay down to fit the thumbnail */}
               <div className="absolute inset-0 scale-[0.44] origin-top-left">
                 <CamDisplay cam={cam} />
               </div>

               {/* Label overlay */}
               <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent flex items-end p-3">
                 <div className="text-left">
                   <div className="text-[10px] font-bold text-foreground">
                     {cam.name}
                   </div>
                   <div className="text-[9px] text-muted-foreground">
                     {cam.viewers.toLocaleString()} watching
                   </div>
                 </div>
               </div>
             </motion.button>
           ))}
         </div>
      </div>
    </section>
  )
}
