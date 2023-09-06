"use client"
import React from 'react'
import IconLinkedIn from '@/public/icons/icon-linkedin.svg'
import IconInstagram from '@/public/icons/icon-instagram.svg'
import styles from './social_icons.module.scss'
import { useThemeContext } from '@/context/theme'

const SocialIconsBlock = ({ socials, style, color }: { socials: any, style?: any, color?: any }) => {
  const { contactActive, setContactActive, cursorType, cursorChangeHandler } = useThemeContext();

  const getSocialIcon = (t: any) => {
    switch (t.type) {
      case 'linkedin':
        return <span className='absolute w-full h-full left-0 top-0 flex items-center justify-center' onMouseEnter={() => cursorChangeHandler("linkedin")} onMouseLeave={() => cursorChangeHandler("page")}><IconLinkedIn /></span>;
      case 'instagram':
        return <span className='absolute w-full h-full left-0 top-0 flex items-center justify-center' onMouseEnter={() => cursorChangeHandler("instagram")} onMouseLeave={() => cursorChangeHandler("page")}><IconInstagram /></span>;
    }
  }

  const getTheme = () => {
    let theme = 'text-blue'
    if(style === 'simple') {
      theme = 'text-white'
    }
    if(color) {
      theme = color
    }
    return theme
  }

  return (
    <div className={`${styles.root}`}>
      <div className="flex items-left gap-20 relative w-auto">
        {socials.map((t: any) => (
          <div key={`${t.type}`} className={`${style === 'simple' ? styles.iconsimple : styles.icon} relative social-icon-wrap flex items-center justify-center`}>
            <a href={t.url} className={`absolute w-full h-full left-0 top-0 ${getTheme()} cursor-pointer`} target='_blank'>
              {getSocialIcon(t)}
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SocialIconsBlock
