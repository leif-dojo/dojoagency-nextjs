"use client"
import React, { useContext, useEffect, useState, useRef, useLayoutEffect } from 'react'
import Image from 'next/image'
import styles from './team_grid.module.scss'
import { useThemeContext } from '@/context/theme'
import Socials from '@/components/generic/social_icons/social_icons'
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

  //console.log("ImageGridBlock", block);
  return (
  <section ref={sectionRef} className={`${styles.root} w-full bg-white text-slate overflow-hidden`}>
    <div className="px-50 md:px-100 py-100">
      <div className="w-full">
        {block.eyebrow && (
          <div className="text-20 leading-none font-300 uppercase mb-10 fade">
            {block.eyebrow}
          </div>
        )}
        <div className="w-full">
          <div className='wysiwyg text-90 leading-120 font-300 fade' dangerouslySetInnerHTML={{ __html: block.headline }}></div>
        </div>
        <div className="w-full">
          <div className='wysiwyg text-30 leading-40 font-300 fade' dangerouslySetInnerHTML={{ __html: block.wysiwyg }}></div>
        </div>
      </div>
      <div className={`${styles.grid} grid grid-cols-1 md:grid-cols-3 gap-30 w-full pt-50`}>

        {block?.team_grid?.map((block:any, index:any) => {
          //console.log('col: ', index, block)
          return (
            <div className={`${styles.project} profile relative  overflow-hidden bg-grey w-full fade`} key={index}>
              <div className="w-full h-auto">
                <div className='relative w-full h-full top-0 left-0 aspect-square'>
                  {block.profile_image && (
                    <div className='absolute w-full h-full top-0 left-0 aspect-square'>
                      {block.profile_image && (
                        <Image
                          src={block.profile_image?.permalink}
                          width={block.profile_image?.width}
                          height={block.profile_image?.height}
                          alt={block.profile_image?.alt ? block.profile_image.alt : ''}
                          className={`${styles.image} relative w-full h-auto`}
                        />
                      )}
                    </div>
                  )}
                  <div className={`${styles.bio} absolute w-full h-full flex justify-center items-end px-18 py-18`}>
                    <div className='wysiwyg text-30 leading-40 font-300 text-white' dangerouslySetInnerHTML={{ __html: block.bio }}></div>
                  </div>
                </div>
                <div className={`relative flex flex-nowrap items-center w-full bg-slate text-white px-18 py-18`}>
                  <div className={`text-25 leading-none font-700 text-white text-center`}>
                    {block.name}
                  </div>
                  <div className={`text-25 leading-none font-300 text-white px-10`}>
                    |
                  </div>
                  <div className={`text-25 leading-none font-300 text-white text-center`}>
                    {block.job_title}
                  </div>
                  <div className={`ml-auto`}>
                    <Socials socials={block.socials} style={'simple'}/>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
        </div>
    </div>
  </section>
)}

export default ImageGridBlock
