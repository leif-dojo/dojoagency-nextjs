"use client"
import React, { useRef, useLayoutEffect } from 'react'
import styles from './post_navigation.module.scss'
import { useThemeContext } from '@/context/theme'
import { useIsMobile, hexToRgb } from '@/utils/general'
import Link from 'next/link'
import NextIcon from '@/public/icons/icon-next.svg'
import PrevIcon from '@/public/icons/icon-prev.svg'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export const typename = 'Set_Components_PostNavigation'
const PostNavigationBlock = ({ block }: { block: any }) => {
  const { cursorType, cursorChangeHandler, colorChangeHandler, backgroundChangeHandler } = useThemeContext();
  const sectionRef = useRef<HTMLDivElement>(null)
  const PrevArrowRef = useRef<HTMLDivElement>(null)
  const NextArrowRef = useRef<HTMLDivElement>(null)
  const PrevTextRef = useRef<HTMLDivElement>(null)
  const NextTextRef = useRef<HTMLDivElement>(null)

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

      gsap
      .timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'bottom bottom',
          //end: 'bottom bottom',
          //scrub: true,
          toggleActions: "restart none none reverse",
          //markers: true,
        },
      })
      .set(PrevArrowRef.current, {
        className: styles.draw
      })
      .fromTo(
        PrevTextRef.current,
        { alpha: 0, },
        { alpha: 1, duration: 0.4 }
      )
      .set(NextArrowRef.current, {
        className: styles.draw
      })
      .fromTo(
        NextTextRef.current,
        { alpha: 0 },
        { alpha: 1, duration: 0.4 }
      )

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={`${styles.root} w-full`}>
      <div className='w-full flex flex-nowrap px-50 md:px-100 py-100'>
        <div className='flex w-1/2 justify-items-start'>
          {block.back_link && (
            <Link href={`${block.back_link}`} className="link inline-flex items-center mr-auto text-blue " aria-label="Previous">
              <div ref={PrevArrowRef}><PrevIcon className={`${styles.prevarrow} w-30 h-auto`} /></div>
              <span ref={PrevTextRef} className="font-nothingyoucoulddo text-40 font-400 text-blue pl-20">{block.back_link_copy ? block.back_link_copy : 'Previous'}</span>
            </Link>
          )}
        </div>
        <div className='flex w-1/2 justify-items-end'>
          {block.forward_link && (
            <Link href={`${block.forward_link}`} className="link inline-flex items-center ml-auto text-blue " aria-label="Next">
              <span ref={NextTextRef} className="font-nothingyoucoulddo text-40 font-400 text-blue pr-20">{block.forward_link_copy ? block.forward_link_copy : 'Next'}</span>
              <div ref={NextArrowRef}><NextIcon className={`${styles.nextarrow} w-30 h-auto`} /></div>
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}

export default PostNavigationBlock
