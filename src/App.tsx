import { lazy, Suspense, useEffect } from "react"
import { CustomCursor } from "@/components/CustomCursor"
import { Navigation } from "@/components/Navigation"
import { HeroSection } from "@/components/HeroSection"
import { ErrorBoundary } from "@/components/ErrorBoundary"
import { SectionLoader } from "@/components/SectionLoader"
import { SkipLink } from "@/components/SkipLink"
import { GrainientBackground } from "@/components/GrainientBackground"

const ScrollStory = lazy(() =>
  import("@/components/ScrollStory").then((m) => ({ default: m.ScrollStory }))
)
const MissionSection = lazy(() =>
  import("@/components/MissionSection").then((m) => ({ default: m.MissionSection }))
)
const WildlifeShowcase = lazy(() =>
  import("@/components/WildlifeShowcase").then((m) => ({ default: m.WildlifeShowcase }))
)
const ConservationStats = lazy(() =>
  import("@/components/ConservationStats").then((m) => ({ default: m.ConservationStats }))
)
const EcosystemSection = lazy(() =>
  import("@/components/EcosystemSection").then((m) => ({ default: m.EcosystemSection }))
)
const DonationSection = lazy(() =>
  import("@/components/DonationSection").then((m) => ({ default: m.DonationSection }))
)
const LiveCamsSection = lazy(() =>
  import("@/components/LiveCamsSection").then((m) => ({ default: m.LiveCamsSection }))
)
const TestimonialsSection = lazy(() =>
  import("@/components/TestimonialsSection").then((m) => ({ default: m.TestimonialsSection }))
)
const CinematicFooter = lazy(() =>
  import("@/components/CinematicFooter").then((m) => ({ default: m.CinematicFooter }))
)
const SpeciesList = lazy(() =>
  import("@/components/SpeciesList").then((m) => ({ default: m.SpeciesList }))
)
const BreedingPrograms = lazy(() =>
  import("@/components/BreedingPrograms").then((m) => ({ default: m.BreedingPrograms }))
)
const HabitatRestoration = lazy(() =>
  import("@/components/HabitatRestoration").then((m) => ({ default: m.HabitatRestoration }))
)
const FieldResearch = lazy(() =>
  import("@/components/FieldResearch").then((m) => ({ default: m.FieldResearch }))
)

export function App() {
  useEffect(() => {
    document.documentElement.style.overscrollBehavior = "none"
    return () => {
      document.documentElement.style.overscrollBehavior = ""
    }
  }, [])

  return (
    <>
      <GrainientBackground
        color1="#456614"
        color2="#212022"
        color3="#84CC16"
        saturation={2.5}
        noiseScale={2.05}
        timeSpeed={0.5}
        colorBalance={-0.25}
        gamma={0.65}
        grainScale={5.3}
        grainAmount={0.14}
        contrast={1.5}
        warpStrength={1}
        warpFrequency={5}
        warpSpeed={2}
        warpAmplitude={50}
        blendAngle={0}
        blendSoftness={0.05}
        rotationAmount={500}
        centerX={0}
        centerY={0}
        zoom={0.9}
        grainAnimated={false}
      />
      <SkipLink />
      <CustomCursor />
      <Navigation />
      <main id="main-content" className="relative">
        <HeroSection />
        <ErrorBoundary>
          <Suspense fallback={<SectionLoader />}>
            <ScrollStory />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary>
          <Suspense fallback={<SectionLoader />}>
            <MissionSection />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary>
          <Suspense fallback={<SectionLoader />}>
            <WildlifeShowcase />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary>
          <Suspense fallback={<SectionLoader />}>
            <ConservationStats />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary>
          <Suspense fallback={<SectionLoader />}>
            <EcosystemSection />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary>
          <Suspense fallback={<SectionLoader />}>
            <DonationSection />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary>
          <Suspense fallback={<SectionLoader />}>
            <LiveCamsSection />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary>
          <Suspense fallback={<SectionLoader />}>
            <SpeciesList />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary>
          <Suspense fallback={<SectionLoader />}>
            <BreedingPrograms />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary>
          <Suspense fallback={<SectionLoader />}>
            <HabitatRestoration />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary>
          <Suspense fallback={<SectionLoader />}>
            <FieldResearch />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary>
          <Suspense fallback={<SectionLoader />}>
            <TestimonialsSection />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary>
          <Suspense fallback={<SectionLoader />}>
            <CinematicFooter />
          </Suspense>
        </ErrorBoundary>
      </main>
      <div className="noise-overlay" />
    </>
  )
}

export default App