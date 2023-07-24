"use client"
import React, { useLayoutEffect, useState, useRef, useEffect } from 'react'
import styles from './home_hero.module.scss'
import Logo from 'public/dojo_animated-01.svg'
import { useThemeContext } from '@/context/theme'
import { useIsMobile, hexToRgb } from '@/utils/general'
import { treestart, treeend } from './trees'
import ScrollDown from '@/public/icons/icon-arrow-scroll.svg'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)
import VideoPlayer from '../../generic/video_player/video_player'

export const typename = 'Set_Components_HomeHero'
const HomeHeroBlock = ({ block }: { block: any }) => {
  const { cursorType, cursorChangeHandler, color, colorChangeHandler, backgroundColor, backgroundChangeHandler } = useThemeContext();
  const sectionRef = useRef<HTMLDivElement>(null)
  const PanelRef = useRef<HTMLDivElement>(null)
  const LogoWrapRef = useRef<HTMLDivElement>(null)
  const LogoRef = useRef<HTMLDivElement>(null)
  const HeadlineRef = useRef<HTMLDivElement>(null)
  const VideoRef = useRef<HTMLDivElement>(null)
  const DownRef = useRef<HTMLDivElement>(null)
  const RainRef = useRef<HTMLDivElement>(null)
  const ArrowRef = useRef<HTMLDivElement>(null)
  const TextRef = useRef<HTMLDivElement>(null)

  const isMobile = () => {
    return window.innerWidth < 1024
  }

  useEffect(() => {
    let ctx = gsap.context(() => {

      //set initial colors
      const TextColor = block.text_color ? block.text_color : '#FFFFFF';
      const BackgroundColor = block.background_color ? block.background_color : '#304A5F';
      var rb = document.querySelector('body');
      rb.style.color = TextColor;
      rb.style.backgroundColor = BackgroundColor;
      colorChangeHandler(hexToRgb(TextColor))
      backgroundChangeHandler(hexToRgb(BackgroundColor))

      //Theme Colors
      const element = document.querySelector("body");
      const getter = gsap.getProperty(element);
      gsap
        .timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 50%",
            end: "top 10%",
            scrub: true,
            //markers: true,
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

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    let ctx = gsap.context(() => {

      //scroll arrow
      gsap
        .timeline()
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
            trigger: PanelRef.current,
            start: 'top 20%',
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

  useEffect(() => {
    let ctx = gsap.context(() => {

      //logo
      gsap
        .timeline({
          scrollTrigger: {
            trigger: PanelRef.current,
            start: isMobile() ? "top 180rem" : "top 340rem",
            end: "10% 0%",
            scrub: true,
            //end: "+=500",
            //markers: true,
            toggleActions: "play reverse play reverse",
          },
        }).fromTo(
          LogoWrapRef.current,
          {
            autoAlpha: 1
          }, {
          autoAlpha: 0,
        }
        )
      //stories
      gsap
        .timeline({
          scrollTrigger: {
            trigger: PanelRef.current,
            start: isMobile() ? "top 180rem" : "top 340rem",
            end: "20% 0%",
            scrub: true,
            //end: "+=500",
            //markers: true,
            toggleActions: "play reverse play reverse",
          },
        }).fromTo(
          HeadlineRef.current,
          {
            fontSize: isMobile() ? "90rem" : "110rem"
            //autoAlpha: 0
          }, {
          fontSize: isMobile() ? "100rem" : "150rem"
          //autoAlpha: 1
        }, 0
        )

      // function to generate drops
      function makeitrain() {
        const rainSection = document.getElementById('rain');
        var increment = 0;
        var interval = 30;
        while (increment < 100) {
          loop(increment);
          increment++
        }

        function loop(i: any,) {
          setTimeout(function () {
            var randoHundo = (Math.floor(Math.random() * (98 - 1 + 1) + 1));
            var randoFiver = (Math.floor(Math.random() * (5 - 2 + 1) + 2));
            var randolength = (Math.floor(Math.random() * (400 - 100 + 1) + 100));
            var randoopacity = Math.random();
            //drop container
            var drop = document.createElement('div');
            drop.classList.add(`${styles.drop}`);
            drop.classList.add(`drop`);
            drop.style.cssText = `height:${randolength}rem;opacity:${randoopacity};left: ${i}%; bottom: ${randoFiver + randoFiver - 1 + 100}%; animation-delay: 0.${randoHundo}s; animation-duration: 0.5${randoHundo}s;`;
            //rain stem
            var stem = document.createElement('div');
            stem.classList.add(`${styles.stem}`);
            stem.style.cssText = `animation-delay: 0.${randoHundo}s; animation-duration: 0.5${randoHundo}s;`;
            drop.appendChild(stem);

            //add in a new raindrop with various randomizations to certain CSS properties
            //drop.innerHTML += `<div class='${styles.drop}' style="height:${randolength}rem;opacity:${randoopacity};left: ${increment}%; bottom: ${randoFiver + randoFiver - 1 + 100}%; animation-delay: 0.${randoHundo}s; animation-duration: 0.5${randoHundo}s;"><div class='${styles.stem}' style="animation-delay: 0.${randoHundo}s; animation-duration: 0.5${randoHundo}s;"></div><div class='${styles.splat}' style="animation-delay: 0.${randoHundo}s; animation-duration: 0.5${randoHundo}s;"></div></div>`;
            //backDrops += '<div class="drop" style="right: ' + increment + '%; bottom: ' + (randoFiver + randoFiver - 1 + 100) + '%; animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"><div class="stem" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div><div class="splat" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div></div>';
            rainSection?.appendChild(drop);
          }, i * interval);
        }
      }

      function stoprain() {
        let drops = Array.from(document.querySelectorAll(".drop"));
        drops.sort((a, b) => 0.5 - Math.random()).forEach((drop: any, i: any) => {
          setTimeout(() => {
            drop.remove()
          }, i * 3);
        });
      };

      function setSignaturePaths() {
        let totalDur = 20
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

          // console.log("each: ", delay, duration, totalLen)

          // set animation duration and delay
          pathElem.style.animationDuration = `${duration < 0.1 ? 0.1 : duration}s`
          pathElem.style.animationDelay = `${delay}s`
          pathElem.setAttribute('data-duration', `${duration < 0.1 ? 0.1 : duration}`);

          // set dash array and offset to path length - this is how you hide the line
          pathElem.setAttribute('stroke-dasharray', totalLen)
          pathElem.setAttribute('stroke-dashoffset', totalLen)

          // set delay for the next path - added .5 seconds to make it more realistic
          delay += duration + 0.0
        })

        return true
      }

      setSignaturePaths()

      function setTreePaths() {
        // get all SVG elements - lines and dots
        const paths = sectionRef.current.querySelectorAll('.tree__path')
        // prepare path length variable
        let len = 0
        // escape if no elements found
        if (!paths.length) {
          return false
        }
        // calculate the full path length
        paths.forEach((path) => {
          const totalLen = path.getTotalLength()
          len += totalLen
        })
        paths.forEach((path) => {
          const pathElem = path
          // get current path length
          const totalLen = path.getTotalLength()
          // set dash array and offset to path length - this is how you hide the line
          pathElem.setAttribute('stroke-dasharray', totalLen)
          pathElem.setAttribute('stroke-dashoffset', totalLen)
        })
        return true
      }

      setTreePaths()

      //Main Dojo logo animation
      const sign_1 = document.getElementsByClassName("signature-1")[0]
      const sign_2 = document.getElementsByClassName("signature-2")[0]
      const sign_3 = document.getElementsByClassName("signature-3")[0]
      const sign_4 = document.getElementsByClassName("signature-4")[0]
      const sign_5 = document.getElementsByClassName("signature-5")[0]
      const sign_6 = document.getElementsByClassName("signature-6")[0]
      const sign_7 = document.getElementsByClassName("signature-7")[0]
      const sign_8 = document.getElementsByClassName("signature-8")[0]
      const sign_9 = document.getElementsByClassName("signature-9")[0]
      const sign_10 = document.getElementsByClassName("signature-10")[0]

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
          ".letter-d",
          { autoAlpha: 0, },
          { duration: 0.15, autoAlpha: 1 },
        )
        .fromTo(
          ".letter-o-1",
          { autoAlpha: 0, },
          { duration: 0.15, autoAlpha: 1 },
        )
        .fromTo(
          ".letter-j",
          { autoAlpha: 0, },
          { duration: 0.15, autoAlpha: 1 },
        )
        .fromTo(
          ".letter-o-2",
          { autoAlpha: 0, },
          { duration: 0.15, autoAlpha: 1 },
        )
        .add(function () {
          if (process.browser) {
            makeitrain();
          }
        }, 1.3)
        .to(
          ".signature-1",
          {
            strokeDashoffset: 0,
            duration: sign_1.dataset.duration,
          }, 1
        )
        .to(
          ".signature-2",
          {
            strokeDashoffset: 0,
            duration: sign_2.dataset.duration,
          }, ">"
        )
        .to(
          ".signature-3",
          {
            strokeDashoffset: 0,
            duration: sign_3.dataset.duration,
          }, ">"
        )
        .fromTo(
          ".splat",
          { autoAlpha: 0, },
          { duration: 0.2, autoAlpha: 1 }
        )
        .to(
          ".signature-4",
          {
            strokeDashoffset: 0,
            duration: sign_4.dataset.duration,
          }, ">"
        )
        .to(
          ".signature-5",
          {
            strokeDashoffset: 0,
            duration: sign_5.dataset.duration,
          }, ">"
        )
        .to(
          ".signature-6",
          {
            strokeDashoffset: 0,
            duration: sign_6.dataset.duration,
          }, ">"
        )
        .to(
          ".signature-7",
          {
            strokeDashoffset: 0,
            duration: sign_6.dataset.duration,
          }, ">"
        )
        .to(
          ".signature-8",
          {
            strokeDashoffset: 0,
            duration: sign_6.dataset.duration,
          }, ">"
        )
        .to(
          ".signature-9",
          {
            strokeDashoffset: 0,
            duration: sign_6.dataset.duration,
          }, ">"
        )
        .to(
          ".signature-10",
          {
            strokeDashoffset: 0,
            duration: sign_6.dataset.duration,
          }, ">"
        )
        .to(
          ".signature-1",
          {
            keyframes: [
              { strokeDashoffset: -1 * sign_1.getTotalLength(), duration: sign_1.dataset.duration, },
              { autoAlpha: 0, duration: 0 }
            ]
          }, sign_1.dataset.duration
        )
        .to(
          ".signature-2",
          {
            keyframes: [
              { strokeDashoffset: -1 * sign_2.getTotalLength(), duration: sign_2.dataset.duration, },
              { autoAlpha: 0, duration: 0 }
            ]
          }, ">0.2"
        )
        .to(
          ".signature-3",
          {
            keyframes: [
              { strokeDashoffset: -1 * sign_3.getTotalLength(), duration: sign_3.dataset.duration, },
              { autoAlpha: 0, duration: 0 }
            ]
          }, ">"
        )
        .to(
          ".signature-4",
          {
            keyframes: [
              { strokeDashoffset: -1 * sign_4.getTotalLength(), duration: sign_4.dataset.duration, },
              { autoAlpha: 0, duration: 0 }
            ]
          }, ">"
        )
        .to(
          ".signature-5",
          {
            keyframes: [
              { strokeDashoffset: -1 * sign_5.getTotalLength(), duration: sign_5.dataset.duration, },
              { autoAlpha: 0, duration: 0 }
            ]
          }, ">"
        )
        .to(
          ".signature-6",
          {
            keyframes: [
              { strokeDashoffset: -1 * sign_6.getTotalLength(), duration: sign_6.dataset.duration, },
              { autoAlpha: 0, duration: 0 }
            ]
          }, ">"
        )
        .to(
          ".signature-7",
          {
            keyframes: [
              { strokeDashoffset: -1 * sign_7.getTotalLength(), duration: sign_7.dataset.duration, },
              { autoAlpha: 0, duration: 0 }
            ]
          }, ">"
        )
        .to(
          ".signature-8",
          {
            keyframes: [
              { strokeDashoffset: -1 * sign_8.getTotalLength(), duration: sign_8.dataset.duration, },
              { autoAlpha: 0, duration: 0 }
            ]
          }, ">"
        )
        .to(
          ".signature-9",
          {
            keyframes: [
              { strokeDashoffset: -1 * sign_9.getTotalLength(), duration: sign_9.dataset.duration, },
              { autoAlpha: 0, duration: 0 }
            ]
          }, ">"
        )
        .to(
          ".signature-10",
          {
            keyframes: [
              { strokeDashoffset: -1 * sign_10.getTotalLength(), duration: sign_10.dataset.duration, },
              { autoAlpha: 0, duration: 0 }
            ]
          }, ">"
        )
        /*.fromTo(
          ".tree",
          { autoAlpha: 0, },
          { duration: 0.7, autoAlpha: 1 },1.2
        )*/
        .to(
          ".tree",
          {
            strokeDashoffset: 0,
            duration: 1.4,
          }, 1.23
        )
        .fromTo(
          ".letter-a",
          { autoAlpha: 0 },
          { duration: 0.2, autoAlpha: 1 }, 2.4
        )
        .fromTo(
          ".letter-g",
          { autoAlpha: 0, },
          { duration: 0.2, autoAlpha: 1 }, 2.7
        )
        .fromTo(
          ".letter-e",
          { autoAlpha: 0, },
          { duration: 0.2, autoAlpha: 1 }, 3.0
        )
        .fromTo(
          ".letter-n",
          { autoAlpha: 0, },
          { duration: 0.2, autoAlpha: 1 }, 3.3
        )
        .fromTo(
          ".letter-c",
          { autoAlpha: 0, },
          { duration: 0.2, autoAlpha: 1 }, 3.6
        )
        .fromTo(
          ".letter-y",
          { autoAlpha: 0, },
          { duration: 0.2, autoAlpha: 1 }, 3.9
        )
        .to(
          ".letter-y",
          {
            keyframes: [
              { y: "0%", fill: "rgba(255,255,255,0)", duration: 0 },
              { y: "-20%", fill: "rgba(255,255,255,1)", duration: 0.2 },
              { y: "0%" }
            ]
          }, 4
        )
        .to(
          ".letter-c",
          {
            keyframes: [
              { y: "0%", fill: "rgba(255,255,255,0)", duration: 0 },
              { y: "-20%", fill: "rgba(255,255,255,1)", duration: 0.2 },
              { y: "0%" }
            ]
          }, 4.1
        )
        .to(
          ".letter-n",
          {
            keyframes: [
              { y: "0%", fill: "rgba(255,255,255,0)", duration: 0 },
              { y: "-20%", fill: "rgba(255,255,255,1)", duration: 0.2 },
              { y: "0%" }
            ]
          }, 4.2
        )
        .to(
          ".letter-e",
          {
            keyframes: [
              { y: "0%", fill: "rgba(255,255,255,0)", duration: 0 },
              { y: "-20%", fill: "rgba(255,255,255,1)", duration: 0.2 },
              { y: "0%" }
            ]
          }, 4.3
        )
        .to(
          ".letter-g",
          {
            keyframes: [
              { y: "0%", fill: "rgba(255,255,255,0)", duration: 0 },
              { y: "-20%", fill: "rgba(255,255,255,1)", duration: 0.2 },
              { y: "0%" }
            ]
          }, 4.4
        )
        .to(
          ".letter-a",
          {
            keyframes: [
              { y: "0%", fill: "rgba(255,255,255,0)", duration: 0 },
              { y: "-20%", fill: "rgba(255,255,255,1)", duration: 0.2 },
              { y: "0%" }
            ]
          }, 4.5
        )
        .to(
          ".tree",
          {
            strokeDashoffset: -1 * document.getElementsByClassName("tree")[0].getTotalLength(),
            duration: 1,
          }, 5
        )
        .add(function () {
          if (process.browser) {
            stoprain();
          }
        })
        .to(
          ".splat",
          { duration: 0.25, autoAlpha: 0 }, 5.5
        )
        .to(".tree",
          {
            keyframes: [
              { attr: { d: treeend }, duration: 0 },
              { attr: { d: treestart }, strokeDashoffset: 0, fill: '#FFF', duration: 0 },
              { attr: { d: treeend }, duration: 0.8 }
            ]
          }, 6
        )

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const scrollTo = () => {
    //document.getElementById("home-headline").scrollIntoView({ behavior: "smooth" });
    const nextSection = sectionRef.current.nextSibling
    nextSection.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section ref={sectionRef} className={`${styles.root} bg-themebackground-off w-full pb-0`} onMouseEnter={() => cursorChangeHandler("peace")} onMouseLeave={() => cursorChangeHandler("default")}>
      <div ref={RainRef} id="rain" className={`${styles.rain} absolute w-full h-full top-0 left-0 z-9`}></div>

      <div className='relative w-full'>
        <div className={`fixed top-220 md:top-60 w-full z-5`}>
          <div ref={LogoWrapRef} className={`${styles.logo} logo w-full text-center px-0 pb-40`}>
            <div ref={LogoRef} className='w-full'>
              <Logo className={`${styles.logosvg} w-full h-auto`} />
              <div className={`${styles.splat} splat ${styles.splatd}`}><div></div><div></div><div></div><div></div></div>
              <div className={`${styles.splat} splat ${styles.splato}`}><div></div><div></div><div></div><div></div></div>
              <div className={`${styles.splat} splat ${styles.splatj}`}><div></div><div></div><div></div><div></div></div>
              <div className={`${styles.splat} splat ${styles.splato2}`}><div></div><div></div><div></div><div></div></div>
            </div>
          </div>
        </div>

        <div ref={PanelRef} className={`${styles.panel} relative w-full bg-themebackground-ff px-50 md:px-100 mt-360 md:mt-320 pb-180 md:pb-100 z-6`}>
          <div ref={HeadlineRef} className='relative w-full text-center font-lato text-90 md:text-113 font-300 leading-none py-20 fade'>
            <span className='relative'>S<div className={`${styles.splat} splat ${styles.splats}`}><div></div><div></div><div></div><div></div></div></span>tori<span className='relative'>e<div className={`${styles.splat} splat ${styles.splate}`}><div></div><div></div><div></div><div></div></div></span>s at work
          </div>
          <div className={`flex justify-center w-full text-center py-20`}>
            <div ref={DownRef} className={`${styles.arrow} relative text-center cursor-pointer z-10 fade`} onClick={() => scrollTo()}>
              <div className="relative flex items-center justify-items-center text-center">
                <div className={`${styles.arrowwrap} relative w-100 mx-auto`} onClick={() => scrollTo()}>
                  <div ref={ArrowRef}><ScrollDown className={`${styles.arrow} next w-full h-auto text-blue`} /></div>
                  <div ref={TextRef} className={`${styles.textwrap} absolute `}>
                    <div className='text font-nothingyoucoulddo text-22 font-300 text-blue'>Scroll</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div ref={VideoRef} className='relative mx-0 md:mx-160 z-10 fade'>
            <div className={`${styles.splat} splat ${styles.splatv1}`}><div></div><div></div><div></div><div></div></div>
            <div className={`${styles.splat} splat ${styles.splatv2}`}><div></div><div></div><div></div><div></div></div>
            <div className={`${styles.splat} splat ${styles.splatv3}`}><div></div><div></div><div></div><div></div></div>
            <div className={`${styles.splat} splat ${styles.splatv4}`}><div></div><div></div><div></div><div></div></div>
            <div className={`${styles.splat} splat ${styles.splatv5}`}><div></div><div></div><div></div><div></div></div>
            <VideoPlayer
              image_placeholder={block.image}
              video_placeholder={block.video_embed ? block.video_embed : block.video_local?.permalink}
              video={block.video_popup_embed ? block.video_popup_embed : block.video_popup_local?.permalink}
              play_text={block.video_play_text ? block.video_play_text : 'Play Dojo Reel'}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomeHeroBlock
