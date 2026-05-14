import { motion, useScroll, useMotionValueEvent } from "framer-motion"
import { useState } from "react"

const navLinks = [
  { label: "Sanctuary", href: "#mission" },
  { label: "Wildlife", href: "#wildlife" },
  { label: "Ecosystem", href: "#ecosystem" },
  { label: "Conservation", href: "#conservation" },
  { label: "Live Cams", href: "#livecams" },
  { label: "Donate", href: "#donate" },
]

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 60)
  })

  const scrollTo = (href: string) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: "smooth" })
    setMenuOpen(false)
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-700 ${
          scrolled ? "glass py-3" : "py-6 bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-[1600px] px-6 flex items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <div className="relative w-10 h-10">
              <div
                className="w-10 h-10 rounded-full border border-primary/40 flex items-center justify-center"
                style={{ boxShadow: "0 0 20px oklch(0.78 0.14 82 / 0.4)" }}
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-gold" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2C8 2 4 6 4 10c0 6 8 12 8 12s8-6 8-12c0-4-4-8-8-8z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>
              </div>
              <div
                className="absolute inset-0 rounded-full"
                style={{ animation: "rippleOut 3s ease-out infinite", border: "1px solid oklch(0.78 0.14 82 / 0.2)" }}
              />
            </div>
            <div>
              <div className="text-sm font-bold tracking-[0.15em] text-gold uppercase">Aethon</div>
              <div className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase">Wildlife Sanctuary</div>
            </div>
          </motion.div>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link, i) => (
              <motion.button
                key={link.label}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.07, duration: 0.5 }}
                onClick={() => scrollTo(link.href)}
                className="relative text-xs tracking-[0.12em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-300 group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
              </motion.button>
            ))}
          </div>

          {/* CTA */}
          <div className="flex items-center gap-4">
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollTo("#donate")}
              className="hidden lg:flex items-center gap-2 px-5 py-2 text-xs tracking-[0.12em] uppercase font-semibold rounded-full text-primary-foreground glow-gold"
              style={{
                background: "linear-gradient(135deg, oklch(0.78 0.14 82) 0%, oklch(0.65 0.15 78) 100%)",
              }}
            >
              <span>Protect Now</span>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.button>

            {/* Mobile menu button */}
            <button
              className="lg:hidden flex flex-col gap-1.5 p-2"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <motion.span
                animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 7 : 0 }}
                className="block w-6 h-px bg-foreground"
              />
              <motion.span
                animate={{ opacity: menuOpen ? 0 : 1 }}
                className="block w-4 h-px bg-foreground"
              />
              <motion.span
                animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -7 : 0 }}
                className="block w-6 h-px bg-foreground"
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={{ opacity: menuOpen ? 1 : 0, y: menuOpen ? 0 : -20 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-[999] glass-dark pt-24 pb-8 px-6 ${menuOpen ? "pointer-events-auto" : "pointer-events-none"}`}
      >
        <div className="flex flex-col gap-6">
          {navLinks.map((link, i) => (
            <motion.button
              key={link.label}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: menuOpen ? 0 : -20, opacity: menuOpen ? 1 : 0 }}
              transition={{ delay: menuOpen ? i * 0.06 : 0, duration: 0.4 }}
              onClick={() => scrollTo(link.href)}
              className="text-left text-xl font-light tracking-[0.08em] text-foreground/80 hover:text-primary transition-colors duration-300"
            >
              {link.label}
            </motion.button>
          ))}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: menuOpen ? 1 : 0 }}
            transition={{ delay: menuOpen ? 0.4 : 0 }}
            onClick={() => scrollTo("#donate")}
            className="mt-4 px-6 py-3 rounded-full text-sm tracking-[0.1em] uppercase font-semibold text-primary-foreground w-full"
            style={{
              background: "linear-gradient(135deg, oklch(0.78 0.14 82) 0%, oklch(0.65 0.15 78) 100%)",
            }}
          >
            Protect Wildlife Now
          </motion.button>
        </div>
      </motion.div>
    </>
  )
}
