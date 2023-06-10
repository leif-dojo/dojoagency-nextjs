"use client"
import React, { useRef, useLayoutEffect } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export const typename = 'Set_Components_Image'

const ImageBlock = ({ block }: { block: any }) => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {

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
    <div className="px-50 md:px-200 py-100">
      <div ref={imageRef} className="flex w-full">
        {block.image && (
          <div className='w-full fade'>
              <Image
                src={block.image?.permalink}
                width={block.image?.width}
                height={block.image?.height}
                alt={block.image?.alt ? block.image.alt : ''}
                className={`w-full h-auto`}
              />
          </div>
        )}
      </div>
    </div>
  </section>
)}

export default ImageBlock
