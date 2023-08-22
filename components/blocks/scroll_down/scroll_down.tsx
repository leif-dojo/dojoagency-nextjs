"use client"
import React, { useState, useRef, useEffect } from 'react'
import styles from './scroll_down.module.scss'
import ScrollDown from '@/public/icons/icon-arrow-scroll.svg'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export const typename = 'Set_Components_ScrollDown'
const HomePartners = ({ block }: { block: any }) => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const ArrowRef = useRef<HTMLDivElement>(null)
  const TextRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let ctx = gsap.context(() => {

      gsap
        .timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            //end: '100% bottom',
            //scrub: true,
            //markers: true,
            toggleActions: "restart none none reverse"
          },
        })
        .fromTo(
          TextRef.current,
          { alpha: 0 },
          { alpha: 1 }
        ).set(ArrowRef.current, {
          className: styles.draw
        })

      gsap
        .timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'center 25%',
            //end: '100% bottom',
            //scrub: true,
            //markers: true,
            toggleActions: "restart none none reverse"
          },
        })
        .fromTo(
          TextRef.current,
          { alpha: 1 },
          { alpha: 0 }
        ).set(ArrowRef.current, {
          className: styles.drawrev
        })

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const scrollTo = () => {
    const nextSection = sectionRef.current.nextSibling
    nextSection.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section ref={sectionRef} className={`${styles.root} relative w-full z-10`}>
      <div className="px-50 md:px-100">
        <div className="relative flex items-center justify-items-center text-center">
          <div className={`${styles.arrowwrap} relative w-100 mx-auto`} onClick={() => scrollTo()}>
            <div ref={ArrowRef}><ScrollDown className={`${styles.arrow} next w-full h-auto text-blue`} /></div>
            <div ref={TextRef} className={`${styles.textwrap} absolute `}>
              <div className='text font-nothingyoucoulddo text-22 font-300 text-blue'>Scroll</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomePartners
