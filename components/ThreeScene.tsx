'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ThreeScene() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 })

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    scene.fog = new THREE.Fog(0x0a0a0f, 5, 40)
    
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.set(0, 0, 15)

    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true,
      powerPreference: "high-performance"
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    containerRef.current.appendChild(renderer.domElement)

    // Main group for all elements
    const mainGroup = new THREE.Group()
    const shapes: THREE.Mesh[] = []
    const interactiveShapes: THREE.Mesh[] = []

    // Designer color palette
    const colors = {
      pink: 0xff6b9d,
      purple: 0xc66cfd,
      cyan: 0x48dbfb,
      yellow: 0xfeca57,
      blue: 0x54a0ff,
      lightPink: 0xff9ff3,
    }

    // 1. Create Large Geometric Shapes (Very Noticeable)
    const createGeometricShape = (type: number, color: number, size: number) => {
      let geometry
      
      switch(type) {
        case 0:
          geometry = new THREE.IcosahedronGeometry(size, 1)
          break
        case 1:
          geometry = new THREE.OctahedronGeometry(size, 0)
          break
        case 2:
          geometry = new THREE.TorusGeometry(size, size * 0.4, 16, 32)
          break
        case 3:
          geometry = new THREE.TetrahedronGeometry(size, 0)
          break
        default:
          geometry = new THREE.DodecahedronGeometry(size, 0)
      }
      
      const material = new THREE.MeshPhysicalMaterial({
        color: color,
        metalness: 0.9,
        roughness: 0.1,
        clearcoat: 1,
        clearcoatRoughness: 0,
        transparent: true,
        opacity: 0.7,
        wireframe: Math.random() > 0.6,
        side: THREE.DoubleSide,
      })
      
      return new THREE.Mesh(geometry, material)
    }

    // Add 12 large interactive shapes
    const colorArray = Object.values(colors)
    for (let i = 0; i < 12; i++) {
      const shape = createGeometricShape(
        Math.floor(Math.random() * 5),
        colorArray[Math.floor(Math.random() * colorArray.length)],
        1.5 + Math.random() * 2
      )
      
      shape.position.set(
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 25,
        (Math.random() - 0.5) * 20 - 10
      )
      
      shape.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      )
      
      shape.userData = {
        originalPosition: shape.position.clone(),
        floatSpeed: 0.5 + Math.random() * 0.5,
        rotationSpeed: (Math.random() - 0.5) * 0.03,
        mouseInfluence: 2 + Math.random() * 3,
      }
      
      shapes.push(shape)
      interactiveShapes.push(shape)
      mainGroup.add(shape)
    }

    // 2. Create Floating Rings (Orbital elements)
    for (let i = 0; i < 8; i++) {
      const ringGeometry = new THREE.TorusGeometry(2 + i * 0.5, 0.1, 16, 50)
      const ringMaterial = new THREE.MeshPhysicalMaterial({
        color: colorArray[i % colorArray.length],
        metalness: 0.8,
        roughness: 0.2,
        transparent: true,
        opacity: 0.4,
        side: THREE.DoubleSide,
      })
      
      const ring = new THREE.Mesh(ringGeometry, ringMaterial)
      ring.position.set(0, 0, -15 - i * 2)
      ring.rotation.x = Math.PI / 2
      
      ring.userData = {
        rotationSpeed: 0.001 + i * 0.0002,
        mouseInfluence: 1,
      }
      
      shapes.push(ring)
      mainGroup.add(ring)
    }

    // 3. Create Spiraling Lines
    for (let i = 0; i < 5; i++) {
      const points = []
      const radius = 5 + i * 2
      
      for (let j = 0; j < 100; j++) {
        const angle = (j / 100) * Math.PI * 4
        const x = Math.cos(angle) * radius
        const y = (j / 100) * 20 - 10
        const z = Math.sin(angle) * radius
        points.push(new THREE.Vector3(x, y, z))
      }
      
      const lineGeometry = new THREE.BufferGeometry().setFromPoints(points)
      const lineMaterial = new THREE.LineBasicMaterial({
        color: colorArray[i % colorArray.length],
        transparent: true,
        opacity: 0.3,
      })
      
      const line = new THREE.Line(lineGeometry, lineMaterial)
      line.position.z = -20
      
      line.userData = {
        rotationSpeed: 0.002,
        mouseInfluence: 0.5,
      }
      
      shapes.push(line as any)
      mainGroup.add(line)
    }

    // 4. Create Particle Field with Size Variation
    const particleCount = 2000
    const particlesGeometry = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)
    const particleColors = new Float32Array(particleCount * 3)
    const sizes = new Float32Array(particleCount)

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      
      // Create galaxy-like distribution
      const radius = Math.random() * 40
      const angle = Math.random() * Math.PI * 2
      const height = (Math.random() - 0.5) * 40
      
      positions[i3] = Math.cos(angle) * radius
      positions[i3 + 1] = height
      positions[i3 + 2] = Math.sin(angle) * radius - 20

      const color = new THREE.Color(colorArray[Math.floor(Math.random() * colorArray.length)])
      particleColors[i3] = color.r
      particleColors[i3 + 1] = color.g
      particleColors[i3 + 2] = color.b

      sizes[i] = Math.random() * 0.5 + 0.1
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3))
    particlesGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.15,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true,
    })

    const particles = new THREE.Points(particlesGeometry, particlesMaterial)
    mainGroup.add(particles)

    scene.add(mainGroup)

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3)
    scene.add(ambientLight)

    const pointLight1 = new THREE.PointLight(colors.pink, 2, 100)
    pointLight1.position.set(15, 15, 10)
    scene.add(pointLight1)

    const pointLight2 = new THREE.PointLight(colors.cyan, 2, 100)
    pointLight2.position.set(-15, -15, 10)
    scene.add(pointLight2)

    // Raycaster for mouse interaction
    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()

    // Enhanced mouse movement
    const handleMouseMove = (event: MouseEvent) => {
      // Normalized mouse coordinates
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
      
      mouseRef.current.targetX = mouse.x
      mouseRef.current.targetY = mouse.y

      // Update raycaster
      raycaster.setFromCamera(mouse, camera)
      const intersects = raycaster.intersectObjects(interactiveShapes)

      // Reset all shapes
      interactiveShapes.forEach(shape => {
        gsap.to(shape.scale, {
          x: 1,
          y: 1,
          z: 1,
          duration: 0.5,
          ease: "power2.out"
        })
      })

      // Highlight intersected shapes
      if (intersects.length > 0) {
        intersects.forEach(intersect => {
          gsap.to(intersect.object.scale, {
            x: 1.5,
            y: 1.5,
            z: 1.5,
            duration: 0.3,
            ease: "back.out(1.7)"
          })
          
          gsap.to(intersect.object.rotation, {
            x: "+=1",
            y: "+=1",
            duration: 0.5,
          })
        })
      }
    }

    // Scroll animation
    ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.5,
      onUpdate: (self) => {
        const progress = self.progress
        
        mainGroup.rotation.y = progress * Math.PI * 0.3
        mainGroup.position.z = progress * 15
        
        particles.rotation.y = progress * Math.PI * 0.5
      }
    })

    window.addEventListener('mousemove', handleMouseMove)

    // Animation loop
    const clock = new THREE.Clock()
    
    const animate = () => {
      const elapsedTime = clock.getElapsedTime()
      
      // Smooth mouse tracking
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05

      // Camera follows mouse with more intensity
      camera.position.x = mouseRef.current.x * 5
      camera.position.y = mouseRef.current.y * 5
      camera.lookAt(0, 0, 0)

      // Rotate entire scene based on mouse
      mainGroup.rotation.x += (mouseRef.current.y * 0.3 - mainGroup.rotation.x) * 0.05
      mainGroup.rotation.y += (mouseRef.current.x * 0.5 - mainGroup.rotation.y) * 0.05

      // Animate particles
      particles.rotation.y += 0.001
      particles.rotation.x = Math.sin(elapsedTime * 0.3) * 0.1

      // Animate shapes
      shapes.forEach((shape, i) => {
        // Floating animation
        if (shape.userData.floatSpeed) {
          shape.position.y = shape.userData.originalPosition.y + 
            Math.sin(elapsedTime * shape.userData.floatSpeed + i) * 2
        }
        
        // Rotation
        shape.rotation.x += shape.userData.rotationSpeed || 0.005
        shape.rotation.y += shape.userData.rotationSpeed || 0.005
        
        // Mouse influence on position
        if (shape.userData.mouseInfluence && shape.userData.originalPosition) {
          const influence = shape.userData.mouseInfluence
          shape.position.x = shape.userData.originalPosition.x + mouseRef.current.x * influence
          shape.position.y += mouseRef.current.y * influence * 0.5
        }
      })

      // Animate lights
      pointLight1.position.x = Math.sin(elapsedTime) * 15
      pointLight1.position.z = Math.cos(elapsedTime) * 15
      
      pointLight2.position.x = Math.cos(elapsedTime) * 15
      pointLight2.position.z = Math.sin(elapsedTime) * 15

      renderer.render(scene, camera)
      requestAnimationFrame(animate)
    }

    animate()

    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      ScrollTrigger.getAll().forEach(st => st.kill())
      
      if (containerRef.current?.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement)
      }
      
      renderer.dispose()
    }
  }, [])

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.8 }}
    />
  )
}