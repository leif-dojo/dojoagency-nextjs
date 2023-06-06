
import React, { useEffect, useRef, useState, Fragment, useContext } from 'react'
import Link from 'next/link'
import IconLinkedIn from '@/public/icons/icon-linkedin.svg'
import IconInstagram from '@/public/icons/icon-instagram.svg'
import IconFacebook from '@/public/icons/icon-facebook.svg'
import styles from './share_icons.module.scss'

const SocialIconsBlock = () => {

  const socials = [
    { 
      type: 'linkedin', 
      url:'linkhere'
    },
    { 
      type: 'instagram', 
      url:'linkhere'
    },
    { 
      type: 'facebook', 
      url:'linkhere'
    }
  ]

  const getSocialIcon = (t:any) => {
    switch(t.type) {
      case 'linkedin':
        return <IconLinkedIn />;
      case 'instagram':
        return <IconInstagram />;
      case 'facebook':
        return <IconFacebook />;
    }
  }

  //console.log("Socials: ", socials)
  return (
    <div className={`${styles.root}`}>
      <div className="flex items-left gap-20 relative w-auto">
          {socials.map((t:any) => (
            <div key={`${t.type}`} className={`${styles.icon} flex items-center justify-center`}>
              <a href={t.url} className={`relative flex items-center justify-center text-blue cursor-pointer`} aria-label="LinkedIn" >
              {getSocialIcon(t)}
              </a>
            </div>
          ))}
      </div>
    </div>
  )
}

export default SocialIconsBlock
