"use client"
import React, { useRef, useLayoutEffect } from 'react'
import styles from './headline_hero.module.scss'
import Image from 'next/image'
import ShareIcons from '@/components/generic/share_icons/share_icons'
import IconLink from '@/public/icons/icon-link.svg'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export const typename = 'Set_Components_Wysiwyg'
const WysiwygBlock = ({ block }: { block: any }) => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLDivElement>(null)
  const sideRef = useRef<HTMLDivElement>(null)

  const copyToClip = () => {
    navigator.clipboard.writeText(location.href);
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

  return (
    <section ref={sectionRef} className={`${styles.root} w-full bg-white text-slate`}>
      <div className="px-50 md:px-100 py-50">
        <div className="block md:flex">
          <div ref={headlineRef} className="w-full md:w-8/12">
            {block.eyebrow && (
              <div className="text-20 leading-none font-300 uppercase mb-10 fade">
                {block.eyebrow}
              </div>
            )}
            {block.headline && (
            <div className='wysiwyg text-110 leading-140 font-300 fade' dangerouslySetInnerHTML={{ __html: block.headline }}></div>
            )}
          </div>
          <div className="w-full md:w-4/12 text-right">
            <div ref={sideRef} className="w-full md:w-10/12 ml-auto mr-0 text-left pt-30">
              <div className="w-full text-25 leading-none font-300 pb-20 fade">
                {block.sharing_title}
              </div>
              {block.client[0] && block.client[0].client_logo && (
                <div className='logo relative block w-7/12 mr-auto ml-0 z-10 fade'>
                  <Image
                    src={block.client[0].client_logo?.permalink}
                    width={block.client[0].client_logo?.width}
                    height={block.client[0].client_logo?.height}
                    alt={block.client[0].client_logo?.alt ? block.client[0].client_logo.alt : ''}
                  />
                </div>
              )}
              {block.show_sharing && (
                <>
                <div className="w-full bg-slate h-1 my-25 opacity-10"></div>
                <div className="w-full flex flex-nowrap">
                  <div className="w-full md:w-1/2 fade">
                    <div className="text-25 leading-none font-300 pb-20">Share</div>
                    <ShareIcons />
                  </div>
                  <div className="w-full md:w-1/2 fade">
                    <div className="text-25 leading-none font-300 pb-20 cursor-pointer">Copy Link</div>
                    <div className="w-full">
                      <div className={`${styles.icon} flex items-center justify-center`}>
                        <div className={`relative flex items-center justify-center text-blue cursor-pointer`} aria-label="copy to clipboard" onClick={copyToClip}>
                          <IconLink />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WysiwygBlock
