"use client"
import React from 'react'
import Link from 'next/link'
import cn from 'classnames'
import styles from './footer.module.scss'
import IconPin from '@/public/icons/icon-pin.svg'
import { useThemeContext } from '@/context/theme'
import Socials from '@/components/generic/social_icons/social_icons'

const FooterBlock = ({
  footer,
  footer_nav
}: {
  footer: any
  footer_nav: any
}) => {
  const { contactActive, setContactActive, cursorType, cursorChangeHandler } = useThemeContext();
  const openOrClose = () => {
    if (contactActive) {
      setContactActive(false)
    } else {
      setContactActive(true)
    }
  }
  return (
    <>
      <footer className={`${styles.root} relative bg-black`}>
        <div className="relative  mx-50 md:mx-100 py-60 z-10">
          <div className={`${styles.nav} flex flex-col md:grid grid-cols-12 gap-x-30`}>
            <div className="col-span-full md:col-span-2">
              <ul
                className=""
                itemScope
                itemType="http://www.schema.org/SiteNavigationElement"
              >
                {footer_nav.tree.map((t: any) => {
                  return (
                    <li key={`${t.page?.url}`} className='pb-50 md:pb-25'>
                      <Link href={`${t.page?.url}`} className="cursor-pointer font-lato text-66 md:text-27 leading-none text-white font-400">
                        {t.page?.title}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
            <div className="col-span-full md:col-span-3 flex flex-col mt-100 md:mt-0">
              <div className={cn(styles.address, 'flex')}>
                <div className={`${styles.pin} mr-15 md:mr-10 text-blue`}><IconPin /></div>
                <div className='text-52 md:text-27 leding:none md:leading-32 font-300 md:font-400 text-white text-left' dangerouslySetInnerHTML={{ __html: footer.address }}></div>
              </div>
              <div className='pt-50 md:pt-30 pb-100 md:pb-0'>
                <Socials socials={footer.socials} />
              </div>
              <div className={cn(styles.address, 'mt-auto pt-0 md:pt-100')}>
                <div className='inline text-66 md:text-36 leading-none font-500 text-white text-left cursor-pointer' onClick={() => openOrClose()} onMouseEnter={() => cursorChangeHandler("bridge")} onMouseLeave={() => cursorChangeHandler("page")}>{footer.form_cta}</div>
              </div>
            </div>
            <div className="md:col-span-8 text-right">

            </div>
          </div>
          <div className={`${styles.copyright} text-right pt-100 md:pt-0`}>
            <div className={`text-38 md:text-18 font-300 leading-60 md:leading-none text-white text-left md:text-right`}>
              {footer.copyright}
            </div>
          </div>
        </div>
        <div className={`absolute w-full md:w-1/2 h-full right-0 top-0 bottom-0 hidden md:block`}>
          {footer.video_embed && (
            <div className="video-wrap absolute w-full h-full overflow-hidden top-0 right-0 z-0">
              <div className={`${styles.video} absolute block w-full h-full opacity-50 aspect-video`}>
                <iframe src={`${footer.video_embed}?autoplay=1&loop=1&autopause=0&background=1&muted=1`}
                  title="Vimeo video player"
                  className="vimeo aspect-video mr-0 ml-auto"
                  width="640" height="360"
                  allow="autoplay; fullscreen" ></iframe>
              </div>
            </div>
          )}
          {footer.video_local && (
            <div className="video-wrap absolute w-full h-full overflow-hidden top-0 right-0 z-0">
              <div className={`${styles.video} absolute block w-full h-full opacity-70 aspect-video`}>
                <video
                  className="vimeo aspect-video w-full mr-0 ml-auto"
                  width="640"
                  height="360"
                  autoPlay
                  controls
                  loop
                  muted
                  preload="auto">
                  <source src={`${footer.video_local?.permalink}`} type="video/mp4"></source>
                </video>
              </div>
            </div>
          )}
        </div>
      </footer>
    </>
  )
}

export default FooterBlock
