"use client"
import React, { useLayoutEffect, useState, useRef } from 'react'
import styles from './home_hero.module.scss'
import Logo from 'public/dojo_animated.svg'
import Arrow from 'public/icons/icon-arrow-down.svg'
import { useThemeContext } from '@/context/theme'
import { useIsMobile, hexToRgb, rgbToHex } from '@/utils/general'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

import VideoPlayer from '../../generic/video_player/video_player'

export const typename = 'Set_Components_HomeHero'

const HomeHeroBlock = ({ block }: { block: any }) => {
  const { cursorType, cursorChangeHandler, color, colorChangeHandler, backgroundColor, backgroundChangeHandler} = useThemeContext();
  const sectionRef = useRef<HTMLDivElement>(null)
  const PanelRef = useRef<HTMLDivElement>(null)
  const LogoWrapRef = useRef<HTMLDivElement>(null)
  const LogoRef = useRef<HTMLDivElement>(null)
  const HeadlineRef = useRef<HTMLDivElement>(null)
  const VideoRef = useRef<HTMLDivElement>(null)
  const DownRef = useRef<HTMLDivElement>(null)
  const RainRef = useRef<HTMLDivElement>(null)

  const isMobile = () => {
    return window.innerWidth < 1024
  }

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {

      //set initial colors
      const TextColor = '#FFFFFF';
      const BackgroundColor = '#304A5F';
      var rb = document.querySelector('body');
      rb.style.color = TextColor;
      rb.style.backgroundColor = backgroundColor;
      colorChangeHandler(hexToRgb(TextColor))
      backgroundChangeHandler(hexToRgb(backgroundColor))

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
        LogoWrapRef.current,
        { autoAlpha: 0 },
        { duration: 1, autoAlpha: 1 },0
      )
      .fromTo(
        HeadlineRef.current,
        { autoAlpha: 0, y: "20%" },
        { duration: 0.5, autoAlpha: 1, y: "0%" },0.2
      )
      .fromTo(
        DownRef.current,
        { autoAlpha: 0, y: "20%" },
        { duration: 0.5, autoAlpha: 1, y: "0%" },0.4
      )
      .fromTo(
        VideoRef.current,
        { autoAlpha: 0, y: "20%" },
        { duration: 1, autoAlpha: 1, y: "0%" },0.6
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
        LogoWrapRef.current,
        {
          autoAlpha: 1
        }, {
          autoAlpha: 0,
        },0
      ).fromTo(
        HeadlineRef.current,
        {
          fontSize: isMobile() ? "90rem" : "110rem"
          //autoAlpha: 0
        }, {
          fontSize: isMobile() ? "100rem" : "150rem"
          //autoAlpha: 1
        },0
      )
      /*.fromTo(
        PanelRef.current,
        {
          backgroundColor: `rgb(${backgroundColor})`,
        }, {
          backgroundColor: `rgb(${backgroundColor})`,
        },0
      )*//*.set( LogoRef.current, {
        autoAlpha: 0,
      })*/

      //rain
      // number of drops created.
      var nbDrop = 858; 

      // function to generate a random number range.
      function randRange( minNum: any, maxNum: any) {
        return (Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum);
      }

      // function to generate drops
      function createRain() {

        for( let i=1;i<nbDrop;i++) {
          var dropLeft = randRange(0,1600);
          var dropTop = randRange(-1000,1400);

          //$('.rain').append('<div class="drop" id="drop'+i+'"></div>');
          //$('#drop'+i).css('left',dropLeft);
          //$('#drop'+i).css('top',dropTop);
        }

      }
      function makeitrain() {
        const rainSection = document.getElementById('rain');
        var increment = 0;
        //var drops = "";
        var drops = document.createElement('div');
        drops.classList.add('absolute', 'w-full', 'h-full', 'top-0', 'left-0')
        var backDrops = "";
      
        while (increment < 100) {
          //couple random numbers to use for various randomizations
          //random number between 98 and 1
          var randoHundo = (Math.floor(Math.random() * (98 - 1 + 1) + 1));
          //random number between 5 and 2
          var randoFiver = (Math.floor(Math.random() * (5 - 2 + 1) + 2));
          //increment
          increment += randoFiver;
          //add in a new raindrop with various randomizations to certain CSS properties
          drops.innerHTML += `<div class='${styles.drop}' style="left: ${increment}%; bottom: ${randoFiver + randoFiver - 1 + 100}%; animation-delay: 0.${randoHundo}s; animation-duration: 0.5${randoHundo}s;"><div class='${styles.stem}' style="animation-delay: 0.${randoHundo}s; animation-duration: 0.5${randoHundo}s;"></div><div class='${styles.splat}' style="animation-delay: 0.${randoHundo}s; animation-duration: 0.5${randoHundo}s;"></div></div>`;
          //backDrops += '<div class="drop" style="right: ' + increment + '%; bottom: ' + (randoFiver + randoFiver - 1 + 100) + '%; animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"><div class="stem" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div><div class="splat" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div></div>';
        }
      
        rainSection?.appendChild(drops);
        //$('.rain.back-row').append(backDrops);
      }
      // Make it rain
      //createRain();
      //makeitrain();

      function setSignaturePaths() {
        let totalDur = 7
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
          pathElem.setAttribute('data-duration', `${duration < 0.1 ? 0.1 : duration}`);

          // set dash array and offset to path length - this is how you hide the line
          pathElem.setAttribute('stroke-dasharray', totalLen)
          pathElem.setAttribute('stroke-dashoffset', totalLen)

          // set delay for the next path - added .5 seconds to make it more realistic
          delay += duration + 0.1
        })

        return true
      }

      setSignaturePaths()

      //Main Dojo logo animation
      const sign_1 = document.getElementsByClassName("signature-1")[0]
      const sign_2 = document.getElementsByClassName("signature-2")[0]
      const sign_3 = document.getElementsByClassName("signature-3")[0]
      const sign_4 = document.getElementsByClassName("signature-4")[0]
      const sign_5 = document.getElementsByClassName("signature-5")[0]
      const sign_6 = document.getElementsByClassName("signature-6")[0]
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
        { duration: 0.3, autoAlpha: 1 },
      )
      .fromTo(
        ".letter-o-1",
        { autoAlpha: 0, },
        { duration: 0.3, autoAlpha: 1 },
      )
      .fromTo(
        ".letter-j",
        { autoAlpha: 0, },
        { duration: 0.3, autoAlpha: 1 },
      )
      .fromTo(
        ".letter-o-2",
        { autoAlpha: 0, },
        { duration: 0.3, autoAlpha: 1 },
      )
      .to(
        ".signature-1",
        { strokeDashoffset: 0,
          duration: sign_1.dataset.duration, },0.6
      )
      .to(
        ".signature-2",
        { strokeDashoffset: 0,
          duration: sign_2.dataset.duration, },sign_1.dataset.duration+0.6
      )
      .to(
        ".signature-3",
        { strokeDashoffset: 0,
          duration: sign_3.dataset.duration, },sign_2.dataset.duration+sign_1.dataset.duration+0.6
      )
      .to(
        ".signature-4",
        { strokeDashoffset: 0,
          duration: sign_4.dataset.duration, },sign_3.dataset.duration+sign_2.dataset.duration+sign_1.dataset.duration+0.6
      )
      .to(
        ".signature-5",
        { strokeDashoffset: 0,
          duration: sign_5.dataset.duration, },sign_4.dataset.duration+sign_3.dataset.duration+sign_2.dataset.duration+sign_1.dataset.duration+0.6
      )
      .to(
        ".signature-6",
        { strokeDashoffset: 0,
          duration: sign_6.dataset.duration, },sign_5.dataset.duration+sign_4.dataset.duration+sign_3.dataset.duration+sign_2.dataset.duration+sign_1.dataset.duration+0.6
      )
      .to(
        ".signature-1",
        { strokeDashoffset: -1 * sign_1.getTotalLength(),//2.3
          duration: sign_1.dataset.duration, },2
      )
      .to(
        ".signature-2",
        { strokeDashoffset: -1 * sign_2.getTotalLength(),//.2
          duration: sign_2.dataset.duration, },4.3
      )
      .to(
        ".signature-3",
        { strokeDashoffset: -1 * sign_3.getTotalLength(),//.6
          duration: sign_3.dataset.duration, },4.5
      )
      .to(
        ".signature-4",
        { strokeDashoffset: -1 * sign_4.getTotalLength(),//.27
          duration: sign_4.dataset.duration, },5
      )
      .to(
        ".signature-5",
        { strokeDashoffset: -1 * sign_5.getTotalLength(),//.59
          duration: sign_5.dataset.duration, },5.27
      )
      .to(
        ".signature-6",
        { strokeDashoffset: -1 * sign_6.getTotalLength(),//2.9
          duration: sign_6.dataset.duration, },5
      )

      .fromTo(
        ".tree",
        { autoAlpha: 0, },
        { duration: 0.7, autoAlpha: 1 },1.2
      )
      .fromTo(
        ".letter-a",
        { autoAlpha: 0},
        { duration: 0.3, autoAlpha: 1 },4
      )
      .fromTo(
        ".letter-g",
        { autoAlpha: 0, },
        { duration: 0.3, autoAlpha: 1 },4.4
      )
      .fromTo(
        ".letter-e",
        { autoAlpha: 0, },
        { duration: 0.3, autoAlpha: 1 },4.9
      )
      .fromTo(
        ".letter-n",
        { autoAlpha: 0, },
        { duration: 0.3, autoAlpha: 1 },5.3
      )
      .fromTo(
        ".letter-c",
        { autoAlpha: 0, },
        { duration: 0.3, autoAlpha: 1 },5.7
      )
      .fromTo(
        ".letter-y",
        { autoAlpha: 0, },
        { duration: 0.3, autoAlpha: 1 },6.1
      )
      .to(
        ".letter-y",
        { keyframes: [
          {y:"0%",fill: "rgba(255,255,255,0)",duration: 0}, 
          {y:"-20%",fill: "rgba(255,255,255,1)",duration: 0.2},
          {y:"0%"}
        ] },6
      )
      .to(
        ".letter-c",
        { keyframes: [
          {y:"0%",fill: "rgba(255,255,255,0)",duration: 0}, 
          {y:"-20%",fill: "rgba(255,255,255,1)",duration: 0.2},
          {y:"0%"}
        ] },6.1
      )
      .to(
        ".letter-n",
        { keyframes: [
          {y:"0%",fill: "rgba(255,255,255,0)",duration: 0}, 
          {y:"-20%",fill: "rgba(255,255,255,1)",duration: 0.2},
          {y:"0%"}
        ] },6.2
      )
      .to(
        ".letter-e",
        { keyframes: [
          {y:"0%",fill: "rgba(255,255,255,0)",duration: 0}, 
          {y:"-20%",fill: "rgba(255,255,255,1)",duration: 0.2},
          {y:"0%"}
        ] },6.3
      )
      .to(
        ".letter-g",
        { keyframes: [
          {y:"0%",fill: "rgba(255,255,255,0)",duration: 0}, 
          {y:"-20%",fill: "rgba(255,255,255,1)",duration: 0.2},
          {y:"0%"}
        ] },6.4
      )
      .to(
        ".letter-a",
        { keyframes: [
          {y:"0%",fill: "rgba(255,255,255,0)",duration: 0}, 
          {y:"-20%",fill: "rgba(255,255,255,1)",duration: 0.2},
          {y:"0%"}
        ] },6.5
      )
      .to(
        ".tree",
        { duration: 0.3, autoAlpha: 0 },7
      )


    }, sectionRef);
    return () => ctx.revert();
  }, []);


  //console.log("Home Hero: ", block)
  return (
  <section ref={sectionRef} className={`${styles.root} bg-themebackground-off w-full pt-60 pb-0`} onMouseEnter={() => cursorChangeHandler("peace")} onMouseLeave={() => cursorChangeHandler("default")}>
    <div ref={RainRef} id="rain" className={`${styles.rain} absolute w-full h-full top-0 left-0 z-9`}></div>

    <div className='w-full'>
      <div className={`fixed top-180 md:top-80 w-full z-5`}>
        <div ref={LogoWrapRef} className={`${styles.logo} logo w-full text-center px-0 pb-40`}>
          <div ref={LogoRef} className='w-full'><Logo className={`${styles.logosvg} w-full h-auto`} /></div>
        </div>
      </div>
      <div ref={PanelRef} className={`${styles.panel} relative w-full bg-themebackground-ff px-50 md:px-100 mt-250 pb-120 z-6`}>
        <div ref={HeadlineRef} className='w-full  text-center font-lato text-90 md:text-113 font-300 leading-none py-20'>
          {block?.headline}
        </div>
        <div className={`flex justify-center w-full text-center py-20`}>
          <div ref={DownRef} className={`${styles.arrow} text-center w-40 h-auto`}>
            <Arrow />
          </div>
        </div>
        <div ref={VideoRef} className='relative px-40 md:px-160 z-10'>
          <VideoPlayer
            image_placeholder={block.image}
            video_placeholder={block.video_embed ? block.video_embed : block.video_local?.permalink}
            video={block.video_popup_embed ? block.video_popup_embed: block.video_popup_local?.permalink}
          />
        </div>
      </div>
    </div>
  </section>
)}

export default HomeHeroBlock
