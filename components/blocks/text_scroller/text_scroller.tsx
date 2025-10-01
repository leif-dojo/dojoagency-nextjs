"use client"
import React, { useRef, useEffect, useLayoutEffect } from 'react'
import styles from './text_scroller.module.scss'
import { useThemeContext } from '@/context/theme'
import { useIsMobile, hexToRgb } from '@/utils/general'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import ScrollText from '@/utils/SplitText'
import Arrow from '@/public/icons/icon-arrow-down.svg'
gsap.registerPlugin(ScrollTrigger)

export const typename = 'Set_Components_TextScroller'
const TextScrollerBlock = ({ block }: { block: any }) => {
  const { cursorType, cursorChangeHandler, colorChangeHandler, backgroundChangeHandler } = useThemeContext();
  const sectionRef = useRef<HTMLDivElement>(null)
  const TextRef = useRef<HTMLDivElement>(null)

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
            // markers: true,
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

      if (TextRef.current) {
        let split = new ScrollText({
          words: 1,
          chars: 0,
          spacing: "0.33em"
        }).split(TextRef?.current)
      }

      const items = gsap.utils.toArray(".wysiwyg div")
      //console.log("items: ",items)
      items.forEach((item: any, index: any) => {

        gsap
          .timeline({
            scrollTrigger: {
              trigger: item,
              start: "center 95%",
              end: "center 55%",
              scrub: true,
              //markers: true,
            },
          }).fromTo(
            item,
            {
              autoAlpha: 0,
            }, {
            autoAlpha: 1,
            stagger: 0,
            ease: 'power3.out'
          }, 0
          )

        gsap
          .timeline({
            scrollTrigger: {
              trigger: item,
              start: "center 35%",
              end: "center 10%",
              scrub: true,
              //markers: true,
            },
          }).to(
            item,
            {
              autoAlpha: 0,
              stagger: 0,
              ease: 'power3.out'
            }, 0
          )

      })

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={`${styles.root} relative w-full bg-black text-white overflow-hidden`}>
      <div className={`${styles.background} absolute h-full w-full left-0 top-0`}>
        {block.background_image && (
          <div className='w-full h-full opacity-50 fixed top-0'>
            <img src={block.background_image?.permalink} className='aspect-video' />
          </div>
        )}
        {block.video_embed && (
          <div className="video fixed w-full h-full overflow-hidden top-0 opacity-50" >
            <div className="video-inner absolute block w-full h-full">
              <iframe src={`${block.video_embed}?autoplay=1&loop=1&autopause=0&background=1&muted=1`}
                title="Vimeo video player"
                className="vimeo w-full h-full"
                width="640" height="360"
                allow="autoplay; fullscreen"></iframe>
            </div>
          </div>
        )}

        {block.video_local && (
          <div className="video fixed w-full h-full overflow-hidden top-0 opacity-50" >
            <div className="video-inner absolute block w-full h-full">
              <video
                className="html-video aspect-video"
                width="640"
                height="360"
                autoPlay
                controls
                loop
                muted
                playsInline
                preload="auto">
                <source src={`${block.video_local?.permalink}`} type="video/mp4"></source>
              </video>
            </div>
          </div>
        )}
      </div>
      <div className="px-50 md:px-150 py-100">
        <div className="grid grid-cols-12">
          <div className="w-full col-start-2 col-span-10">
            <div ref={TextRef} className='relative z-10 wysiwyg text-80 leading-100 font-500' dangerouslySetInnerHTML={{ __html: block.wysiwyg }}></div>
          </div>
        </div>
      </div>
      <div className={`${styles.arrow} fixed bottom-0 flex justify-center w-full text-center py-20`}>
        <Arrow className="w-30 h-auto" />
      </div>
    </section>
  )
}

export default TextScrollerBlock
