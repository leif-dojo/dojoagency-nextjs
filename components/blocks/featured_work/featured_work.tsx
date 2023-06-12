"use client"
import React, { useContext, useEffect, useState, useRef, useLayoutEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './featured_work.module.scss'
export const typename = 'Set_Components_FeaturedWork'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const HomeFeaturedWork = ({ block }: { block: any }) => {
  const sectionRef = useRef<HTMLDivElement>(null)

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


    /*useEffect(() => {
    let xTo = gsap.quickTo(".project", "x", {duration: 0.6, ease: "power3"});
    let yTo = gsap.quickTo(".project", "y", {duration: 0.6, ease: "power3"});
    
    window.addEventListener("mousemove", (e) => {
      // xTo(e.pageX);
      // yTo(e.pageY);
      //xTo(e.clientX);
      //yTo(e.clientY);
      xTo(x / 100);
      yTo(y / 100);
    });
  }, [x,y]);*/
  const [mouse, setMouse] = useState({x: 0, y: 0, moved: false})

  function parallaxIt(target: any, movement: any) {
    let rect = sectionRef?.current ? sectionRef?.current?.getBoundingClientRect() : {width:0,height:0};
    gsap.to(target, {
      duration: 0,
      x: (mouse.x - rect.width / 2) / rect.width * movement,
      y: (mouse.y - rect.height / 2) / rect.height * movement
    });

    //let xTo = gsap.quickTo(".project", "x", {duration: 0.6, ease: "power3"});
    //let yTo = gsap.quickTo(".project", "y", {duration: 0.6, ease: "power3"});
    //xTo((mouse.x - rect.width / 2) / rect.width * 100);
    //yTo((mouse.y - rect.height / 2) / rect.height * 50);
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

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {

    }, sectionRef);
    return () => ctx.revert();
  }, [mouse]);

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

  return(
    <section ref={sectionRef} className={`${styles.root} w-full bg-white text-slate overflow-hidden`}>
    <div className="px-50 md:px-100 py-100">
      <div className={`${styles.grid} grid grid-cols-2 md:grid-cols-3 gap-50 w-full `}>

        {block?.featured_projects?.map((block: any, index: any) => {
          //console.log('col: ', index, block)
          return (
            <Link href={`${block?.link}`} className={`${styles.project} item relative overflow-hidden bg-dark f-full fade`} key={index}>
              <span className="flex justify-center items-center w-full h-full">
                {block.image && (
                  <span className='absolute w-full h-full top-0 left-0'>

                    <Image
                      src={block.image?.permalink}
                      width={block.image?.width}
                      height={block.image?.height}
                      alt={block.image?.alt ? block.image.alt : ''}
                      className={`${styles.image} relative w-full h-auto`}
                    />

                    <Image
                      src={block.image_hover?.permalink}
                      width={block.image_hover?.width}
                      height={block.image_hover?.height}
                      alt={block.image_hover?.alt ? block.image_hover.alt : ''}
                      className={`${styles.imagehover} absolute top-0 w-full h-auto`}
                    />

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
                    {block.headline}
                  </span>
                  <span className={`${styles.hover} absolute w-full z-5 text-40 leading-none font-500 text-white text-center`}>
                    {block.headline_hover}
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

export default HomeFeaturedWork
