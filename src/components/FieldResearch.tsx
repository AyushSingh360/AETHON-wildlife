import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, ChevronDown, Microscope, Users, MapPin, Clock, Award, Sparkles } from "lucide-react"

const RESEARCH_DATA = [
  {
    id: "genetic-diversity-2024",
    title: "Genetic Diversity Mapping of Endangered Felids",
    lead: "Dr. Sarah Chen",
    institution: "Stanford Wildlife Genetics Lab",
    teamSize: 8,
    duration: "2022 — Present",
    status: "ongoing",
    progress: 73,
    category: "Genomics",
    region: "Global",
    color: "oklch(0.6 0.15 30)",
    description: "Using whole-genome sequencing to map genetic diversity across 12 endangered felid species, identifying critical bottlenecks and informing breeding pair selection for maximum genetic viability.",
    findings: "Discovered 3 previously unknown genetic bottlenecks in captive populations. Findings published in Nature Genetics.",
    impact: "Directly influencing 47 breeding pairing decisions across 12 institutions.",
  },
  {
    id: "poaching-ai",
    title: "AI-Powered Poaching Prediction System",
    lead: "Dr. James Okoye",
    institution: "MIT Conservation Lab",
    teamSize: 12,
    duration: "2021 — Present",
    status: "ongoing",
    progress: 85,
    category: "Technology",
    region: "East Africa",
    color: "oklch(0.55 0.15 190)",
    description: "Machine learning system that analyzes satellite imagery, ranger patrol data, and environmental factors to predict poaching hotspots 48-72 hours in advance.",
    findings: "Achieved 89% prediction accuracy in pilot regions. Reduced poaching incidents by 62% in trial zones.",
    impact: "Deployed across 3 national parks covering 8,000 km². Poaching response time reduced from 6 hours to 45 minutes.",
  },
  {
    id: "coral-thermal",
    title: "Coral Thermal Tolerance Adaptation",
    lead: "Dr. Maria Rodriguez",
    institution: "Scripps Oceanography",
    teamSize: 6,
    duration: "2023 — Present",
    status: "ongoing",
    progress: 45,
    category: "Marine Biology",
    region: "Great Barrier Reef, Australia",
    color: "oklch(0.5 0.1 200)",
    description: "Investigating thermal adaptation mechanisms in coral symbionts to develop heat-resistant coral strains for reef restoration programs.",
    findings: "Identified 4 thermally tolerant Symbiodiniaceae clades surviving at +3°C above historical maximums.",
    impact: "Potential to protect 15% of global reef systems from bleaching events by 2035.",
  },
  {
    id: "migration-tracker",
    title: "Satellite Tracking of Elephant Migration Patterns",
    lead: "Dr. Amara Diop",
    institution: "Oxford Wildlife Research Unit",
    teamSize: 5,
    duration: "2020 — 2025",
    status: "nearing-completion",
    progress: 92,
    category: "Ecology",
    region: "Sub-Saharan Africa",
    color: "oklch(0.6 0.12 130)",
    description: "GPS-satellite tracking of 200 elephants across 3 ecosystems to map migratory corridors and identify critical habitat connectivity gaps.",
    findings: "Mapped 12 previously unknown migration corridors. Identified 4 critical bottleneck points threatened by human development.",
    impact: "Data used by 3 governments to redesign protected area boundaries and 2 new wildlife corridors under construction.",
  },
  {
    id: "primate-vocal",
    title: "Primate Communication & Vocalization Study",
    lead: "Dr. Yuki Tanaka",
    institution: "Kyoto University Primate Research",
    teamSize: 4,
    duration: "2022 — 2026",
    status: "ongoing",
    progress: 61,
    category: "Behavioral Science",
    region: "Borneo, Indonesia",
    color: "oklch(0.55 0.1 170)",
    description: "Analyzing primate vocal repertoires across 3 species to decode communication patterns and assess cognitive complexity in wild orangutan and gibbon populations.",
    findings: "Catalogued 214 distinct vocalizations. Evidence suggests syntax-like structures in orangutan alarm calls.",
    impact: "Paradigm-shifting implications for understanding language evolution. 8 peer-reviewed publications.",
  },
  {
    id: "soil-carbon-2023",
    title: "Soil Carbon Sequestration in Restored Habitats",
    lead: "Dr. Fatima Al-Rashid",
    institution: "ETH Zurich Ecology Department",
    teamSize: 7,
    duration: "2020 — 2024",
    status: "completed",
    progress: 100,
    category: "Climate Science",
    region: "Multi-region",
    color: "oklch(0.45 0.15 150)",
    description: "Quantifying carbon sequestration rates across 14 restored habitats to validate restoration as a viable climate mitigation strategy.",
    findings: "Restored sites sequester 3.2x more carbon than degraded lands. Results published in Science.",
    impact: "Data adopted by IPCC AR7 report. Influencing $2.3B in global restoration funding policy.",
  },
  {
    id: "invasive-species",
    title: "Invasive Species Removal & Native Recovery",
    lead: "Dr. Robert McAllister",
    institution: "University of Auckland",
    teamSize: 9,
    duration: "2021 — Present",
    status: "ongoing",
    progress: 56,
    category: "Ecology",
    region: "New Zealand",
    color: "oklch(0.45 0.12 220)",
    description: "Systematic removal of invasive predators (rats, stoats, possums) from 5 island sanctuaries, monitoring native species recovery over time.",
    findings: "Native bird populations increased 340% within 2 years of predator removal. 3 species downlisted on threat status.",
    impact: "Model now being adopted by conservation agencies in 8 countries. 23 islands successfully cleared.",
  },
  {
    id: "wildlife-corridor",
    title: "Urban Wildlife Corridor Design",
    lead: "Dr. Priya Sharma",
    institution: "National University of Singapore",
    teamSize: 6,
    duration: "2023 — Present",
    status: "ongoing",
    progress: 38,
    category: "Urban Ecology",
    region: "Southeast Asia",
    color: "oklch(0.6 0.1 80)",
    description: "Designing and testing wildlife corridors through rapidly urbanizing landscapes using landscape genetics and movement ecology models.",
    findings: "Prototype corridor in Singapore showed 200% increase in mammal movement between fragmented forest patches.",
    impact: "Blueprint being implemented in 4 cities. Policy recommendations submitted to 6 municipal governments.",
  },
]

const CATEGORIES = ["All Categories", "Genomics", "Technology", "Marine Biology", "Ecology", "Behavioral Science", "Climate Science", "Urban Ecology"]
const STATUS_CONFIG = {
  ongoing: { label: "Ongoing", color: "oklch(0.45 0.18 140)", bg: "oklch(0.45 0.18 140 / 0.12)" },
  "nearing-completion": { label: "Nearing Completion", color: "oklch(0.45 0.15 150)", bg: "oklch(0.45 0.15 150 / 0.1)" },
  completed: { label: "Completed", color: "oklch(0.5 0.12 200)", bg: "oklch(0.5 0.12 200 / 0.08)" },
}

export function FieldResearch() {
  const [search, setSearch] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("All Categories")
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const filtered = useMemo(() => {
    return RESEARCH_DATA.filter((r) => {
      const matchesSearch = r.title.toLowerCase().includes(search.toLowerCase()) ||
        r.lead.toLowerCase().includes(search.toLowerCase()) ||
        r.findings.toLowerCase().includes(search.toLowerCase())
      const matchesCategory = categoryFilter === "All Categories" || r.category === categoryFilter
      return matchesSearch && matchesCategory
    })
  }, [search, categoryFilter])

  const stats = useMemo(() => ({
    total: RESEARCH_DATA.length,
    ongoing: RESEARCH_DATA.filter((r) => r.status === "ongoing").length,
    completed: RESEARCH_DATA.filter((r) => r.status === "completed").length,
    totalResearchers: RESEARCH_DATA.reduce((a, r) => a + r.teamSize, 0),
  }), [])

  return (
    <section id="research" className="relative py-32 px-6 overflow-hidden min-h-screen">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 80% 65% at 50% 35%, oklch(0.15 0.08 165 / 0.12) 0%, transparent 55%),
            radial-gradient(ellipse 60% 40% at 80% 75%, oklch(0.12 0.06 150 / 0.08) 0%, transparent 50%),
            linear-gradient(180deg, oklch(0.06 0.012 165 / 0.15) 0%, oklch(0.04 0.01 165 / 0.08) 100%)
          `,
        }}
      />
      <div className="fog-layer pointer-events-none" style={{ zIndex: 0 }} />
      <div className="fog-layer-2 pointer-events-none" style={{ zIndex: 0 }} />

      <div className="relative max-w-[1400px] mx-auto" style={{ zIndex: 1 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary/60" />
            <span className="text-xs tracking-[0.3em] uppercase text-primary">Frontier Science</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary/60" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 1 }}
            className="section-title text-foreground mb-4"
          >
            Field{" "}
            <span className="text-gold-shimmer">Research</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto tracking-wide"
          >
            {stats.total} active research programs, {stats.totalResearchers} scientists across 4 continents.
            Peer-reviewed findings shaping global conservation policy.
          </motion.p>
        </motion.div>

        {/* Quick stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-4 gap-4 max-w-3xl mx-auto mb-16"
        >
          {[
            { value: stats.total, label: "Active Studies", color: "oklch(0.78 0.14 82)" },
            { value: stats.ongoing, label: "In Progress", color: "oklch(0.45 0.18 140)" },
            { value: stats.totalResearchers, label: "Researchers", color: "oklch(0.55 0.15 195)" },
            { value: stats.completed, label: "Published", color: "oklch(0.45 0.15 150)" },
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
          className="flex flex-wrap items-center gap-3 mb-12 max-w-3xl mx-auto"
        >
          <div className="relative flex-1 min-w-[200px] max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search research, leads..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-muted/30 border border-border/40 text-foreground text-sm placeholder-muted-foreground focus:outline-none focus:border-primary/40 transition-colors"
            />
          </div>

          <div className="relative">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="appearance-none pl-4 pr-8 py-3 rounded-xl bg-muted/30 border border-border/40 text-sm text-foreground focus:outline-none focus:border-primary/40 transition-colors cursor-pointer"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          </div>
        </motion.div>

        {/* Research cards */}
        <div className="grid grid-cols-1 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((study, i) => {
              const statusCfg = STATUS_CONFIG[study.status]
              return (
                <motion.div
                  key={study.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.6 }}
                  whileHover={{ y: -4, transition: { duration: 0.3 } }}
                  onHoverStart={() => setHoveredId(study.id)}
                  onHoverEnd={() => setHoveredId(null)}
                  className={`group relative glass rounded-3xl p-6 lg:p-8 overflow-hidden cursor-pointer transition-all duration-500 ${
                    hoveredId === study.id ? "ring-1 ring-primary/40" : "border border-border/20"
                  }`}
                >
                  {/* Hover glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none"
                    style={{
                      background: `radial-gradient(ellipse 80% 60% at 50% 100%, ${study.color} / 0.08) 0%, transparent 70%)`,
                    }}
                  />

                  <div className="relative flex flex-col lg:flex-row lg:items-start gap-6">
                    {/* Category indicator */}
                    <div
                      className="flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center"
                      style={{
                        background: `${study.color}15`,
                        border: `1px solid ${study.color}30`,
                      }}
                    >
                      <Microscope className="w-6 h-6" style={{ color: study.color }} />
                    </div>

                    {/* Main content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <h3 className="text-xl font-bold text-foreground">{study.title}</h3>
                        <span
                          className="text-[10px] px-2.5 py-1 rounded-full font-semibold whitespace-nowrap"
                          style={{ color: statusCfg.color, background: statusCfg.bg, border: `1px solid ${statusCfg.color}30` }}
                        >
                          {statusCfg.label}
                        </span>
                        <span className="text-[10px] text-muted-foreground">
                          {study.category}
                        </span>
                      </div>

                      {/* Lead & team */}
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3 flex-wrap">
                        <span className="flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5" />
                          {study.lead}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5" />
                          {study.region}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          {study.duration}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5" />
                          {study.teamSize} researchers
                        </span>
                      </div>

                      <p className="text-sm text-muted-foreground/80 leading-relaxed mb-4">{study.description}</p>

                      {/* Progress */}
                      <div className="flex items-center gap-3 mb-4">
                        <div className="flex-1 h-1.5 bg-muted/40 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${study.progress}%` }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.8 + i * 0.1, duration: 1.2 }}
                            style={{
                              background: `linear-gradient(90deg, ${study.color}, oklch(0.78 0.14 82))`,
                            }}
                          />
                        </div>
                        <span className="text-xs font-bold text-foreground min-w-[36px] text-right"
                          style={{ color: study.color }}>{study.progress}%</span>
                      </div>

                      {/* Findings */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 1 }}
                        className="glass-dark rounded-2xl p-4 mb-3"
                      >
                        <div className="flex items-start gap-2 mb-1.5">
                          <Award className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "oklch(0.78 0.14 82)" }} />
                          <span className="text-[10px] tracking-widest uppercase text-primary font-semibold">Key Finding</span>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed pl-5.5">{study.findings}</p>
                      </motion.div>

                      {/* Impact */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 1.1 }}
                        className="bg-primary/5 rounded-2xl p-4"
                      >
                        <div className="flex items-start gap-2 mb-1.5">
                          <Sparkles className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "oklch(0.65 0.18 150)" }} />
                          <span className="text-[10px] tracking-widest uppercase text-primary font-semibold">Real-World Impact</span>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed pl-5.5">{study.impact}</p>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
            <p className="text-muted-foreground text-lg">No research matches your filters.</p>
          </motion.div>
        )}

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-xs text-muted-foreground/60 tracking-wider">
            All peer-reviewed · Findings published in Nature, Science, PNAS, and conservation journals · Data publicly available via our open science portal
          </p>
        </motion.div>
      </div>
    </section>
  )
}