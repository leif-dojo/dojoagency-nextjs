"use client"
import React, { useRef, useState, useLayoutEffect } from 'react'
import styles from './gallery_horizontal.module.scss'
import { useThemeContext } from '@/context/theme'
import { useIsMobile, hexToRgb } from '@/utils/general'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { Draggable } from 'gsap/dist/Draggable'
gsap.registerPlugin(ScrollTrigger, Draggable)

export const typename = 'Set_Components_GalleryHorizontal'
const GalleryHorizontalBlock = ({ block }: { block: any }) => {
  const { cursorType, cursorChangeHandler, colorChangeHandler, backgroundChangeHandler } = useThemeContext();
  const sectionRef = useRef<HTMLDivElement>(null)
  const ContainerInnerRef = useRef<HTMLDivElement>(null)
  const GalleryRef = useRef<HTMLDivElement>(null)
  const ScrollerTriggerRef = useRef<HTMLDivElement>(null)
  const ScrollerRef = useRef<HTMLDivElement>(null)

  const [active, setActive] = useState(false)
  const [activeindex, setActiveIndex] = useState(1)

  const onMouseEnter = () => {
    cursorChangeHandler("horizontal-scroll")
  }

  const onMouseLeave = () => {
    cursorChangeHandler("default")
  }

  const openOrClose = (index: any) => {
    setActiveIndex(index)
    active ? setActive(false) : setActive(true)
    //active ? document.body.classList.remove('body-lock') : document.body.classList.add('body-lock')// TODO -- reset to scroll position
  }

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {

      //Theme Colors
      const TextColor = block.text_color ? block.text_color : '#304A5F';
      const BackgroundColor = block.background_color ? block.background_color : '#FFFFFF';
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

      //horizontal scroller
      let sections = gsap.utils.toArray(ScrollerRef.current);
      let container_width = gsap.getProperty(ContainerInnerRef.current, "width");
      let gallery_width = gsap.getProperty(ScrollerRef.current, "width");
      let diff = (gallery_width - container_width);
      console.log("diff: ", diff)
      gsap.to(sections, {
        //xPercent: -100 * 1,
        x: diff < 0 ? 0 : diff * -1,
        ease: "none",
        scrollTrigger: {
          trigger: ScrollerTriggerRef.current,
          pin: true,
          scrub: 1,
          //snap: 1 / (sections.length - 1),
          // base vertical scrolling on how wide the container is so it feels more natural.
          //end: "+=3500",
          end: "+=" + (diff).toString(),
        }
      });

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={`${styles.root} w-full  overflow-hidden`}>
      <div ref={ScrollerTriggerRef} className="px-50 md:px-100 py-100">
        <div ref={ContainerInnerRef} className="w-full">
          {block.headline && (
            <div className="w-full pb-20">
              <div className='wysiwyg text-90 leading-120 font-300 fade' dangerouslySetInnerHTML={{ __html: block.headline }}></div>
            </div>
          )}
          <div className="w-[10000rem]">
            <div className="relative flex w-auto h-auto">
              <div ref={ScrollerRef} className={`${styles.gallery} gallery w-auto h-auto grid`}>
                {block?.gallery_grid?.map((item: any, index: any) => {
                  //console.log('col: ', index, item)
                  return (
                    <div className={`${styles.slide}`} key={index}>
                      <div className={`${styles.project} project relative flex items-center overflow-hidden  w-full cursor-pointer`}>
                        <div className="flex justify-center items-center w-full h-full ">

                          <div className='relative w-full h-full top-0 left-0'>

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
                              <div className="video relative w-full overflow-hidden top-0 aspect-video z-1" >
                                <div className="video-inner absolute block w-full h-full aspect-video">
                                  <iframe src={`${item.video_embed}?autoplay=1&loop=1&autopause=0&background=1&muted=1&controls=0`}
                                    title="Vimeo video player"
                                    className="vimeo w-full h-full aspect-video"
                                    width="640" height="360"
                                    allow="autoplay; fullscreen"></iframe>
                                </div>
                              </div>
                            )}

                            {item.video_local && (
                              <div className="video relative w-full overflow-hidden top-0 aspect-video z-1" >
                                <div className="video-inner absolute block w-full h-full aspect-video">
                                  <video
                                    className="html-video aspect-video"
                                    width="640"
                                    height="360"
                                    autoPlay
                                    controls={false}
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
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>


      {active && (
        <div className={`${styles.popup} fixed  bg-white w-screen h-screen left-0 top-0 z-10 px-100 py-100`}>
          <div className={`${styles.close} absolute top-50 right-50 flex items-center cursor-pointer z-10`} role="none" onClick={() => openOrClose(0)}>
            <div className={`font-lato text-orange text-80 font-300 leading-none`}>X</div>
          </div>

          <div className="relative w-full h-full flex flex-col items-center justify-center">
            <div className="absolute w-full h-full flex flex-col items-center justify-center">

              {!block?.gallery_grid[activeindex].video_embed && !block?.gallery_grid[activeindex].video_local && block?.gallery_grid[activeindex].image && (
                <Image
                  src={block?.gallery_grid[activeindex].image?.permalink}
                  width={block?.gallery_grid[activeindex].image?.width}
                  height={block?.gallery_grid[activeindex].image?.height}
                  alt={block?.gallery_grid[activeindex].image?.alt ? block?.gallery_grid[activeindex].image.alt : ''}
                  className={`${styles.image} relative w-full h-full  object-contain`}
                />
              )}

              {block?.gallery_grid[activeindex]?.video_embed && (
                <div className="video relative w-full h-full overflow-hidden aspect-video top-0 z-1 object-contain" >
                  <div className="video-inner absolute w-full h-full flex flex-col items-center justify-center object-contain">
                    <iframe src={`${block?.gallery_grid[activeindex].video_embed}`}
                      title="Vimeo video player"
                      className="vimeo relative w-full h-full  object-contain aspect-video"
                      width="640" height="360"
                      allow="autoplay; fullscreen"></iframe>
                  </div>
                </div>
              )}

              {block?.gallery_grid[activeindex]?.video_local && (
                <div className="video relative w-full h-full overflow-hidden aspect-video top-0 z-1 object-contain" >
                  <div className="video-inner absolute w-full h-full flex flex-col items-center justify-center object-contain">
                    <video
                      className="html-video relative w-full h-full  object-contain aspect-video"
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
  )
}

export default GalleryHorizontalBlock
