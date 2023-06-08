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

      gsap
      .timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          //end: 'bottom bottom',
          //scrub: true,
          toggleActions: "restart none none reverse",
          //markers: true,
        },
      }).fromTo(
        ".link",
        { autoAlpha: 0, y: 50 },
        { duration: 0.9, autoAlpha: 1, y: 0 }
      )

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
  <section ref={sectionRef} className="w-full bg-white text-slate">
    <div className='w-full flex flex-nowrap px-100 py-100'>
      <div className='flex w-1/2 justify-items-start'>
        { block.back_link && (
          <a href={`${block.back_link}`} className="link inline-flex mr-auto text-blue" aria-label="Previous">
            <Arrow className={`${styles.arrow} w-30 h-auto rotate-180`}/>
            <span className="font-nothingyoucoulddo text-40 font-400 text-blue pl-20">{block.back_link_copy ? block.back_link_copy : 'Previous'}</span>
          </a>
        )}
      </div>
      <div className='flex w-1/2 justify-items-end'>
        { block.forward_link && (
          <a  href={`${block.forward_link}`} className="link inline-flex ml-auto text-blue" aria-label="Next">
            <span className="font-nothingyoucoulddo text-40 font-400 text-blue pr-20">{block.forward_link_copy ? block.forward_link_copy : 'Next'}</span> 
            <Arrow className={`${styles.arrow} w-30 h-auto`}/>
          </a>
        )}
      </div>
    </div>
  </section>
)}

export default PostNavigationBlock
