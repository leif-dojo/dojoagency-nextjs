"use client"
import React, { useState, useRef, useLayoutEffect } from 'react'
import styles from './headline_hero.module.scss'
import { useThemeContext } from '@/context/theme'
import { useIsMobile, hexToRgb} from '@/utils/general'
import Image from 'next/image'
import ShareIcons from '@/components/generic/share_icons/share_icons'
import IconLink from '@/public/icons/icon-link.svg'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export const typename = 'Set_Components_Wysiwyg'
const WysiwygBlock = ({ block, meta }: { block: any, meta: any }) => {
  const [copytext, setCopyText] = useState('Copy Link')
  const { cursorType, cursorChangeHandler, colorChangeHandler, backgroundChangeHandler } = useThemeContext();
  const sectionRef = useRef<HTMLDivElement>(null)
  const eyebrowRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLDivElement>(null)
  const sideRef = useRef<HTMLDivElement>(null)
  const sideTitleRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const shareTitleRef = useRef<HTMLDivElement>(null)
  const copyRef = useRef<HTMLDivElement>(null)
  const copyIconRef = useRef<HTMLDivElement>(null)
  const brRef = useRef<HTMLDivElement>(null)

  const copyToClip = () => {
    setCopyText('Copied!')
    if (process.browser) {
      navigator.clipboard.writeText(location?.href);
      setTimeout(() => {
        setCopyText('Copy Link')
      }, 2000);
    }
  }

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {

      //Theme Colors
      const TextColor = block.text_color ? block.text_color : '#304A5F';
      const BackgroundColor = block.background_color ? block.background_color : '#FFFFFF';
      const element = document.querySelector("body");
      const getter = gsap.getProperty(element);
      gsap
        .timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 50%",
            end: "top 10%",
            scrub: true,
            //markers: true,
          },
        })
        .to(element, {
          color: `rgb(${hexToRgb(TextColor)})`,
          backgroundColor: `rgb(${hexToRgb(BackgroundColor)})`,
          ease: "none",
          onUpdate: (e) => {
            colorChangeHandler(getter("color"))
            backgroundChangeHandler(getter("backgroundColor"))
          }
        })

      //main
      gsap
        .timeline()
        .fromTo(
          eyebrowRef.current,
          { autoAlpha: 0, y: "-200rem" },
          {
            duration: 1, autoAlpha: 1, y: "0rem",
            ease: 'power3.out'
          }
        )
        .fromTo(
          headlineRef.current,
          { autoAlpha: 0, y: "-200rem" },
          {
            duration: 1.2, autoAlpha: 1, y: "0rem",
            ease: 'power3.out'
          }, 0
        )
        .fromTo(
          sideTitleRef.current,
          { autoAlpha: 0, y: "-20%" },
          {
            duration: 0.1, autoAlpha: 1, y: "0%",
            ease: 'power3.out'
          }, 0.5
        )
        .fromTo(
          logoRef.current,
          { autoAlpha: 0, y: "-20%" },
          {
            duration: 0.1, autoAlpha: 1, y: "0%",
            ease: 'power3.out'
          }, ">"
        )
        .fromTo(
          brRef.current,
          { autoAlpha: 0, },
          {
            duration: 0.1, autoAlpha: 1,
            ease: 'Bounce.easeOut'
          }, ">"
        )
        .fromTo(
          shareTitleRef.current,
          { autoAlpha: 0, y: "-20%" },
          {
            duration: 0.1, autoAlpha: 1, y: "0%",
            ease: 'power3.out'
          }, ">"
        )
        .fromTo(
          ".sharewrap div div div",
          { autoAlpha: 0, y: "150%" },
          {
            duration: 0.2, autoAlpha: 1, y: "0%",
            stagger: 0.15,
            ease: 'Bounce.easeOut'
          }, ">"
        )
        .fromTo(
          copyRef.current,
          { autoAlpha: 0, y: "-20%" },
          {
            duration: 0.1, autoAlpha: 1, y: "0%",
            ease: 'power3.out'
          }, ">"
        )
        .fromTo(
          copyIconRef.current,
          { autoAlpha: 0, y: "150%" },
          {
            duration: 0.15, autoAlpha: 1, y: "0%",
            ease: 'Bounce.easeOut'
          }, ">"
        )

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={`${styles.root} w-full `}>
      <div className="px-50 md:px-100 py-50">
        <div className="block md:flex">
          <div className="w-full md:w-8/12">
            {block.eyebrow && (
              <div ref={eyebrowRef} className="text-20 leading-none font-300 uppercase mb-10 ">
                {block.eyebrow}
              </div>
            )}
            {block.headline && (
              <div ref={headlineRef} className='wysiwyg text-110 leading-140 font-300 ' dangerouslySetInnerHTML={{ __html: block.headline }}></div>
            )}
          </div>
          <div className="w-full md:w-4/12 text-right">
            <div ref={sideRef} className="w-full md:w-10/12 ml-auto mr-0 text-left pt-30">
              {block.sharing_title && (
                <div ref={sideTitleRef} className="w-full text-25 leading-none font-300 pb-20 ">
                  {block.sharing_title}
                </div>
              )}
              {block.client[0] && block.client[0].client_logo && (
                <div ref={logoRef} className={`${styles.logo} logo relative block w-7/12 mr-auto ml-0 z-10`}>
                  <Image
                    src={block.client[0].client_logo?.permalink}
                    width={block.client[0].client_logo?.width}
                    height={block.client[0].client_logo?.height}
                    alt={block.client[0].client_logo?.alt ? block.client[0].client_logo.alt : ''}
                    className='w-auto h-auto object-contain'
                  />
                </div>
              )}
              {block.show_sharing && (
                <>
                  <div ref={brRef} className="w-full bg-slate h-1 my-25 opacity-10"></div>
                  <div className="w-full flex flex-nowrap">
                    <div className="w-full md:w-1/2 ">
                      <div ref={shareTitleRef} className="text-25 leading-none font-300 pb-20">Share</div>
                      <div className="w-full sharewrap"><ShareIcons meta={meta} /></div>
                    </div>
                    <div className="w-full md:w-1/2 ">
                      <div ref={copyRef} className="text-25 leading-none font-300 pb-20 cursor-pointer">{copytext}</div>
                      <div className="w-full">
                        <div ref={copyIconRef} className={`${styles.icon} flex items-center justify-center`}>
                          <div className={`relative flex items-center justify-center text-blue cursor-pointer`} aria-label="copy to clipboard" onClick={copyToClip}>
                            <IconLink />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WysiwygBlock
