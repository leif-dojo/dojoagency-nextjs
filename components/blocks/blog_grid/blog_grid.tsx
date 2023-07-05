"use client"
import React, { useContext, useEffect, useState, useRef, useLayoutEffect } from 'react'
import styles from './blog_grid.module.scss'
import { useThemeContext } from '@/context/theme'
import { useIsMobile, hexToRgb } from '@/utils/general'
import Image from 'next/image'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export const typename = 'Set_Components_BlogGrid'
const BlogGridBlock = ({ block, entries }: { block: any, entries:any }) => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { cursorType, cursorChangeHandler, colorChangeHandler, backgroundChangeHandler } = useThemeContext();

  const onMouseEnter = () => {
    cursorChangeHandler("next")
  }

  const onMouseLeave = () => {
    cursorChangeHandler("default")
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

  //console.log("BlogGridBlock", block, entries);
  return (
    <section ref={sectionRef} className={`${styles.root} w-full overflow-hidden`}>
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
        </div>
        <div className={`${styles.grid} grid grid-cols-1 md:grid-cols-3 gap-30 w-full pt-50`}>

          {entries?.data?.map((post: any, index: any) => {
            //console.log('col: ', index, post)
            return (
              <Link href={`${post?.uri ? post?.uri : ''}`} className={`${styles.post} profile relative  overflow-hidden w-full fade`} key={index}>
                <div className="w-full h-auto">
                  <div className={`${styles.postimage} relative w-full h-full top-0 left-0 overflow-hidden`}>
                    {post.featured_image && (
                      <div className='absolute w-full h-full top-0 left-0'>
                        {post.featured_image && (
                          <Image
                            src={post.featured_image?.permalink}
                            width={post.featured_image?.width}
                            height={post.featured_image?.height}
                            alt={post.featured_image?.alt ? post.featured_image.alt : ''}
                            className={`${styles.image} relative w-full h-auto`}
                          />
                        )}
                      </div>
                    )}
                  </div>
                  <div className={`relative w-full  px-18 py-18`}>
                    <div className={`text-30 leading-none font-700 text-left pb-20`}>
                      {post.title}
                    </div>
                    <div className={`text-25 leading-none font-300  text-left pb-20`}>
                      {post.date}
                    </div>
                    <div className={`text-25 leading-none font-300  text-left pb-20`}>
                      {post.excerpt}
                    </div>
                    <div className={`text-25 leading-none font-500 text-left`} >Read More ›</div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default BlogGridBlock
