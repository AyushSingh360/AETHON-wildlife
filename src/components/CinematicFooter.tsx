import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { z } from "zod/v4"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import { supabase } from "@/lib/supabase"

const newsletterSchema = z.object({
  email: z.email("Please enter a valid email"),
})

type NewsletterForm = z.infer<typeof newsletterSchema>

const FOOTER_LINKS = {
  Sanctuary: ["About Us", "Our Mission", "Conservation Science", "Annual Reports", "Press Room"],
  Wildlife: ["Species List", "Breeding Programs", "Habitat Restoration", "Field Research", "Wildlife Cams"],
  Community: ["Volunteer Program", "Education Center", "Ranger Training", "Corporate Partners", "Community Rangers"],
  Connect: ["Contact Us", "Newsletter", "Social Media", "Donate", "Membership"],
}

const VOLUNTEER_ROLES = [
  { role: "Field Researcher", commitment: "3 months min", icon: "🔬" },
  { role: "Community Educator", commitment: "6 weeks min", icon: "📚" },
  { role: "Wildlife Photographer", commitment: "Project-based", icon: "📷" },
  { role: "Conservation Engineer", commitment: "Flexible", icon: "⚙️" },
]

const PARTICLES_BG = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  size: Math.random() * 2.5 + 0.5,
  delay: Math.random() * 15,
  duration: Math.random() * 12 + 10,
}))

export function CinematicFooter() {
  const [subscribed, setSubscribed] = useState(false)
  const [subError, setSubError] = useState<string | null>(null)

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewsletterForm>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: { email: "" },
  })

  const onSubscribe = async (data: NewsletterForm) => {
    setSubError(null)
    try {
      const { error } = await supabase.from("newsletter_subscribers").insert({ email: data.email })
      if (error) {
        if (error.code === "23505") {
          setSubError("Already subscribed!")
          return
        }
        throw error
      }
      setSubscribed(true)
      reset()
    } catch {
      setSubError("Something went wrong")
    }
  }

  return (
    <footer className="relative overflow-hidden">
      {/* Volunteer Journey Section */}
      <section id="volunteer" className="relative py-24 px-6">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
               radial-gradient(ellipse 80% 60% at 50% 100%, oklch(0.15 0.08 150 / 0.12) 0%, transparent 60%),
               linear-gradient(180deg, oklch(0.05 0.01 165 / 0.15) 0%, oklch(0.04 0.01 165 / 0.1) 100%)
             `,
          }}
        />

        <div className="relative max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 mb-6"
              >
                <div className="h-px w-10 bg-primary/60" />
                <span className="text-xs tracking-[0.3em] uppercase text-primary">Join the Mission</span>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="section-title text-foreground mb-6"
              >
                Become a{" "}
                <span className="text-gold-shimmer">Sanctuary</span>{" "}
                Guardian
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-muted-foreground leading-relaxed mb-8"
              >
                Our volunteer program is one of the most respected in global conservation.
                Skills, passion, and commitment are your only requirements.
                We provide training, accommodation, and an experience that changes your life.
              </motion.p>

              <div className="space-y-4">
                {VOLUNTEER_ROLES.map((role, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-4 p-4 glass rounded-2xl group hover:border-primary/30 transition-all duration-300"
                  >
                    <div className="text-2xl">{role.icon}</div>
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-foreground group-hover:text-gold transition-colors duration-300">
                        {role.role}
                      </div>
                      <div className="text-xs text-muted-foreground">{role.commitment}</div>
                    </div>
                    <svg className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.div>
                ))}
              </div>

              <motion.button
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="mt-8 px-8 py-4 rounded-full text-sm tracking-widest uppercase font-bold text-primary-foreground glow-gold"
                style={{
                  background: "linear-gradient(135deg, oklch(0.78 0.14 82) 0%, oklch(0.65 0.15 78) 100%)",
                }}
              >
                Apply to Volunteer
              </motion.button>
            </div>

            {/* Visual right side */}
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="relative aspect-square max-w-md mx-auto"
              >
                {/* Rotating rings */}
                <motion.div
                  className="absolute inset-0 rounded-full border border-primary/10"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute inset-8 rounded-full border border-primary/15"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute inset-16 rounded-full border border-primary/20"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                />

                {/* Center */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="w-40 h-40 rounded-full flex flex-col items-center justify-center text-center glow-gold"
                    style={{
                      background: "linear-gradient(135deg, oklch(0.16 0.08 82) 0%, oklch(0.1 0.04 82) 100%)",
                      border: "1px solid oklch(0.78 0.14 82 / 0.3)",
                    }}
                  >
                    <div className="text-4xl font-black text-gold">500+</div>
                    <div className="text-[10px] tracking-widest uppercase text-muted-foreground">Active Volunteers</div>
                    <div className="text-[9px] text-muted-foreground mt-1">from 48 countries</div>
                  </div>
                </div>

                {/* Orbit dots */}
                {["🌿", "🦁", "🌊", "🔬", "🌍", "📡"].map((emoji, i) => {
                  const angle = (i / 6) * Math.PI * 2 - Math.PI / 2
                  const r = 42
                  return (
                    <motion.div
                      key={i}
                      className="absolute text-xl"
                      style={{
                        left: `${50 + r * Math.cos(angle)}%`,
                        top: `${50 + r * Math.sin(angle)}%`,
                        transform: "translate(-50%, -50%)",
                      }}
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 0.5,
                      }}
                    >
                      {emoji}
                    </motion.div>
                  )
                })}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Main footer */}
      <div className="relative" style={{ background: "oklch(0.04 0.01 165)" }}>
        {/* Particles */}
        {PARTICLES_BG.map((p) => (
          <div
            key={p.id}
            className="particle absolute"
            style={{
              left: `${p.left}%`,
              bottom: "-5px",
              width: p.size,
              height: p.size,
              background: "oklch(0.78 0.14 82 / 0.4)",
              boxShadow: `0 0 ${p.size * 4}px oklch(0.78 0.14 82 / 0.3)`,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}

        {/* Top golden line */}
        <div
          className="h-px w-full"
          style={{
            background: "linear-gradient(90deg, transparent 0%, oklch(0.78 0.14 82 / 0.4) 30%, oklch(0.78 0.14 82 / 0.6) 50%, oklch(0.78 0.14 82 / 0.4) 70%, transparent 100%)",
          }}
        />

        <div className="max-w-[1400px] mx-auto px-6 py-16">
          {/* Footer content */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-16">
            {/* Brand column */}
            <div className="col-span-2 md:col-span-4 lg:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-10 h-10 rounded-full border border-primary/40 flex items-center justify-center"
                  style={{ boxShadow: "0 0 20px oklch(0.78 0.14 82 / 0.3)" }}
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 text-gold" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 2C8 2 4 6 4 10c0 6 8 12 8 12s8-6 8-12c0-4-4-8-8-8z" />
                    <circle cx="12" cy="10" r="2.5" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-bold tracking-[0.15em] text-gold uppercase">Aethon</div>
                  <div className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase">Wildlife Sanctuary</div>
                </div>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed mb-6">
                Protecting life, restoring wildness, and honoring the ancient bond between humanity and nature since 1981.
              </p>
              <div className="flex gap-3">
                {["Twitter", "Instagram", "YouTube", "LinkedIn"].map((social) => (
                  <button
                    key={social}
                    className="w-8 h-8 glass rounded-full flex items-center justify-center text-[10px] text-muted-foreground hover:text-primary hover:border-primary/40 transition-all duration-300"
                    title={social}
                  >
                    {social[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Link columns */}
            {Object.entries(FOOTER_LINKS).map(([category, links]) => (
              <div key={category}>
                <div className="text-xs tracking-[0.2em] uppercase text-primary mb-4 font-semibold">
                  {category}
                </div>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link}>
                      <button className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-200 text-left">
                        {link}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter */}
          <div
            className="glass rounded-3xl p-6 md:p-8 mb-12 flex flex-col md:flex-row items-center gap-6"
            style={{ borderColor: "oklch(0.78 0.14 82 / 0.15)" }}
          >
            <div className="flex-1">
              <div className="text-lg font-bold text-foreground mb-1">Stay Connected to the Wild</div>
              <p className="text-sm text-muted-foreground">
                Monthly field reports, species updates, and conservation victories delivered to your inbox.
              </p>
            </div>
            {subscribed ? (
              <div className="text-center px-6 py-3 rounded-xl" style={{ background: "oklch(0.55 0.18 148 / 0.15)", border: "1px solid oklch(0.55 0.18 148 / 0.3)" }}>
                <div className="text-sm font-bold text-foreground">You're in!</div>
                <div className="text-xs text-muted-foreground">Welcome to the wild</div>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubscribe)} className="flex flex-col gap-2 w-full md:w-auto">
                <div className="flex gap-2 w-full md:w-auto">
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="email"
                        placeholder="your@email.com"
                        className="flex-1 md:w-56 px-4 py-3 rounded-xl text-sm bg-muted/50 border border-border/60 text-foreground placeholder-muted-foreground outline-none focus:border-primary/60 transition-colors"
                        style={{ cursor: "text" }}
                        aria-invalid={!!errors.email}
                      />
                    )}
                  />
                  <button
                    type="submit"
                    className="px-5 py-3 rounded-xl text-xs tracking-widest uppercase font-bold text-primary-foreground flex-shrink-0"
                    style={{
                      background: "linear-gradient(135deg, oklch(0.78 0.14 82) 0%, oklch(0.65 0.15 78) 100%)",
                    }}
                  >
                    Subscribe
                  </button>
                </div>
                {(errors.email || subError) && (
                  <p className="text-xs" style={{ color: "oklch(0.577 0.245 27.325)" }}>
                    {errors.email?.message || subError}
                  </p>
                )}
              </form>
            )}
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t border-border/30">
            <div className="text-[11px] text-muted-foreground text-center md:text-left">
              © 2026 Aethon Wildlife Sanctuary. All rights reserved. A 501(c)(3) nonprofit organization.
            </div>
            <div className="flex flex-wrap items-center gap-6 justify-center">
              {["Privacy Policy", "Terms of Use", "Cookie Policy", "Accessibility"].map((link) => (
                <button
                  key={link}
                  className="text-[11px] text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link}
                </button>
              ))}
            </div>
          </div>

          {/* Massive background text */}
          <div
            className="text-center mt-8 select-none pointer-events-none"
            style={{
              fontSize: "clamp(3rem, 10vw, 8rem)",
              fontWeight: 900,
              letterSpacing: "-0.03em",
              color: "oklch(0.78 0.14 82 / 0.04)",
              lineHeight: 1,
            }}
          >
            AETHON
          </div>
        </div>
      </div>
    </footer>
  )
}
