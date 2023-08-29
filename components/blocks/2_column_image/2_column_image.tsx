"use client"
import React, { useRef, useState, useEffect, useLayoutEffect } from 'react'
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
  const faderRef = useRef<HTMLDivElement>(null)
  const [activeindex, setActiveIndex] = useState(1)

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

  useEffect(() => {
    //image fader
    if (faderRef.current) {
      const slideCount = block.images.length;
      setInterval(() => {
        let nextIndex = activeindex + 1;
        if (nextIndex > slideCount) { nextIndex = 1 };
        setActiveIndex(nextIndex);
      }, 7000);
    }
  }, [activeindex]);

  return (
    <section ref={sectionRef} className={`${styles.root} w-full`}>
      <div className="px-50 md:px-100 py-50">
        <div className="block md:flex">
          <div ref={copyRef} className="w-full md:w-1/2 md:pr-30 flex items-center">
            <div className='w-full'>
              {block.eyebrow && (
                <div className="text-20 leading-none font-300 uppercase mb-10 fade">
                  {block.eyebrow}
                </div>
              )}
              {block.headline_set && block.headline_set.length > 0 && (
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
            <div className='w-full pl-0 md:pl-100 fade'>
              {block.images.length == 1 && (
                <Image
                  src={block.images[0]?.permalink}
                  width={block.images[0]?.width}
                  height={block.images[0]?.height}
                  alt={block.images[0]?.alt ? block.images[0].alt : ''}
                  className={`${styles.image} w-full h-auto`}
                />
              )}
              {block.images.length > 1 && (
                <div ref={faderRef} className='relative w-full '>
                  {block.images?.map((item: any, index: any) => {
                    return (
                      <Image
                        key={index}
                        src={item?.permalink}
                        width={item?.width}
                        height={item?.height}
                        alt={item?.alt ? item.alt : ''}
                        className={`${styles.imagefade} ${activeindex == (index + 1) ? styles.active : ''} w-full h-auto`}
                      />
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Column2ImageBlock
