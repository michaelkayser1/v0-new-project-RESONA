"use client"

import { useEffect, useRef, useState } from "react"
import * as THREE from "three"

interface CollectiveFieldProps {
  userPhase: string
  userAlignment: number
}

interface FieldParticle {
  id: string
  phase: string
  alignment: number
  position: THREE.Vector3
  velocity: THREE.Vector3
}

export default function CollectiveField({ userPhase, userAlignment }: CollectiveFieldProps) {
  const mountRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene>()
  const rendererRef = useRef<THREE.WebGLRenderer>()
  const particlesRef = useRef<FieldParticle[]>([])
  const [isActive, setIsActive] = useState(false)

  const generateMockUsers = (count: number): FieldParticle[] => {
    const phases = ["Presence", "Coiling Right", "Zero Point", "Unfolding Left"]
    return Array.from({ length: count }, (_, i) => ({
      id: `user-${i}`,
      phase: phases[Math.floor(Math.random() * phases.length)],
      alignment: Math.random(),
      position: new THREE.Vector3((Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20),
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * 0.1,
        (Math.random() - 0.5) * 0.1,
        (Math.random() - 0.5) * 0.1,
      ),
    }))
  }

  const getPhaseColor = (phase: string) => {
    const colors = {
      Presence: 0x4a148c,
      "Coiling Right": 0x8e24aa,
      "Zero Point": 0xffffff,
      "Unfolding Left": 0xffc107,
    }
    return colors[phase as keyof typeof colors] || 0x666666
  }

  useEffect(() => {
    if (!mountRef.current || !isActive) return

    // Initialize particles
    particlesRef.current = generateMockUsers(50)

    // Scene setup
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x000011)

    const camera = new THREE.PerspectiveCamera(75, 600 / 400, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ antialias: true })

    renderer.setSize(600, 400)
    mountRef.current.appendChild(renderer.domElement)

    // Create particle system
    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(particlesRef.current.length * 3)
    const colors = new Float32Array(particlesRef.current.length * 3)
    const sizes = new Float32Array(particlesRef.current.length)

    particlesRef.current.forEach((particle, i) => {
      positions[i * 3] = particle.position.x
      positions[i * 3 + 1] = particle.position.y
      positions[i * 3 + 2] = particle.position.z

      const color = new THREE.Color(getPhaseColor(particle.phase))
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b

      sizes[i] = particle.alignment * 10 + 2
    })

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3))
    geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1))

    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
      },
      vertexShader: `
        attribute float size;
        varying vec3 vColor;
        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        void main() {
          float r = distance(gl_PointCoord, vec2(0.5, 0.5));
          if (r > 0.5) discard;
          gl_FragColor = vec4(vColor, 1.0 - r * 2.0);
        }
      `,
      transparent: true,
      vertexColors: true,
    })

    const points = new THREE.Points(geometry, material)
    scene.add(points)

    camera.position.z = 30

    // Store references
    sceneRef.current = scene
    rendererRef.current = renderer

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)

      // Update particle positions (gravitational attraction between similar phases)
      particlesRef.current.forEach((particle, i) => {
        // Find nearby particles with similar phase
        const nearby = particlesRef.current.filter(
          (other) =>
            other.id !== particle.id &&
            other.phase === particle.phase &&
            particle.position.distanceTo(other.position) < 5,
        )

        // Apply gentle attraction
        nearby.forEach((other) => {
          const direction = new THREE.Vector3()
            .subVectors(other.position, particle.position)
            .normalize()
            .multiplyScalar(0.001)
          particle.velocity.add(direction)
        })

        // Update position
        particle.position.add(particle.velocity)
        particle.velocity.multiplyScalar(0.99) // Damping

        // Update geometry
        positions[i * 3] = particle.position.x
        positions[i * 3 + 1] = particle.position.y
        positions[i * 3 + 2] = particle.position.z
      })

      geometry.attributes.position.needsUpdate = true
      material.uniforms.time.value = Date.now() * 0.001

      renderer.render(scene, camera)
    }

    animate()

    return () => {
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement)
      }
      renderer.dispose()
      geometry.dispose()
      material.dispose()
    }
  }, [isActive])

  const sendCoherenceWave = () => {
    // Simulate sending a wave of coherence through the field
    if (particlesRef.current.length > 0) {
      particlesRef.current.forEach((particle) => {
        if (particle.alignment < 0.5) {
          particle.alignment = Math.min(1, particle.alignment + 0.1)
        }
      })
    }
  }

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-medium">Collective Field View</h3>
        <p className="text-sm text-gray-600">Anonymous visualization of shared resonance patterns</p>
      </div>

      {!isActive ? (
        <div className="text-center py-8">
          <button
            onClick={() => setIsActive(true)}
            className="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg"
          >
            Enter Collective Field
          </button>
        </div>
      ) : (
        <>
          <div
            ref={mountRef}
            className="border border-gray-200 rounded-lg overflow-hidden mx-auto"
            style={{ width: 600, height: 400 }}
          />

          <div className="flex justify-between items-center">
            <button
              onClick={() => setIsActive(false)}
              className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md text-sm"
            >
              Exit Field View
            </button>

            <button
              onClick={sendCoherenceWave}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-sm"
            >
              Send Coherence Wave
            </button>
          </div>

          <div className="text-xs text-gray-500 text-center">
            <div>
              Your phase: <span className="font-medium">{userPhase}</span>
            </div>
            <div>Points of light represent anonymous users in similar phases</div>
            <div>Similar phases naturally gravitate toward each other</div>
          </div>
        </>
      )}
    </div>
  )
}
