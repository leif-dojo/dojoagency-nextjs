"use client"
import React, { useRef, useState, useLayoutEffect } from 'react'
import Image from 'next/image'
import styles from './gallery_horizontal.module.scss'
import IconX from '@/public/icons/icon-x.svg'

import { useThemeContext } from '@/context/theme'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { Draggable } from 'gsap/dist/Draggable'
gsap.registerPlugin(ScrollTrigger,Draggable)

import { Navigation, Pagination, Scrollbar, A11y, Grid, FreeMode } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
//import 'swiper/css/navigation';
//import 'swiper/css/pagination';
//import 'swiper/css/scrollbar';
import 'swiper/css/grid';

export const typename = 'Set_Components_GalleryHorizontal'

const GalleryHorizontalBlock = ({ block }: { block: any }) => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const GalleryRef = useRef<HTMLDivElement>(null)
  const ScrollerRef = useRef<HTMLDivElement>(null)

  const [active, setActive] = useState(false)
  const [activeindex, setActiveIndex] = useState(1)

  const { cursorType, cursorChangeHandler} = useThemeContext();

  const onMouseEnter = () => {
    cursorChangeHandler("horizontal-scroll")
  }

  const onMouseLeave = () => {
      cursorChangeHandler("default")
  }

  const openOrClose = (index:any) => {
    setActiveIndex(index)
    active ? setActive(false) : setActive(true)
    //active ? document.body.classList.remove('body-lock') : document.body.classList.add('body-lock')
  }

  //console.log("Gallery: ", block)
  return (
    <section ref={sectionRef} className={`${styles.root} w-full bg-white text-slate overflow-hidden`}>
      <div className="px-100 py-100">
        {block.headline && (
        <div className="w-full pb-20">
          <div className='wysiwyg text-90 leading-120 font-300' dangerouslySetInnerHTML={{ __html: block.headline }}></div>
        </div>
        )}
        <div ref={GalleryRef} className={`${styles.grid} w-full`} onMouseEnter={() => onMouseEnter()} onMouseLeave={() => onMouseLeave()}>
          <div className=''>
            <Swiper
              className={`${styles.slider}`}
                modules={[Grid,FreeMode]}
                loop={false}//not compatible with grid rows
                spaceBetween={0}
                slidesPerView={2}
                //slidesPerGroup={4}
                freeMode={{
                  enabled: true,
                  momentum: true,
                  momentumBounce: true,
                  momentumBounceRatio: 1,
                  momentumRatio: 1,
                  momentumVelocityRatio: 1,
                  sticky: false,
                }}
                grid={{rows:2, fill: "column"}}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
              >
                {block?.gallery_grid?.map((item:any, index:any) => {
                return (
                <SwiperSlide className={`${styles.slide}`} key={index}>
                  <div className={`${styles.project} absolute flex justify-center items-center overflow-hidden`}>

                    <div className='absolute w-full h-full top-0 left-0'>

                      {item.image && (
                        <Image
                          src={item.image?.permalink}
                          width={item.image?.width}
                          height={item.image?.height}
                          alt={item.image?.alt ? item.image.alt : ''}
                          className={`${styles.image} relative w-full h-auto`}
                        />
                      )}

                      {item.video_embed && (
                            <div className="video absolute w-full h-full overflow-hidden top-0 z-1" >
                              <div className="video-inner absolute block w-full h-full aspect-video">
                                <iframe src={`${item.video_embed}?autoplay=1&loop=1&autopause=0&background=1&muted=1`} 
                                title="Vimeo video player"
                                className="vimeo w-full h-full aspect-video"
                                width="640" height="360"
                                allow="autoplay; fullscreen"></iframe>
                            </div>
                        </div>
                      )}

                      {item.video_local && (
                            <div className="video absolute w-full h-full overflow-hidden top-0 z-1" >
                              <div className="video-inner absolute block w-full h-full aspect-video">
                                <video 
                                  className="html-video aspect-video"
                                  width="640" 
                                  height="360"
                                  autoPlay
                                  controls
                                  loop
                                  muted
                                  preload="auto">
                                  <source src={`${item.video_local?.permalink}`} type="video/mp4"></source>
                                </video>
                            </div>
                        </div>
                      )}
                      
                      <div className='absolute flex w-full h-full z-10 left-0 top-0' onClick={() => openOrClose(index)}></div>
                    </div>

                    <div className={`${styles.hover} relative z-5 text-40 font-500 leading-none text-white opacity-0`}>
                      {item.headline}
                    </div>
                  </div>
                </SwiperSlide>
                )
              })}
              </Swiper>
          </div>
          </div>
        </div>
        {active && (
        <div className={`${styles.popup} fixed  bg-white w-screen h-screen left-0 top-0 z-10`}>
          <div className={`${styles.close} absolute top-50 right-50 flex items-center cursor-pointer`} role="none" onClick={() => openOrClose(0)}>
            <IconX />
          </div>

          <div className="relative w-full h-full flex flex-col items-center justify-center">
            <div className="absolute w-full h-full px-100 py-100 flex flex-col items-center justify-center">

              {!block?.gallery_grid[activeindex].video_embed && !block?.gallery_grid[activeindex].video_local && block?.gallery_grid[activeindex].image && (
                <Image
                  src={block?.gallery_grid[activeindex].image?.permalink}
                  width={block?.gallery_grid[activeindex].image?.width}
                  height={block?.gallery_grid[activeindex].image?.height}
                  alt={block?.gallery_grid[activeindex].image?.alt ? block?.gallery_grid[activeindex].image.alt : ''}
                  className={`${styles.image} relative min-w-full min-h-full w-100 h-auto  object-contain`}
                />
              )}

              {block?.gallery_grid[activeindex].video_embed && (
                <div className="video relative w-full h-full overflow-hidden aspect-video top-0 z-1 object-contain" >
                  <div className="video-inner absolute block w-full h-full flex flex-col items-center justify-center object-contain">
                    <iframe src={`${block?.gallery_grid[activeindex].video_embed}`} 
                    title="Vimeo video player"
                    className="vimeo relative min-w-full min-h-full w-100 h-auto object-contain aspect-video"
                    width="640" height="360"
                    allow="autoplay; fullscreen"></iframe>
                  </div>
                </div>
              )}

              {block?.gallery_grid[activeindex].video_local && (
                <div className="video relative w-full h-full overflow-hidden aspect-video top-0 z-1 object-contain" >
                  <div className="video-inner absolute block w-full h-full flex flex-col items-center justify-center object-contain">
                    <video 
                      className="html-video relative min-w-full min-h-full w-100 h-auto  object-contain aspect-video"
                      width="640" 
                      height="360"
                      autoPlay
                      controls
                      loop
                      muted
                      preload="auto">
                      <source src={`${block?.gallery_grid[activeindex].video_local?.permalink}`} type="video/mp4"></source>
                    </video>
                  </div>
                </div>
              )}
              
            </div>
          </div>
        </div>
        )}
      </section>
)}

export default GalleryHorizontalBlock
