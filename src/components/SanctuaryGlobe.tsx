import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Sphere, MeshDistortMaterial } from "@react-three/drei"
import * as THREE from "three"

function GlobeMesh() {
  const meshRef = useRef<THREE.Mesh>(null)
  const wireRef = useRef<THREE.LineSegments>(null)

  useFrame((_, delta) => {
    if (meshRef.current) meshRef.current.rotation.y += delta * 0.08
    if (wireRef.current) wireRef.current.rotation.y += delta * 0.08
  })

  const wireGeo = useMemo(() => {
    const geo = new THREE.SphereGeometry(1.6, 24, 16)
    const edges = new THREE.EdgesGeometry(geo)
    return edges
  }, [])

  return (
    <group>
      {/* Solid globe */}
      <Sphere ref={meshRef} args={[1.5, 64, 64]}>
        <MeshDistortMaterial
          color="#0a2e1a"
          emissive="#0d4a2a"
          emissiveIntensity={0.3}
          roughness={0.8}
          metalness={0.2}
          distort={0.15}
          speed={1.5}
        />
      </Sphere>

      {/* Wireframe overlay */}
      <lineSegments ref={wireRef} geometry={wireGeo}>
        <lineBasicMaterial
          color="#c8a84e"
          transparent
          opacity={0.12}
        />
      </lineSegments>

      {/* Atmosphere glow */}
      <Sphere args={[1.7, 32, 32]}>
        <meshBasicMaterial
          color="#c8a84e"
          transparent
          opacity={0.03}
          side={THREE.BackSide}
        />
      </Sphere>

      {/* Sanctuary markers */}
      {[0, 1.2, 2.5, 3.8, 5.1].map((offset, i) => {
        const phi = Math.acos(-0.3 + i * 0.25)
        const theta = offset
        const r = 1.55
        const x = r * Math.sin(phi) * Math.cos(theta)
        const y = r * Math.cos(phi)
        const z = r * Math.sin(phi) * Math.sin(theta)
        return (
          <mesh key={i} position={[x, y, z]}>
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshBasicMaterial color="#c8a84e" />
          </mesh>
        )
      })}
    </group>
  )
}

export function SanctuaryGlobe() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 45 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 3, 5]} intensity={0.8} color="#c8a84e" />
        <pointLight position={[-3, -2, 2]} intensity={0.3} color="#2d7a4f" />
        <GlobeMesh />
      </Canvas>
    </div>
  )
}
