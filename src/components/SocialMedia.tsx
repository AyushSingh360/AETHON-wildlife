import { motion } from "framer-motion";
import { Github, Twitter, Instagram, Linkedin } from "lucide-react";

export function SocialMedia() {
  return (
    <section id="social" className="relative py-32 px-6 overflow-hidden min-h-screen">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 30%, oklch(0.12 0.04 150 / 0.15) 0%, transparent 55%), linear-gradient(180deg, oklch(0.06 0.012 165 / 0.15) 0%, oklch(0.04 0.01 165 / 0.08) 100%)" }} />
      <div className="relative max-w-[800px] mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 1 }}
          className="section-title text-foreground mb-6"
        >
          Follow Us on <span className="text-gold-shimmer">Social Media</span>
        </motion.h2>
        <div className="flex justify-center gap-8 mt-8">
          <a href="#" className="text-3xl text-primary hover:text-primary/80 transition-colors" aria-label="GitHub">
            <Github />
          </a>
          <a href="#" className="text-3xl text-primary hover:text-primary/80 transition-colors" aria-label="Twitter">
            <Twitter />
          </a>
          <a href="#" className="text-3xl text-primary hover:text-primary/80 transition-colors" aria-label="Instagram">
            <Instagram />
          </a>
          <a href="#" className="text-3xl text-primary hover:text-primary/80 transition-colors" aria-label="LinkedIn">
            <Linkedin />
          </a>
        </div>
      </div>
    </section>
  );
}
