'use client'

import { useEffect, useRef } from 'react'

export default function Footer(): JSX.Element {
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const createHeart = () => {
      if (!footerRef.current) return
      
      const heart = document.createElement('span')
      heart.textContent = '💜'
      heart.className = 'absolute text-xl sm:text-2xl pointer-events-none'
      heart.style.left = `${Math.random() * 100}%`
      heart.style.bottom = '0'
      heart.style.opacity = '0.8'
      footerRef.current.appendChild(heart)

      // Simple CSS animation
      heart.animate([
        { transform: 'translateY(0)', opacity: 0.8 },
        { transform: 'translateY(-100px)', opacity: 0 }
      ], {
        duration: 3000,
        easing: 'ease-out'
      }).onfinish = () => heart.remove()
    }

    const interval = setInterval(createHeart, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <footer
      ref={footerRef}
      className="relative py-8 sm:py-12 overflow-hidden"
      style={{ marginBottom: 0, paddingBottom: '2rem' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="w-24 sm:w-32 h-0.5 bg-gradient-to-r from-transparent via-pink-500 to-transparent mx-auto mb-6 sm:mb-8" />
          
          <p className="text-gray-400 font-light mb-3 sm:mb-4 text-sm sm:text-base">
            Designed with 💜 and a touch of magic
          </p>
          
          <p className="text-xl sm:text-2xl font-playfair text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 animate-pulse">
            © 2025 Muskan Nasim
          </p>
          
          <p className="text-gray-500 text-xs sm:text-sm mt-2">
            All Rights Reserved ✨
          </p>
          
          <div className="mt-4 sm:mt-6 flex justify-center gap-2 sm:gap-3">
            <span className="w-2 h-2 rounded-full bg-pink-400 animate-bounce" style={{ animationDelay: '0s' }} />
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '0.2s' }} />
            <span className="w-2 h-2 rounded-full bg-pink-400 animate-bounce" style={{ animationDelay: '0.4s' }} />
          </div>
        </div>
      </div>
    </footer>
  )
}