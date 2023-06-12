"use client"
import React, { useContext, useEffect, useState, useRef, useLayoutEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './home_featured_work.module.scss'
export const typename = 'Set_Components_HomeFeaturedWork'
import NextArrow from '@/public/icons/icon-arrow-next.svg'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

import useMousePosition from "@/hooks/useMousePosition";

const HomeFeaturedWork = ({ block }: { block: any }) => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const HeadlineRef = useRef<HTMLDivElement>(null)
  const NextRef = useRef<HTMLDivElement>(null)
  const NextArrowRef = useRef<HTMLDivElement>(null)
  const GridRef = useRef<HTMLDivElement>(null)
  const { x, y } = useMousePosition();

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap
      .timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom bottom',
          scrub: true,
         // markers: true,
        },
      })
      .fromTo(
        sectionRef.current,
        {
          backgroundColor: "#231f20"
      }, {
          backgroundColor: "#00aeef", 
      },
      )

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
      }).set( NextArrowRef.current, {
        className: styles.draw
      }).fromTo(
        NextRef.current,
        {alpha: 0, }, 
        {alpha: 1, delay: 1, duration: 0.3}
      )

      //fade timeline option
      /*gsap
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
        HeadlineRef.current,
        {alpha: 0, y: 50 }, 
        {alpha: 1, y: 0, duration: 0.3}
      ).fromTo(
        ".project",
        { autoAlpha: 0, y: 50 },
        { duration: 0.9, autoAlpha: 1, y: 0, stagger: 0.5 }
      ).fromTo(
          NextRef.current,
        {alpha: 0, y: -50 }, 
        {alpha: 1, y: 0, duration: 0.3}
      ).set( NextArrowRef.current, {
        className: styles.draw
      }).fromTo(
        NextRef.current,
        {alpha: 0, }, 
        {alpha: 1, delay: 1, duration: 0.3}
      )*/


    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const [mouse, setMouse] = useState({x: 0, y: 0, moved: false})
  const [canvas, setCanvas] = useState({x: 0, y: 0})

  /*useLayoutEffect(() => {
    let ctx = gsap.context(() => {

      let rect = sectionRef.current.getBoundingClientRect();
      let mouse = {x: 0, y: 0, moved: false};
      const speed = 1;
  
      sectionRef.current.addEventListener("mousemove", (e) => {
        let positionX = e.clientX - rect.left;
        let positionY = e.clientY - rect.top;
        setMouse({x: positionX, y: positionY, moved: true})
      });
      gsap.ticker.add(() => {
        // adjust speed for higher refresh monitors
        const dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio()); 

        parallaxIt(".project-wrap", -150, dt);
        //parallaxIt(".project img", -30);
      });
      gsap.ticker.fps(30);
      gsap.ticker.lagSmoothing(1000, 16);

    }, sectionRef);
    return () => ctx.revert();
  }, [x,y]);*/

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {

      let rect = sectionRef.current.getBoundingClientRect();
      const mouseMoveHandler = (e) => {
        const { clientX, clientY } = e;
        let positionX = clientX - rect.left;
        let positionY = clientY - rect.top;
        setMouse({x: positionX, y: positionY, moved: true})
        parallaxIt(".project-wrap", -150, 1);
      };
      document.addEventListener("mousemove", mouseMoveHandler);
      return () => {
        document.removeEventListener("mousemove", mouseMoveHandler);
      };

    }, sectionRef);
    return () => ctx.revert();
  }, [mouse]);

  const parallaxIt = (target: any, movement: any, dt: any) => {
    let rect = sectionRef?.current?.getBoundingClientRect();
    //console.log("gsap TO:", mouse.x, mouse.y)
    gsap.to(target, {
      duration: 0,
      x: (mouse.x - rect.width / 2) / rect.width * movement * dt,
      y: (mouse.y - rect.height / 2) / rect.height * movement* dt, 
      ease: "sine"
    });
  }
  

  /*useEffect(() => {
    let rect = sectionRef.current.getBoundingClientRect();
    let mouse = {x: 0, y: 0, moved: false};

    sectionRef.current.addEventListener("mousemove", (e) => {
      let positionX = e.clientX - rect.left;
      let positionY = e.clientY - rect.top;
      setMouse({x: positionX, y: positionY, moved: true})
      //console.log("each: ", positionX, positionY)
      //console.log("each: ", mouse)
    });
    gsap.ticker.add(() => {
      parallaxIt(".project", -100);
      //parallaxIt(".project img", -30);
    });
  }, [mouse]);*/

  /*useLayoutEffect(() => {
    let ctx = gsap.context(() => {

      let rect = sectionRef.current.getBoundingClientRect();
      const speed = 0.01;
      const items = gsap.utils.toArray(".project-wrap").map(element => {
        return {
          element,
          shiftValue: 100,
          xSet: gsap.quickSetter(element, "x", "px"),
          ySet: gsap.quickSetter(element, "y", "px"),
        }
      });

      let positionX = 0
      let positionY = 0
  
      sectionRef.current.addEventListener("mousemove", (e) => {
        positionX = e.clientX - rect.left;
        positionY = e.clientY - rect.top;
        //setMouse({x: positionX, y: positionY, moved: true})
        //console.log("each: ", positionX, positionY)
        //console.log("each: ", mouse)
      });
  
      //console.log("ticker: ", x,y)
      gsap.ticker.add((time, deltaTime, frame) => {
        gsap.ticker.fps(30);
        gsap.ticker.lagSmoothing(1000, 16);
        // adjust speed for higher refresh monitors
        const dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio()); 
  
        //console.log("ticker: ", mouse.x)
        items.forEach(item => {
          const xset = (((positionX - rect.width / 2) / rect.width * 100) * item.shiftValue * dt  )
          const yset = (((positionY - rect.height / 2) / rect.height * 50) * item.shiftValue * dt )
          //console.log("each: ", xset, yset)
          item.xSet(xset);
          item.ySet(yset);
        });
        //gsap.quickSetter("project-wrap", "x", "px")
        //gsap.quickSetter("project-wrap", "y", "px")
      });

    }, sectionRef);
    return () => ctx.revert();
  }, []);*/

  /*useEffect(() => {
    let rect = sectionRef.current.getBoundingClientRect();
    const speed = 0.35;
    const items = gsap.utils.toArray(".project").map(element => {
      return {
        element,
        shiftValue: 20,
        xSet: gsap.quickSetter(element, "x", "px"),
        ySet: gsap.quickSetter(element, "y", "px"),
      }
    });

    sectionRef.current.addEventListener("mousemove", (e) => {
      let positionX = e.clientX - rect.left;
      let positionY = e.clientY - rect.top;
      setMouse({x: positionX, y: positionY, moved: true})
      //console.log("each: ", positionX, positionY)
      //console.log("each: ", mouse)
    });

    //console.log("ticker: ", x,y)
    gsap.ticker.add(() => {
      // adjust speed for higher refresh monitors
      //const dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio());

      //console.log("ticker: ", mouse.x)
      items.forEach(item => {
        item.xSet(((mouse.x - rect.width / 2) / rect.width * 100) );
        item.ySet(((mouse.y - rect.height / 2) / rect.height * 50) );
      });
    });
  }, [mouse]);*/

  /*useEffect(() => {
    const speed = 0.35;
    const items = gsap.utils.toArray(".project").map(element => {
      return {
        element,
        shiftValue: 20,
        xSet: gsap.quickSetter(element, "x", "px"),
        ySet: gsap.quickSetter(element, "y", "px"),
      }
    });
    console.log("ticker: ", x,y)
    gsap.ticker.add((x,y) => {
      const dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio());
      
      items.forEach(item => {
        item.xSet((x/10) * dt);
        item.ySet((y/10) * dt);
      });
    });
  }, [x,y]);*/



  return (
  <section ref={sectionRef} className={`${styles.root} relative w-full bg-blue z-10`}>
    <div className="px-50 md:px-100 py-100">
      <div ref={HeadlineRef} className='relative w-full font-lato text-80 leading-90 font-300 text-white pb-20 pl-0 md:pl-80 z-10 fade'>
        {block?.headline}
      </div>
      <div ref={GridRef} className={`${styles.grid} project-wrap block md:grid w-full `}>

        {block?.featured_projects?.map((block: any, index: any) => {
          //console.log('home featured col: ', index, block)
          return (
            <Link href={`${block?.link}`} className={`${styles.project} project relative  overflow-hidden bg-dark w-full md:w-1/3 fade`} key={index}>
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
                
                <span className={`${styles.hover} px-40 py-40 relative z-5 text-30 font-500 text-white text-center fade`}>
                  {block.headline}
                </span>
              </span>
            </Link>
          )
        })}
      </div>
      <div className={`${styles.nextwrap} relative w-full pt-20 text-right`}>
        <Link className='relative text-white text-right inline-flex ml-auto mr-0' href={`/portfolio/`} aria-label="Dojo Agency fade">
          <div ref={NextArrowRef} className='text-white'><NextArrow className={`${styles.nextarrow} w-40 h-auto`} /></div>
          <span ref={NextRef} className={`${styles.next} relative font-nothingyoucoulddo text-40 font-300 leading-none pt-10 pl-10`}>View All</span>
        </Link>
      </div>
    </div>
  </section>
)}

export default HomeFeaturedWork
