"use client"
import React, { useContext, useEffect, useState, useRef, useLayoutEffect } from 'react'
import Image from 'next/image'
import styles from './home_3_column.module.scss'
//import mountains from '@/public/images/placeholder.jpg'
//import Image from '@/utils/rendering/image'
export const typename = 'Set_Components_Home3Column'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const Home3Column = ({ block }: { block: any }) => {
  const sectionRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap
      .timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom bottom',
          scrub: true,
          //markers: true,
        },
      })
      .fromTo(
        sectionRef.current,
        {
          backgroundColor: "#00aeef"
      }, {
          backgroundColor: "#00ba9c", 
      },
      )

      //fades
      //tele
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
        ".column",
        { autoAlpha: 0, y: 50 },
        { duration: 0.9, autoAlpha: 1, y: 0, stagger: 1 }
      )

    }, sectionRef);
    return () => ctx.revert();
  }, []);
  
  return (
  <section ref={sectionRef} className={`${styles.root} relative w-full bg-aqua text-white py-280 z-10`}>
    <div className="px-50 md:px-100 block md:flex gap-100">

      {block?.columns?.map((block:any, index:any) => {
        //console.log('col: ', index, block)
        return (
          <div className={`${styles.column} column w-full md:w-1/3`} key={index}>
            
            <div className='w-full pb-10'>
              {block.icon && (
                <a href={`${block?.link ? block?.link: null}`} className={``}>
                <div className={`${styles.imagewrap} w-full overflow-hidden`}>
                  <Image
                    src={block?.icon?.permalink}
                    width={block?.icon?.width}
                    height={block?.icon?.height}
                    alt={block?.icon?.alt ? block?.icon.alt : ''}
                    className={`${styles.image} f-full h-auto  object-contain`}
                  />
                </div>
                </a>
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
