"use client"

import { useEffect, useRef, useState } from "react"
import * as THREE from "three"

interface PhaseSphereProps {
  phase: string
  wobble: number
  alignment: number
  flipPotential: boolean
}

export default function PhaseSphere({ phase, wobble, alignment, flipPotential }: PhaseSphereProps) {
  const mountRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene>()
  const rendererRef = useRef<THREE.WebGLRenderer>()
  const sphereRef = useRef<THREE.Mesh>()
  const [isInteracting, setIsInteracting] = useState(false)

  const getPhaseColor = (phaseName: string) => {
    const colors = {
      Presence: new THREE.Color(0x4a148c), // Deep indigo
      "Coiling Right": new THREE.Color(0x8e24aa), // Crimson-violet
      "Zero Point": new THREE.Color(0xffffff), // Pure white
      "Unfolding Left": new THREE.Color(0xffc107), // Gold-cyan
    }
    return colors[phaseName as keyof typeof colors] || new THREE.Color(0x666666)
  }

  useEffect(() => {
    if (!mountRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, 400 / 400, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })

    renderer.setSize(400, 400)
    renderer.setClearColor(0x000000, 0)
    mountRef.current.appendChild(renderer.domElement)

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6)
    scene.add(ambientLight)
    const pointLight = new THREE.PointLight(0xffffff, 1, 100)
    pointLight.position.set(5, 5, 5)
    scene.add(pointLight)

    // Create sphere geometry
    const geometry =
      phase === "Zero Point" ? new THREE.TorusGeometry(1.2, 0.4, 16, 100) : new THREE.SphereGeometry(1.5, 64, 64)

    // Create material with wobble-responsive properties
    const material = new THREE.MeshPhongMaterial({
      color: getPhaseColor(phase),
      transparent: true,
      opacity: phase === "Zero Point" ? 0.3 : 0.8,
      shininess: 100 - wobble * 50,
    })

    const sphere = new THREE.Mesh(geometry, material)
    scene.add(sphere)

    camera.position.z = 4

    // Store references
    sceneRef.current = scene
    rendererRef.current = renderer
    sphereRef.current = sphere

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)

      if (sphereRef.current) {
        // Rotation based on phase
        const rotationSpeed = alignment * 0.01
        sphereRef.current.rotation.y += rotationSpeed

        // Wobble effect on geometry
        if (wobble > 0.3) {
          const time = Date.now() * 0.001
          const wobbleIntensity = wobble * 0.2
          sphereRef.current.scale.setScalar(1 + Math.sin(time * 5) * wobbleIntensity)
        }

        // Flip potential glow
        if (flipPotential) {
          const glowIntensity = Math.sin(Date.now() * 0.005) * 0.5 + 0.5
          material.emissive.setScalar(glowIntensity * 0.3)
        }
      }

      renderer.render(scene, camera)
    }

    animate()

    // Interaction handlers
    const handleMouseDown = () => setIsInteracting(true)
    const handleMouseUp = () => setIsInteracting(false)
    const handleMouseMove = (event: MouseEvent) => {
      if (isInteracting && sphereRef.current) {
        const resistance = phase === "Coiling Right" ? 0.5 : 1.0
        sphereRef.current.rotation.y += event.movementX * 0.01 * resistance
        sphereRef.current.rotation.x += event.movementY * 0.01 * resistance
      }
    }

    renderer.domElement.addEventListener("mousedown", handleMouseDown)
    renderer.domElement.addEventListener("mouseup", handleMouseUp)
    renderer.domElement.addEventListener("mousemove", handleMouseMove)

    return () => {
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement)
      }
      renderer.dispose()
      geometry.dispose()
      material.dispose()
    }
  }, [phase, wobble, alignment, flipPotential, isInteracting])

  return (
    <div className="flex flex-col items-center space-y-4">
      <div
        ref={mountRef}
        className="border border-gray-200 rounded-lg overflow-hidden cursor-grab active:cursor-grabbing"
        style={{ width: 400, height: 400 }}
      />
      <div className="text-center text-sm text-gray-600">
        <div className="font-medium">{phase} Phase</div>
        <div>
          Wobble: {Math.round(wobble * 100)}% | Alignment: {Math.round(alignment * 100)}%
        </div>
        {flipPotential && <div className="text-yellow-600 font-medium">⚡ Flip Potential Active</div>}
      </div>
    </div>
  )
}
