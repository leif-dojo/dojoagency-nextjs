"use client"
import React, { useContext, useEffect, useState, useRef, useLayoutEffect } from 'react'
import Image from 'next/image'
export const typename = 'Set_Components_2ColumnImage'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const Column2ImageBlock = ({ block }: { block: any }) => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const copyRef = useRef<HTMLDivElement>(null)
  const mediaRef = useRef<HTMLDivElement>(null)

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

  return (
  <section ref={sectionRef} className="w-full bg-white text-slate">
    <div className="px-50 md:px-100 py-100">
      <div className="block md:flex">
        <div ref={copyRef} className="w-full md:w-1/2 md:pr-30 flex items-center">
          <div className='w-full'>
            {block.eyebrow && (
              <div className="text-20 leading-none font-300 uppercase mb-10 fade">
                {block.eyebrow}
              </div>
            )}
            <div className="text-90 leading-120 font-300 mb-20 fade">
              {block.headline}
            </div>
            <div className="w-full">
              <div className='wysiwyg text-30 leading-40 font-300 fade' dangerouslySetInnerHTML={{ __html: block.wysiwyg }}></div>
            </div>
            {block.wysiwyg_sub && (
            <div className="w-full">
              <div className='wysiwyg text-30 leading-40 font-300 fade' dangerouslySetInnerHTML={{ __html: block.wysiwyg_sub }}></div>
            </div>
            )}
          </div>
        </div>
        <div ref={mediaRef} className="w-full md:w-1/2">
          {block.image && (
            <div className='w-full pl-0 md:pl-100 fade'>
              <Image
              src={block.image?.permalink}
              width={block.image?.width}
              height={block.image?.height}
              alt={block.image?.alt ? block.image.alt : ''}
              className='w-full h-auto'
            />
            </div>
          )}
        </div>
      </div>
    </div>
  </section>
)}

export default Column2ImageBlock
