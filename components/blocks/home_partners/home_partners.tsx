"use client"
import React, { useContext, useEffect, useState, useRef, useLayoutEffect } from 'react'
import Image from 'next/image'
import styles from './home_partners.module.scss'
import { useThemeContext } from '@/context/theme'
import { useIsMobile, hexToRgb, rgbToHex } from '@/utils/general'
import OvalArrow from '@/public/icons/icon-oval-arrow.svg'
import NextArrow from '@/public/icons/icon-arrow-next-style.svg'
import TextNext from '@/public/text-next.svg'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export const typename = 'Set_Components_HomePartners'

const HomePartners = ({ block }: { block: any }) => {
  const { cursorType, cursorChangeHandler, colorChangeHandler, backgroundChangeHandler} = useThemeContext();
  const [step, setStep] = useState(0)
  const [colorlocal, setColorLocal] = useState('');
  const [backgroundColorlocal, setBackgroundColorLocal] = useState('');
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

      //set iniital if avail
      if(colorlocal != ''){
        var r = document.querySelector('body');
        r.style.color = '#FFF';
        r.style.backgroundColor = '#231f20';
        colorChangeHandler('rgb(255,255,255)')
        backgroundChangeHandler('rgb(35, 31, 32)')
      }

      //Theme Colors
      const TextColor = '#FFFFFF';
      const BackgroundColor = '#231f20';
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
          setColorLocal(getter("color"))
          setBackgroundColorLocal(getter("backgroundColor"))
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
      ).set( ArrowRef.current, {
        className: styles.draw
      }).fromTo(
        ".logo",
        {alpha: 0, }, 
        {alpha: 1, duration: 0.2}
      ).add( function(){
        if(process.browser){
          document.getElementById("ovalobject")?.contentDocument?.getElementById("maskanimate")?.beginElement();
        }
       } ).fromTo(
        ".copy",
        {alpha: 0, y: 50 }, 
        {alpha: 1, y: 0, duration: 0.25},
        1.5
      ).set( NextArrowRef.current, {
        className: styles.draw
      })
      .set(
        NextRef.current, {
          className: styles.draw
        }
      )


      function setSignaturePaths() {
        let totalDur = 1
        // get all SVG elements - lines and dots
        const paths = sectionRef.current.querySelectorAll('.autograph__path')
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

        return true
      }

      setSignaturePaths()

    }, sectionRef);
    return () => ctx.revert();
  }, [step]);

  return (
    <section ref={sectionRef} className={`${styles.root} relative w-full  z-10`}>
      <div className=" fuck px-50 md:px-100 py-190">
        {block?.partners_grid?.map((item: any, index: any) => {
          //console.log('col: ', index, block)
          return (
            <div key={index}>
              {step === index && (
                <div className="block md:flex">
                  <div className="w-full md:w-1/2 text-center pb-100 md:pb-0">
                    <div ref={RecentRef} className="recent text-52 font-600 pb-20 fade">{block.headline}</div>
                    <div className={`w-full md:w-3/4 mx-auto relative`}>
                      
                      <div className={`${styles.wrap} relative w-full text-center mx-auto pt-20 pb-30 flex items-center`}>
                        <div className={`${styles.ovalwrap} circle absolute left-0 top-0 w-full h-full`}>
                          <div ref={CircleRef}>
                              <object id="ovalobject" type="image/svg+xml" data="/icons/icon-oval-single.svg" className={`${styles.oval} oval w-full h-auto`}></object>
                          </div>
                        </div>
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
                      <div ref={CopyRef} className='copy text-40 leading-60 font-300 ' dangerouslySetInnerHTML={{ __html: item.description }}></div>
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
