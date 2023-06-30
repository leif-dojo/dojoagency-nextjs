"use client"
import React, { useRef, useEffect, useLayoutEffect } from 'react'
import styles from './home_headline.module.scss'
import { useThemeContext } from '@/context/theme'
import { useIsMobile, hexToRgb, rgbToHex } from '@/utils/general'
import Telegraph from '@/public/telegraph.svg'
import Typewriter from '@/public/typewriter.svg'
import CommunicationArts from '@/public/communication-arts.svg'
import Paintbrush from '@/public/paint-brush.svg'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)
import ScrollText  from '@/utils/SplitText'

export const typename = 'Set_Components_HomeHeadline'

const HomeHeadlineBlock = ({ block }: { block: any }) => {
  const { cursorType, cursorChangeHandler, colorChangeHandler, backgroundChangeHandler} = useThemeContext();
  const sectionRef = useRef<HTMLDivElement>(null)
  const TelegraphRef = useRef<HTMLDivElement>(null)
  const TypewriterRef = useRef<HTMLDivElement>(null)
  const PaintbrushRef = useRef<HTMLDivElement>(null)
  const ComRef = useRef<HTMLDivElement>(null)
  const SubRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {

      //Theme Colors
      const TextColor = '#304A5F';
      const BackgroundColor = '#FFFFFF';
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
        TelegraphRef.current,
        { autoAlpha: 0, y: 50 },
        { duration: 0.3, autoAlpha: 1, y: 0 }
      )
      gsap.to('.tele-ticker', { rotation: '+=4cw', repeat: -1, ease: 'none'}) 

      if (SubRef.current) {
        let split = new ScrollText({
          words: 0,
          chars: 1,
          spacing: "0.33em"
        }).split(SubRef?.current)
      }

      //main
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
        ".morse",
        { autoAlpha: 0, fill: "rgb(241,90,36)" },
        { duration: 0.23, autoAlpha: 1, fill: "rgb(255,255,255)",
          stagger: 0.02,
          ease: 'power3.out' },0
      )
      .fromTo(
        ".text1",
        { autoAlpha: 0 },
        { duration: 0.20, autoAlpha: 1,
          stagger: 0.05,
          ease: 'power3.out' },0.1
      )
      .fromTo(
        ".telegraph",
        { autoAlpha: 1 },
        { duration: 0.05, autoAlpha: 0,
          ease: 'power3.out' }
      )
      .fromTo(
        ".text2",
        { autoAlpha: 0 },
        { duration: 0, autoAlpha: 1,
          ease: 'power3.out' }
      )
      .fromTo(
        ".paint",
        { autoAlpha: 0, x: -1000 },
        { duration: 0.1, autoAlpha: 1, x: 0,
          ease: 'power3.out' }
      )
      .to(
        ".paintbrush",
        { keyframes: [
          {x:"0%",autoAlpha:0,duration: 0}, 
          {x:"500%",autoAlpha:1,duration: 0.7,ease: 'power3.out'},
          {autoAlpha:1,duration: 0},
          {autoAlpha:0,duration: 0}
        ] },1.3
      )
      .fromTo(
        ".typewriter",
        { autoAlpha: 0 },
        { duration: 0.1, autoAlpha: 1,
          ease: 'power3.out' }
      )
      .fromTo(
        ".sub div",
        { autoAlpha: 0, y: 5 },
        { duration: 0.2, autoAlpha: 1, y: 0,
          stagger: 0.02,
          ease: 'power3.out'
        }
      )      
      .to(
        ".typewriter-carriage",
        { keyframes: [
          {x:"0%",duration: 0.3,ease: 'power3.out'}, 
          {x:"-15%",duration: 0.3,ease: 'power3.out'},
          {x:"-40%",duration: 0.3,ease: 'power3.out'},
          {x:"-70%",duration: 0.3,ease: 'power3.out'},
          {x:"0%",duration: 0.3,ease: 'power3.out'}
        ] },1.5
      )
      .to(
        ".typewriter-key-1",
        { keyframes: [
          {y:"0%",duration: 0}, 
          {y:"90%",duration: 0.3,ease: 'power3.out'},
          {y:"0%",duration: 0.3},
        ] },1.5
      )
      .to(
        ".typewriter-key-2",
        { keyframes: [
          {y:"0%",duration: 0}, 
          {y:"90%",duration: 0.3,ease: 'power3.out'},
          {y:"0%",duration: 0.3},
        ] },1.7
      )
      .to(
        ".typewriter-key-3",
        { keyframes: [
          {y:"0%",duration: 0}, 
          {y:"90%",duration: 0.3,ease: 'power3.out'},
          {y:"0%",duration: 0.3},
        ] },1.9
      )
      .to(
        ".typewriter-key-4",
        { keyframes: [
          {y:"0%",duration: 0}, 
          {y:"90%",duration: 0.3,ease: 'power3.out'},
          {y:"0%",duration: 0.3},
        ] },2
      )
      .to(
        ".typewriter",
        { duration: 0.2, autoAlpha: 0,
          ease: 'power3.out' }
      )

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
  <section ref={sectionRef} id="home-headline" className={`${styles.root} relative w-full z-10 overflow-hidden`}>
    <div className="px-0 md:px-20 py-100">
      <div className="w-full px-40 md:px-80">
        <div ref={TelegraphRef} className={`${styles.telegraph} w-100 mb-20`}>
          <Telegraph />
        </div>
      </div>
      <div className="w-full">
        <div ref={ComRef} className={`${styles.communication} relative text-themebackground`}>
          <CommunicationArts />
          <div ref={PaintbrushRef} className={`${styles.paintbrush} paintbrush absolute opacity-0 w-400 mb-20 text-slate`}>
            <Paintbrush />
          </div>
        </div>
      </div>
      <div className="w-full pt-20 px-40 md:px-80">
        <div className="w-full text-left">
          <div ref={SubRef} className="sub text-40 md:text-55 leading-none font-600 pb-40 text-left">
            {block.subheadline}
          </div>
          <div ref={TypewriterRef} className={`${styles.typewriter} typewriter w-140 mb-20 text-slate`}>
            <Typewriter />
          </div>
        </div>
      </div>
    </div>
  </section>
)}

export default HomeHeadlineBlock
