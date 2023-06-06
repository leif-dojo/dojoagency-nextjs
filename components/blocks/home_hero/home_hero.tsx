"use client"
import React, { useLayoutEffect, useState, useRef } from 'react'
import styles from './home_hero.module.scss'
import Logo from 'public/icons/Dojo-Logo_Horizontal_White_RGB.svg'
import Arrow from 'public/icons/icon-arrow-down.svg'
import { useThemeContext } from '@/context/theme'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

import VideoPlayer from '../../generic/video_player/video_player'

export const typename = 'Set_Components_HomeHero'

const HomeHeroBlock = ({ block }: { block: any }) => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const LogoRef = useRef<HTMLDivElement>(null)
  const HeadlineRef = useRef<HTMLDivElement>(null)
  const VideoRef = useRef<HTMLDivElement>(null)
  const DownRef = useRef<HTMLDivElement>(null)
  const RainRef = useRef<HTMLDivElement>(null)

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
        LogoRef.current,
        { autoAlpha: 0 },
        { duration: 1, autoAlpha: 1 },0
      )
      .fromTo(
        HeadlineRef.current,
        { autoAlpha: 0, y: 50 },
        { duration: 0.5, autoAlpha: 1, y: 0 },0.2
      )
      .fromTo(
        DownRef.current,
        { autoAlpha: 0, y: 50 },
        { duration: 0.5, autoAlpha: 1, y: 0 },0.4
      )
      .fromTo(
        VideoRef.current,
        { autoAlpha: 0, y: 50 },
        { duration: 1, autoAlpha: 1, y: 0 },0.6
      )


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
      makeitrain();

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const { cursorType, cursorChangeHandler} = useThemeContext();

  return (
  <section className={`${styles.root} w-full bg-slate pt-60 pb-0`} onMouseEnter={() => cursorChangeHandler("peace")} onMouseLeave={() => cursorChangeHandler("default")}>
    <div ref={RainRef} id="rain" className={`${styles.rain} absolute w-full h-full top-0 left-0 z-9`}></div>

    <div className='w-full'>
      <div className={`fixed top-140 w-full px-100 z-5`}>
        <div ref={LogoRef} className={`${styles.logo} logo flex justify-center w-full text-center px-80 pb-40`}>
          <Logo />
        </div>
      </div>
      <div className={`relative w-full bg-slate px-100 mt-180 pb-120 z-6`}>
        <div ref={HeadlineRef} className='w-full text-white text-center font-lato text-113 font-300 leading-none py-20'>
          {block?.headline}
        </div>
        <div ref={DownRef} className={`${styles.arrow} flex justify-center w-full text-center py-20`}>
          <Arrow />
        </div>
        <div ref={VideoRef} className='relative px-160 z-10'>
          <VideoPlayer
            image_placeholder={block.image}
            video_placeholder={block.video_embed}
            video={block.video_popup_embed}
          />
        </div>
      </div>
    </div>
  </section>
)}

export default HomeHeroBlock
