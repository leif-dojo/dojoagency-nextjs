"use client"
import React from 'react'
import Link from 'next/link'
import IconLinkedIn from '@/public/icons/icon-linkedin.svg'
import IconInstagram from '@/public/icons/icon-instagram.svg'
import styles from './social_icons.module.scss'
import { useThemeContext } from '@/context/theme'

const SocialIconsBlock = ({ socials, style }: { socials: any, style?: any }) => {
  const { contactActive, setContactActive, cursorType, cursorChangeHandler } = useThemeContext();

  const getSocialIcon = (t: any) => {
    switch (t.type) {
      case 'linkedin':
        return <IconLinkedIn onMouseEnter={() => cursorChangeHandler("linkedin")} onMouseLeave={() => cursorChangeHandler("default")} />;
      case 'instagram':
        return <IconInstagram onMouseEnter={() => cursorChangeHandler("instagram")} onMouseLeave={() => cursorChangeHandler("default")} />;
    }
  }

  //console.log("Socials: ", socials)
  return (
    <div className={`${styles.root}`}>
      <div className="flex items-left gap-20 relative w-auto">
        {socials.map((t: any) => (
          <div key={`${t.type}`} className={`${style === 'simple' ? styles.iconsimple : styles.icon} social-icon-wrap flex items-center justify-center`}>
            <a href={t.url} className={`relative flex items-center justify-center ${style === 'simple' ? 'text-white' : 'text-blue'} cursor-pointer`} aria-label="LinkedIn" target='_blank'>
              {getSocialIcon(t)}
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SocialIconsBlock
