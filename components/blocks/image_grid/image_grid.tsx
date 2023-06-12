"use client"
import React, { useContext, useEffect, useState, useRef, useLayoutEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './image_grid.module.scss'
import { useThemeContext } from '@/context/theme'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export const typename = 'Set_Components_ImageGrid'

const ImageGridBlock = ({ block }: { block: any }) => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { cursorType, cursorChangeHandler} = useThemeContext();

  const onMouseEnter = () => {
    cursorChangeHandler("next")
  }

  const onMouseLeave = () => {
      cursorChangeHandler("default")
  }

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
        ".item",
        { autoAlpha: 0, y: 50 },
        { duration: 0.9, autoAlpha: 1, y: 0, stagger: 0.5, ease: "power4.out" }
      )

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  //console.log("ImageGridBlock", block);
  return (
  <section ref={sectionRef} className={`${styles.root} w-full bg-white text-slate overflow-hidden`}>
    <div className="px-50 md:px-100 py-100">
      <div className={`${styles.grid} grid grid-cols-2 md:grid-cols-3 gap-50 w-full `}>

        {block?.image_grid?.map((block:any, index:any) => {
          //console.log('col: ', index, block)
          return (
            <Link href={`${block?.link}`} className={`${styles.project} item relative overflow-hidden bg-dark f-full`} key={index} onMouseEnter={() => onMouseEnter()} onMouseLeave={() => onMouseLeave()}>
              <span className="flex justify-center items-center w-full h-full">
                {block.image && (
                  <span className='absolute w-full h-full top-0 left-0'>

                    {block.image && (
                      <Image
                        src={block.image?.permalink}
                        width={block.image?.width}
                        height={block.image?.height}
                        alt={block.image?.alt ? block.image.alt : ''}
                        className={`${styles.image} relative w-full h-auto`}
                      />
                    )}
                    
                    {block.image_hover && (
                      <Image
                        src={block.image_hover?.permalink}
                        width={block.image_hover?.width}
                        height={block.image_hover?.height}
                        alt={block.image_hover?.alt ? block.image_hover.alt : ''}
                        className={`${styles.imagehover} absolute top-0 w-full h-auto`}
                      />
                    )}

                    {block.video_embed && (
                          <div className={`${styles.video} video absolute w-full h-full overflow-hidden top-0 z-1`} >
                            <div className={`${styles.videoinner} absolute block w-auto h-full min-w-full min-h-full aspect-video`}>
                              <iframe src={`${block.video_embed}?autoplay=1&loop=1&autopause=0&background=1&muted=1`} 
                              title="Vimeo video player"
                              className="vimeo w-full h-full"
                              width="640" height="360"
                              allow="autoplay; fullscreen"></iframe>
                          </div>
                      </div>
                    )}

                    {block.video_local && (
                          <div className={`${styles.video} video absolute w-full h-full overflow-hidden top-0 z-1`} >
                            <div className={`${styles.videoinner} absolute block w-auto h-full min-w-full min-h-full aspect-video`}>
                              <video 
                                className="html-video aspect-video"
                                width="640" 
                                height="360"
                                autoPlay
                                controls
                                loop
                                muted
                                preload="auto">
                                <source src={`${block.video_local?.permalink}`} type="video/mp4"></source>
                              </video>
                          </div>
                      </div>
                    )}

                    {block.video_embed_hover && (
                          <div className={`${styles.videohover} video absolute w-full h-full overflow-hidden top-0 z-1`} >
                            <div className={`${styles.videoinner} absolute block w-auto h-full min-w-full min-h-full aspect-video`}>
                              <iframe src={`${block.video_embed_hover}?autoplay=1&loop=1&autopause=0&background=1&muted=1`} 
                              title="Vimeo video player"
                              className="vimeo w-full h-full"
                              width="640" height="360"
                              allow="autoplay; fullscreen"></iframe>
                          </div>
                      </div>
                    )}

                    {block.video_local_hover && (
                          <div className={`${styles.videohover} video absolute w-full h-full overflow-hidden top-0 z-1`} >
                            <div className={`${styles.videoinner} absolute block w-auto h-full min-w-full min-h-full aspect-video`}>
                              <video 
                                className="html-video aspect-video"
                                width="640" 
                                height="360"
                                autoPlay
                                controls
                                loop
                                muted
                                preload="auto">
                                <source src={`${block.video_local_hover?.permalink}`} type="video/mp4"></source>
                              </video>
                          </div>
                      </div>
                    )}
                    
                  </span>
                )}
                <span className={`relative w-full flex justify-center items-center`}>
                  <span className={`${styles.headline} absolute w-full z-5 text-60 leading-none font-500 text-white text-center`}>
                    {block.image_headline}
                  </span>
                  <span className={`${styles.hover} absolute w-full z-5 text-40 leading-none font-500 text-white text-center`}>
                    {block.image_headline_hover}
                  </span>
                </span>
              </span>
            </Link>
          )
        })}
        </div>
    </div>
  </section>
)}

export default ImageGridBlock
