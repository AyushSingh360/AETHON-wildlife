import { motion } from "framer-motion";

export function Membership() {
  return (
    <section id="membership" className="relative py-32 px-6 overflow-hidden min-h-screen">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 30%, oklch(0.12 0.04 150 / 0.15) 0%, transparent 55%), linear-gradient(180deg, oklch(0.06 0.012 165 / 0.15) 0%, oklch(0.04 0.01 165 / 0.08) 100%)" }} />
      <div className="relative max-w-[1000px] mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 1 }}
          className="section-title text-foreground mb-6"
        >
          Become a <span className="text-gold-shimmer">Member</span>
        </motion.h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
          Join our community of supporters to get exclusive updates, behind‑the‑scenes content, and early access to events.
        </p>
        <ul className="list-disc list-inside text-left max-w-md mx-auto text-muted-foreground mb-8 space-y-2">
          <li>Monthly impact reports</li>
          <li>Invitations to private webinars</li>
          <li>Early access to new sanctuary features</li>
          <li>Special thank‑you badge on the site</li>
        </ul>
        <button className="px-6 py-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
          Join Now
        </button>
      </div>
    </section>
  );
}
