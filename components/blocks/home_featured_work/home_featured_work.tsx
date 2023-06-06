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
  const CircleRef = useRef<HTMLDivElement>(null)
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



  return (
  <section ref={sectionRef} className={`${styles.root} relative w-full bg-blue z-10`}>
    <div className="px-100 py-100">
      <div className='w-full font-lato text-80 leading-90 font-300 text-white pb-20 pl-80'>
        {block?.headline}
      </div>
      <div className={`${styles.grid} grid w-full `}>

        {block?.featured_projects?.map((block: any, index: any) => {
          //console.log('home featured col: ', index, block)
          return (
            <a href={`${block?.link}`} className={`${styles.project} project relative  overflow-hidden bg-dark w-1/3`} key={index}>
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
                      <div className="video absolute w-full h-full overflow-hidden top-0 z-1" >
                          <div className="video-inner absolute block w-full h-full">
                              <iframe src={`${block.video_embed}?autoplay=1&loop=1&autopause=0&background=1&muted=1`} 
                              title="Vimeo video player"
                              className="vimeo w-full h-full"
                              width="640" height="360"
                              allow="autoplay; fullscreen"></iframe>
                          </div>
                      </div>
                    )}

                    {block.video_local && (
                      <div className="video absolute w-full h-full overflow-hidden top-0 z-1" >
                          <div className="video-inner absolute block w-full h-full">
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

                  </span>
                )}
                <span className={`${styles.hover} relative z-5 text-30 font-500 text-white`}>
                  {block.headline}
                </span>
              </span>
            </a>
          )
        })}
      </div>
      <div className='w-full pt-20 text-right'>
        <a className=' text-white text-right inline-flex ml-auto mr-0' href={`/portfolio/`} aria-label="Dojo Agency">
          <NextArrow /><span className={`font-nothingyoucoulddo text-40 font-300 pt-5 pl-10`}>View All</span></a>
      </div>
    </div>
  </section>
)}

export default HomeFeaturedWork
