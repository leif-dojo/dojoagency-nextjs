"use client"
import React, { useState, useEffect } from 'react'
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
      //set local cookie
      setCookie('consent', true, 30)
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

  const setCookie = (cname:any, cvalue:any, exdays:any) => {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  const getCookie = (cname:any) => {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  useEffect(() => {
    let cookie = getCookie('consent')
    if(cookie) {
      setActive(false)
    }
  }, []);

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
        <div className='flex flex-col landscape:flex-row md:flex-row items-center justify-items-center gap-30'>
          <button className={`${styles.button} btn btn-outline-blue text-20`} onClick={() => onConsent(true)}>Accept All</button>
          <button className={`${styles.button} btn btn-outline-white text-20`} onClick={() => onConsent(false)}>Reject All</button>
        </div>
      </div>
    </div>
  )
}

export default Loading
