import { IconType } from 'react-icons'

export interface EducationItem {
  year: string
  institution: string
  degree: string
}

export interface SkillItem {
  name: string
  level: number
}

export interface ExperienceItem {
  year: string
  company: string
  role: string
  description: string
}

export interface ContactItem {
  icon: IconType
  label: string
  value: string
  link: string
}

export interface AnimationVariants {
  hidden: {
    opacity: number
    y?: number
    x?: number
    scale?: number
  }
  visible: {
    opacity: number
    y?: number
    x?: number
    scale?: number
    transition?: {
      duration: number
      delay?: number
    }
  }
}