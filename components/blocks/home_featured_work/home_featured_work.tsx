"use client"
import React, { useRef, useLayoutEffect } from 'react'
import styles from './home_featured_work.module.scss'
import { useThemeContext } from '@/context/theme'
import { useIsMobile, hexToRgb } from '@/utils/general'
import Image from 'next/image'
import Link from 'next/link'
import NextArrow from '@/public/icons/icon-arrow-next-style.svg'
import TextViewAll from '@/public/text-view-all.svg'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export const typename = 'Set_Components_HomeFeaturedWork'
const HomeFeaturedWork = ({ block }: { block: any }) => {
  const { cursorType, cursorChangeHandler, colorChangeHandler, backgroundChangeHandler } = useThemeContext();
  const sectionRef = useRef<HTMLDivElement>(null)
  const HeadlineRef = useRef<HTMLDivElement>(null)
  const NextRef = useRef<HTMLDivElement>(null)
  const ViewAllRef = useRef<HTMLDivElement>(null)
  const NextArrowRef = useRef<HTMLDivElement>(null)
  const GridRef = useRef<HTMLDivElement>(null)

  const isMobile = () => {
    return window.innerWidth < 1024
  }

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {

      //Theme Colors
      const TextColor = block.text_color ? block.text_color : '#FFFFFF';
      const BackgroundColor = block.background_color ? block.background_color : '#00aeef';
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

      gsap
        .timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'bottom bottom',
            //end: 'bottom bottom',
            //scrub: true,
            toggleActions: "restart none none reverse",
            //markers: true,
          },
        }).set(NextArrowRef.current, {
          className: styles.draw
        }).set(ViewAllRef.current, {
          className: styles.draw
        }, 1)


      function setSignaturePaths() {
        let totalDur = 1
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

          // set dash array and offset to path length - this is how you hide the line
          pathElem.setAttribute('stroke-dasharray', totalLen)
          pathElem.setAttribute('stroke-dashoffset', totalLen)

          // set delay for the next path - added .5 seconds to make it more realistic
          delay += duration + 0.1
        })

        return true
      }

      setSignaturePaths()


    }, sectionRef);
    return () => ctx.revert();
  }, []);



  useLayoutEffect(() => {
    let ctx = gsap.context(() => {

      const items = gsap.utils.toArray(".project")

      if (!isMobile()) {
        //let rect = sectionRef.current.getBoundingClientRect();
        const mouseMoveHandler = (e) => {
          const { clientX, clientY } = e;
          //let positionX = clientX - rect.left;
          //let positionY = clientY - rect.top;
          //setMouse({x: positionX, y: positionY, moved: true})
          //parallaxIt(".project-wrap", -80, 1);
          items.forEach((item: any) => {
            let rect = item.getBoundingClientRect();
            let positionX = clientX - rect.left;
            let positionY = clientY - rect.top;

            //const random = Math.floor(Math.random() * (40 - -80 + 1)) + -80;
            //console.log("rando:", item.dataset.x, item.dataset.y)
            parallaxIt(item, positionX, positionY, item.dataset.x, item.dataset.y, item.dataset.dur, 1);
          })
        };
        sectionRef.current.addEventListener("mousemove", mouseMoveHandler);
        return () => {
          sectionRef.current.removeEventListener("mousemove", mouseMoveHandler);
        };
      }

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const parallaxIt = (target: any, mousex: any, mousey: any, xmovement: any, ymovement: any, dur: any, dt: any) => {
    let rect = target?.getBoundingClientRect();
    //console.log("gsap TO:", mouse.x, mouse.y)
    gsap.to(target, {
      duration: dur,
      x: (mousex - rect.width / 2) / rect.width * xmovement * dt,
      y: (mousey - rect.height / 2) / rect.height * ymovement * dt,
      ease: "sine"
    });
  };

  let projectRows = styles.rows_1
  switch (Math.ceil(block?.featured_projects.length / 3)) {
    case 1:
      projectRows = styles.rows_1
      break;
    case 2:
      projectRows = styles.rows_2
      break;
    case 3:
      projectRows = styles.rows_3
      break;
    case 4:
      projectRows = styles.rows_4
      break;
    case 5:
      projectRows = styles.rows_5
      break;
  }

  return (
    <section ref={sectionRef} className={`${styles.root} relative w-full overflow-hidden z-10`}>
      <div className="px-50 md:px-100 py-100">
        <div ref={HeadlineRef} className='relative w-full font-lato text-80 leading-90 font-300 text-white pb-20 pl-0 md:pl-80 z-10 fade'>
          {block?.headline}
        </div>
        <div ref={GridRef} className={`${styles.grid} project-wrap w-full ${projectRows}`}>

          {block?.featured_projects?.map((block: any, index: any) => {
            const randomx = Math.floor(Math.random() * (-20 - -80 + 1)) + -80;
            const randomy = Math.floor(Math.random() * (-10 - -40 + 1)) + -40;
            const randomdur = Math.floor(Math.random() * (3 - 1 + 1)) + 1;

            return (
              <Link href={`${block?.link ? block?.link : ''}`} className={`${styles.project} project block relative overflow-hidden bg-dark w-full md:w-1/3 mb-30 md:mb-0 fade`} key={index} data-x={randomx} data-y={randomy} data-dur={randomdur}>
                <span className="flex justify-center items-center w-full h-full">

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
                          <iframe src={`${block.video_embed}?autoplay=1&loop=1&autopause=0&background=1&muted=1&controls=0`}
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
                            controls={false}
                            loop
                            muted
                            playsinline
                            preload="auto">
                            <source src={`${block.video_local?.permalink}`} type="video/mp4"></source>
                          </video>
                        </div>
                      </div>
                    )}

                    {block.video_embed_hover && (
                      <div className={`${styles.videohover} video absolute w-full h-full overflow-hidden top-0 z-1`} >
                        <div className={`${styles.videoinner} absolute block w-auto h-full min-w-full min-h-full aspect-video`}>
                          <iframe src={`${block.video_embed_hover}?autoplay=1&loop=1&autopause=0&background=1&muted=1&controls=0`}
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
                            controls={false}
                            loop
                            muted
                            playsinline
                            preload="auto">
                            <source src={`${block.video_local_hover?.permalink}`} type="video/mp4"></source>
                          </video>
                        </div>
                      </div>
                    )}

                  </span>
                  <span className={`relative w-full flex justify-center items-center`}>
                    <span className={`${styles.headline} absolute w-full px-40 py-40 z-5 text-60 leading-none font-500 text-white text-center`}>
                      {block.headline}
                    </span>
                    <span className={`${styles.hover} absolute w-full px-40 py-40 z-5 text-40 leading-none font-500 text-white text-center`}>
                      {block.headline_hover}
                    </span>
                  </span>
                </span>
              </Link>
            )
          })}
        </div>
        <div className={`${styles.nextwrap} relative w-full pt-80 text-right`}>
          <Link className='relative  text-right inline-flex ml-auto mr-0' href={`/portfolio/`} aria-label="Dojo Agency fade">
            <div ref={NextArrowRef} className=''><NextArrow className={`${styles.nextarrow} w-40 h-auto`} /></div>
            <span ref={NextRef} className={`${styles.next} relative pt-20 pl-10`}><div ref={ViewAllRef} className=''><TextViewAll className={`${styles.viewalltext} w-100 h-auto `} /></div></span>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default HomeFeaturedWork
