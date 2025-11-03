'use client'

import { useEffect, useRef, useState } from 'react'
import { FaPhone, FaEnvelope, FaLinkedin, FaHeart } from 'react-icons/fa'
import type { ContactItem } from '@/types'

const contactData: ContactItem[] = [
  {
    icon: FaPhone,
    label: 'Phone',
    value: '+91 7530030130',
    link: 'tel:+917530030130',
  },
  {
    icon: FaEnvelope,
    label: 'Email',
    value: 'nasimmuskan10@gmail.com',
    link: 'mailto:nasimmuskan10@gmail.com',
  },
  {
    icon: FaLinkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/muskan-nasim',
    link: 'https://linkedin.com/in/muskan-nasim-344747277',
  },
]

export default function Contact(): JSX.Element {
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
      className={`bg-gray-900/50 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-purple-500/20 shadow-2xl shadow-purple-500/10 hover:shadow-purple-500/30 transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ 
        transition: 'opacity 0.6s ease-out 0.2s, transform 0.6s ease-out 0.2s'
      }}
    >
      <div className="flex items-center gap-3 mb-6 sm:mb-8">
        <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
          LET&apos;S CONNECT
        </h2>
        <FaHeart className="text-pink-400 animate-pulse" />
      </div>

      <div className="space-y-3 sm:space-y-4">
        {contactData.map((item: ContactItem, index: number) => {
          const Icon = item.icon
          return (
            <a
              key={index}
              href={item.link}
              target={item.label === 'LinkedIn' ? '_blank' : undefined}
              rel={item.label === 'LinkedIn' ? 'noopener noreferrer' : undefined}
              className={`group relative flex items-center gap-3 sm:gap-4 p-4 sm:p-5 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-pink-500/10 hover:border-pink-500/30 transition-all duration-300 overflow-hidden ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}
              style={{ 
                transition: `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s, border-color 0.3s`
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="contact-icon relative">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white text-lg sm:text-xl shadow-lg shadow-pink-500/30 group-hover:shadow-pink-500/50 transition-all duration-300">
                  <Icon />
                </div>
                
                <div className="absolute inset-0 rounded-full bg-pink-500/30 animate-ping" />
              </div>
              
              <div className="flex-1 relative z-10">
                <p className="text-[10px] sm:text-xs text-pink-400 font-medium mb-1 uppercase tracking-wider">
                  {item.label}
                </p>
                <p className="text-white font-medium text-xs sm:text-base">
                  {item.value}
                </p>
              </div>
              
              <div className="text-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 relative z-10">
                →
              </div>
              
              <div className="absolute -top-2 -right-2 text-lg sm:text-xl opacity-50 group-hover:opacity-100 transition-opacity duration-300">
                ✨
              </div>
            </a>
          )
        })}
      </div>

      <div className="mt-6 sm:mt-8 text-center">
        <p className="text-gray-400 mb-4 text-sm sm:text-base">Ready to create something amazing together?</p>
        <button className="px-6 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full font-medium shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50 transition-all duration-300 text-sm sm:text-base">
          Let&apos;s Work Together 💜
        </button>
      </div>
    </section>
  )
}