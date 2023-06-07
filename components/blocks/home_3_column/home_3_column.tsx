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
  <section ref={sectionRef} className="relative w-full bg-aqua text-white py-280 z-10">
    <div className="px-50 md:px-100 block md:flex gap-30">

      {block?.columns?.map((block:any, index:any) => {
        //console.log('col: ', index, block)
        return (
          <div className={`${styles.column} column w-full md:w-1/3`} key={index}>
            <a href={`${block?.link ? block?.link: null}`} className={``}>
            <div className='w-full pb-10'>
              {block.icon && (
                <div className='inline-block w-80 mr-10'>
                  <img src={block?.icon?.permalink} />
                  {/*<Image
                    src="/images/placeholder.jpg"
                    alt="Picture of the author"
                    width={500}
                    height={500}
                  />*/}
                  
                </div>
              )}
              <div className='inline-block text-80 leading-90 font-200'>
                {block.headline}
              </div>
            </div>
            <div className='text-30 leading-40 font-300'>
              {block.content}
            </div>
            </a>
          </div>
        )
      })}

    </div>
  </section>
)}

export default Home3Column
