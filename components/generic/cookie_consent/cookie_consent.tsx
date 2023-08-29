"use client"
import React, { useState } from 'react'
import styles from './cookie_consent.module.scss'


const Loading = ({
  data,
}: {
  data: any
}) => {
  const [active, setActive] = useState(true)

  const openOrClose = (index: any) => {
    active ? setActive(false) : setActive(true)
  }

  const onConsent = (consent: any) => {
    //if consent given
    if(consent) {
      //send GTM event
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        'event': 'consent',
        'consent': 'accepted',
      });
    }
    //close panel
    setActive(false)
  }

  return (
    <div className={`${styles.root} fixed w-full bottom-0 left-0 bg-darkgrey text-white ${active ? styles.active : ''}`}>
      <div className="relative flex w-full px-50 md:px-100 py-60 md:py-30">
        <div className={`${styles.close} absolute top-50 right-50 flex items-center z-10 cursor-pointer`} role="none" onClick={() => openOrClose(0)}>
          <div className="a11y hidden">Toggle Consent</div>
          <div className={`font-lato text-white text-30 font-300 leading-none`}>X</div>
        </div>
        <div className='w-full pr-40'>
          <div className='text-40 leading-none font-300 text-white pb-10'>{data.consent_headline}</div>
          <div className={`${styles.copy} text-20 leading-30 font-300 text-white`} dangerouslySetInnerHTML={{ __html: data.consent_copy }}></div>
        </div>
        <div className='flex flex-col md:flex-row items-center justify-items-center gap-30'>
          <button className={`${styles.button} btn btn-outline-blue text-20`} onClick={() => onConsent(true)}>Accept All</button>
          <button className={`${styles.button} btn btn-outline-white text-20`} onClick={() => onConsent(false)}>Reject All</button>
        </div>
      </div>
    </div>
  )
}

export default Loading
