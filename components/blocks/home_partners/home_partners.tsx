"use client"
import React, { useContext, useEffect, useState, useRef, useLayoutEffect } from 'react'
import Image from 'next/image'
import styles from './home_partners.module.scss'
import Oval from '@/public/icons/icon-oval.svg'
import OvalArrow from '@/public/icons/icon-oval-arrow.svg'
import NextArrow from '@/public/icons/icon-arrow-next-style.svg'
import TextNext from '@/public/text-next.svg'
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
  const NextTextRef = useRef<HTMLDivElement>(null)

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
      )/*.fromTo(
        ".arrow svg",
        {alpha: 0, y: 50 }, 
        {alpha: 1, y: 0, duration: 0.3}
      )*/.set( ArrowRef.current, {
        className: styles.draw
      }).fromTo(
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
      })
      .set(
        NextRef.current, {
          className: styles.draw
        }
      )/*.fromTo(
        NextArrowRef.current,
        {alpha: 0, y: -50 }, 
        {alpha: 1, y: 0, duration: 0.2}
      )*//*.fromTo(
        NextRef.current,
        {alpha: 0, x: -50 }, 
        {alpha: 1, x: 0, delay: 0.5,duration: 0.2}
      )*/

      /*const shape1 = 'M469.539032,263.986786H-0.000001L0,229.890961c310.649475,58.156982,255.61113-98.5,469.539032-65.062302V263.986786z'
      const shape2 = 'M0.908,0.363C0.83,4.822-1.056,9.736,1.706,13.777C4,17.131,8.043,18.5,11.931,18.785 c2.567,0.188,5.148,0.027,7.708-0.195c-0.063-0.232-0.126-0.465-0.188-0.697c-2.238,1.016-4.477,2.033-6.713,3.053 c-0.383,0.172-0.104,0.85,0.289,0.684c3.273-1.379,6.617-2.58,10.022-3.596c-0.066-0.242-0.133-0.482-0.199-0.723 c-1.991,0.67-4.08,0.064-5.976-0.643c-1.908-0.713-3.715-1.662-5.404-2.797c-0.4-0.27-0.776,0.379-0.378,0.646 c1.804,1.215,3.746,2.209,5.79,2.949c1.963,0.715,4.119,1.256,6.167,0.566c0.453-0.154,0.268-0.863-0.199-0.723 c-3.404,1.016-6.75,2.217-10.023,3.596c0.097,0.229,0.192,0.457,0.289,0.686c2.237-1.018,4.476-2.035,6.713-3.053 c0.335-0.152,0.173-0.73-0.189-0.699c-4.012,0.348-8.401,0.713-12.253-0.717c-1.78-0.66-3.454-1.734-4.656-3.219 c-1.363-1.684-1.834-3.766-1.788-5.9c0.055-2.563,0.672-5.076,0.717-7.641C1.666-0.12,0.916-0.12,0.908,0.363'
      gsap
      .timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: '100% bottom',
          //end: 'bottom top',
          //scrub: true,
          markers: true,
          toggleActions: "restart none none reverse"
        },
      }).fromTo(
        ".next-path",
        {attr: { d: shape1 } }, 
        {attr: { d: shape2 }, duration: 2}
      )*/


      function calcPaths() {
        let totalDur = 1
        // unset 'animated' class to body which will reset the animation
        document.body.classList.remove('animated')

        // get all SVG elements - lines and dots
        const paths = document.querySelectorAll('.autograph__path')
        // prepare path length variable
        let len = 0
        // prepare animation delay length variable
        let delay = 0

        // escape if no elements found
        if (!paths.length) {
          return false
        }

        // set duration in seconds of animation to default if not set
        const totalDuration = totalDur || 5

        // calculate the full path length
        paths.forEach((path) => {
          const totalLen = path.getTotalLength()
          len += totalLen
        })
        console.log("each: ", paths.length)
        paths.forEach((path) => {
          const pathElem = path
          // get current path length
          const totalLen = path.getTotalLength()
          // calculate current animation duration
          const duration = totalLen / len * totalDuration

          // set animation duration and delay
          pathElem.style.animationDuration = `${duration < 0.1 ? 0.1 : duration}s`
          pathElem.style.animationDelay = `${delay}s`

          // set dash array and offset to path length - this is how you hide the line
          pathElem.setAttribute('stroke-dasharray', totalLen)
          pathElem.setAttribute('stroke-dashoffset', totalLen)

          // set delay for the next path - added .5 seconds to make it more realistic
          delay += duration + 0.1
        })

        // set 'animated' class to body which will start the animation
        document.body.classList.add('animated')

        return true
      }

      calcPaths()

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
                      <div className="relative mt-[-50rem] text-center">
                        <div className={`${styles.ovalarrowwrap} arrow absolute -left-50 bottom-full w-[55rem] mx-auto`}><div ref={ArrowRef}><OvalArrow className={`${styles.ovalarrow} next w-full h-auto`} /></div></div>
                        <div ref={FactRef} className='fact font-nothingyoucoulddo text-40 font-300 text-blue'>{item.fact}</div>
                      </div>
                    </div>

                  </div>
                  <div className="w-full md:w-1/2 flex items-center">
                    <div className="w-full">
                      <div ref={CopyRef} className='copy text-40 leading-60 font-300 text-white' dangerouslySetInnerHTML={{ __html: item.description }}></div>
                      <div className={`${styles.nextwrap} w-full flex text-left pt-20 text-blue`}>
                        <div ref={NextArrowRef}><NextArrow className={`${styles.nextarrow} next w-40 h-auto`} /></div>
                        <div className={`${styles.next} font-nothingyoucoulddo text-40 font-400 leading-none text-blue ml-10 mt-15 cursor-pointer`} aria-label="Next" onClick={() => advance()}><div ref={NextRef}><TextNext className={`${styles.nexttext} w-100 h-auto`} /></div></div>
                      </div>
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
