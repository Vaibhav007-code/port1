'use client'

import { useEffect } from 'react'

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    let currentScroll = 0
    let targetScroll = 0
    let ease = 0.1

    const isMobile = window.innerWidth < 768

    // Disable on mobile for better performance
    if (isMobile) return

    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor
    }

    const updateScroll = () => {
      targetScroll = window.pageYOffset

      currentScroll = lerp(currentScroll, targetScroll, ease)

      if (Math.abs(targetScroll - currentScroll) < 0.05) {
        currentScroll = targetScroll
      }

      document.documentElement.style.setProperty('--scroll-y', `${currentScroll}px`)

      requestAnimationFrame(updateScroll)
    }

    // Start smooth scroll
    requestAnimationFrame(updateScroll)

    return () => {
      document.documentElement.style.removeProperty('--scroll-y')
    }
  }, [])

  return <>{children}</>
}