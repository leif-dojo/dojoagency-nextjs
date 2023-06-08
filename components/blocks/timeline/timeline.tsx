"use client"
import React, { useRef, useLayoutEffect } from 'react'
import Image from 'next/image'
import styles from './timeline.module.scss'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { Power0 } from 'gsap-trial'
gsap.registerPlugin(ScrollTrigger)

export const typename = 'Set_Components_Timeline'
const TimelineBlock = ({ block }: { block: any }) => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLDivElement>(null)
  const wysiwygRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
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
        { duration: 0.5, autoAlpha: 1, y: 0 },0.2
      )
      .fromTo(
        wysiwygRef.current,
        { autoAlpha: 0, y: 50 },
        { duration: 0.5, autoAlpha: 1, y: 0 },0.2
      )

      //fades
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
        { duration: 0.9, autoAlpha: 1, y: 0, stagger: 0.25 }
      )

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
  <section ref={sectionRef} className={`${styles.root} w-full bg-white text-slate`}>
    <div className="px-100 py-100">
      <div className="w-full">
        <div className="w-full">
          <div ref={headlineRef} className='wysiwyg text-90 leading-120 font-300' dangerouslySetInnerHTML={{ __html: block.headline }}></div>
        </div>
        <div className="w-full">
          <div ref={wysiwygRef} className='wysiwyg text-30 leading-40 font-300' dangerouslySetInnerHTML={{ __html: block.wysiwyg }}></div>
        </div>
      </div>

      <div className={`${styles.timeline} relative flex flex-nowrap items-stretch w-full my-200`}>

        {block?.timeline?.map((block:any, index:any) => {
          console.log('col: ', index, block)
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
              <div className={`${styles.mid} relative bg-orange z-10`} style={{backgroundColor: block.color}}>
                  <div className='flex items-stretch px-10 py-10'>
                    <div className={`${styles.year} w-full text-24 leading-none font-400 text-white text-center`}>{block.year}</div>
                    <div className={`${styles.headlinewrap} overflow-hidden w-0 mx-0`}>
                      <div className={`${styles.headline} relative text-24 leading-none font-400 text-white whitespace-nowrap text-right`}>{block.headline}</div>
                    </div>
                  </div>
              </div>
              {block.logo && block.overview && (
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
                        {block?.overview?.map((item:any, index:any) => {
                          //console.log('col: ', index, block)
                          return (
                            <div className='text-20 font-300 leading-none text-slate text-left py-5' key={index}>{item}</div>
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
)}

export default TimelineBlock
