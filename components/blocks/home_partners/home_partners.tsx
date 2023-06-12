"use client"
import React, { useContext, useEffect, useState, useRef, useLayoutEffect } from 'react'
import Image from 'next/image'
import styles from './home_partners.module.scss'
import Oval from '@/public/icons/icon-oval.svg'
import OvalArrow from '@/public/icons/icon-oval-arrow.svg'
import NextArrow from '@/public/icons/icon-arrow-next.svg'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export const typename = 'Set_Components_HomePartners'

const HomePartners = ({ block }: { block: any }) => {
  const [step, setStep] = useState(0)
  const advance = () => {
    let next = step + 1;
    const total = block?.partners_grid.length - 1;
    if (next > total) {
      next = 0
    }
    setStep(next)
  }

  const sectionRef = useRef<HTMLDivElement>(null)
  const ArrowRef = useRef<HTMLDivElement>(null)
  const CircleRef = useRef<HTMLDivElement>(null)
  const RecentRef = useRef<HTMLDivElement>(null)
  const LogoRef = useRef<HTMLDivElement>(null)
  const FactRef = useRef<HTMLDivElement>(null)
  const CopyRef = useRef<HTMLDivElement>(null)
  const NextRef = useRef<HTMLDivElement>(null)
  const NextArrowRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      //Background Color
      let t1 = gsap
        .timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom bottom',
            scrub: true,
           // markers: true,
          },
        })
      t1.fromTo(
        sectionRef.current,
        {
          backgroundColor: "#ffffff"
        }, {
        backgroundColor: "#231f20",
      }, 0
      )

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
      
      //Add in elements
      let t2 = gsap
        .timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: '50% bottom',
            //end: 'bottom top',
            //scrub: true,
            //markers: true,
            toggleActions: "restart none none reverse"
          },
        })

      t2.fromTo(
        ".fact",
        {alpha: 0, y: 50 }, 
        {alpha: 1, y: 0, duration: 0.1}
      ).fromTo(
        ".arrow svg",
        {alpha: 0, y: 50 }, 
        {alpha: 1, y: 0, duration: 0.3}
      ).fromTo(
        ".logo",
        {alpha: 0, }, 
        {alpha: 1, duration: 0.2}
      ).fromTo(
        ".circle path",
        {alpha: 0,}, 
        {alpha: 1, duration: 1, stagger: 0.05}
      ).fromTo(
        ".copy",
        {alpha: 0, y: 50 }, 
        {alpha: 1, y: 0, duration: 0.3}
      ).set( NextArrowRef.current, {
        className: styles.draw
      }).fromTo(
        NextRef.current,
        {alpha: 0, x: -50 }, 
        {alpha: 1, x: 0, delay: 0.5,duration: 0.2}
      )
    }, sectionRef);
    return () => ctx.revert();
  }, [step]);

  return (
    <section ref={sectionRef} className={`${styles.root} relative w-full bg-darkgrey text-white z-10`}>
      <div className="px-50 md:px-100 py-190">
        {block?.partners_grid?.map((item: any, index: any) => {
          //console.log('col: ', index, block)
          return (
            <div key={index}>
              {step === index && (
                <div className="block md:flex">
                  <div className="w-full md:w-1/2 text-center pb-100 md:pb-0">
                    <div ref={RecentRef} className="recent text-52 font-600 pb-20">{block.headline}</div>

                    <div className={`w-full md:w-3/4 mx-auto relative`}>
                      
                      <div className={`${styles.wrap} relative w-full text-center mx-auto pt-20 pb-30 flex items-center`}>
                        <div ref={CircleRef} className={`${styles.oval} circle absolute left-0 top-0 w-full h-full`}><Oval /></div>
                        {item.client[0].client_logo_dark ? 
                          item.client[0].client_logo_dark && (
                            <div ref={LogoRef} className={`${styles.logo} logo relative block w-full mr-auto ml-auto z-10`}>
                              <Image
                                src={item.client[0].client_logo_dark?.permalink}
                                width={item.client[0].client_logo_dark?.width}
                                height={item.client[0].client_logo_dark?.height}
                                alt={item.client[0].client_logo_dark?.alt ? item.client[0].client_logo_dark.alt : ''}
                              />
                            </div>
                          ) : 
                          item.client[0].client_logo && (
                            <div ref={LogoRef} className={`${styles.logo} logo relative block w-full mr-auto ml-auto z-10`}>
                              <Image
                                src={item.client[0].client_logo?.permalink}
                                width={item.client[0].client_logo?.width}
                                height={item.client[0].client_logo?.height}
                                alt={item.client[0].client_logo?.alt ? item.client[0].client_logo.alt : ''}
                              />
                            </div>
                          )
                        }
                      </div>
                      <div className="relative text-left mt-80">
                        <div ref={ArrowRef} className={`${styles.ovalarrow} arrow absolute left-150 bottom-full w-[55rem]`}><OvalArrow /></div>
                        <div ref={FactRef} className='fact font-nothingyoucoulddo text-40 font-300 text-blue'>{item.fact}</div>
                      </div>
                    </div>

                  </div>
                  <div className="w-full md:w-1/2">
                    <div ref={CopyRef} className='copy text-40 leading-60 font-300 text-white' dangerouslySetInnerHTML={{ __html: item.description }}></div>
                    <div className={`${styles.nextwrap} w-full flex text-left pt-20 text-blue`}>
                      <div ref={NextArrowRef}><NextArrow className={`${styles.nextarrow} w-40 h-auto`} /></div>
                      <div ref={NextRef} className={`${styles.next} font-nothingyoucoulddo text-40 font-400 leading-none text-blue ml-10 mt-20 cursor-pointer`} aria-label="Next" onClick={() => advance()}>Next</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}

      </div>
    </section>
  )
}

export default HomePartners
