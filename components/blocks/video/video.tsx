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
        videoRef.current,
        { autoAlpha: 0, y: 50 },
        { duration: 0.5, autoAlpha: 1, y: 0 }
      )

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
  <section ref={sectionRef} className={`${styles.root} w-full bg-white text-slate`} onMouseEnter={() => cursorChangeHandler("default")} onMouseLeave={() => cursorChangeHandler("default")}>
    <div ref={videoRef} className="px-50 md:px-200 py-100">
      <VideoPlayer
        image_placeholder={block.image}
        video_placeholder={block.video_embed ? block.video_embed : block.video_local?.permalink}
        video={block.video_popup_embed ? block.video_popup_embed : block.video_local_popup?.permalink}
      />
    </div>
  </section>
)}

export default VideoBlock
