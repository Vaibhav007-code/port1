'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { gsap } from 'gsap'

export default function ThreeBackground(): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (!containerRef.current) return

    // Check if mobile
    const isMobile = window.innerWidth < 768

    // Scene setup
    const scene = new THREE.Scene()
    scene.fog = new THREE.Fog(0x0a0a0f, 1, 15)
    
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: !isMobile, // Disable antialiasing on mobile
      powerPreference: "high-performance"
    })

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    containerRef.current.appendChild(renderer.domElement)

    // Reduce elements on mobile
    const crystalCount = isMobile ? 5 : 15
    const orbCount = isMobile ? 3 : 8
    const particleCount = isMobile ? 100 : 300

    // Create floating crystals
    const crystals: THREE.Mesh[] = []
    const crystalGeometry = new THREE.OctahedronGeometry(0.3, 0)
    
    for (let i = 0; i < crystalCount; i++) {
      const material = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color().setHSL(0.85 + Math.random() * 0.15, 1, 0.5),
        metalness: 0.5,
        roughness: 0.2,
        transparent: true,
        opacity: 0.6,
      })
      
      const crystal = new THREE.Mesh(crystalGeometry, material)
      crystal.position.set(
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15
      )
      crystal.scale.setScalar(Math.random() * 1 + 0.5)
      
      crystals.push(crystal)
      scene.add(crystal)
    }

    // Create glowing orbs
    const orbs: THREE.Mesh[] = []
    for (let i = 0; i < orbCount; i++) {
      const orbGeometry = new THREE.SphereGeometry(0.2, 16, 16)
      const orbMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(0.9, 1, 0.6),
        transparent: true,
        opacity: 0.4,
      })
      
      const orb = new THREE.Mesh(orbGeometry, orbMaterial)
      orb.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
      )
      
      orbs.push(orb)
      scene.add(orb)
    }

    // Create particle field
    const particlesGeometry = new THREE.BufferGeometry()
    const posArray = new Float32Array(particleCount * 3)
    const colorsArray = new Float32Array(particleCount * 3)
    
    for (let i = 0; i < particleCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 30
      posArray[i + 1] = (Math.random() - 0.5) * 30
      posArray[i + 2] = (Math.random() - 0.5) * 30
      
      const color = new THREE.Color().setHSL(0.85 + Math.random() * 0.15, 1, 0.5)
      colorsArray[i] = color.r
      colorsArray[i + 1] = color.g
      colorsArray[i + 2] = color.b
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3))
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorsArray, 3))
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: isMobile ? 0.03 : 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    })
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particlesMesh)

    // Add lights
    const ambientLight = new THREE.AmbientLight(0x222222, 0.5)
    scene.add(ambientLight)

    const light1 = new THREE.PointLight(0xff00ff, 1.5, 20)
    light1.position.set(5, 5, 5)
    scene.add(light1)

    const light2 = new THREE.PointLight(0x00ffff, 1.5, 20)
    light2.position.set(-5, -5, -5)
    scene.add(light2)

    camera.position.z = 10

    // Simplified GSAP Animations
    if (!isMobile) {
      crystals.forEach((crystal, index) => {
        gsap.to(crystal.rotation, {
          x: Math.PI * 2,
          y: Math.PI * 2,
          duration: 20 + index * 2,
          repeat: -1,
          ease: 'none',
        })
      })
    }

    // Mouse movement (disabled on mobile)
    let mouseEnabled = !isMobile
    
    const handleMouseMove = (event: MouseEvent): void => {
      if (!mouseEnabled) return
      
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1
    }

    window.addEventListener('mousemove', handleMouseMove)

    // Animation loop
    let animationFrameId: number
    const clock = new THREE.Clock()
    let lastTime = 0
    const targetFPS = isMobile ? 30 : 60
    const frameDelay = 1000 / targetFPS

    const animate = (): void => {
      const currentTime = Date.now()
      const elapsed = currentTime - lastTime

      if (elapsed > frameDelay) {
        lastTime = currentTime - (elapsed % frameDelay)
        
        const elapsedTime = clock.getElapsedTime()

        // Slow rotation
        particlesMesh.rotation.y = elapsedTime * 0.02
        particlesMesh.rotation.x = elapsedTime * 0.01

        // Rotate crystals
        crystals.forEach((crystal) => {
          crystal.rotation.y += 0.001
        })

        // Simple camera movement
        if (mouseEnabled) {
          camera.position.x += (mouseRef.current.x * 2 - camera.position.x) * 0.05
          camera.position.y += (mouseRef.current.y * 2 - camera.position.y) * 0.05
        }

        camera.lookAt(0, 0, 0)
        renderer.render(scene, camera)
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    // Handle resize
    const handleResize = (): void => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
      
      gsap.killTweensOf(crystals)
      
      if (containerRef.current && containerRef.current.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement)
      }
      
      crystalGeometry.dispose()
      particlesGeometry.dispose()
      particlesMaterial.dispose()
      
      crystals.forEach(crystal => {
        (crystal.material as THREE.Material).dispose()
      })
      
      orbs.forEach(orb => {
        (orb.material as THREE.Material).dispose()
        ;(orb.geometry as THREE.BufferGeometry).dispose()
      })
      
      renderer.dispose()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed top-0 left-0 w-full h-full -z-10 opacity-60"
    />
  )
}