"use client"
import React, { useRef, useLayoutEffect } from 'react'
import styles from './timeline.module.scss'
import { useThemeContext } from '@/context/theme'
import { useIsMobile, hexToRgb } from '@/utils/general'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export const typename = 'Set_Components_Timeline'
const TimelineBlock = ({ block }: { block: any }) => {
  const { cursorType, cursorChangeHandler, colorChangeHandler, backgroundChangeHandler } = useThemeContext();
  const sectionRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLDivElement>(null)
  const wysiwygRef = useRef<HTMLDivElement>(null)

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

      //animations
      gsap
        .timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            //end: 'bottom bottom',
            //scrub: true,
            toggleActions: "restart none none reverse"
            //markers: true,
          },
        })
        .fromTo(
          headlineRef.current,
          { autoAlpha: 0, y: 50 },
          { duration: 0.5, autoAlpha: 1, y: 0 }, 0.2
        )
        .fromTo(
          wysiwygRef.current,
          { autoAlpha: 0, y: 50 },
          { duration: 0.5, autoAlpha: 1, y: 0 }, 0.2
        )


      const boxes = gsap.utils.toArray('.fade')
      if (boxes.length) {
        boxes.forEach((box: any, i: any) => {
          const anim = gsap.fromTo(
            box,
            { autoAlpha: 0, y: "25%" },
            { duration: 1.6, autoAlpha: 1, y: "0%", stagger: 0.25, ease: "power4.out" }
          )
          ScrollTrigger.create({
            //scroller: page,
            trigger: box,
            animation: anim,
            start: 'top bottom',
            //end: 'bottom top',
            toggleActions: "restart none none reverse",
            //markers: true
          })
        })
      }

      //timeline
      gsap
        .timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'center bottom',
            //end: 'bottom bottom',
            //scrub: true,
            toggleActions: "restart none none reverse",
            //markers: true,
          },
        }).fromTo(
          ".item",
          { autoAlpha: 0, y: 50 },
          { duration: 0.5, autoAlpha: 1, y: 0, stagger: 0.15 }
        )

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={`${styles.root} w-full overflow-hidden`}>
      <div className="px-50 md:px-100 py-100">
        <div className="w-full">
          {block.eyebrow && (
            <div className="text-20 leading-none font-300 uppercase mb-10 fade">
              {block.eyebrow}
            </div>
          )}
            {block.headline_set && (
              <div className="w-full">

                {typeof block.headline_set === 'string' && (
                  <div ref={headlineRef} className={`${styles.headline} wysiwyg text-70 md:text-110 leading-85 md:leading-140 font-300`} dangerouslySetInnerHTML={{ __html: block.headline }}></div>
                )}

                {typeof block.headline_set === 'object' && block?.headline_set?.map((item: any, index: any) => {
                  return (
                    (() => {
                      switch (item.__typename) {
                        case 'BardText':
                          return <div ref={headlineRef} className={`${styles.headline} wysiwyg text-70 md:text-110 leading-85 md:leading-140 font-300`} dangerouslySetInnerHTML={{ __html: item.text }} key={index}></div>;
                        case 'Set_Headline_Headline':
                          const Tag = item.headline_tag ? item.headline_tag.value : 'p';
                          return <div className='w-full' key={index}>
                            <Tag ref={headlineRef} className={`${styles.headline} wysiwyg ${item.headline_size ? item.headline_size.value : 'text-70'} leading-none font-300`} dangerouslySetInnerHTML={{ __html: item.headline }} ></Tag>
                          </div>;
                      }
                    })()
                  )
                })}

              </div>
            )}

          {block.wysiwyg_set && (
            <div className="w-full">

              {typeof block.wysiwyg_set === 'string' && (
                <div ref={wysiwygRef} className='wysiwyg text-30 leading-40 font-300 fade' dangerouslySetInnerHTML={{ __html: block.wysiwyg_set }}></div>
              )}

              {typeof block.wysiwyg_set === 'object' && block?.wysiwyg_set?.map((item: any, index: any) => {
                return (
                  (() => {
                    switch (item.__typename) {
                      case 'BardText':
                        return <div ref={wysiwygRef} className='wysiwyg text-30 leading-40 font-300 mb-30 fade' dangerouslySetInnerHTML={{ __html: item.text }} key={index}></div>;
                      case 'Set_Wysiwyg_Headline':
                        const Tag = item.headline_tag ? item.headline_tag : 'p';
                        return <div className='w-full' key={index}>
                          <Tag ref={wysiwygRef} className={`wysiwyg ${item.headline_size ? item.headline_size : 'text-30'} font-300 mb-30 fade`} dangerouslySetInnerHTML={{ __html: item.headline }} ></Tag>
                        </div>;
                    }
                  })()
                )

              })}

            </div>
          )}


        </div>

        <div className={`${styles.timeline} relative flex flex-nowrap items-stretch w-full my-200`}>

          {block?.timeline?.map((block: any, index: any) => {
            //console.log('col: ', index, block)
            return (
              <div className={`${styles.item} item relative flex-1`} key={index}>
                {block.image && (
                  <div className={`${styles.top} absolute w-full h-150 bottom-0`}>
                    <div className='absolute w-full h-full top-0 left-0 overflow-hidden'>
                      <Image
                        src={block.image?.permalink}
                        width={block.image?.width}
                        height={block.image?.height}
                        alt={block.image?.alt ? block.image.alt : ''}
                        className={`${styles.image} relative w-full h-auto`}
                      />
                    </div>
                  </div>
                )}
                <div className={`${styles.mid} relative bg-orange z-10`} style={{ backgroundColor: block.color }}>
                  <div className='flex items-stretch px-10 py-10'>
                    <div className={`${styles.year} w-full text-24 leading-none font-400 text-white text-center`}>{block.year}</div>
                    <div className={`${styles.headlinewrap} overflow-hidden w-0 mx-0`}>
                      <div className={`${styles.headline} relative text-24 leading-none font-400 text-white whitespace-nowrap text-right`}>{block.headline}</div>
                    </div>
                  </div>
                </div>
                {block.logo && (
                  <div className={`${styles.bottom} absolute top-0 w-full`}>
                    <div className='w-full flex items-stretch flex-nowrap bg-white px-20 py-20'>
                      <div className='w-1/2 flex pr-20 items-center overflow-hidden'>
                        {block.logo && (
                          <Image
                            src={block.logo?.permalink}
                            width={block.logo?.width}
                            height={block.logo?.height}
                            alt={block.logo?.alt ? block.logo.alt : ''}
                            className={`${styles.logo} relative w-full h-auto`}
                          />
                        )}
                      </div>
                      <div className='w-1/2 text-right'>
                        {block?.overview?.map((item: any, index2: any) => {
                          //console.log('col: ', index, block)
                          return (
                            <div className='text-20 font-300 leading-none text-slate text-left py-5' key={index2}>{item}</div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}

        </div>
      </div>
    </section>
  )
}

export default TimelineBlock
