'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ThreeScene from '@/components/ThreeScene'
import RollingHeader from '@/components/Header' // ✅ Fixed: Changed from Header
import Hero from '@/components/Hero'
import Education from '@/components/Education'
import Skills from '@/components/Skills'
import Experience from '@/components/Experience'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Home() {
  const mainRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.refresh()
    }, mainRef)

    return () => ctx.revert()
  }, [])

  return (
    <>
      <ThreeScene />
      
      <main ref={mainRef} className="relative">
        <section className="min-h-screen relative z-10">
          <RollingHeader /> {/* ✅ Fixed: Changed from Header */}
          <Hero />
        </section>

        {/* Work Section - Add ID for scroll target */}
        <div id="work-section" className="relative z-20 bg-gradient-to-b from-transparent via-[#0a0a0f]/80 to-[#0a0a0f]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 xl:gap-12">
              <div className="lg:col-span-1 space-y-6 lg:space-y-8">
                <div className="fade-section">
                  <Education />
                </div>
                <div className="fade-section">
                  <Skills />
                </div>
              </div>
              
              <div className="lg:col-span-2 space-y-6 lg:space-y-8">
                <div className="fade-section">
                  <Experience />
                </div>
                <div className="fade-section">
                  <Contact />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <Footer />
      </main>
    </>
  )
}