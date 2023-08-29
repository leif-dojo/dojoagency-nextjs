"use client"
import React, { useRef, useEffect, useLayoutEffect } from 'react'
import styles from './home_headline.module.scss'
import { useThemeContext } from '@/context/theme'
import { useIsMobile, hexToRgb } from '@/utils/general'
import Telegraph from '@/public/telegraph.svg'
import Typewriter from '@/public/typewriter.svg'
import CommunicationArts from '@/public/communication-arts.svg'
import Paintbrush from '@/public/paint-brush.svg'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)
import ScrollText from '@/utils/SplitText'

export const typename = 'Set_Components_HomeHeadline'
const HomeHeadlineBlock = ({ block }: { block: any }) => {
  const { cursorType, cursorChangeHandler, colorChangeHandler, backgroundChangeHandler } = useThemeContext();
  const sectionRef = useRef<HTMLDivElement>(null)
  const TelegraphRef = useRef<HTMLDivElement>(null)
  const TypewriterRef = useRef<HTMLDivElement>(null)
  const PaintbrushRef = useRef<HTMLDivElement>(null)
  const ComRef = useRef<HTMLDivElement>(null)
  const SubRef = useRef<HTMLDivElement>(null)

  const isMobile = () => {
    if (process.browser) {
      return window.innerWidth < 1024
    }
  }

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {

      //Theme Colors
      const TextColor = block.text_color ? block.text_color : '#FFFFFF';
      const BackgroundColor = block.background_color ? block.background_color : '#783d67';
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
      //let tickernai = gsap.to('.tele-ticker', { rotation: '+=4cw', repeat: -1, ease: 'none' })

      if (SubRef.current) {
        let split = new ScrollText({
          words: 0,
          chars: 1,
          spacing: "0.33em"
        }).split(SubRef?.current)
      }

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      //main
      setTimeout(() => {

        //add delay due to object query
        gsap
          .timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: isMobile() ? 'top 50%':'top bottom',
              //end: 'bottom bottom',
              //scrub: true,
              toggleActions: "restart none none reverse",
              //markers: true,
            },
          })
          .fromTo(
            ".telegraph",
            { autoAlpha: 0 },
            {
              duration: 0.2,
              autoAlpha: 1,
              ease: 'power3.out'
            }
          )
          .to('.tele-ticker', { rotation: '+=4cw', repeat: 4, ease: 'none' })
          .to(
            ".morse",
            {
              keyframes: [
                { autoAlpha: 0, fill: "rgb(241,90,36)", duration: 0 },
                {
                  autoAlpha: 1, fill: "rgb(241,90,36)",
                  duration: 0.4,
                  ease: 'power3.out'
                },
                { autoAlpha: 0, fill: "rgb(241,90,36)", duration: 0 },
              ],
              stagger: 0.03
            }, 0
          )
          .fromTo(
            ".text1",
            { autoAlpha: 0 },
            {
              autoAlpha: 1,
              duration: 0.15,
              stagger: 0.07,
              ease: 'power3.out'
            }, 0.5
          )
          .to(
            ".telegraph",
            { autoAlpha: 0 },
            ">"
          )
          /*.fromTo(
            document.getElementById("communicationarts")?.contentDocument.querySelectorAll('.paint-2'),
            { autoAlpha: 0, x: -1000 },
            {
              duration: 0.1, autoAlpha: 1, x: 0,
              ease: 'power3.out'
            },
          )*/
          .to(
            document.getElementById("communicationartspaint")?.contentDocument.querySelector('.stop2'),
            {
              duration: 0.3, attr: { offset: "52%" },
              ease: 'power3.out'
            },
            ">"
          )
          .fromTo(
            ".text2",
            { autoAlpha: 0 },
            {
              autoAlpha: 1,
              duration: 0.005,
              stagger: 0.01,
              ease: 'power3.out'
            }, 2.2
          )
          .to(
            ".paintbrush",
            {
              keyframes: [
                { x: "0%", autoAlpha: 0, duration: 0 },
                { x: "215%", autoAlpha: 1, duration: 0.3 },
                { x: "215%", duration: 0.9 },
                { x: "450%", duration: 0.6, ease: 'power3.out' },
                { x: "550%", autoAlpha: 1, duration: 0.5, ease: 'power3.out' },
                { autoAlpha: 1, duration: 0 },
                { autoAlpha: 0, duration: 0 }
              ]
            }, 2.1
          )
          .to(
            ".paintbrushsvg",
            {
              keyframes: [
                { y: "0%", rotation: 0, duration: 0.25 },
                { y: "-70%", rotation: -45, duration: 0.2 },
                { y: "-140%", rotation: -70, duration: 0.4 },
                { y: "-100%", rotation: -70, duration: 0.2 },
                { y: "-20%", rotation: -30, duration: 0.1 },
                { y: "-10%", rotation: 0, duration: 0.1 },
              ]
            }, 2.1
          )
          .to(
            ".paintbrush-1",
            {
              keyframes: [
                { autoAlpha: 1, duration: 0 },
                { autoAlpha: 1, duration: 0.4 },
                { autoAlpha: 0, duration: 0 },
                { autoAlpha: 0, duration: 0.4 },
                { autoAlpha: 1, duration: 0 },
                { autoAlpha: 1, duration: 0.1 },
                { autoAlpha: 0, duration: 0 },
                { autoAlpha: 0, duration: 0.2 },
                { autoAlpha: 1, duration: 0 },
              ]
            }, 2.1
          )
          .to(
            ".paintbrush-2",
            {
              keyframes: [
                { autoAlpha: 0, duration: 0 },
                { autoAlpha: 0, duration: 0.9 },
                { autoAlpha: 1, duration: 0 },
                { autoAlpha: 1, duration: 0.2 },
                { autoAlpha: 0, duration: 0 },
              ]
            }, 2.1
          )
          .to(
            ".paintbrush-3",
            {
              keyframes: [
                { autoAlpha: 0, duration: 0 },
                { autoAlpha: 0, duration: 0.4 },
                { autoAlpha: 1, duration: 0 },
                { autoAlpha: 1, duration: 0.4 },
                { autoAlpha: 0, duration: 0 }
              ]
            }, 2.1
          )
          .fromTo(
            ".text3",
            { autoAlpha: 0 },
            {
              autoAlpha: 1,
              duration: 0.005,
              stagger: 0.01,
              ease: 'power3.out'
            }, 3.4
          )
          .to(
            document.getElementById("communicationartspaint")?.contentDocument.querySelector('.stop2'),
            {
              duration: 0.2, attr: { offset: "100%" },
              ease: 'power3.out'
            }, 3.4
          )
          .fromTo(
            ".typewriter",
            { autoAlpha: 0 },
            {
              duration: 0.1, autoAlpha: 1,
              ease: 'power3.out'
            }
          )
          .fromTo(
            ".sub div",
            { autoAlpha: 0, y: "25%" },
            {
              duration: 0.1, autoAlpha: 1, y: "0%",
              stagger: 0.04,
              ease: 'power3.out'
            }
          )
          .to(
            ".typewriter-carriage",
            {
              keyframes: [
                { x: "0%", duration: 0.3, ease: 'power3.out' },
                { x: "-12%", duration: 0.3, ease: 'power3.out' },
                { x: "-24%", duration: 0.3, ease: 'power3.out' },
                { x: "-36%", duration: 0.3, ease: 'power3.out' },
                { x: "-48%", duration: 0.3, ease: 'power3.out' },
                { x: "-60%", duration: 0.3, ease: 'power3.out' },
                { x: "0%", duration: 0.3, ease: 'power3.out' }
              ]
            }, 4.5
          )
          .to(
            ".typewriter-key-1",
            {
              keyframes: [
                { y: "0%", duration: 0 },
                { y: "90%", duration: 0.3, fill: '#e8ad45', ease: 'power3.out' },
                { y: "0%", fill: '#FFF', duration: 0.3 },
              ]
            }, 4.8
          )
          .to(
            ".typewriter-key-2",
            {
              keyframes: [
                { y: "0%", duration: 0 },
                { y: "90%", duration: 0.3, fill: '#e8ad45', ease: 'power3.out' },
                { y: "0%", fill: '#FFF', duration: 0.3 },
              ]
            }, 5.1
          )
          .to(
            ".typewriter-key-3",
            {
              keyframes: [
                { y: "0%", duration: 0 },
                { y: "90%", duration: 0.3, fill: '#e8ad45', ease: 'power3.out' },
                { y: "0%", fill: '#FFF', duration: 0.3 },
              ]
            }, 5.4
          )
          .to(
            ".typewriter-key-4",
            {
              keyframes: [
                { y: "0%", duration: 0 },
                { y: "90%", duration: 0.3, fill: '#e8ad45', ease: 'power3.out' },
                { y: "0%", fill: '#FFF', duration: 0.3 },
              ]
            }, 5.7
          )
          .to(
            ".typewriter-key-1",
            {
              keyframes: [
                { y: "0%", duration: 0 },
                { y: "90%", duration: 0.3, fill: '#e8ad45', ease: 'power3.out' },
                { y: "0%", fill: '#FFF', duration: 0.3 },
              ]
            }, 6.0
          )
          .to(
            ".typewriter-key-2",
            {
              keyframes: [
                { y: "0%", duration: 0 },
                { y: "90%", duration: 0.3, fill: '#e8ad45', ease: 'power3.out' },
                { y: "0%", fill: '#FFF', duration: 0.3 },
              ]
            }, 6.3
          )
          .to(
            ".typewriter",
            { autoAlpha: 0, duration: 0.3 }
          )
        /*.to(element, {
          color: `rgb(${hexToRgb('#FFF')})`,
          backgroundColor: `rgb(${hexToRgb('#304a5f')})`,
          ease: "none",
          onUpdate: (e) => {
            colorChangeHandler(getter("color"))
            backgroundChangeHandler(getter("backgroundColor"))
          }
        })*/
      }, 250);


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
        <div className="w-full relative">
          <div ref={ComRef} className={`${styles.communication} relative text-themebackground`}>

            <CommunicationArts className={`relative z-5`} />
            <object id="communicationartspaint" type="image/svg+xml" data="/communication-arts-paint.svg" className={`${styles.paint} absolute top-0 w-full h-auto`}></object>

            <div ref={PaintbrushRef} className={`${styles.paintbrush} paintbrush absolute opacity-0 mb-20 text-slate`}>
              <div className={`${styles.paintbrushsvg} paintbrushsvg relative`}>
                <Paintbrush />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full pt-0 px-40 md:px-80 -mt-10 md:-mt-40">
          <div className="w-full text-center">
            <div ref={SubRef} className="sub font-americantypewriter text-30 md:text-48 leading-none font-500 pb-40 text-left">
              {block.subheadline}
            </div>
            <div ref={TypewriterRef} className={`${styles.typewriter} typewriter w-140 mb-20 mx-auto text-center text-slate`}>
              <Typewriter />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomeHeadlineBlock
