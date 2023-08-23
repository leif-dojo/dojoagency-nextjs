"use client"
import React, { useRef, useLayoutEffect } from 'react'
import { useThemeContext } from '@/context/theme'
import styles from './2_column_image.module.scss'
import { useIsMobile, hexToRgb } from '@/utils/general'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export const typename = 'Set_Components_2ColumnImage'
const Column2ImageBlock = ({ block }: { block: any }) => {
  const { cursorType, cursorChangeHandler, colorChangeHandler, backgroundChangeHandler } = useThemeContext();
  const sectionRef = useRef<HTMLDivElement>(null)
  const copyRef = useRef<HTMLDivElement>(null)
  const mediaRef = useRef<HTMLDivElement>(null)

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
      <div className="px-50 md:px-100 py-100">
        <div className="block md:flex">
          <div ref={copyRef} className="w-full md:w-1/2 md:pr-30 flex items-center">
            <div className='w-full'>
              {block.eyebrow && (
                <div className="text-20 leading-none font-300 uppercase mb-10 fade">
                  {block.eyebrow}
                </div>
              )}
              {block.headline_set && (
                <div className="w-full mb-20">

                  {typeof block.headline_set === 'string' && (
                    <div className={`${styles.headline} wysiwyg text-70 md:text-90 leading-85 md:leading-120 font-300`} dangerouslySetInnerHTML={{ __html: block.headline }}></div>
                  )}

                  {typeof block.headline_set === 'object' && block?.headline_set?.map((item: any, index: any) => {
                    return (
                      (() => {
                        switch (item.__typename) {
                          case 'BardText':
                            return <div className={`${styles.headline} wysiwyg text-70 md:text-90 leading-85 md:leading-120 font-300`} dangerouslySetInnerHTML={{ __html: item.text }} key={index}></div>;
                          case 'Set_Headline_Headline':
                            const Tag = item.headline_tag ? item.headline_tag.value : 'p';
                            return <div className='w-full' key={index}>
                              <Tag className={`${styles.headline} wysiwyg ${item.headline_size ? item.headline_size.value : 'text-70'} leading-none font-300`} dangerouslySetInnerHTML={{ __html: item.headline }} ></Tag>
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
                    <div className='wysiwyg text-30 leading-40 font-300 fade' dangerouslySetInnerHTML={{ __html: block.wysiwyg_set }}></div>
                  )}

                  {typeof block.wysiwyg_set === 'object' && block?.wysiwyg_set?.map((item: any, index: any) => {
                    return (
                      (() => {
                        switch (item.__typename) {
                          case 'BardText':
                            return <div className='wysiwyg text-30 leading-40 font-300 mb-30 fade' dangerouslySetInnerHTML={{ __html: item.text }} key={index}></div>;
                          case 'Set_Wysiwyg_Headline':
                            const Tag = item.headline_tag ? item.headline_tag : 'p';
                            return <div className='w-full' key={index}>
                              <Tag className={`wysiwyg ${item.headline_size ? item.headline_size : 'text-30'} font-300 mb-30 fade`} dangerouslySetInnerHTML={{ __html: item.headline }} ></Tag>
                            </div>;
                        }
                      })()
                    )

                  })}

                </div>
              )}
              {block.wysiwyg_sub && (
                <div className="w-full">
                  <div className='wysiwyg text-30 leading-40 font-300 fade' dangerouslySetInnerHTML={{ __html: block.wysiwyg_sub }}></div>
                </div>
              )}
            </div>
          </div>
          <div ref={mediaRef} className="w-full md:w-1/2">
            {block.images && (
              <div className='w-full pl-0 md:pl-100 fade'>
                <Image
                  src={block.images[0]?.permalink}
                  width={block.images[0]?.width}
                  height={block.images[0]?.height}
                  alt={block.images[0]?.alt ? block.images[0].alt : ''}
                  className='w-full h-auto'
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Column2ImageBlock
