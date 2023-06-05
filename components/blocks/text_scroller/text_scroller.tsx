"use client"
import React, { useRef, useEffect, useLayoutEffect } from 'react'
import styles from './text_scroller.module.scss'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import ScrollText  from '@/utils/SplitText'
gsap.registerPlugin(ScrollTrigger)

export const typename = 'Set_Components_TextScroller'

const TextScrollerBlock = ({ block }: { block: any }) => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const TextRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {

    let ctx = gsap.context(() => {
      let split = new ScrollText({
        words: 1,
        chars: 0,
        spacing: "0.33em"
      }).split(TextRef.current)
      //console.log("split: ", split)


      const items = gsap.utils.toArray(".wysiwyg div")
      //console.log("items: ",items)
      items.forEach((item, index) => {
        //const p = gsap.utils.selector(item);
        //console.log("each: ", p)
        /*gsap
        .timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "center 70%",
            end: "center 30%",
            scrub: true,
            // end: "+=500",
            markers: true,
            toggleActions: "play reverse play reverse",
            //toggleActions: 'play none none reverse', // onEnter, onLeave, onEnterBack, and onLeaveBack
          },
        }).fromTo(
          item,
          //".wysiwyg div div",
          {
            autoAlpha: 0,
        }, {
            duration: 1.5,
            autoAlpha: 1,
            //stagger: 0.25,
            ease: 'power3.out'
        },
        )*/

        gsap
        .timeline({
          scrollTrigger: {
            trigger: item,
            start: "center 75%",
            end: "center 25%",
            //scrub: true,
            // end: "+=500",
            //markers: true,
            toggleActions: "play reverse play reverse",
            //toggleActions: 'play none none reverse', // onEnter, onLeave, onEnterBack, and onLeaveBack
          },
        }).fromTo(
          item,
          //".wysiwyg div div",
          {
            autoAlpha: 0,
          }, {
              duration: 0.5,
              autoAlpha: 1,
              stagger: 0,
              ease: 'power3.out'
          },0
        )

        /*gsap.to(item, {
          opacity: 1, 
          ease: "none",
          scrollTrigger: {
            trigger: item,
            start: "center 70%",
            end: "center 30%",
            markers: true,
            toggleActions: "play reverse play reverse"
          }
        })*/

      })


      /*gsap
      .timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "center 80%",
          end: "center 20%",
          scrub: true,
          // end: "+=500",
          markers: true,
          toggleActions: "play reverse play reverse",
          //toggleActions: 'play none none reverse', // onEnter, onLeave, onEnterBack, and onLeaveBack
        },
      })
      .fromTo(
        `.wysiwyg div`,
        {
          autoAlpha: 0,
      }, {
          //duration: 1.5,
          autoAlpha: 1,
          stagger: 0.25,
          ease: 'power3.out'
      },
      )*/
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
  <section ref={sectionRef} className={`${styles.root} relative w-full bg-black text-white overflow-hidden`}>
    <div className={`${styles.background} absolute h-full w-full left-0 top-0`}>
      {block.background_image && (
          <div className='w-full h-full opacity-20 fixed top-0'>
            <img src={block.background_image?.permalink} className='aspect-video'/>
          </div>
        )}
    </div>
    <div className="px-150 py-100">
      <div className="grid grid-cols-12">
        <div className="w-full col-start-2 col-span-10">
          <div ref={TextRef} className='relative z-10 wysiwyg text-80 leading-100 font-500' dangerouslySetInnerHTML={{ __html: block.wysiwyg }}></div>
        </div>
      </div>
    </div>
  </section>
)}

export default TextScrollerBlock
