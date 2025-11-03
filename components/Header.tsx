'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Header(): JSX.Element {
  const headerRef = useRef<HTMLElement>(null)
  const nameRef = useRef<HTMLHeadingElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const taglineRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline()

      // Animate header
      tl.from(headerRef.current, {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: 'power4.out',
      })

      // Animate name with split text
      if (nameRef.current) {
        const letters = nameRef.current.textContent?.split('') || []
        nameRef.current.innerHTML = letters
          .map(letter => `<span class="inline-block">${letter}</span>`)
          .join('')

        tl.from(nameRef.current.querySelectorAll('span'), {
          y: 50,
          opacity: 0,
          rotationX: -90,
          duration: 0.6,
          stagger: 0.05,
          ease: 'back.out(1.7)',
        }, '-=0.5')
      }

      // Animate title
      tl.from(titleRef.current, {
        scale: 0,
        opacity: 0,
        duration: 0.8,
        ease: 'back.out(1.7)',
      }, '-=0.3')

      // Animate tagline
      tl.from(taglineRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.6,
      }, '-=0.2')
    })

    return () => ctx.revert()
  }, [])

  return (
    <header
      ref={headerRef}
      className="relative z-20 py-8 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center relative">
          {/* Background decoration */}
          <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
            <div className="w-96 h-96 bg-gradient-to-br from-pink-500/10 to-purple-500/10 rounded-full blur-3xl" />
          </div>
          
          {/* Name */}
          <h1 
            ref={nameRef}
            className="font-playfair text-5xl sm:text-7xl lg:text-8xl font-bold relative"
            style={{
              background: 'linear-gradient(135deg, #ff6b9d, #c66cfd, #ff6b9d)',
              backgroundSize: '200% 200%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'gradient 3s ease infinite',
              letterSpacing: '-0.02em',
            }}
          >
            MUSKAN
          </h1>
          
          {/* Professional Title */}
          <div 
            ref={titleRef}
            className="mt-4 flex items-center justify-center gap-4"
          >
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-pink-400" />
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-light tracking-[0.2em] text-white/80 uppercase">
              Creative Director
            </h2>
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-purple-400" />
          </div>
          
          {/* Tagline */}
          <p 
            ref={taglineRef}
            className="mt-4 text-base sm:text-lg text-gray-400 font-light tracking-wide"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Transforming Ideas into{' '}
            <span className="text-pink-400 font-medium">Visual Poetry</span> •{' '}
            <span className="text-purple-400 font-medium">Brand Storyteller</span> •{' '}
            <span className="text-cyan-400 font-medium">Design Innovator</span>
          </p>
          
          {/* Animated dots */}
          <div className="mt-6 flex justify-center gap-2">
            <span className="w-1 h-1 rounded-full bg-pink-400 animate-pulse" />
            <span className="w-1 h-1 rounded-full bg-purple-400 animate-pulse" style={{ animationDelay: '0.2s' }} />
            <span className="w-1 h-1 rounded-full bg-cyan-400 animate-pulse" style={{ animationDelay: '0.4s' }} />
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </header>
  )
}