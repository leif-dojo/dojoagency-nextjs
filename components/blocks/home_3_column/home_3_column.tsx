"use client"
import React, { useContext, useEffect, useState, useRef, useLayoutEffect } from 'react'
import { useThemeContext } from '@/context/theme'
import { useIsMobile, hexToRgb, rgbToHex } from '@/utils/general'
import Image from 'next/image'
import styles from './home_3_column.module.scss'
import Link from 'next/link'
export const typename = 'Set_Components_Home3Column'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const Home3Column = ({ block }: { block: any }) => {
  const { cursorType, cursorChangeHandler, colorChangeHandler, backgroundChangeHandler} = useThemeContext();
  const sectionRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {

      //Theme Colors
      const TextColor = `rgb('255,255,255')`;
      const BackgroundColor = `rgb('0, 186, 156')`;
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
        color: TextColor,
        backgroundColor: BackgroundColor,
        ease: "none",
        onUpdate: (e) => {
          colorChangeHandler(getter("color"))
          backgroundChangeHandler(getter("backgroundColor"))
        }
      })

      //fades
      const boxes = gsap.utils.toArray('.fade')
      if (boxes.length) {
          boxes.forEach((box:any, i:any) => {
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
  <section ref={sectionRef} className={`${styles.root} relative w-full  py-280 z-10`}>
    <div className="px-50 md:px-100 block md:flex gap-100">

      {block?.columns?.map((block:any, index:any) => {
        //console.log('col: ', index, block)
        return (
          <div className={`${styles.column} column w-full md:w-1/3 fade`} key={index}>
            
            <div className='w-full pb-10'>
              {block.icon && (
                <Link href={`${block?.link ? block?.link: null}`} className={``}>
                <div className={`${styles.imagewrap} w-full overflow-hidden`}>
                  <Image
                    src={block?.icon?.permalink}
                    width={block?.icon?.width}
                    height={block?.icon?.height}
                    alt={block?.icon?.alt ? block?.icon.alt : ''}
                    className={`${styles.image} f-full h-auto  object-contain`}
                  />
                </div>
                </Link>
              )}
              <div className='inline-block text-80 leading-90 font-200'>
                {block.headline}
              </div>
            </div>
            <div className='text-30 leading-40 font-300'>
              {block.content}
            </div>
          </div>
        )
      })}

    </div>
  </section>
)}

export default Home3Column
