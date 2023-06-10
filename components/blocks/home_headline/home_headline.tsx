"use client"
import React, { useRef, useEffect, useLayoutEffect } from 'react'
import styles from './home_headline.module.scss'
import Telegraph from '@/public/telegraph.svg'
import Typewriter from '@/public/typewriter.svg'
import CommunicationArts from '@/public/communication-arts.svg'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)
import ScrollText  from '@/utils/SplitText'

export const typename = 'Set_Components_HomeHeadline'

const HomeHeadlineBlock = ({ block }: { block: any }) => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const TelegraphRef = useRef<HTMLDivElement>(null)
  const TypewriterRef = useRef<HTMLDivElement>(null)
  const ComRef = useRef<HTMLDivElement>(null)
  const SubRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      /*gsap
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
          backgroundColor: "#304a5f"
      }, {
          backgroundColor: "#ffffff", 
      },
      )*/

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
        { duration: 0.5, autoAlpha: 1, y: 0 }
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
        { duration: 0.7, autoAlpha: 1, fill: "rgb(255,255,255)",
          stagger: 0.09,
          ease: 'power3.out' },0
      )
      .fromTo(
        ".text1",
        { autoAlpha: 0 },
        { duration: 0.55, autoAlpha: 1,
          stagger: 0.22,
          ease: 'power3.out' },0.2
      )
      .fromTo(
        ".telegraph",
        { autoAlpha: 1 },
        { duration: 0.2, autoAlpha: 0,
          ease: 'power3.out' }
      )
      .fromTo(
        ".paint",
        { autoAlpha: 0, x: -1000 },
        { duration: 0.5, autoAlpha: 1, x: 0,
          stagger: 0.3,
          ease: 'power3.out' }
      )
      .fromTo(
        ".typewriter",
        { autoAlpha: 0 },
        { duration: 0.3, autoAlpha: 1,
          ease: 'power3.out' }
      )
      .fromTo(
        ".sub div",
        { autoAlpha: 0, y: 5 },
        { duration: 0.2, autoAlpha: 1, y: 0,
          stagger: 0.06,
          ease: 'power3.out'
        }
      )

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
  <section ref={sectionRef} className={`${styles.root} relative w-full bg-white text-slate z-10`}>
    <div className="px-50 md:px-20 py-160">
      <div className="w-full px-0 md:px-100">
        <div ref={TelegraphRef} className={`${styles.telegraph} w-100 mb-20`}>
          <Telegraph />
        </div>
      </div>
      <div className="w-full">
        <div ref={ComRef} className={`${styles.communication} mb-20`}>
          <CommunicationArts />
        </div>
      </div>
      <div className="w-full px-0 md:px-100">
        <div className="w-full flex">
          <div ref={TypewriterRef} className={`${styles.typewriter} w-100 mb-20`}>
            <Typewriter />
          </div>
          <div ref={SubRef} className="sub text-55 leading-none font-600">
            {block.subheadline}
          </div>
        </div>
      </div>
    </div>
  </section>
)}

export default HomeHeadlineBlock
