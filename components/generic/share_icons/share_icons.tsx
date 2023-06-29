import React, { useEffect, useRef, useState, Fragment, useContext } from 'react'
import Link from 'next/link'
import IconLinkedIn from '@/public/icons/icon-linkedin.svg'
import IconInstagram from '@/public/icons/icon-instagram.svg'
import IconFacebook from '@/public/icons/icon-facebook.svg'
import IconTwitter from '@/public/icons/icon-twitter.svg'
import styles from './share_icons.module.scss'

const SocialIconsBlock = ({meta}: {meta:any}) => {

  const url = location ? location?.href : ''
  const title = meta.title;
  const description = meta.description;

  const socials = [
    { 
      type: 'linkedin', 
      url:`https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}&summary=${description}`
    },
    { 
      type: 'instagram', 
      url:'https://www.instagram.com/dojoagency/'
    },
    { 
      type: 'facebook', 
      url:`https://www.facebook.com/sharer.php?u=${url}`
    },
    { 
      type: 'twitter', 
      url:`https://twitter.com/intent/tweet?url=${url}&text=${title}`
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
      case 'twitter':
        return <IconTwitter />;
    }
  }

  //console.log("Socials: ", socials)
  return (
    <div className={`${styles.root}`}>
      <div className="flex items-left gap-20 relative w-auto">
          {socials.map((t:any) => (
            <div key={`${t.type}`} className={`${styles.icon} share-icon-wrap flex items-center justify-center`}>
              <a href={t.url} className={`relative flex items-center justify-center text-blue cursor-pointer`} aria-label={`${t.type}`} target='_blank'>
              {getSocialIcon(t)}
              </a>
            </div>
          ))}
      </div>
    </div>
  )
}

export default SocialIconsBlock
