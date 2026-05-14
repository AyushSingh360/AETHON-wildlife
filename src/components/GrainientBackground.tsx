import { useMemo } from "react"

interface GrainientBackgroundProps {
  color1?: string
  color2?: string
  color3?: string
  saturation?: number
  noiseScale?: number
  grainScale?: number
  grainAmount?: number
  timeSpeed?: number
  colorBalance?: number
  gamma?: number
  contrast?: number
  warpStrength?: number
  warpFrequency?: number
  warpSpeed?: number
  warpAmplitude?: number
  blendAngle?: number
  blendSoftness?: number
  rotationAmount?: number
  centerX?: number
  centerY?: number
  zoom?: number
  grainAnimated?: boolean
  className?: string
}

export function GrainientBackground({
  color1 = "#456614",
  color2 = "#212022",
  color3 = "#84CC16",
  saturation = 2.5,
  noiseScale = 2.05,
  grainScale = 5.3,
  grainAmount = 0.14,
  timeSpeed = 0.5,
  colorBalance = -0.25,
  gamma = 0.65,
  contrast = 1.5,
  warpStrength = 1,
  warpFrequency = 5,
  warpSpeed = 2,
  warpAmplitude = 50,
  blendAngle = 0,
  blendSoftness = 0.05,
  rotationAmount = 500,
  centerX = 0,
  centerY = 0,
  zoom = 0.9,
  grainAnimated = false,
  className = "",
}: GrainientBackgroundProps = {}) {
  const uid = useMemo(() => `gr-${Math.random().toString(36).slice(2, 9)}`, [])

  // Normalize rotation to degrees
  const rotationDeg = rotationAmount / 100

  // Compute blend direction from angle
  const angleRad = (blendAngle * Math.PI) / 180
  const gradX = Math.cos(angleRad) * 100
  const gradY = Math.sin(angleRad) * 100

  // Warp animation duration based on speed
  const warpDuration = Math.max(1, 10 / warpSpeed)

  return (
    <>
      {/* ===== Warp Filter (SVG turbulence displacement) ===== */}
      <svg
        className="grainient-svg-filters"
        aria-hidden="true"
        style={{ position: "fixed", width: 0, height: 0 }}
      >
        <defs>
          <filter id={`warp-${uid}`} x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              type="turbulence"
              baseFrequency={warpFrequency / 100}
              numOctaves={3}
              seed={42}
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={warpAmplitude * warpStrength}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>

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
              <feFuncR type="gamma" exponent={gamma} />
              <feFuncG type="gamma" exponent={gamma} />
              <feFuncB type="gamma" exponent={gamma} />
            </feComponentTransfer>
          </filter>
        </defs>
      </svg>

      {/* ===== Animated Gradient Layer (with warp) ===== */}
      <div
        className={`grainient-bg ${className}`}
        style={{
          "--grainient-color1": color1,
          "--grainient-color2": color2,
          "--grainient-color3": color3,
          "--grainient-rotation": `${rotationDeg}deg`,
          "--grainient-zoom": zoom,
          "--grainient-center-x": `${centerX + 50}%`,
          "--grainient-center-y": `${centerY + 50}%`,
          "--grainient-gamma": gamma,
          "--grainient-contrast": contrast,
          "--grainient-blend-angle": `${gradX}px`,
          "--grainient-blend-angle-y": `${gradY}px`,
          "--grainient-softness": blendSoftness,
          "--grainient-warp-strength": warpStrength,
          "--grainient-warp-duration": `${warpDuration}s`,
          "--grainient-saturation": saturation,
background: `
             radial-gradient(
               ellipse 120% 120% at var(--grainient-center-x, 50%) var(--grainient-center-y, 50%),
               var(--grainient-color1, #456614) 0%,
               var(--grainient-color2, #212022) 40%,
               var(--grainient-color3, #84CC16) 75%,
               var(--grainient-color1, #456614) 100%
             )
           `,
          }}
          aria-hidden="true"
      >
        {/* Warping distortion pseudo-element using animated gradients */}
        <div
          className="grainient-warp"
          style={{
            "--warp-freq": warpFrequency,
            "--warp-amp": warpAmplitude * warpStrength,
            "--warp-speed": warpSpeed,
          } as React.CSSProperties}
        />
      </div>

      {/* ===== Grain Noise Overlay ===== */}
      <div
        className="grainient-grain"
        style={{
          filter: `url(#grain-${uid})`,
          opacity: grainAnimated ? 0.1 : grainAmount,
          animationDuration: grainAnimated
            ? `${Math.max(2, 8 / timeSpeed)}s`
            : undefined,
        }}
        aria-hidden="true"
      />

      {/* Color grading overlay for contrast/saturation */}
      <div
        className="grainient-grading"
        aria-hidden="true"
        style={{
          "--grainient-contrast": contrast,
          "--grainient-saturation": saturation,
          "--grainient-color-balance": colorBalance,
        } as React.CSSProperties}
      />

      <style>{`
        /* === Grainient Base Gradient === */
        .grainient-bg {
          position: fixed;
          inset: 0;
          z-index: -2;
          overflow: hidden;
          zoom: var(--grainient-zoom, 1);
          transform-origin: center center;
          animation: grainientRotate var(--grainient-warp-duration, 12s) linear infinite;
        }

        @keyframes grainientRotate {
          0% {
            transform: rotate(0deg) scale(var(--grainient-zoom, 1));
            background-position: 0% 0%;
          }
          25% {
            transform: rotate(${rotationDeg * 0.3}deg) scale(calc(var(--grainient-zoom, 1) + 0.01));
            background-position: 5% 3%;
          }
          50% {
            transform: rotate(${rotationDeg * 0.5}deg) scale(var(--grainient-zoom, 1));
            background-position: -3% 5%;
          }
          75% {
            transform: rotate(${rotationDeg * 0.2}deg) scale(calc(var(--grainient-zoom, 1) + 0.005));
            background-position: 2% -2%;
          }
          100% {
            transform: rotate(0deg) scale(var(--grainient-zoom, 1));
            background-position: 0% 0%;
          }
        }

        /* === Warp Effect === */
        .grainient-warp {
          position: absolute;
          inset: -10%;
          background: transparent;
          filter: url(#warp-${uid});
          animation: grainientWarp var(--grainient-warp-duration, 12s) ease-in-out infinite alternate;
          pointer-events: none;
          mix-blend-mode: overlay;
          opacity: 0;
        }

        @keyframes grainientWarp {
          0% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(
              calc(var(--warp-amp, 50) * -0.3px),
              calc(var(--warp-amp, 50) * 0.2px)
            ) scale(1.005);
          }
          66% {
            transform: translate(
              calc(var(--warp-amp, 50) * 0.2px),
              calc(var(--warp-amp, 50) * -0.3px)
            ) scale(0.995);
          }
          100% {
            transform: translate(0, 0) scale(1);
          }
        }

        /* === Grain Overlay === */
        .grainient-grain {
          position: fixed;
          inset: 0;
          z-index: -1;
          mix-blend-mode: overlay;
          background: transparent;
          pointer-events: none;
          animation: grainientFlicker 8s steps(1) infinite;
          will-change: opacity;
        }

        @keyframes grainientFlicker {
          0% { opacity: var(--grainient-grain-amount, 0.14); }
          25% { opacity: calc(var(--grainient-grain-amount, 0.14) * 1.2); }
          50% { opacity: var(--grainient-grain-amount, 0.14); }
          75% { opacity: calc(var(--grainient-grain-amount, 0.14) * 0.85); }
          100% { opacity: var(--grainient-grain-amount, 0.14); }
        }

        /* === Color Grading === */
        .grainient-grading {
          position: fixed;
          inset: 0;
          z-index: 9998;
          pointer-events: none;
          mix-blend-mode: normal;
          background: transparent;
          filter:
            contrast(var(--grainient-contrast, 1.5))
            saturate(var(--grainient-saturation, 2.5));
          opacity: 0.6;
        }

        /* === SVG Filters === */
        .grainient-svg-filters {
          position: fixed;
          top: -100%;
          left: -100%;
          width: 1px;
          height: 1px;
          pointer-events: none;
          z-index: -3;
        }
      `}</style>
    </>
  )
}