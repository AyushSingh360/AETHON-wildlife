import { useEffect, useState } from "react"

export function usePerformance() {
  const [metrics, setMetrics] = useState({
    fps: 60,
    memory: 0,
    loadTime: 0,
  })

  useEffect(() => {
    let frameCount = 0
    let lastTime = performance.now()
    let animId: number

    const measure = (now: number) => {
      frameCount++
      const delta = now - lastTime
      if (delta >= 1000) {
        const fps = Math.round((frameCount * 1000) / delta)
        const memory = (performance as unknown as { memory?: { usedJSHeapSize: number } }).memory
          ? Math.round(
              (performance as unknown as { memory: { usedJSHeapSize: number } }).memory.usedJSHeapSize /
                1048576
            )
          : 0

        setMetrics((prev) => ({
          ...prev,
          fps,
          memory,
          loadTime: Math.round(performance.now()),
        }))

        frameCount = 0
        lastTime = now
      }
      animId = requestAnimationFrame(measure)
    }

    animId = requestAnimationFrame(measure)

    return () => cancelAnimationFrame(animId)
  }, [])

  return metrics
}
