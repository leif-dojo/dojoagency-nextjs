"use client"
import React, { useRef, useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

import Image from 'next/image'

export const typename = 'Set_Components_Wysiwyg'
const WysiwygBlock = ({ block }: { block: any }) => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLDivElement>(null)
  const wysiwygRef = useRef<HTMLDivElement>(null)

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
  //console.log("test: ", block)
  return (
  <section ref={sectionRef} className="w-full ">
    <div className="px-50 md:px-150 py-50">
      <div className="w-full">
        {block.eyebrow && (
          <div className="text-20 leading-none font-300 uppercase mb-10 fade">
            {block.eyebrow}
          </div>
        )}
        {block.headline && (
          <div className="w-full">
            <div ref={headlineRef} className='wysiwyg text-90 leading-120 font-300 fade' dangerouslySetInnerHTML={{ __html: block.headline }}></div>
          </div>
        )}
        {block.wysiwyg_set && (
          <div className="w-full">
            
            {typeof block.wysiwyg_set === 'string' && (
              <div ref={wysiwygRef} className='wysiwyg text-30 leading-40 font-300 fade' dangerouslySetInnerHTML={{ __html: block.wysiwyg_set }}></div>
            )}

            {block?.wysiwyg_set?.map((item:any, index:any) => {
              return (
                ( () => {
                  switch(item.__typename) {
                    case 'BardText':
                      return <div ref={wysiwygRef} className='wysiwyg text-30 leading-40 font-300 fade' dangerouslySetInnerHTML={{ __html: item.text }}></div>;
                    case 'Set_Wysiwyg_Image':
                      return <div className='w-full'>
                        {item.image && (
                          <div className='w-full fade'>
                              <Image
                                src={item.image?.permalink}
                                width={item.image?.width}
                                height={item.image?.height}
                                alt={item.image?.alt ? item.image.alt : ''}
                                className={`w-full h-auto`}
                              />
                          </div>
                        )}
                      </div>;
                    case 'Set_Wysiwyg_2Column':
                      return <div className="block md:flex">
                        <div className="w-full md:w-1/2 md:pr-30 flex items-center">
                          <div className='w-full'>
                            <div className="w-full">
                              <div className='wysiwyg text-30 leading-40 font-300 fade' dangerouslySetInnerHTML={{ __html: item.wysiwyg }}></div>
                            </div>
                          </div>
                        </div>
                        <div  className="w-full md:w-1/2">
                          {item.image && (
                            <div className='w-full pl-0 md:pl-100 fade'>
                              <Image
                              src={item.image?.permalink}
                              width={item.image?.width}
                              height={item.image?.height}
                              alt={item.image?.alt ? item.image.alt : ''}
                              className='w-full h-auto'
                            />
                            </div>
                          )}
                        </div>
                      </div>;
                  }
                })()
              )

            })}
          </div>
        )}
      </div>
    </div>
  </section>
)}

export default WysiwygBlock
