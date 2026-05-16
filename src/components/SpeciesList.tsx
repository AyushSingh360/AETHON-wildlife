import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, ChevronDown, AlertTriangle, CheckCircle, Clock } from "lucide-react"

const SPECIES_DATA = [
  { id: "tiger-bengal", name: "Bengal Tiger", scientific: "Panthera tigris tigris", status: "endangered", population: 2500, trend: "increasing", habitat: "Tropical Rainforest", icon: "🐯" },
  { id: "snow-leopard", name: "Snow Leopard", scientific: "Panthera uncia", status: "vulnerable", population: 6500, trend: "stable", habitat: "Alpine Highlands", icon: "🐆" },
  { id: "sea-turtle", name: "Green Sea Turtle", scientific: "Chelonia mydas", status: "endangered", population: 85000, trend: "increasing", habitat: "Mangrove Wetlands", icon: "🐢" },
  { id: "asian-elephant", name: "Asian Elephant", scientific: "Elephas maximus", status: "endangered", population: 1850, trend: "increasing", habitat: "Open Savanna", icon: "🐘" },
  { id: "red-panda", name: "Red Panda", scientific: "Ailurus fulgens", status: "endangered", population: 420, trend: "stable", habitat: "Tropical Rainforest", icon: "🐼" },
  { id: "painted-dog", name: "African Wild Dog", scientific: "Lycaon pictus", status: "endangered", population: 660, trend: "increasing", habitat: "Open Savanna", icon: "🐕" },
  { id: "flamingo", name: "Greater Flamingo", scientific: "Phoenicopterus roseus", status: "least-concern", population: 3200, trend: "stable", habitat: "Mangrove Wetlands", icon: "🦩" },
  { id: "himalayan-wolf", name: "Himalayan Wolf", scientific: "Canis lupus chanco", status: "vulnerable", population: 350, trend: "decreasing", habitat: "Alpine Highlands", icon: "🐺" },
  { id: "golden-eagle", name: "Golden Eagle", scientific: "Aquila chrysaetos", status: "least-concern", population: 1200, trend: "stable", habitat: "Alpine Highlands", icon: "🦅" },
  { id: "saltwater-croc", name: "Saltwater Crocodile", scientific: "Crocodylus porosus", status: "least-concern", population: 450, trend: "increasing", habitat: "Mangrove Wetlands", icon: "🐊" },
  { id: "wild-buffalo", name: "Wild Water Buffalo", scientific: "Bubalus arnee", status: "endangered", population: 120, trend: "increasing", habitat: "Open Savanna", icon: "🦬" },
  { id: "orangutan", name: "Bornean Orangutan", scientific: "Pongo pygmaeus", status: "critically-endangered", population: 89, trend: "increasing", habitat: "Tropical Rainforest", icon: "🦧" },
  { id: "rhino", name: "Indian Rhinoceros", scientific: "Rhinoceros unicornis", status: "vulnerable", population: 280, trend: "increasing", habitat: "Tropical Rainforest", icon: "🦏" },
  { id: "pangolin", name: "Sunda Pangolin", scientific: "Manis javanica", status: "critically-endangered", population: 35, trend: "stable", habitat: "Tropical Rainforest", icon: "🦨" },
  { id: "macaw", name: "Scarlet Macaw", scientific: "Ara macao", status: "least-concern", population: 210, trend: "stable", habitat: "Tropical Rainforest", icon: "🦜" },
  { id: "clouded-leopard", name: "Clouded Leopard", scientific: "Neofelis nebulosa", status: "vulnerable", population: 78, trend: "decreasing", habitat: "Tropical Rainforest", icon: "🐈" },
  { id: "tapir", name: "Malayan Tapir", scientific: "Tapirus indicus", status: "endangered", population: 16, trend: "increasing", habitat: "Tropical Rainforest", icon: "🦫" },
  { id: "hornbill", name: "Great Hornbill", scientific: "Buceros bicornis", status: "vulnerable", population: 95, trend: "stable", habitat: "Tropical Rainforest", icon: "🐦" },
]

const STATUS_CONFIG = {
  "critically-endangered": { label: "Critically Endangered", color: "#dc2626", bg: "oklch(0.3 0.1 30 / 0.15)" },
  "endangered": { label: "Endangered", color: "#ea580c", bg: "oklch(0.35 0.12 40 / 0.15)" },
  "vulnerable": { label: "Vulnerable", color: "#ca8a04", bg: "oklch(0.35 0.1 50 / 0.12)" },
  "least-concern": { label: "Least Concern", color: "#16a34a", bg: "oklch(0.25 0.08 150 / 0.12)" },
}

const TREND_ICONS = {
  "increasing": <CheckCircle className="w-4 h-4" style={{ color: "oklch(0.45 0.18 140)" }} />,
  "stable": <Clock className="w-4 h-4" style={{ color: "oklch(0.55 0.1 200)" }} />,
  "decreasing": <AlertTriangle className="w-4 h-4" style={{ color: "oklch(0.5 0.15 30)" }} />,
}

const HABITAT_COLORS: Record<string, string> = {
  "Tropical Rainforest": "oklch(0.3 0.15 148)",
  "Alpine Highlands": "oklch(0.4 0.08 220)",
  "Mangrove Wetlands": "oklch(0.35 0.12 190)",
  "Open Savanna": "oklch(0.4 0.12 70)",
}

export function SpeciesList() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [habitatFilter, setHabitatFilter] = useState<string>("all")
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const filteredSpecies = useMemo(() => {
    return SPECIES_DATA.filter((s) => {
      const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.scientific.toLowerCase().includes(search.toLowerCase())
      const matchesStatus = statusFilter === "all" || s.status === statusFilter
      const matchesHabitat = habitatFilter === "all" || s.habitat === habitatFilter
      return matchesSearch && matchesStatus && matchesHabitat
    })
  }, [search, statusFilter, habitatFilter])

  const stats = useMemo(() => {
    const total = SPECIES_DATA.length
    const endangered = SPECIES_DATA.filter((s) => s.status === "endangered" || s.status === "critically-endangered").length
    const increasing = SPECIES_DATA.filter((s) => s.trend === "increasing").length
    return { total, endangered, increasing }
  }, [])

  return (
    <section id="species" className="relative py-32 px-6 overflow-hidden min-h-screen">
      {/* Background layers */}
{/* Background animations disabled */}

      {/* Fog layers */}
      {/* Fog layer removed */}
      {/* Fog layer-3 removed */}

{/* Volumetric rays disabled */}

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
            <span className="text-xs tracking-[0.3em] uppercase text-primary">Living Ark</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary/60" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 1 }}
            className="section-title text-foreground mb-4"
          >
            Our Protected{" "}
            <span className="text-gold-shimmer">Species</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto tracking-wide"
          >
            {stats.total} species under active protection across four biomes.
            {stats.endangered} threatened species on the path to recovery. {stats.increasing} with growing populations.
          </motion.p>
        </motion.div>

        {/* Quick stats ribbon */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-16"
        >
          {[
            { value: stats.total, label: "Total Species", color: "oklch(0.78 0.14 82)" },
            { value: stats.endangered, label: "Threatened", color: "oklch(0.55 0.18 30)" },
            { value: stats.increasing, label: "Growing Populations", color: "oklch(0.45 0.18 140)" },
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

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center gap-3 mb-10 max-w-3xl mx-auto"
        >
          {/* Search */}
          <div className="relative flex-1 min-w-[200px] max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search species..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-muted/30 border border-border/40 text-foreground text-sm placeholder-muted-foreground focus:outline-none focus:border-primary/40 transition-colors"
            />
          </div>

          {/* Status filter */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none pl-4 pr-8 py-3 rounded-xl bg-muted/30 border border-border/40 text-sm text-foreground focus:outline-none focus:border-primary/40 transition-colors cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="critically-endangered">Critically Endangered</option>
              <option value="endangered">Endangered</option>
              <option value="vulnerable">Vulnerable</option>
              <option value="least-concern">Least Concern</option>
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          </div>

          {/* Habitat filter */}
          <div className="relative">
            <select
              value={habitatFilter}
              onChange={(e) => setHabitatFilter(e.target.value)}
              className="appearance-none pl-4 pr-8 py-3 rounded-xl bg-muted/30 border border-border/40 text-sm text-foreground focus:outline-none focus:border-primary/40 transition-colors cursor-pointer"
            >
              <option value="all">All Habitats</option>
              {Object.keys(HABITAT_COLORS).map((h) => (
                <option key={h} value={h}>{h}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          </div>
        </motion.div>

        {/* Species grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredSpecies.map((species, i) => (
              <motion.div
                key={species.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.6 }}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                onHoverStart={() => setHoveredId(species.id)}
                onHoverEnd={() => setHoveredId(null)}
                className={`group relative glass rounded-3xl p-6 overflow-hidden cursor-pointer transition-all duration-500 ${
                  hoveredId === species.id ? "border-primary/30" : "border-border/30"
                }`}
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse 80% 60% at 50% 100%, ${HABITAT_COLORS[species.habitat]} / 0.08) 0%, transparent 70%)`,
                  }}
                />

                {/* Decorative top accent */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `linear-gradient(90deg, transparent, ${HABITAT_COLORS[species.habitat]}, transparent)` }}
                />

                <div className="relative flex items-start gap-4">
                  {/* Icon */}
                  <motion.div
                    className="flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
                    style={{
                      background: `${HABITAT_COLORS[species.habitat]}15`,
                      border: `1px solid ${HABITAT_COLORS[species.habitat]}30`,
                    }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    {species.icon}
                  </motion.div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-lg font-bold text-foreground truncate">{species.name}</h3>
                      <span
                        className="text-[10px] px-2 py-1 rounded-full font-semibold whitespace-nowrap"
                        // @ts-ignore
                        style={{
                          color: (STATUS_CONFIG as any)[species.status].color,
                          background: (STATUS_CONFIG as any)[species.status].bg,
                        }}
                      >
                        {(STATUS_CONFIG as any)[species.status].label}
                      </span>
                    </div>

                    <div className="text-xs text-muted-foreground font-mono mb-1">{species.scientific}</div>

                    <div className="flex items-center gap-3 text-xs text-muted-foreground mt-2">
                      <span className="flex items-center gap-1">
                        {/* @ts-ignore */}
                        <span style={{ color: HABITAT_COLORS[species.habitat] }}>◆</span>
                        {species.habitat}
                      </span>
                      <span>•</span>
                      <span>Pop: {species.population.toLocaleString()}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        {TREND_ICONS[species.trend as keyof typeof TREND_ICONS]}
                        {species.trend === "increasing" ? "Growing" : species.trend === "stable" ? "Stable" : "Declining"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Population bar */}
                <div className="mt-4 h-1 bg-muted/40 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${Math.min((species.population / 5000) * 100, 100)}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8, duration: 1.2 }}
                    style={{
                      background: `linear-gradient(90deg, ${HABITAT_COLORS[species.habitat]}, oklch(0.78 0.14 82))`,
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredSpecies.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-muted-foreground text-lg">No species match your filters.</p>
          </motion.div>
        )}

        {/* Footer note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-xs text-muted-foreground/60 tracking-wider">
            Population data updated monthly · Last census: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
          </p>
        </motion.div>
      </div>
    </section>
  )
}