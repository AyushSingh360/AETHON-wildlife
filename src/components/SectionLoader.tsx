import { motion } from "framer-motion"

export function SectionLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <motion.div
          className="w-12 h-12 rounded-full border-2 border-primary border-t-transparent mx-auto mb-4"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground">Loading</p>
      </div>
    </div>
  )
}
