"use client"
import React, { useRef, useLayoutEffect } from 'react'
import styles from './wysiwyg.module.scss'
import PdfIcon from '@/public/icons/icon-pdf.svg'
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
  <section ref={sectionRef} className={`${styles.root} w-full`}>
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

            {typeof block.wysiwyg_set === 'object' && block?.wysiwyg_set?.map((item:any, index:any) => {
              return (
                ( () => {
                  switch(item.__typename) {
                    case 'BardText':
                      return <div ref={wysiwygRef} className='wysiwyg text-30 leading-40 font-300 fade' dangerouslySetInnerHTML={{ __html: item.text }} key={index}></div>;
                    case 'Set_Wysiwyg_Image':
                      return <div className='w-full' key={index}>
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
                      return <div className={`block md:flex ${item.order.value === 'reverse' ? 'flex-row-reverse' : 'flex-row'}`} key={index}>
                        <div className={`w-full md:w-1/2 flex items-center ${item.order.value === 'reverse' ? 'md:pl-30' : 'md:pr-30'}`}>
                          <div className='w-full'>
                            <div className="w-full">
                              <div className='wysiwyg text-30 leading-40 font-300 fade' dangerouslySetInnerHTML={{ __html: item.wysiwyg }}></div>
                            </div>
                          </div>
                        </div>
                        <div  className="w-full md:w-1/2">
                          {item.image && (
                            <div className={`w-full fade ${item.order.value === 'reverse' ? 'pr-0 md:pr-100' : 'pl-0 md:pl-100'}`}>
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
                    case 'Set_Wysiwyg_Quote':
                      return <div className='blockquote py-20 fade'key={index}>
                        <blockquote className='text-30 leading-40 font-300 fade' dangerouslySetInnerHTML={{ __html: item.quote }}></blockquote>
                        <div className='text-30 leading-40 font-300'>— {item.quote_author}</div>
                      </div>;
                    case 'Set_Wysiwyg_VideoEmbed':
                      return <div className='py-20 fade' key={index}>
                        <div className="relative w-full aspect-video">
                          <iframe src={item.video_embed} width="640" height="360" frameborder="0" title="" webkitallowfullscreen mozallowfullscreen allowfullscreen className='w-full h-full'></iframe>
                        </div>
                      </div>;
                    case 'Set_Wysiwyg_AudioFile':
                      return <div className='py-20 fade' key={index}>
                        <audio controls className='w-full'>
                          <source src={item.audio_file?.permalink} type="audio/mpeg" />
                          Your browser does not support the audio element.
                        </audio>
                      </div>;
                    case 'Set_Wysiwyg_PdfDownload':
                      return <div className='flex items-center py-20 fade' key={index}>
                          <div className='relative pr-20'>
                            <a href={item.pdf?.permalink} target="_blank" className='text-blue'><PdfIcon className='w-50 h-auto'/></a>
                          </div>
                          <div className='text-30 leading-40 font-300'>
                             {item.pdf_text}
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
