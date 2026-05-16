import { motion } from "framer-motion";

export function ContactUs() {
  return (
    <section id="contact" className="relative py-32 px-6 overflow-hidden min-h-screen">
      {/* Simple static background */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 30%, oklch(0.12 0.04 150 / 0.15) 0%, transparent 60%), linear-gradient(180deg, oklch(0.06 0.012 165 / 0.15) 0%, oklch(0.04 0.01 165 / 0.08) 100%)" }} />

      <div className="relative max-w-[1400px] mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 1 }}
          className="section-title text-foreground mb-6"
        >
          Contact <span className="text-gold-shimmer">Us</span>
        </motion.h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
          Have questions or want to get involved? Reach out to us directly.
        </p>
        <div className="max-w-xl mx-auto bg-glass p-6 rounded-2xl glass-dark">
          <form className="space-y-4 text-left">
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1" htmlFor="name">Name</label>
              <input id="name" type="text" placeholder="Your name" className="w-full px-4 py-2 rounded-xl bg-muted/30 border border-border/40 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/40" />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1" htmlFor="email">Email</label>
              <input id="email" type="email" placeholder="you@example.com" className="w-full px-4 py-2 rounded-xl bg-muted/30 border border-border/40 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/40" />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1" htmlFor="message">Message</label>
              <textarea id="message" rows={4} placeholder="Your message" className="w-full px-4 py-2 rounded-xl bg-muted/30 border border-border/40 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/40" />
            </div>
            <button type="submit" className="w-full py-2 rounded-xl text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 transition-colors">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
