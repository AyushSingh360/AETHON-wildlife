import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Filter, ChevronDown, HeartPulse, Baby, Dna, Sparkles, CheckCircle } from "lucide-react"

const PROGRAMS_DATA = [
  {
    id: "amur-tiger",
    name: "Amur Tiger Recovery",
    species: "Panthera tigris altaica",
    status: "active",
    success: 87,
    goal: "Restore wild population to 700 individuals",
    remaining: 583,
    duration: "2019 — 2030",
    partners: "Wildlife Conservation Society",
    color: "oklch(0.6 0.15 30)",
    icon: "🐯",
    description: "Comprehensive breeding and anti-poaching initiative for the critically endangered Siberian tiger. Combines genetic management with habitat corridor restoration across the Russian Far East.",
    milestones: [
      { year: "2019", label: "Program Launch", icon: "🚀" },
      { year: "2021", label: "First Wild Release", icon: "🐾" },
      { year: "2023", label: "50 Cubs Born", icon: "👶" },
      { year: "2025", label: "Habitat Corridors", icon: "🌲" },
    ],
  },
  {
    id: "black-rhino",
    name: "Black Rhino Breeding",
    species: "Diceros bicornis",
    status: "active",
    success: 72,
    goal: "Establish 15 genetically diverse breeding groups",
    remaining: 12,
    duration: "2020 — 2028",
    partners: "Save the Rhino International",
    color: "oklch(0.5 0.12 200)",
    icon: "🦏",
    description: "Managed breeding program using advanced reproductive technology to boost black rhino populations. Includes artificial insemination protocols and calf survival monitoring.",
    milestones: [
      { year: "2020", label: "Genetic Bank Established", icon: "🧬" },
      { year: "2022", label: "AI Insemination Success", icon: "🔬" },
      { year: "2024", label: "10 Calves to Wild", icon: "🌿" },
    ],
  },
  {
    id: "california-condor",
    name: "California Condor Comeback",
    species: "Gymnogyps californianus",
    status: "active",
    success: 94,
    goal: "Remove from critically endangered list",
    remaining: 23,
    duration: "2018 — 2026",
    partners: "US Fish & Wildlife Service",
    color: "oklch(0.55 0.1 170)",
    icon: "🦅",
    description: "The iconic comeback story. From just 27 individuals in 1987 to 500+ today. Our sanctuary hosts 14 breeding pairs in naturalistic flight enclosures.",
    milestones: [
      { year: "2018", label: "Sanctuary Joined Program", icon: "🏛️" },
      { year: "2020", label: "Record 8 Chicks", icon: "🥚" },
      { year: "2022", label: "Wild Release #200", icon: "🪶" },
      { year: "2025", label: "IUCN Status Improved", icon: "✅" },
    ],
  },
  {
    id: "orangutan",
    name: "Orangutan Forest School",
    species: "Pongo pygmaeus",
    status: "active",
    success: 65,
    goal: "Release 50 rehabilitated orangutans annually",
    remaining: 28,
    duration: "2021 — 2032",
    partners: "Borneo Orangutan Survival Foundation",
    color: "oklch(0.65 0.12 150)",
    icon: "🦧",
    description: "Rescue, rehabilitate, and release orphaned orangutans. Infants learn survival skills in a progressive 'Forest School' curriculum over 6-8 years.",
    milestones: [
      { year: "2021", label: "Forest School Opened", icon: "🏫" },
      { year: "2023", label: "First Graduation", icon: "🎓" },
      { year: "2024", label: "12 Released to Wild", icon: "🌳" },
    ],
  },
  {
    id: "vaquita",
    name: "Vaquita Rescue Initiative",
    species: "Phocoena sinus",
    status: "critical",
    success: 45,
    goal: "Prevent extinction of world's rarest marine mammal",
    remaining: 8,
    duration: "2022 — Ongoing",
    partners: "Sea Shepherd / CIRVA",
    color: "oklch(0.45 0.12 20)",
    icon: "🐬",
    description: "Emergency intervention program for the vaquita porpoise, with fewer than 10 individuals remaining. Acoustic monitoring and protected zone enforcement.",
    milestones: [
      { year: "2022", label: "Protected Zone Enforced", icon: "🛡️" },
      { year: "2023", label: "Acoustic Monitoring", icon: "📡" },
      { year: "2025", label: "Sightings Confirmed", icon: "👁️" },
    ],
  },
  {
    id: "pangolin",
    name: "Pangolin Anti-Trafficking",
    species: "Manis javanica",
    status: "active",
    success: 58,
    goal: "Reduce trafficking by 90% in Southeast Asia",
    remaining: 18,
    duration: "2020 — 2029",
    partners: "TRAFFIC / WWF",
    color: "oklch(0.5 0.08 160)",
    icon: "🦨",
    description: "Combined breeding, rehabilitation, and law enforcement program to protect Sunda pangolins from illegal wildlife trade.",
    milestones: [
      { year: "2020", label: "Rehabilitation Center Built", icon: "🏥" },
      { year: "2022", label: "35 Pangolins Released", icon: "🌿" },
      { year: "2024", label: "Seizure Network Active", icon: "⚖️" },
    ],
  },
  {
    id: "elephant-genetics",
    name: "Elephant Genetic Diversity",
    species: "Loxodonta africana",
    status: "completed",
    success: 98,
    goal: "Map genetic diversity across 500 elephants",
    remaining: 0,
    duration: "2017 — 2023",
    partners: "Cornell University",
    color: "oklch(0.45 0.1 80)",
    icon: "🧬",
    description: "Completed landmark genomics study mapping genetic diversity across 500+ African elephants. Data now informs breeding recommendations globally.",
    milestones: [
      { year: "2017", label: "Study Launched", icon: "🔬" },
      { year: "2019", label: "200 Genomes Mapped", icon: "🧪" },
      { year: "2021", label: "Key Findings Published", icon: "📄" },
      { year: "2023", label: "Program Complete", icon: "🏆" },
    ],
  },
  {
    id: "przewalski",
    name: "Przewalski's Horse Rewilding",
    species: "Equus ferus przewalskii",
    status: "active",
    success: 81,
    goal: "Establish 3 self-sustaining wild herds",
    remaining: 7,
    duration: "2016 — 2027",
    partners: "Smithsonian Conservation Biology Institute",
    color: "oklch(0.55 0.1 60)",
    icon: "🐴",
    description: "Reintroduction of the world's last truly wild horse species into protected steppe habitats. Genetic management prevents inbreeding depression.",
    milestones: [
      { year: "2016", label: "Foundation Herd Assembled", icon: "🐎" },
      { year: "2019", label: "First Wild Birth", icon: "🐴" },
      { year: "2022", label: "Herd #2 Released", icon: "🗺️" },
    ],
  },
]

const STATUS_COLORS = {
  active: { label: "Active", color: "oklch(0.45 0.18 140)", bg: "oklch(0.45 0.18 140 / 0.12)" },
  critical: { label: "Critical", color: "#dc2626", bg: "oklch(0.3 0.1 30 / 0.15)" },
  completed: { label: "Completed", color: "oklch(0.45 0.15 150)", bg: "oklch(0.45 0.15 150 / 0.1)" },
}

function MilestoneTimeline({ milestones }: { milestones: typeof PROGRAMS_DATA[0]["milestones"] }) {
  return (
    <div className="space-y-3 mt-4 pt-4 border-t border-border/20">
      {milestones.map((m, i) => (
        <motion.div
          key={m.year}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, duration: 0.5 }}
          className="flex items-start gap-3 text-sm"
        >
          <div className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
            style={{ background: "oklch(0.15 0.04 165 / 0.6)", border: "1px solid oklch(0.78 0.14 82 / 0.2)" }}>
            {m.icon}
          </div>
          <div>
            <span className="text-xs text-muted-foreground">{m.year}</span>
            <div className="text-sm text-foreground/80">{m.label}</div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export function BreedingPrograms() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const filtered = useMemo(() => {
    return PROGRAMS_DATA.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.species.toLowerCase().includes(search.toLowerCase())
      const matchesStatus = statusFilter === "all" || p.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [search, statusFilter])

  const stats = useMemo(() => ({
    total: PROGRAMS_DATA.length,
    active: PROGRAMS_DATA.filter((p) => p.status === "active").length,
    critical: PROGRAMS_DATA.filter((p) => p.status === "critical").length,
    completed: PROGRAMS_DATA.filter((p) => p.status === "completed").length,
    avgSuccess: Math.round(PROGRAMS_DATA.reduce((a, p) => a + p.success, 0) / PROGRAMS_DATA.length),
  }), [])

  return (
    <section id="breeding" className="relative py-32 px-6 overflow-hidden min-h-screen">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
background: `
             radial-gradient(ellipse 85% 60% at 50% 40%, oklch(0.18 0.1 155 / 0.12) 0%, transparent 55%),
             radial-gradient(ellipse 50% 40% at 20% 80%, oklch(0.15 0.08 165 / 0.1) 0%, transparent 50%),
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
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary/60" />
            <span className="text-xs tracking-[0.3em] uppercase text-primary">Conservation Science</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary/60" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 1 }}
            className="section-title text-foreground mb-4"
          >
            Breeding &{" "}
            <span className="text-gold-shimmer">Recovery</span>{" "}
            Programs
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto tracking-wide"
          >
            {stats.total} active programs safeguarding endangered species through genetic management,
            assisted reproduction, and strategic reintroduction. {stats.avgSuccess}% average success rate.
          </motion.p>
        </motion.div>

        {/* Stats ribbon */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-4 gap-4 max-w-3xl mx-auto mb-16"
        >
          {[
            { value: stats.total, label: "Active Programs", color: "oklch(0.78 0.14 82)" },
            { value: stats.active, label: "Currently Running", color: "oklch(0.45 0.18 140)" },
            { value: stats.critical, label: "Critical Priority", color: "oklch(0.5 0.15 20)" },
            { value: stats.completed, label: "Completed", color: "oklch(0.45 0.15 150)" },
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
          className="flex flex-wrap items-center gap-3 mb-12 max-w-2xl mx-auto"
        >
          <div className="relative flex-1 min-w-[200px] max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search programs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-muted/30 border border-border/40 text-foreground text-sm placeholder-muted-foreground focus:outline-none focus:border-primary/40 transition-colors"
            />
          </div>

          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none pl-4 pr-8 py-3 rounded-xl bg-muted/30 border border-border/40 text-sm text-foreground focus:outline-none focus:border-primary/40 transition-colors cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="critical">Critical</option>
              <option value="completed">Completed</option>
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          </div>
        </motion.div>

        {/* Programs list */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((program, i) => {
              const statusCfg = STATUS_COLORS[program.status]
              return (
                <motion.div
                  key={program.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.6 }}
                  whileHover={{ y: -4, transition: { duration: 0.3 } }}
                  onHoverStart={() => setHoveredId(program.id)}
                  onHoverEnd={() => setHoveredId(null)}
                  className={`group relative glass rounded-3xl p-6 lg:p-8 overflow-hidden cursor-pointer transition-all duration-500 ${
                    hoveredId === program.id ? "ring-1 ring-primary/40" : "border border-border/20"
                  }`}
                >
                  {/* Hover glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none"
                    style={{
                      background: `radial-gradient(ellipse 80% 60% at 50% 100%, ${program.color} / 0.08) 0%, transparent 70%)`,
                    }}
                  />

                  <div className="relative flex flex-col lg:flex-row lg:items-center gap-6">
                    {/* Icon */}
                    <div
                      className="flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
                      style={{
                        background: `${program.color}15`,
                        border: `1px solid ${program.color}30`,
                      }}
                    >
                      {program.icon}
                    </div>

                    {/* Main content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <h3 className="text-xl font-bold text-foreground">{program.name}</h3>
                        <span
                          className="text-[10px] px-2.5 py-1 rounded-full font-semibold whitespace-nowrap"
                          style={{ color: statusCfg.color, background: statusCfg.bg, border: `1px solid ${statusCfg.color}30` }}
                        >
                          {statusCfg.label}
                        </span>
                        <span className="text-[10px] tracking-wider text-muted-foreground">{program.duration}</span>
                      </div>

                      <div className="text-sm text-muted-foreground/80 leading-relaxed mb-3">{program.description}</div>

                      <div className="flex items-center gap-1 text-[10px] text-muted-foreground tracking-wider flex-wrap gap-y-1">
                        <span className="flex items-center gap-1">
                          <Dna className="w-3 h-3" />
                          {program.species}
                        </span>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          <HeartPulse className="w-3 h-3" />
                          Success: {program.success}%
                        </span>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          {program.remaining > 0 ? (
                            <>
                              <Sparkles className="w-3 h-3" />
                              {program.remaining} milestones remaining
                            </>
                          ) : (
                            <>
                              <CheckCircle className="w-3 h-3" />
                              Complete
                            </>
                          )}
                        </span>
                        <span>·</span>
                        <span>Partner: {program.partners}</span>
                      </div>

                      {/* Progress bar */}
                      <div className="mt-3 h-0.5 bg-muted/40 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${program.success}%` }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.8 + i * 0.1, duration: 1.2 }}
                          style={{
                            background: `linear-gradient(90deg, ${program.color}, oklch(0.78 0.14 82))`,
                          }}
                        />
                      </div>

                      {program.status !== "completed" && (
                        <div className="mt-2 flex items-center gap-2">
                          <span className="text-[10px] text-muted-foreground">Goal: {program.goal}</span>
                        </div>
                      )}
                    </div>

                    {/* Milestones */}
                    <div className="lg:w-64 flex-shrink-0">
                      <MilestoneTimeline milestones={program.milestones} />
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
            <p className="text-muted-foreground text-lg">No programs match your filters.</p>
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
            All programs are peer-reviewed and updated quarterly · Next review: {new Date(Date.now() + 7776000000).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
          </p>
        </motion.div>
      </div>
    </section>
  )
}