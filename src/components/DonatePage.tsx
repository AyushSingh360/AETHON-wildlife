import { motion } from "framer-motion";
import { DonationSection } from "./DonationSection";

export function DonatePage() {
  return (
    <section id="donate-page" className="relative py-32 px-6 overflow-hidden min-h-screen">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 30%, oklch(0.12 0.04 150 / 0.15) 0%, transparent 55%), linear-gradient(180deg, oklch(0.06 0.012 165 / 0.15) 0%, oklch(0.04 0.01 165 / 0.08) 100%)" }} />
      <div className="relative max-w-[1400px] mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 1 }}
          className="section-title text-foreground text-center mb-8"
        >
          Support Our <span className="text-gold-shimmer">Sanctuary</span>
        </motion.h2>
        <DonationSection />
      </div>
    </section>
  );
}
