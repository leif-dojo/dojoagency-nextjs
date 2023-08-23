"use client"
import React, { useContext, useEffect, useState, useRef, useLayoutEffect } from 'react'
import styles from './project_grid.module.scss'
import { useThemeContext } from '@/context/theme'
import { useIsMobile, hexToRgb } from '@/utils/general'
import Image from 'next/image'
import Link from 'next/link'
import Arrow from '@/public/icons/icon-triangle.svg'
import VideoPlayer from '../../generic/video_player/video_player'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export const typename = 'Set_Components_ProjectGrid'
const ProjectGridBlock = ({ block }: { block: any }) => {
  const { cursorType, cursorChangeHandler, colorChangeHandler, backgroundChangeHandler } = useThemeContext();
  const sectionRef = useRef<HTMLDivElement>(null)
  const popupScrollRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)
  const [activeindex, setActiveIndex] = useState(1)

  const onMouseEnter = () => {
    cursorChangeHandler("view")
  }

  const onMouseLeave = () => {
    cursorChangeHandler("page")
  }

  const openOrClose = (index: any) => {
    setActiveIndex(index)
    active ? setActive(false) : setActive(true)
    active ? document.body.classList.remove('body-lock') : document.body.classList.add('body-lock')
  }

  const scrollTop = () => {
    popupScrollRef.current.scroll({ top: 0, behavior: "smooth" })
  }

  const onNext = () => {
    let next = activeindex + 1;
    if (next >= block.project_grid.length) { next = 0 }
    setActiveIndex(next)
    scrollTop()
  }
  const onPrev = () => {
    let prev = activeindex - 1;
    if (prev < 0) { prev = block.project_grid.length - 1 }
    setActiveIndex(prev)
    scrollTop()
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


    }, sectionRef);
    return () => ctx.revert();
  }, []);
  
  const ConditionalWrapper = ({ condition, wrapper, children }:{ condition:any, wrapper:any, children:any }) => condition ? wrapper(children) : children;

  return (
    <section ref={sectionRef} className={`${styles.root} w-full  overflow-hidden`}>
      <div className="px-50 md:px-100 py-50">
        <div className="w-full">
          {block.eyebrow && (
            <div className="text-20 leading-none font-300 uppercase mb-10 fade">
              {block.eyebrow}
            </div>
          )}
            {block.headline_set && (
              <div className="w-full pb-10">

                {typeof block.headline_set === 'string' && (
                  <div  className={`${styles.headline} wysiwyg text-70 md:text-90 leading-85 md:leading-120 font-300`} dangerouslySetInnerHTML={{ __html: block.headline }}></div>
                )}

                {typeof block.headline_set === 'object' && block?.headline_set?.map((item: any, index: any) => {
                  return (
                    (() => {
                      switch (item.__typename) {
                        case 'BardText':
                          return <div  className={`${styles.headline} wysiwyg text-70 md:text-90 leading-85 md:leading-120 font-300`} dangerouslySetInnerHTML={{ __html: item.text }} key={index}></div>;
                        case 'Set_Headline_Headline':
                          const Tag = item.headline_tag ? item.headline_tag.value : 'p';
                          return <div className='w-full' key={index}>
                            <Tag  className={`${styles.headline} wysiwyg ${item.headline_size ? item.headline_size.value : 'text-70'} leading-none font-300`} dangerouslySetInnerHTML={{ __html: item.headline }} ></Tag>
                          </div>;
                      }
                    })()
                  )
                })}

              </div>
            )}
          {block.wysiwyg_set && (
            <div className="w-full">

              {typeof block.wysiwyg_set === 'string' && (
                <div  className='wysiwyg text-30 leading-40 font-300 fade' dangerouslySetInnerHTML={{ __html: block.wysiwyg_set }}></div>
              )}

              {typeof block.wysiwyg_set === 'object' && block?.wysiwyg_set?.map((item: any, index: any) => {
                return (
                  (() => {
                    switch (item.__typename) {
                      case 'BardText':
                        return <div  className='wysiwyg text-30 leading-40 font-300 mb-30 fade' dangerouslySetInnerHTML={{ __html: item.text }} key={index}></div>;
                      case 'Set_Wysiwyg_Headline':
                        const Tag = item.headline_tag ? item.headline_tag : 'p';
                        return <div className='w-full' key={index}>
                          <Tag className={`wysiwyg ${item.headline_size ? item.headline_size : 'text-30'} font-300 mb-30 fade`} dangerouslySetInnerHTML={{ __html: item.headline }} ></Tag>
                        </div>;
                    }
                  })()
                )

              })}

            </div>
          )}
        </div>

        <div className={`${styles.grid} grid grid-cols-1 md:grid-cols-3 gap-30 w-full pt-30`}>

          {block?.project_grid?.map((block: any, index: any) => {
            const hasPopup = block.popup_headline || block.popup_wysiwyg || block.popup_image || block.popup_video_local || block.popup_video_embed;
            return (
              <div className={`${styles.project} project relative overflow-hidden ${hasPopup ? 'cursor-pointer' : ''} fade`}
                onClick={() => { !block.project_link && hasPopup ? openOrClose(index) : '' }} onMouseEnter={() => { hasPopup ? onMouseEnter() : '' }} onMouseLeave={() => { hasPopup ? onMouseLeave() : '' }} key={index}>
                <ConditionalWrapper
                  condition={block.project_link}
                  wrapper={(children:any) => <Link href={`${block.project_link}`} aria-label={block.project_title}>{children}</Link>}
                >
                <div className="block w-full h-full">
                  <div className={`w-full px-30 py-20`}>
                    {block.project_title && (
                      <div className={`text-30 leading-40 font-700 text-slate`}>
                        {block.project_title}
                      </div>
                    )}
                    {block.project_description && (
                      <div className={`text-30 leading-40 font-300 text-slate`}>
                        {block.project_description}
                      </div>
                    )}
                  </div>
                  <div className={`${styles.projectimage} relative w-full h-300 top-0 left-0`}>
                    {block.project_image && (
                      <div className={`absolute w-full h-full top-0 left-0`}>
                        <Image
                          src={block.project_image?.permalink}
                          width={block.project_image?.width}
                          height={block.project_image?.height}
                          alt={block.project_image?.alt ? block.project_image.alt : ''}
                          className={`${styles.image} relative w-full h-auto`}
                        />
                      </div>
                    )}

                    {block.project_video_embed && (
                      <div className={`${styles.video} video absolute w-full h-full top-0 left-0`} >
                        <div className={`${styles.videoinner} absolute block w-auto h-full min-w-full min-h-full aspect-video`}>
                          <iframe src={`${block.project_video_embed}?autoplay=1&loop=1&autopause=0&background=1&muted=1&controls=0`}
                            title="Vimeo video player"
                            className="vimeo w-full h-full"
                            width="640" height="360"
                            allow="autoplay; fullscreen"></iframe>
                        </div>
                      </div>
                    )}

                    {block.project_video_local && (
                      <div className={`${styles.video} video absolute w-full h-full top-0 left-0`} >
                        <div className={`${styles.videoinner} absolute block w-auto h-full min-w-full min-h-full aspect-video`}>
                          <video
                            className="html-video aspect-video"
                            width="640"
                            height="360"
                            autoPlay
                            controls={false}
                            loop
                            muted
                            preload="auto">
                            <source src={`${block.project_video_local?.permalink}`} type="video/mp4"></source>
                          </video>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                </ConditionalWrapper>
              </div>
            )
          })}
        </div>
      </div>

      {active && (
        <div className={`${styles.popup} fixed   w-screen h-screen left-0 top-0 z-10`} onMouseEnter={() => { cursorChangeHandler("default") }}>
          <div ref={popupScrollRef} className="relative px-50 md:px-100 py-40 w-full h-full overflow-y-scroll">
            <div className="relative bg-white w-full h-auto">

              <div className={`${styles.close} absolute top-50 right-50 flex items-center z-10 cursor-pointer`} role="none" onClick={() => openOrClose(0)}>
                <div className="a11y hidden">Toggle Menu</div>
                <div className={`font-lato text-slate text-80 font-300 leading-none`}>X</div>
              </div>

              <div className="relative w-full px-50 md:px-150 pt-200 pb-100">

                <div className="block md:flex">
                  <div className="w-full md:w-6/12 md:pr-30 flex items-center">
                    <div className='w-full'>
                      {block?.project_grid[activeindex].popup_headline && (
                        <div className="text-55 md:text-90 leading-70 md:leading-120 font-300 text-slate mb-20">
                          {block?.project_grid[activeindex].popup_headline}
                        </div>
                      )}
                      {block?.project_grid[activeindex].popup_wysiwyg && (
                        <div className="w-full">
                          <div className='wysiwyg text-30 leading-40 font-300 text-slate' dangerouslySetInnerHTML={{ __html: block?.project_grid[activeindex].popup_wysiwyg }}></div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="w-full md:w-6/12 flex items-center">
                    <div className='w-full'>
                      {block?.project_grid[activeindex].popup_image && (
                        <div className='relative w-full md:pl-50 mb-40'>
                          <Image
                            src={block?.project_grid[activeindex].popup_image?.permalink}
                            width={block?.project_grid[activeindex].popup_image?.width}
                            height={block?.project_grid[activeindex].popup_image?.height}
                            alt={block?.project_grid[activeindex].popup_image?.alt ? block?.project_grid[activeindex].popup_image.alt : ''}
                            className={`${styles.image} relative w-full h-auto`}
                          />
                        </div>
                      )}
                      {block?.project_grid[activeindex].popup_video_embed && (
                        <div className={`${styles.video} video relative w-full md:ml-50 aspect-video mb-40`} onMouseLeave={() => { onMouseLeave() }}>
                          <VideoPlayer
                            image_placeholder={block?.project_grid[activeindex].popup_image?.permalink}
                            video_placeholder={block?.project_grid[activeindex].project_video_embed}
                            video={block?.project_grid[activeindex].popup_video_embed}
                            play_text={block?.project_grid[activeindex].popup_video_play_text ? block?.project_grid[activeindex].popup_video_play_text : ''}
                          />
                        </div>
                      )}
                      {block?.project_grid[activeindex].popup_video_local && (
                        <div className={`${styles.video} video relative w-full md:ml-50 aspect-video mb-40`} onMouseLeave={() => { onMouseLeave() }}>
                          <VideoPlayer
                            image_placeholder={block?.project_grid[activeindex].popup_image?.permalink}
                            video_placeholder={block?.project_grid[activeindex].project_video_local?.permalink}
                            video={block?.project_grid[activeindex].popup_video_local?.permalink}
                            play_text={block?.project_grid[activeindex].popup_video_play_text ? block?.project_grid[activeindex].popup_video_play_text : ''}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>


              </div>
              <div className='container w-full flex flex-nowrap px-50 md:px-100 py-100'>
                <div className='flex w-1/2 justify-items-start'>
                  <div className="inline-flex mr-auto text-blue" aria-label="Previous" onClick={() => onPrev()}>
                    <Arrow className="w-30 h-auto rotate-180" />
                    <span className="font-nothingyoucoulddo text-40 font-400 text-blue pl-20 cursor-pointer">Previous</span>
                  </div>
                </div>
                <div className='flex w-1/2 justify-items-end'>
                  <div className="inline-flex ml-auto text-blue" aria-label="Next" onClick={() => onNext()}>
                    <span className="font-nothingyoucoulddo text-40 font-400 text-blue pr-20 cursor-pointer">Next</span>
                    <Arrow className="w-30 h-auto" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  )
}

export default ProjectGridBlock
