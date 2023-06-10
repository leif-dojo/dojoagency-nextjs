"use client"
import React, { useRef, useLayoutEffect } from 'react'
import styles from './post_navigation.module.scss'
import Arrow from '@/public/icons/icon-triangle.svg'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export const typename = 'Set_Components_PostNavigation'
const PostNavigationBlock = ({ block }: { block: any }) => {
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

  return (
  <section ref={sectionRef} className="w-full bg-white text-slate">
    <div className='w-full flex flex-nowrap px-50 md:px-100 py-100'>
      <div className='flex w-1/2 justify-items-start'>
        { block.back_link && (
          <a href={`${block.back_link}`} className="link inline-flex mr-auto text-blue fade" aria-label="Previous">
            <Arrow className={`${styles.arrow} w-30 h-auto rotate-180`}/>
            <span className="font-nothingyoucoulddo text-40 font-400 text-blue pl-20">{block.back_link_copy ? block.back_link_copy : 'Previous'}</span>
          </a>
        )}
      </div>
      <div className='flex w-1/2 justify-items-end'>
        { block.forward_link && (
          <a  href={`${block.forward_link}`} className="link inline-flex ml-auto text-blue fade" aria-label="Next">
            <span className="font-nothingyoucoulddo text-40 font-400 text-blue pr-20">{block.forward_link_copy ? block.forward_link_copy : 'Next'}</span> 
            <Arrow className={`${styles.arrow} w-30 h-auto`}/>
          </a>
        )}
      </div>
    </div>
  </section>
)}

export default PostNavigationBlock
