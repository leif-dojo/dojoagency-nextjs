"use client"
import React, { useContext, useEffect, useState, useRef, useLayoutEffect } from 'react'
import Image from 'next/image'
import styles from './project_grid.module.scss'
import { useThemeContext } from '@/context/theme'
import IconX from '@/public/icons/icon-x.svg'
import Arrow from '@/public/icons/icon-triangle.svg'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export const typename = 'Set_Components_ProjectGrid'

const ProjectGridBlock = ({ block }: { block: any }) => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)
  const [activeindex, setActiveIndex] = useState(1)

  const { cursorType, cursorChangeHandler} = useThemeContext();



  const onMouseEnter = () => {
    cursorChangeHandler("view")
  }

  const onMouseLeave = () => {
      cursorChangeHandler("default")
  }

  const openOrClose = (index:any) => {
    setActiveIndex(index)
    active ? setActive(false) : setActive(true)
    active ? document.body.classList.remove('body-lock') : document.body.classList.add('body-lock')
  }
  const onNext = () => {
    let next = activeindex +1;
    if(next >= block.project_grid.length) {next = 0}
    setActiveIndex(next)
  }
  const onPrev = () => {
    let prev = activeindex -1;
    if(prev < 0) {prev = block.project_grid.length-1}
    setActiveIndex(prev)
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
  <section ref={sectionRef} className={`${styles.root} w-full bg-white text-slate overflow-hidden`}>
    <div className="px-50 md:px-100 py-100">
      <div className="w-full">
        {block.eyebrow && (
            <div className="text-20 leading-none font-300 uppercase mb-10 fade">
              {block.eyebrow}
            </div>
          )}
        <div className="w-full">
          <div className='wysiwyg text-50 leading-none font-700 pb-10 fade' dangerouslySetInnerHTML={{ __html: block.headline }}></div>
        </div>
        <div className="w-full">
          <div className='wysiwyg text-30 leading-40 font-300 fade' dangerouslySetInnerHTML={{ __html: block.wysiwyg }}></div>
        </div>
      </div>

      <div className={`${styles.grid} grid grid-cols-1 md:grid-cols-3 gap-30 w-full pt-30`} onMouseEnter={() => onMouseEnter()} onMouseLeave={() => onMouseLeave()}>

        {block?.project_grid?.map((block:any, index:any) => {
          //console.log('col: ', index, block)
          return (
            <div className={`${styles.project} project relative overflow-hidden cursor-pointer fade`} onClick={() => openOrClose(index)} key={index}>
              <div className="block w-full h-full">
                <div className={`w-full px-30 py-20`}>
                  {block.project_title && (
                    <div className={`text-30 leading-40 font-700 text-slate`}>
                      {block.project_title}
                    </div>
                  )}
                  {block.project_description && (
                    <div className={`text-30 leading-40 font-300 text-slate`}>
                      {block.project_description}
                    </div>
                  )}
                </div>
                {block.project_image && (
                  <div className={`${styles.projectimage} relative w-full h-300 top-0 left-0`}>
                    <Image
                      src={block.project_image?.permalink}
                      width={block.project_image?.width}
                      height={block.project_image?.height}
                      alt={block.project_image?.alt ? block.project_image.alt : ''}
                      className={`${styles.image} relative w-full h-auto`}
                    />
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>

    {active && (
      <div className={`${styles.popup} fixed   w-screen h-screen left-0 top-0 z-10`}>
        <div className="relative px-50 md:px-100 py-40 w-full h-full overflow-y-scroll">
        <div className="relative bg-white w-full h-auto">

          <div className={`${styles.close} absolute top-50 right-50 flex items-center z-10 cursor-pointer`} role="none" onClick={() => openOrClose(0)}>
            <div className="a11y hidden">Toggle Menu</div>
            <div className={`font-lato text-slate text-80 font-300 leading-none`}>X</div>
          </div>

          <div className="relative w-full px-50 md:px-150 pt-200 pb-100">

            <div className="block md:flex">
              <div className="w-full md:w-6/12 md:pr-30 flex items-center">
                <div className='w-full'>
                  {block?.project_grid[activeindex].popup_headline && (
                    <div className="text-90 leading-120 font-300 mb-20">
                      {block?.project_grid[activeindex].popup_headline}
                    </div>
                  )}
                  {block?.project_grid[activeindex].popup_wysiwyg && (
                    <div className="w-full">
                      <div className='wysiwyg text-30 leading-40 font-300 text-slate' dangerouslySetInnerHTML={{ __html: block?.project_grid[activeindex].popup_wysiwyg }}></div>
                    </div>
                  )}
                </div>
              </div>
              <div className="w-full md:w-6/12">
                {block?.project_grid[activeindex].popup_image && (
                  <div className='relative w-full md:pl-50'>
                    <Image
                      src={block?.project_grid[activeindex].popup_image?.permalink}
                      width={block?.project_grid[activeindex].popup_image?.width}
                      height={block?.project_grid[activeindex].popup_image?.height}
                      alt={block?.project_grid[activeindex].popup_image?.alt ? block?.project_grid[activeindex].popup_image.alt : ''}
                      className={`${styles.image} relative w-full h-auto`}
                    />
                  </div>
                )}
              </div>
            </div>


          </div>
          <div className='container w-full flex flex-nowrap px-50 md:px-100 py-100'>
            <div className='flex w-1/2 justify-items-start'>
              <div className="inline-flex mr-auto text-blue" aria-label="Previous" onClick={() => onPrev()}>
                  <Arrow className="w-30 h-auto rotate-180"/>
                  <span className="font-nothingyoucoulddo text-40 font-400 text-blue pl-20 cursor-pointer">Previous</span>
                </div>
            </div>
            <div className='flex w-1/2 justify-items-end'>
              <div  className="inline-flex ml-auto text-blue" aria-label="Next" onClick={() => onNext()}>
                  <span className="font-nothingyoucoulddo text-40 font-400 text-blue pr-20 cursor-pointer">Next</span> 
                  <Arrow className="w-30 h-auto" />
                </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    )}
      
  </section>
)}

export default ProjectGridBlock
