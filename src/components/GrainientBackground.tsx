import { useMemo } from "react"

interface GrainientBackgroundProps {
  color1?: string
  color2?: string
  color3?: string
  saturation?: number
  noiseScale?: number
  timeSpeed?: number
  colorBalance?: number
  gamma?: number
  grainScale?: number
  grainAmount?: number
}

export function GrainientBackground({
  color1 = "#162367",
  color2 = "#212022",
  color3 = "#888888",
  saturation = 2.5,
  noiseScale = 2.05,
  timeSpeed = 0.5,
  colorBalance = -0.25,
  gamma = 0.65,
  grainScale = 5.3,
  grainAmount = 0.14,
}: GrainientBackgroundProps = {}) {
  // Unique ID for this instance to support multiple backgrounds
  const uid = useMemo(() => `grainient-${Math.random().toString(36).slice(2, 9)}`, [])

  // Build dynamic styles
  const rootStyle: React.CSSProperties = {
    "--grainient-color1": color1,
    "--grainient-color2": color2,
    "--grainient-color3": color3,
    "--grainient-saturation": saturation,
    "--grainient-noise-scale": noiseScale,
    "--grainient-time-speed": timeSpeed,
    "--grainient-color-balance": colorBalance,
    "--grainient-gamma": gamma,
    "--grainient-grain-scale": grainScale,
    "--grainient-grain-amount": grainAmount,
  } as React.CSSProperties

  return (
    <>
      {/* Animated gradient layers */}
      <div
        className="grainient-bg"
        style={rootStyle}
        aria-hidden="true"
      />

      {/* SVG grain filter — single instance */}
      <svg
        className="grainient-svg-filters"
        aria-hidden="true"
        style={{ position: "absolute", width: 0, height: 0 }}
      >
        <defs>
          <filter id={`grain-${uid}`}>
            <feTurbulence
              type="fractalNoise"
              baseFrequency={grainScale / 100}
              numOctaves={4}
              stitchTiles="stitch"
              seed={Math.floor(Math.random() * 1000)}
            />
            <feColorMatrix
              type="saturate"
              values={String(saturation)}
            />
            <feComponentTransfer>
              <feFuncR type="gamma" exponent={gamma} amplitude={1} />
              <feFuncG type="gamma" exponent={gamma} amplitude={1} />
              <feFuncB type="gamma" exponent={gamma} amplitude={1} />
            </feComponentTransfer>
            <feBlend in="SourceGraphic" mode="multiply" />
          </filter>
        </defs>
      </svg>

      {/* Grain overlay */}
      <div
        className="grainient-grain"
        style={{
          ...rootStyle,
          filter: `url(#grain-${uid})`,
        }}
        aria-hidden="true"
      />

      <style>{`
        .grainient-bg {
          position: fixed;
          inset: 0;
          z-index: -2;
          overflow: hidden;
          background: linear-gradient(
            135deg,
            var(--grainient-color1, #162367) 0%,
            var(--grainient-color2, #212022) 40%,
            var(--grainient-color3, #888888) 70%,
            var(--grainient-color1, #162367) 100%
          );
          background-size: 300% 300%;
          animation: grainientMove var(--grainient-time-speed, 0.5s) ease-in-out infinite alternate;
          filter: brightness(var(--grainient-gamma, 0.65));
        }

        @keyframes grainientMove {
          0% {
            background-position: 0% 0%;
            filter: brightness(var(--grainient-gamma, 0.65)) hue-rotate(0deg);
          }
          33% {
            background-position: 100% 0%;
            filter: brightness(var(--grainient-gamma, 0.65)) hue-rotate(5deg);
          }
          66% {
            background-position: 0% 100%;
            filter: brightness(var(--grainient-gamma, 0.65)) hue-rotate(-3deg);
          }
          100% {
            background-position: 100% 100%;
            filter: brightness(var(--grainient-gamma, 0.65)) hue-rotate(2deg);
          }
        }

        .grainient-grain {
          position: fixed;
          inset: 0;
          z-index: -1;
          opacity: var(--grainient-grain-amount, 0.14);
          mix-blend-mode: overlay;
          background: transparent;
          pointer-events: none;
          animation: grainientFlicker calc(var(--grainient-time-speed, 0.5s) * 4) steps(1) infinite;
        }

        @keyframes grainientFlicker {
          0% { opacity: var(--grainient-grain-amount, 0.14); }
          25% { opacity: calc(var(--grainient-grain-amount, 0.14) * 1.3); }
          50% { opacity: var(--grainient-grain-amount, 0.14); }
          75% { opacity: calc(var(--grainient-grain-amount, 0.14) * 0.8); }
          100% { opacity: var(--grainient-grain-amount, 0.14); }
        }

        .grainient-svg-filters {
          position: fixed;
          top: -100%;
          left: -100%;
          width: 1px;
          height: 1px;
          pointer-events: none;
        }
      `}</style>
    </>
  )
}