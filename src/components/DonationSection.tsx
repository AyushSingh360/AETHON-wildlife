import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { z } from "zod/v4"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion, AnimatePresence } from "framer-motion"
import { supabase } from "@/lib/supabase"

const donationSchema = z.object({
  email: z.email("Please enter a valid email"),
  name: z.string().min(1, "Name is required"),
})

type DonationForm = z.infer<typeof donationSchema>

const DONATION_TIERS = [
  {
    amount: 25,
    label: "Guardian",
    description: "Feeds a rescued animal for one week",
    icon: "🌿",
    perks: ["Monthly sanctuary newsletter", "Digital certificate"],
    color: "oklch(0.55 0.18 148)",
  },
  {
    amount: 75,
    label: "Protector",
    description: "Funds one patrol shift along sanctuary borders",
    icon: "🛡️",
    perks: ["All Guardian perks", "Ranger field report", "Name in annual report"],
    color: "oklch(0.72 0.15 55)",
    featured: true,
  },
  {
    amount: 150,
    label: "Champion",
    description: "Sponsors genetic research for one endangered species",
    icon: "🔬",
    perks: ["All Protector perks", "Species adoption certificate", "Research paper access"],
    color: "oklch(0.6 0.18 30)",
  },
  {
    amount: 500,
    label: "Founder",
    description: "Names a hectare of protected habitat in your honor",
    icon: "🌍",
    perks: ["All Champion perks", "Named habitat plot", "Annual sanctuary visit", "Priority sanctuary access"],
    color: "oklch(0.78 0.14 82)",
  },
]

const IMPACT_ITEMS = [
  { amount: "$10", impact: "Feeds 2 rescued animals for 3 days" },
  { amount: "$25", impact: "Plants 50 native trees in restored habitat" },
  { amount: "$50", impact: "Funds 8 hours of ranger patrol" },
  { amount: "$100", impact: "Supports one genetic diversity test" },
  { amount: "$250", impact: "Rehabilitates one injured wildlife patient" },
  { amount: "$1000", impact: "Sponsors a breeding pair for one season" },
]

export function DonationSection() {
  const [selectedTier, setSelectedTier] = useState(1)
  const [customAmount, setCustomAmount] = useState("")
  const [frequency, setFrequency] = useState<"once" | "monthly">("monthly")
  const [donating, setDonating] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<DonationForm>({
    resolver: zodResolver(donationSchema),
    defaultValues: { email: "", name: "" },
  })

  const currentAmount = customAmount ? parseInt(customAmount) || 0 : DONATION_TIERS[selectedTier].amount

  const onSubmit = async (data: DonationForm) => {
    setDonating(true)
    setError(null)

    try {
      const { error: dbError } = await supabase.from("donations").insert({
        amount: currentAmount * 100,
        frequency,
        tier: DONATION_TIERS[selectedTier].label,
        donor_email: data.email,
        donor_name: data.name,
      })

      if (dbError) throw dbError

      setDone(true)
      reset()
    } catch (err) {
      console.error("Donation processing error:", err)
      setError("Failed to process donation. Please try again later.")
    } finally {
      setDonating(false)
    }
  }

  return (
    <section id="donate" className="relative py-32 px-6 overflow-hidden">
      {/* Background with aurora */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
background: `
             radial-gradient(ellipse 80% 60% at 50% 50%, oklch(0.18 0.08 82 / 0.12) 0%, transparent 60%),
             linear-gradient(180deg, oklch(0.05 0.01 165 / 0.2) 0%, oklch(0.07 0.04 160 / 0.15) 50%, oklch(0.05 0.01 165 / 0.2) 100%)
           `,
        }}
      />

      {/* Gold aurora at top */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background: "linear-gradient(90deg, transparent, oklch(0.78 0.14 82 / 0.5), transparent)",
          boxShadow: "0 0 30px oklch(0.78 0.14 82 / 0.3)",
        }}
      />

      {/* Decorative particles */}
      {Array.from({ length: 20 }, (_, i) => (
        <div
          key={i}
          className="particle absolute"
          style={{
            left: `${Math.random() * 100}%`,
            bottom: "-5px",
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
            background: "oklch(0.78 0.14 82 / 0.6)",
            boxShadow: "0 0 8px oklch(0.78 0.14 82 / 0.5)",
            animationDuration: `${Math.random() * 12 + 8}s`,
            animationDelay: `${Math.random() * 10}s`,
          }}
        />
      ))}

      <div className="relative max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary/60" />
            <span className="text-xs tracking-[0.3em] uppercase text-primary">Make a Difference</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary/60" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 1 }}
            className="section-title text-foreground mb-4"
          >
            Your Gift{" "}
            <span className="text-gold-shimmer">Saves Lives</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-muted-foreground text-lg max-w-xl mx-auto"
          >
            100% of your donation goes directly to active conservation programs. No administration fees. Just impact.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Donation tiers */}
          <div className="lg:col-span-2">
            {/* Frequency toggle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex gap-2 mb-8 glass-dark rounded-full p-1 w-fit"
            >
              {(["monthly", "once"] as const).map((freq) => (
                <button
                  key={freq}
                  onClick={() => setFrequency(freq)}
                  className="px-5 py-2 rounded-full text-xs tracking-widest uppercase font-semibold transition-all duration-300"
                  style={{
                    background: frequency === freq ? "oklch(0.78 0.14 82)" : "transparent",
                    color: frequency === freq ? "oklch(0.06 0.012 165)" : "oklch(0.62 0.04 165)",
                  }}
                >
                  {freq === "monthly" ? "Monthly" : "One-time"}
                </button>
              ))}
            </motion.div>

            {/* Tier cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {DONATION_TIERS.map((tier, i) => (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => { setSelectedTier(i); setCustomAmount("") }}
                  className={`relative text-left p-5 rounded-2xl transition-all duration-500 overflow-hidden ${
                    selectedTier === i ? "scale-[1.02]" : ""
                  }`}
                  style={{
                    background: selectedTier === i
                      ? `linear-gradient(135deg, ${tier.color}20 0%, oklch(0.08 0.02 165) 100%)`
                      : "oklch(0.09 0.018 165 / 0.5)",
                    border: `1px solid ${selectedTier === i ? tier.color + "50" : "oklch(0.22 0.03 165)"}`,
                    boxShadow: selectedTier === i ? `0 0 30px ${tier.color}20` : "none",
                  }}
                >
                  {tier.featured && (
                    <div
                      className="absolute top-3 right-3 text-[9px] tracking-widest uppercase px-2 py-0.5 rounded-full font-bold"
                      style={{ background: "oklch(0.78 0.14 82 / 0.15)", color: "oklch(0.78 0.14 82)" }}
                    >
                      Popular
                    </div>
                  )}

                  <div className="text-2xl mb-3">{tier.icon}</div>
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="text-2xl font-black" style={{ color: tier.color }}>
                      ${tier.amount}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      / {frequency === "monthly" ? "month" : "once"}
                    </span>
                  </div>
                  <div className="text-sm font-bold text-foreground mb-1">{tier.label}</div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{tier.description}</p>
                </motion.button>
              ))}
            </div>

            {/* Custom amount */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="glass-dark rounded-2xl p-4 flex gap-3"
            >
              <span className="text-muted-foreground self-center text-lg">$</span>
              <input
                type="number"
                placeholder="Custom amount"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                className="bg-transparent text-foreground placeholder-muted-foreground flex-1 text-lg font-semibold outline-none"
                style={{ cursor: "text" }}
                min="1"
              />
              <span className="text-xs text-muted-foreground self-center whitespace-nowrap">
                / {frequency === "monthly" ? "month" : "once"}
              </span>
            </motion.div>
          </div>

          {/* Summary panel with form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass rounded-3xl p-6 flex flex-col"
          >
            <h3 className="text-lg font-bold text-foreground mb-1">
              {DONATION_TIERS[selectedTier].label} Membership
            </h3>
            <div className="text-3xl font-black text-gold mb-1">
              ${currentAmount}
            </div>
            <div className="text-xs text-muted-foreground mb-6">
              per {frequency === "monthly" ? "month" : "donation"}
            </div>

            <div className="text-xs tracking-widest uppercase text-muted-foreground mb-3">Your Impact</div>
            <ul className="space-y-2 mb-6 flex-1">
              {DONATION_TIERS[selectedTier].perks.map((perk) => (
                <li key={perk} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "oklch(0.78 0.14 82 / 0.15)" }}>
                    <svg className="w-2 h-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  {perk}
                </li>
              ))}
            </ul>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 mb-4">
              <div>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      placeholder="Your name"
                      className="w-full px-4 py-3 rounded-xl text-sm bg-muted/50 border border-border/60 text-foreground placeholder-muted-foreground outline-none focus:border-primary/60 transition-colors"
                      aria-invalid={!!errors.name}
                    />
                  )}
                />
                {errors.name && (
                  <p className="text-xs mt-1" style={{ color: "oklch(0.577 0.245 27.325)" }}>{errors.name.message}</p>
                )}
              </div>
              <div>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="email"
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 rounded-xl text-sm bg-muted/50 border border-border/60 text-foreground placeholder-muted-foreground outline-none focus:border-primary/60 transition-colors"
                      aria-invalid={!!errors.email}
                    />
                  )}
                />
                {errors.email && (
                  <p className="text-xs mt-1" style={{ color: "oklch(0.577 0.245 27.325)" }}>{errors.email.message}</p>
                )}
              </div>

              {/* Security badges */}
              <div className="flex items-center gap-2 text-[10px] text-muted-foreground pt-2 pb-2 border-t border-b border-border/50">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>256-bit SSL encrypted · Cancel anytime</span>
              </div>

              {/* Error message */}
              {error && (
                <p className="text-xs text-center" style={{ color: "oklch(0.577 0.245 27.325)" }}>{error}</p>
              )}

              {/* Donate button */}
              <AnimatePresence mode="wait">
                {!done ? (
                  <motion.button
                    key="donate"
                    type="submit"
                    disabled={donating}
                    whileHover={!donating ? { scale: 1.03 } : undefined}
                    whileTap={!donating ? { scale: 0.97 } : undefined}
                    className="w-full py-4 rounded-2xl text-sm tracking-[0.15em] uppercase font-bold text-primary-foreground transition-all duration-300 glow-gold relative overflow-hidden"
                    style={{
                      background: "linear-gradient(135deg, oklch(0.78 0.14 82) 0%, oklch(0.68 0.16 78) 50%, oklch(0.78 0.14 82) 100%)",
                      backgroundSize: "200% 100%",
                    }}
                  >
                    {donating ? (
                      <span className="flex items-center justify-center gap-2">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full"
                        />
                        Processing...
                      </span>
                    ) : (
                      `Donate $${currentAmount} ${frequency === "monthly" ? "Monthly" : "Now"}`
                    )}
                  </motion.button>
                ) : (
                  <motion.div
                    key="done"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-full py-4 rounded-2xl text-center"
                    style={{ background: "oklch(0.55 0.18 148 / 0.2)", border: "1px solid oklch(0.55 0.18 148 / 0.4)" }}
                  >
                    <div className="text-2xl mb-1">🌿</div>
                    <div className="text-sm font-bold text-foreground">Thank You!</div>
                    <div className="text-xs text-muted-foreground">Your donation is saving lives</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>

        {/* Impact tracker */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-12 glass-dark rounded-3xl p-8"
        >
          <div className="text-center mb-8">
            <div className="text-xs tracking-[0.2em] uppercase text-primary mb-2">Real Impact</div>
            <h3 className="text-xl font-bold text-foreground">Every Dollar Tells a Story</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {IMPACT_ITEMS.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="text-center glass rounded-2xl p-4 hover:border-primary/30 transition-all duration-300 group"
              >
                <div className="text-xl font-black text-gold mb-2 group-hover:glow-text transition-all duration-300">
                  {item.amount}
                </div>
                <p className="text-[10px] text-muted-foreground leading-relaxed">{item.impact}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
