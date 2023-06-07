"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './featured_work.module.scss'
export const typename = 'Set_Components_FeaturedWork'

const HomeFeaturedWork = ({ block }: { block: any }) => {
  
  return(
    <section className={`${styles.root} w-full bg-white text-slate overflow-hidden`}>
    <div className="px-100 py-100">
      <div className={`${styles.grid} grid grid-cols-2 md:grid-cols-3 gap-50 w-full `}>

        {block?.featured_projects?.map((block: any, index: any) => {
          //console.log('col: ', index, block)
          return (
            <a href={`${block?.link}`} className={`${styles.project} relative  overflow-hidden bg-dark f-full`} key={index}>
              <span className="flex justify-center items-center w-full h-full">
                {block.image && (
                  <span className='absolute w-full h-full top-0 left-0'>

                    <Image
                      src={block.image?.permalink}
                      width={block.image?.width}
                      height={block.image?.height}
                      alt={block.image?.alt ? block.image.alt : ''}
                      className={`${styles.image} relative w-full h-auto`}
                    />

                    <Image
                      src={block.image_hover?.permalink}
                      width={block.image_hover?.width}
                      height={block.image_hover?.height}
                      alt={block.image_hover?.alt ? block.image_hover.alt : ''}
                      className={`${styles.imagehover} absolute top-0 w-full h-auto`}
                    />

                    {block.video_embed && (
                          <div className="video absolute w-full h-full overflow-hidden top-0 z-1" >
                            <div className="video-inner absolute block w-full h-full">
                              <iframe src={`${block.video_embed}?autoplay=1&loop=1&autopause=0&background=1&muted=1`} 
                              title="Vimeo video player"
                              className="vimeo w-full h-full"
                              width="640" height="360"
                              allow="autoplay; fullscreen"></iframe>
                          </div>
                      </div>
                    )}

                    {block.video_local && (
                          <div className="video absolute w-full h-full overflow-hidden top-0 z-1" >
                            <div className="video-inner absolute block w-full h-full">
                              <video 
                                className="html-video aspect-video"
                                width="640" 
                                height="360"
                                autoPlay
                                controls
                                loop
                                muted
                                preload="auto">
                                <source src={`${block.video_local?.permalink}`} type="video/mp4"></source>
                              </video>
                          </div>
                      </div>
                    )}
                    
                  </span>
                )}
                <span className={`relative w-full flex justify-center items-center`}>
                  <span className={`${styles.headline} absolute w-full z-5 text-60 leading-none font-500 text-white text-center`}>
                    {block.headline}
                  </span>
                  <span className={`${styles.hover} absolute w-full z-5 text-40 leading-none font-500 text-white text-center`}>
                    {block.headline_hover}
                  </span>
                </span>
              </span>
            </a>
          )
        })}
        </div>
    </div>
  </section>
)}

export default HomeFeaturedWork
