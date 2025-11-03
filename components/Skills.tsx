'use client'

import { useEffect, useRef, useState } from 'react'
import { FaPalette, FaMagic } from 'react-icons/fa'
import { SkillItem } from '@/types'

const skillsData: SkillItem[] = [
  { name: 'Adobe Illustrator', level: 90 },
  { name: 'Adobe Photoshop', level: 90 },
  { name: 'Adobe InDesign', level: 80 },
  { name: 'Corel Draw', level: 70 },
  { name: 'Premiere Pro', level: 85 },
  { name: 'After Effects', level: 80 },
]

export default function Skills(): JSX.Element {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [animatedBars, setAnimatedBars] = useState<boolean[]>(new Array(skillsData.length).fill(false))

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          setTimeout(() => {
            setAnimatedBars(new Array(skillsData.length).fill(true))
          }, 100)
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
      className={`bg-gray-900/50 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-purple-500/20 shadow-2xl shadow-purple-500/10 hover:shadow-purple-500/30 transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ 
        transformStyle: 'preserve-3d',
        transition: 'opacity 0.6s ease-out, transform 0.6s ease-out 0.2s'
      }}
    >
      <div className="flex items-center gap-3 mb-6 sm:mb-8">
        <div className="p-2 sm:p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl animate-pulse">
          <FaPalette className="text-2xl sm:text-3xl text-white" />
        </div>
        <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
          SKILLS
        </h2>
        <FaMagic className="text-purple-400 text-lg sm:text-xl" />
      </div>

      <div className="space-y-5 sm:space-y-6">
        {skillsData.map((skill: SkillItem, index: number) => (
          <div key={index} className="skill-item relative">
            <div className="flex justify-between mb-2 sm:mb-3">
              <span className="text-white font-medium flex items-center gap-2 text-sm sm:text-base">
                <span className="text-pink-400">{'</>'}</span>
                {skill.name}
              </span>
              <span className="text-pink-400 font-bold text-base sm:text-lg">
                {animatedBars[index] ? skill.level : 0}%
              </span>
            </div>
            
            <div className="relative h-3 sm:h-4 bg-gray-800/50 rounded-full overflow-hidden backdrop-blur-sm border border-purple-500/20">
              <div 
                className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 rounded-full shadow-[0_0_20px_rgba(236,72,153,0.5)] transition-all duration-1000 ease-out relative"
                style={{ 
                  width: animatedBars[index] ? `${skill.level}%` : '0%',
                  transitionDelay: `${index * 100}ms`
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                
                <div className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2">
                  <span className="text-xs sm:text-sm">✨</span>
                </div>
              </div>
            </div>

            {index === 0 && (
              <div className="absolute -top-6 sm:-top-8 right-0 text-[10px] sm:text-xs text-pink-400 animate-bounce">
                👑 Top Skill
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500/5 to-pink-500/5 pointer-events-none" />
    </section>
  )
}