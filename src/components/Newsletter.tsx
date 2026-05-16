import { motion } from "framer-motion";

export function Newsletter() {
  return (
    <section id="newsletter" className="relative py-32 px-6 overflow-hidden min-h-screen">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 30%, oklch(0.12 0.04 150 / 0.15) 0%, transparent 55%), linear-gradient(180deg, oklch(0.06 0.012 165 / 0.15) 0%, oklch(0.04 0.01 165 / 0.08) 100%)" }} />
      <div className="relative max-w-[800px] mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 1 }}
          className="section-title text-foreground mb-6"
        >
          Stay Updated – <span className="text-gold-shimmer">Newsletter</span>
        </motion.h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
          Subscribe to get the latest conservation news, project updates, and exclusive stories.
        </p>
        <form className="max-w-md mx-auto bg-glass p-6 rounded-2xl glass-dark">
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-xl bg-muted/30 border border-border/40 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/40"
            />
            <button type="submit" className="px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
              Subscribe
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
