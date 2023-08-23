"use client"
import React, { useRef, useLayoutEffect } from 'react'
import styles from './headline.module.scss'
import { useThemeContext } from '@/context/theme'
import { useIsMobile, hexToRgb } from '@/utils/general'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export const typename = 'Set_Components_Wysiwyg'
const WysiwygBlock = ({ block }: { block: any }) => {
  const { cursorType, cursorChangeHandler, colorChangeHandler, backgroundChangeHandler } = useThemeContext();
  const sectionRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLDivElement>(null)

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

      //fades
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

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={`${styles.root} w-full`}>
      <div className="px-50 md:px-150 py-50">
        {block.eyebrow && (
          <div className="text-20 leading-none font-300 uppercase mb-10 fade">
            {block.eyebrow}
          </div>
        )}
        <div className="w-full flex">
          {block.headline_set && (
            <div className="w-full">

              {typeof block.headline_set === 'string' && (
                <div ref={headlineRef} className={`${styles.headline} wysiwyg text-70 md:text-90 leading-85 md:leading-120 font-300`} dangerouslySetInnerHTML={{ __html: block.headline }}></div>
              )}

              {typeof block.headline_set === 'object' && block?.headline_set?.map((item: any, index: any) => {
                return (
                  (() => {
                    switch (item.__typename) {
                      case 'BardText':
                        return <div ref={headlineRef} className={`${styles.headline} wysiwyg text-70 md:text-90 leading-85 md:leading-120 font-300`} dangerouslySetInnerHTML={{ __html: item.text }} key={index}></div>;
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
        </div>
      </div>
    </section>
  )
}

export default WysiwygBlock
