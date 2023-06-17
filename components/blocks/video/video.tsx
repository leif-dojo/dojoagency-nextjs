"use client"
import React, { useRef, useLayoutEffect } from 'react'
import { useThemeContext } from '@/context/theme'
import styles from './video.module.scss'
import VideoPlayer from '../../generic/video_player/video_player'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export const typename = 'Set_Components_Video'
const VideoBlock = ({ block }: { block: any }) => {
  const { cursorType, cursorChangeHandler} = useThemeContext();
  const sectionRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {

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

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
  <section ref={sectionRef} className={`${styles.root} w-full `} onMouseEnter={() => cursorChangeHandler("default")} onMouseLeave={() => cursorChangeHandler("default")}>
    <div ref={videoRef} className="px-50 md:px-200 py-100 fade">
      <VideoPlayer
        image_placeholder={block.image}
        video_placeholder={block.video_embed ? block.video_embed : block.video_local?.permalink}
        video={block.video_popup_embed ? block.video_popup_embed : block.video_local_popup?.permalink}
      />
    </div>
  </section>
)}

export default VideoBlock
