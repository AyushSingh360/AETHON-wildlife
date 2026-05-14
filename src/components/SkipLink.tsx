export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100000] focus:px-4 focus:py-2 focus:rounded-full focus:text-xs focus:tracking-widest focus:uppercase focus:font-bold focus:text-primary-foreground focus:outline-none"
      style={{
        background: "linear-gradient(135deg, oklch(0.78 0.14 82) 0%, oklch(0.65 0.15 78) 100%)",
      }}
    >
      Skip to main content
    </a>
  )
}
