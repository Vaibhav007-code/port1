'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import Image from 'next/image'

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const bioRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const imageInnerRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline()

      // Animate image first
      tl.from(imageRef.current, {
        scale: 0,
        rotation: 360,
        opacity: 0,
        duration: 1.5,
        ease: 'back.out(1.7)',
      })
      .from(titleRef.current, {
        y: 100,
        opacity: 0,
        rotationX: -90,
        duration: 1.2,
        ease: 'power4.out',
      }, '-=0.8')
      .from(bioRef.current?.children || [], {
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
      }, '-=0.5')

      // Floating animation for image
      gsap.to(imageRef.current, {
        y: -15,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  // Image tilt effect on mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageInnerRef.current) return
    
    const rect = imageInnerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    
    const tiltX = (y - centerY) / 10
    const tiltY = (centerX - x) / 10
    
    setTilt({ x: tiltX, y: tiltY })
    
    gsap.to(imageInnerRef.current, {
      rotationX: tiltX,
      rotationY: tiltY,
      duration: 0.5,
      ease: 'power2.out',
    })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
    gsap.to(imageInnerRef.current, {
      rotationX: 0,
      rotationY: 0,
      duration: 0.5,
      ease: 'power2.out',
    })
  }

  // Scroll to work section
  const scrollToWork = () => {
    const workSection = document.getElementById('work-section')
    if (workSection) {
      workSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div ref={containerRef} className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Image - Shows first on mobile */}
        <div ref={imageRef} className="relative order-1 lg:order-1">
          <div 
            className="relative w-48 h-48 sm:w-56 sm:h-56 lg:w-80 lg:h-80 mx-auto"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* Animated glow layers */}
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full blur-3xl opacity-50 animate-pulse" />
            
            <div 
              className="absolute -inset-4 bg-gradient-to-br from-cyan-400 to-pink-400 rounded-full blur-2xl opacity-30 animate-pulse" 
              style={{ animationDelay: '1s' }} 
            />
            
            {/* Image container with 3D tilt */}
            <div 
              ref={imageInnerRef}
              className="relative w-full h-full rounded-full overflow-hidden border-4 border-pink-400/40 shadow-2xl shadow-pink-500/50"
              style={{ 
                transformStyle: 'preserve-3d',
                perspective: '1000px'
              }}
            >
              <Image
                src="/image.jpg"
                alt="Muskan Nasim - Creative Director"
                fill
                sizes="(max-width: 640px) 192px, (max-width: 1024px) 224px, 320px"
                className="object-cover"
                style={{ transform: 'rotate(-70deg)' }}
                priority
                quality={95}
              />
              
              {/* Shine effect on hover */}
              <div 
                className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  transform: `translate(${tilt.y * 2}px, ${tilt.x * 2}px)`
                }}
              />
            </div>

            {/* Floating decorative elements */}
            <div className="absolute -top-3 -right-3 w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-pink-400/40 backdrop-blur-sm animate-bounce" 
                 style={{ animationDelay: '0.5s' }} 
            >
              <span className="absolute inset-0 flex items-center justify-center text-xs lg:text-sm">✨</span>
            </div>
            <div className="absolute -bottom-3 -left-3 w-5 h-5 lg:w-6 lg:h-6 rounded-full bg-purple-400/40 backdrop-blur-sm animate-bounce" 
                 style={{ animationDelay: '1s' }} 
            >
              <span className="absolute inset-0 flex items-center justify-center text-xs">💎</span>
            </div>
          </div>
        </div>

        {/* Bio - Shows second on mobile */}
        <div ref={bioRef} className="space-y-4 lg:space-y-6 text-center lg:text-left order-2 lg:order-2">
          <h1 ref={titleRef} className="font-playfair text-3xl sm:text-4xl lg:text-6xl font-bold">
            Hello, I&apos;m{' '}
            <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
              Muskan
            </span>
          </h1>
          
          <p className="text-gray-300 text-base lg:text-lg leading-relaxed">
            I specialize in{' '}
            <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
              Graphic Design
            </span>{' '}
            with a creative and detail-oriented approach, passionate about transforming ideas into visually stunning designs.
          </p>
          
          <p className="text-gray-400 text-sm lg:text-base leading-relaxed">
            Skilled in branding, digital design, and creating compelling visuals that communicate effectively and leave a lasting impression.
          </p>
          
          <div className="flex justify-center lg:justify-start mt-6 lg:mt-8">
            <button 
              onClick={scrollToWork}
              className="group relative px-6 lg:px-8 py-2.5 lg:py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full font-medium shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50 transition-all duration-300 overflow-hidden text-sm lg:text-base"
            >
              <span className="relative z-10">View My Work</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  )
}