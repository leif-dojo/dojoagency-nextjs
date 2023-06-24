"use client"
import React, { useLayoutEffect, useState, useRef } from 'react'
import styles from './home_hero.module.scss'
import Logo from 'public/dojo_animated.svg'
import Arrow from 'public/icons/icon-arrow-down.svg'
import { useThemeContext } from '@/context/theme'
import { useIsMobile, hexToRgb, rgbToHex } from '@/utils/general'
import {treestart, treeend} from './trees'

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

      // function to generate drops
      function makeitrain() {
        const rainSection = document.getElementById('rain');
        var increment = 0;
        var interval = 30;
        while (increment < 100) {
          loop(increment);
          increment++
        }

        function loop(i:any,){
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
        drops.sort((a,b) => 0.5 - Math.random()).forEach((drop:any,i:any) => {
          setTimeout(() => {
            drop.remove()
          }, i * 5);
        });
      };

      function setSignaturePaths() {
        let totalDur = 6
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
        { duration: 0.2, autoAlpha: 1 },
      )
      .fromTo(
        ".letter-o-1",
        { autoAlpha: 0, },
        { duration: 0.2, autoAlpha: 1 },
      )
      .fromTo(
        ".letter-j",
        { autoAlpha: 0, },
        { duration: 0.2, autoAlpha: 1 },
      )
      .fromTo(
        ".letter-o-2",
        { autoAlpha: 0, },
        { duration: 0.2, autoAlpha: 1 },
      )
      .add( function(){
        if(process.browser){
          makeitrain();
        }
       },2 )
      .to(
        ".signature-1",
        { strokeDashoffset: 0,
          duration: sign_1.dataset.duration, },0.3
      )
      .to(
        ".signature-2",
        { strokeDashoffset: 0,
          duration: sign_2.dataset.duration, },sign_1.dataset.duration+0.3
      )
      .to(
        ".signature-3",
        { strokeDashoffset: 0,
          duration: sign_3.dataset.duration, },sign_2.dataset.duration+sign_1.dataset.duration+0.3
      )
      .fromTo(
        ".splat",
        { autoAlpha: 0, },
        { duration: 0.2, autoAlpha: 1 }
      )
      .to(
        ".signature-4",
        { strokeDashoffset: 0,
          duration: sign_4.dataset.duration, },sign_3.dataset.duration+sign_2.dataset.duration+sign_1.dataset.duration+0.3
      )
      .to(
        ".signature-5",
        { strokeDashoffset: 0,
          duration: sign_5.dataset.duration, },sign_4.dataset.duration+sign_3.dataset.duration+sign_2.dataset.duration+sign_1.dataset.duration+0.3
      )
      .to(
        ".signature-6",
        { strokeDashoffset: 0,
          duration: sign_6.dataset.duration, },sign_5.dataset.duration+sign_4.dataset.duration+sign_3.dataset.duration+sign_2.dataset.duration+sign_1.dataset.duration+0.3
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
      /*.fromTo(
        ".tree",
        { autoAlpha: 0, },
        { duration: 0.7, autoAlpha: 1 },1.2
      )*/
      .to(
        ".tree",
        { strokeDashoffset: 0,
          duration: 1.5, },0.7
      )
      .fromTo(
        ".letter-a",
        { autoAlpha: 0},
        { duration: 0.2, autoAlpha: 1 },4
      )
      .fromTo(
        ".letter-g",
        { autoAlpha: 0, },
        { duration: 0.2, autoAlpha: 1 },4.4
      )
      .fromTo(
        ".letter-e",
        { autoAlpha: 0, },
        { duration: 0.2, autoAlpha: 1 },4.9
      )
      .fromTo(
        ".letter-n",
        { autoAlpha: 0, },
        { duration: 0.2, autoAlpha: 1 },5.3
      )
      .fromTo(
        ".letter-c",
        { autoAlpha: 0, },
        { duration: 0.2, autoAlpha: 1 },5.7
      )
      .fromTo(
        ".letter-y",
        { autoAlpha: 0, },
        { duration: 0.2, autoAlpha: 1 },6.1
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
        { strokeDashoffset: -1 * document.getElementsByClassName("tree")[0].getTotalLength(),
          duration: 1.5, },7
      )
      .add( function(){
        if(process.browser){
          stoprain();
        }
      })
      .to(
        ".splat",
        { duration: 0.2, autoAlpha: 0 },8
      )
      .to(".tree",
        { keyframes: [
          {attr: { d: treeend },duration: 0}, 
          {attr: { d: treestart },strokeDashoffset: 0,fill: '#FFF',duration: 0},
          {attr: { d: treeend },duration: 1.5}
        ] },8
      )

    }, sectionRef);
    return () => ctx.revert();
  }, []);


  //console.log("Home Hero: ", block)
  return (
  <section ref={sectionRef} className={`${styles.root} bg-themebackground-off w-full pt-60 pb-0`} onMouseEnter={() => cursorChangeHandler("peace")} onMouseLeave={() => cursorChangeHandler("default")}>
    <div ref={RainRef} id="rain" className={`${styles.rain} absolute w-full h-full top-0 left-0 z-9`}></div>

    <div className='relative w-full'>
      <div className={`fixed top-180 md:top-100 w-full z-5`}>
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

      <div ref={PanelRef} className={`${styles.panel} relative w-full bg-themebackground-ff px-50 md:px-100 mt-250 pb-120 z-6`}>
        <div ref={HeadlineRef} className='relative w-full text-center font-lato text-90 md:text-113 font-300 leading-none py-20'>
          <span className='relative'>S<div className={`${styles.splat} splat ${styles.splats}`}><div></div><div></div><div></div><div></div></div></span>tori<span className='relative'>e<div className={`${styles.splat} splat ${styles.splate}`}><div></div><div></div><div></div><div></div></div></span>s at work
        </div>
        <div className={`flex justify-center w-full text-center py-20`}>
          <div ref={DownRef} className={`${styles.arrow} text-center w-40 h-auto`}>
            <Arrow />
          </div>
        </div>
        <div ref={VideoRef} className='relative mx-40 md:mx-160 z-10'>
          <div className={`${styles.splat} splat ${styles.splatv1}`}><div></div><div></div><div></div><div></div></div>
          <div className={`${styles.splat} splat ${styles.splatv2}`}><div></div><div></div><div></div><div></div></div>
          <div className={`${styles.splat} splat ${styles.splatv3}`}><div></div><div></div><div></div><div></div></div>
          <div className={`${styles.splat} splat ${styles.splatv4}`}><div></div><div></div><div></div><div></div></div>
          <div className={`${styles.splat} splat ${styles.splatv5}`}><div></div><div></div><div></div><div></div></div>
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
