'use client'

import { useEffect, useRef, useState } from 'react'
import { FaGraduationCap } from 'react-icons/fa'
import { HiSparkles } from 'react-icons/hi'
import { EducationItem } from '@/types'

const educationData: EducationItem[] = [
  {
    year: '2024–2025',
    institution: 'Frameboxx 2.0',
    degree: 'Graphic Designing and Social Media Marketing',
  },
  {
    year: '2023–2026',
    institution: 'Delhi University',
    degree: 'BA English (Hons)',
  },
]

export default function Education(): JSX.Element {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className={`bg-gray-900/50 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-pink-500/20 shadow-2xl shadow-pink-500/10 hover:shadow-pink-500/30 transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ 
        transformStyle: 'preserve-3d',
        transition: 'opacity 0.6s ease-out, transform 0.6s ease-out'
      }}
    >
      <div className="flex items-center gap-3 mb-6 sm:mb-8">
        <div className="p-2 sm:p-3 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl">
          <FaGraduationCap className="text-2xl sm:text-3xl text-white" />
        </div>
        <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
          EDUCATION
        </h2>
        <HiSparkles className="text-pink-400 text-lg sm:text-xl animate-pulse" />
      </div>

      <div className="space-y-4 sm:space-y-6">
        {educationData.map((item: EducationItem, index: number) => (
          <div
            key={index}
            className={`relative pl-6 sm:pl-8 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
            style={{ 
              transformStyle: 'preserve-3d',
              transition: `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`
            }}
          >
            <div className="absolute -left-2 sm:-left-3 top-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 shadow-lg shadow-pink-500/50 animate-pulse" />
            
            {index < educationData.length - 1 && (
              <div className="absolute left-0 top-6 w-0.5 h-full bg-gradient-to-b from-pink-500/50 to-transparent" />
            )}
            
            <div className="bg-gray-800/50 backdrop-blur-sm p-4 sm:p-5 rounded-2xl border border-pink-500/10 hover:border-pink-500/30 transition-all duration-300">
              <p className="text-xs sm:text-sm font-bold text-pink-400 mb-2 flex items-center gap-2">
                <span className="animate-pulse">📅</span> {item.year}
              </p>
              <h3 className="font-playfair text-lg sm:text-xl font-bold text-white mb-2">
                {item.institution}
              </h3>
              <p className="text-gray-300 text-sm">
                {item.degree}
              </p>
              
              <div className="absolute -top-2 -right-2">
                <span className="text-xl sm:text-2xl">✨</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-pink-500/5 to-purple-500/5 pointer-events-none" />
    </section>
  )
}