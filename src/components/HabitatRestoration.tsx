import { motion } from "framer-motion"
import { MapPin, Trees, Droplets, TrendingUp, Shield, Leaf } from "lucide-react"

const PROJECTS = [
  {
    id: "amazon-reforest",
    name: "Amazon Canopy Corridor",
    region: "Amazon Basin, Brazil",
    area: "2,400 ac",
    progress: 78,
    species: 145,
    timeline: "2021 — 2029",
    status: "on-track",
    description: "Restoring degraded cattle pasture into continuous rainforest canopy corridors connecting fragmented habitats for jaguars, spider monkeys, and harpy eagles.",
    bgGradient: "linear-gradient(135deg, oklch(0.12 0.08 155) 0%, oklch(0.08 0.04 145) 100%)",
    accentColor: "oklch(0.55 0.18 148)",
    treesPlanted: 185000,
  },
  {
    id: "bengal-mangrove",
    name: "Sundarbans Mangrove Recovery",
    region: "Bay of Bengal, India",
    area: "1,800 ac",
    progress: 62,
    species: 89,
    timeline: "2022 — 2030",
    status: "on-track",
    description: "Replanting and protecting critical mangrove buffer zones that shelter Bengal tigers, Irrawaddy dolphins, and thousands of migratory shorebirds.",
    bgGradient: "linear-gradient(135deg, oklch(0.14 0.06 190) 0%, oklch(0.09 0.04 175) 100%)",
    accentColor: "oklch(0.5 0.14 195)",
    treesPlanted: 124000,
  },
  {
    id: "kenya-grassland",
    name: "Maasai Mara Grassland Restoration",
    region: "Kenyan Rift Valley",
    area: "3,200 ac",
    progress: 45,
    species: 62,
    timeline: "2023 — 2031",
    status: "needs-support",
    description: "Converting overgrazed land back into native savanna grasslands to support wildebeest migration routes and restore soil carbon sequestration.",
    bgGradient: "linear-gradient(135deg, oklch(0.15 0.06 75) 0%, oklch(0.1 0.04 65) 100%)",
    accentColor: "oklch(0.65 0.14 70)",
    treesPlanted: 42000,
  },
  {
    id: "borneo-peatland",
    name: "Borneo Peatland Rewet",
    region: "Central Kalimantan, Indonesia",
    area: "4,500 ac",
    progress: 34,
    species: 210,
    timeline: "2022 — 2032",
    status: "critical",
    description: "Blocking drainage canals and rewetting drained peat swamp forests to prevent catastrophic fires and protect orangutan and proboscis monkey habitat.",
    bgGradient: "linear-gradient(135deg, oklch(0.18 0.1 30) 0%, oklch(0.12 0.06 25) 100%)",
    accentColor: "oklch(0.5 0.15 30)",
    treesPlanted: 89000,
  },
  {
    id: "australia-reef",
    name: "Great Barrier Reef Catchment",
    region: "Queensland, Australia",
    area: "800 ac",
    progress: 55,
    species: 230,
    timeline: "2023 — 2028",
    status: "on-track",
    description: "Riparian zone restoration along rivers feeding the Great Barrier Reef. Reducing agricultural runoff and replanting native vegetation to protect coral ecosystems.",
    bgGradient: "linear-gradient(135deg, oklch(0.12 0.05 200) 0%, oklch(0.08 0.03 185) 100%)",
    accentColor: "oklch(0.6 0.12 220)",
    treesPlanted: 67000,
  },
  {
    id: "pacific-northwest",
    name: "Pacific Salmon Stream Recovery",
    region: "British Columbia, Canada",
    area: "950 ac",
    progress: 91,
    species: 34,
    timeline: "2020 — 2025",
    status: "nearly-complete",
    description: "Restoring riparian forest buffers and removing invasive species along critical salmon spawning streams. Chinook and coho populations already rebounding.",
    bgGradient: "linear-gradient(135deg, oklch(0.1 0.04 210) 0%, oklch(0.07 0.02 195) 100%)",
    accentColor: "oklch(0.65 0.1 240)",
    treesPlanted: 34000,
  },
  {
    id: "madagascar-dry",
    name: "Madagascar Dry Forest",
    region: "Western Madagascar",
    area: "2,100 ac",
    progress: 28,
    species: 178,
    timeline: "2024 — 2033",
    status: "needs-support",
    description: "Replanting endemic baobab and tamarind corridors for critically endangered lemur species. Community-led seed collection and nursery programs.",
    bgGradient: "linear-gradient(135deg, oklch(0.16 0.06 55) 0%, oklch(0.1 0.04 45) 100%)",
    accentColor: "oklch(0.6 0.12 60)",
    treesPlanted: 28000,
  },
]

const STATUS_CONFIG = {
  "on-track": { label: "On Track", color: "oklch(0.45 0.18 140)", bg: "oklch(0.45 0.18 140 / 0.12)" },
  "critical": { label: "Critical", color: "#dc2626", bg: "oklch(0.3 0.1 30 / 0.15)" },
  "needs-support": { label: "Needs Support", color: "#ca8a04", bg: "oklch(0.35 0.1 50 / 0.12)" },
  "nearly-complete": { label: "Nearly Complete", color: "oklch(0.45 0.15 150)", bg: "oklch(0.45 0.15 150 / 0.1)" },
}

function ProjectCard({ project, index }: { project: typeof PROJECTS[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.3 } }}
      className="group relative glass rounded-3xl p-6 overflow-hidden border border-border/20 hover:border-primary/30 transition-all duration-500"
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 50% 100%, ${project.accentColor}10 0%, transparent 70%)`,
        }}
      />

      {/* Top accent bar */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg, transparent, ${project.accentColor}, transparent)` }}
      />

      <div className="relative flex flex-col lg:flex-row gap-6">
        {/* Visual indicator */}
        <div
          className="flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center text-xl"
          style={{
            background: `${project.accentColor}15`,
            border: `1px solid ${project.accentColor}30`,
          }}
        >
          <Trees className="w-6 h-6" style={{ color: project.accentColor }} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Title row */}
          <div className="flex items-center gap-3 mb-2 flex-wrap">
            <h3 className="text-lg font-bold text-foreground">{project.name}</h3>
            <span
              className="text-[10px] px-2.5 py-1 rounded-full font-semibold whitespace-nowrap"
                // @ts-ignore
                style={{ color: STATUS_CONFIG[project.status].color, background: STATUS_CONFIG[project.status].bg, border: `1px solid ${STATUS_CONFIG[project.status].color}30` }}
            >
               {/* @ts-ignore */}{STATUS_CONFIG[project.status].label}
            </span>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed mb-4">{project.description}</p>

          {/* Meta row */}
          <div className="flex items-center gap-4 text-[10px] text-muted-foreground flex-wrap mb-4">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {project.region}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Leaf className="w-3 h-3" />
              {project.area}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Droplets className="w-3 h-3" />
              {project.treesPlanted.toLocaleString()} trees planted
            </span>
            <span>·</span>
            <span>{project.species} species</span>
            <span>·</span>
            <span>{project.timeline}</span>
          </div>

          {/* Progress bar */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-1.5 bg-muted/40 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: `${project.progress}%` }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 + index * 0.1, duration: 1.2 }}
                style={{
                  background: `linear-gradient(90deg, ${project.accentColor}, oklch(0.78 0.14 82))`,
                }}
              />
            </div>
                // @ts-ignore
                <span className="text-xs font-bold text-foreground min-w-[36px] text-right"
              style={{ color: STATUS_CONFIG[project.status].color }}>
              {project.progress}%
            </span>
          </div>
        </div>

        {/* Stats column */}
        <div className="lg:w-40 flex-shrink-0 pt-2">
          <div className="space-y-3">
            {[
              { icon: Droplets, label: "Area", value: project.area, color: "oklch(0.55 0.15 195)" },
              { icon: Leaf, label: "Trees", value: `${(project.treesPlanted / 1000).toFixed(0)}K planted`, color: "oklch(0.45 0.18 148)" },
              { icon: Shield, label: "Species", value: project.species.toString(), color: "oklch(0.78 0.14 82)" },
              { icon: TrendingUp, label: "Progress", value: `${project.progress}%`, color: (STATUS_CONFIG as any)[project.status].color },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">{item.label}</span>
                <span className="font-semibold" style={{ color: item.color }}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Total impact counters
const TOTAL_IMPACT = {
  area: 15700,
  trees: 727000,
  species: 938,
  projects: 7,
}

export function HabitatRestoration() {
  return (
    <section id="restoration" className="relative py-32 px-6 overflow-hidden min-h-screen">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 90% 60% at 60% 30%, oklch(0.2 0.08 155 / 0.12) 0%, transparent 50%),
            radial-gradient(ellipse 50% 50% at 30% 80%, oklch(0.1 0.06 170 / 0.08) 0%, transparent 50%),
            linear-gradient(180deg, oklch(0.06 0.012 165 / 0.15) 0%, oklch(0.04 0.01 165 / 0.08) 100%)
          `,
        }}
      />
      <div className="fog-layer pointer-events-none" style={{ zIndex: 0 }} />
      <div className="fog-layer-3 pointer-events-none" style={{ zIndex: 0 }} />

      <div className="relative max-w-[1400px] mx-auto" style={{ zIndex: 1 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary/60" />
            <span className="text-xs tracking-[0.3em] uppercase text-primary">Earth Renewal</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary/60" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 1 }}
            className="section-title text-foreground mb-4"
          >
            Habitat{" "}
            <span className="text-gold-shimmer">Restoration</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto tracking-wide"
          >
            Active restoration across 15,700+ acres worldwide, reversing habitat loss one corridor at a time. {TOTAL_IMPACT.trees.toLocaleString()} trees planted, {TOTAL_IMPACT.species} species benefiting.
          </motion.p>
        </motion.div>

        {/* Impact counters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-4 gap-4 max-w-3xl mx-auto mb-16"
        >
          {[
            { value: `${TOTAL_IMPACT.area}K+`, label: "Acres Under Restoration", color: "oklch(0.78 0.14 82)" },
            { value: `${(TOTAL_IMPACT.trees / 1000).toFixed(0)}K+`, label: "Trees Planted", color: "oklch(0.45 0.18 148)" },
            { value: `${TOTAL_IMPACT.species}+`, label: "Species Benefiting", color: "oklch(0.55 0.15 195)" },
            { value: `${TOTAL_IMPACT.projects}`, label: "Active Projects", color: "oklch(0.65 0.12 80)" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + i * 0.1, duration: 0.6 }}
              className="text-center p-4 rounded-2xl glass"
            >
              <div className="text-3xl font-black" style={{ color: stat.color }}>{stat.value}</div>
              <div className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Project cards */}
        <div className="grid grid-cols-1 gap-6">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-xs text-muted-foreground/60 tracking-wider">
            All restoration projects independently verified · Progress reports published biannually · Next report: {new Date(Date.now() + 15552000000).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
          </p>
        </motion.div>
      </div>
    </section>
  )
}