'use client'

import { useEffect, useRef, useState } from 'react'
import { FaBriefcase, FaStar, FaRocket } from 'react-icons/fa'
import { ExperienceItem } from '@/types'

const experienceData: ExperienceItem[] = [
  {
    year: '2024–2025',
    company: 'Eras Fragrances',
    role: 'Graphic Designer',
    description:
      'Handling social media posts, designing digital and print media such as product packaging, promotional banners, and web content.',
  },
  {
    year: '2024',
    company: 'Freelance',
    role: 'Graphic Designer',
    description:
      'Created a series of digital illustrated t-shirt prints with modern designs reflecting a unique blend of minimalism and vibrant artistry.',
  },
]

export default function Experience(): JSX.Element {
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
        transition: 'opacity 0.6s ease-out, transform 0.6s ease-out'
      }}
    >
      <div className="flex items-center gap-3 mb-8 sm:mb-10">
        <div className="p-2 sm:p-3 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl">
          <FaBriefcase className="text-2xl sm:text-3xl text-white" />
        </div>
        <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
          EXPERIENCE
        </h2>
        <FaRocket className="text-pink-400 animate-pulse" />
      </div>

      <div className="space-y-6 sm:space-y-8">
        {/* My Work card */}
        <div
          className={`relative ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
          style={{ transition: 'opacity 0.6s ease-out, transform 0.6s ease-out' }}
        >
          <a
            href="https://drive.google.com/drive/folders/1R9BBYE1ShOa-WHdMnvmDnI9IgwGxzpba"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="My Work (Google Drive folder)"
            className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500/40 rounded-2xl"
          >
            <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-2xl p-5 sm:p-6 border border-purple-500/20 overflow-hidden group hover:border-pink-500/40 transition-colors">
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-xs sm:text-sm font-bold text-pink-400 mb-2 flex items-center gap-2">
                      <span className="animate-pulse">🚀</span> Explore
                    </p>
                    <h3 className="font-playfair text-xl sm:text-2xl font-bold text-white mb-1">
                      My Work
                    </h3>
                    <p className="text-purple-400 font-medium flex items-center gap-2 text-sm sm:text-base">
                      <FaStar className="text-yellow-400" />
                      CLICK HERE
                    </p>
                  </div>
                  <div className="text-3xl sm:text-4xl opacity-20 group-hover:opacity-100 transition-opacity duration-300">
                    🗂️
                  </div>
                </div>

                <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                  Click to open selected projects, designs, and deliverables.
                </p>
              </div>

              <div className="absolute -top-2 -right-2 text-xl sm:text-2xl">
                ✨
              </div>
            </div>
          </a>
        </div>

        {experienceData.map((item: ExperienceItem, index: number) => (
          <div
            key={index}
            className={`relative ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
            style={{ 
              transition: `opacity 0.6s ease-out ${index * 0.2}s, transform 0.6s ease-out ${index * 0.2}s`
            }}
          >
            <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-2xl p-5 sm:p-6 border border-purple-500/20 overflow-hidden group">
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-xs sm:text-sm font-bold text-pink-400 mb-2 flex items-center gap-2">
                      <span className="animate-pulse">🚀</span> {item.year}
                    </p>
                    <h3 className="font-playfair text-xl sm:text-2xl font-bold text-white mb-1">
                      {item.company}
                    </h3>
                    <p className="text-purple-400 font-medium flex items-center gap-2 text-sm sm:text-base">
                      <FaStar className="text-yellow-400" />
                      {item.role}
                    </p>
                  </div>
                  
                  <div className="text-3xl sm:text-4xl opacity-20 group-hover:opacity-100 transition-opacity duration-300">
                    {index === 0 ? '💼' : '🎨'}
                  </div>
                </div>
                
                <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                  {item.description}
                </p>
              </div>
              
              <div className="absolute -top-2 -right-2 text-xl sm:text-2xl">
                ✨
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}