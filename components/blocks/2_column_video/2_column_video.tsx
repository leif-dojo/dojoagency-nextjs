"use client"
import React, { useContext, useEffect, useState, useRef, useLayoutEffect } from 'react'
import Image from 'next/image'
import { useThemeContext } from '@/context/theme'
import VideoPlayer from '../../generic/video_player/video_player'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export const typename = 'Set_Components_2ColumnVideo'
const Column2VideoBlock = ({ block }: { block: any }) => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const copyRef = useRef<HTMLDivElement>(null)
  const mediaRef = useRef<HTMLDivElement>(null)
  const { cursorType, cursorChangeHandler} = useThemeContext();

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {

      //fades
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
      }).fromTo(
        copyRef.current,
        { autoAlpha: 0, y: 50 },
        { duration: 0.9, autoAlpha: 1, y: 0, stagger: 0.5 }
      ).fromTo(
        mediaRef.current,
        { autoAlpha: 0, y: 50 },
        { duration: 0.9, autoAlpha: 1, y: 0, stagger: 0.5 }
      )

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
  <section ref={sectionRef} className="w-full bg-white text-slate" onMouseEnter={() => cursorChangeHandler("default")} onMouseLeave={() => cursorChangeHandler("default")}>
    <div className="px-100 py-100">
      <div className="block md:flex">
        <div ref={copyRef} className="w-full md:w-5/12 md:pr-30">
          <div className="text-20 leading-none font-300 uppercase mb-10">
            {block.eyebrow}
          </div>
          <div className="text-90 leading-120 font-300 mb-20">
            {block.headline}
          </div>
          <div className="w-full">
            <div className='wysiwyg font-lato text-30 leading-40 font-300' dangerouslySetInnerHTML={{ __html: block.wysiwyg }}></div>
          </div>
        </div>
        <div ref={mediaRef} className="w-full md:w-7/12">

          <VideoPlayer
            image_placeholder={block.image}
            video_placeholder={block.video_embed ? block.video_embed : block.video_local?.permalink}
            video={block.video_popup_embed ? block.video_popup_embed : block.video_popup_local}
          />

        </div>
      </div>
    </div>
  </section>
)}

export default Column2VideoBlock
