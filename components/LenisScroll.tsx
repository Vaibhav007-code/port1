'use client'

import { useEffect, useRef } from 'react'
import Lenis from '@studio-freight/lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function LenisScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)
  const tickerRef = useRef<((time: number) => void) | null>(null)

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const lenis = new Lenis({
      duration: isTouch ? 0.9 : 1.1,
      easing: isTouch ? (t: number) => t : (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: !reduceMotion,
      wheelMultiplier: 1,
      touchMultiplier: isTouch ? 0.9 : 1.2,
      autoResize: true,
      infinite: false,
    })

    lenisRef.current = lenis

    // Keep ScrollTrigger in sync
    lenis.on('scroll', () => ScrollTrigger.update())

    // Stable ticker callback so we can remove it on cleanup
    const ticker = (time: number) => {
      lenis.raf(time * 1000)
    }
    tickerRef.current = ticker
    gsap.ticker.add(ticker)
    gsap.ticker.lagSmoothing(0)

    // Refresh after the first frame
    requestAnimationFrame(() => {
      ScrollTrigger.refresh()
    })

    return () => {
      if (tickerRef.current) gsap.ticker.remove(tickerRef.current)
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}