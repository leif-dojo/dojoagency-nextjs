//"use client"
import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import styles from './timeline.module.scss'

export const typename = 'Set_Components_Timeline'

const TimelineBlock = ({ block }: { block: any }) => {

  return (
  <section className={`${styles.root} w-full bg-white text-slate`}>
    <div className="px-100 py-100">
      <div className="w-full">
        <div className="w-full">
          <div className='wysiwyg text-90 leading-120 font-300' dangerouslySetInnerHTML={{ __html: block.headline }}></div>
        </div>
        <div className="w-full">
          <div className='wysiwyg text-30 leading-40 font-300' dangerouslySetInnerHTML={{ __html: block.wysiwyg }}></div>
        </div>
      </div>

      <div className={`${styles.timeline} relative flex flex-nowrap items-stretch w-full my-200`}>

        {block?.timeline?.map((block, index) => {
          console.log('col: ', index, block)
          return (
            <div className={`${styles.item} relative flex-1`} key={index}>
              {block.image && (
                <div className={`${styles.top} absolute w-full h-150 bottom-0`}>
                    <div className='absolute w-full h-full top-0 left-0 overflow-hidden'>
                      <Image
                        src={block.image?.permalink}
                        width={block.image?.width}
                        height={block.image?.height}
                        alt={block.image?.alt ? block.image.alt : ''}
                        className={`${styles.image} relative w-full h-auto`}
                      />
                    </div>
                </div>
              )}
              <div className={`${styles.mid} relative bg-orange z-10`} style={{backgroundColor: block.color}}>
                  <div className='flex items-stretch px-10 py-10'>
                    <div className='text-20 leading-none text-white'>{block.year}</div>
                    <div className={`overflow-hidden ml-auto`}>
                      <div className={`${styles.headline} relative text-20 leading-none text-white whitespace-nowrap`}>{block.headline}</div>
                    </div>
                  </div>
              </div>
              {block.logo && block.overview && (
                <div className={`${styles.bottom} absolute top-0 w-full`}>
                  <div className='w-full flex items-stretch flex-nowrap bg-white px-10 py-10'>
                      <div className='w-1/2 flex pr-20 items-center overflow-hidden'>
                        {block.logo && (
                          <Image
                            src={block.logo?.permalink}
                            width={block.logo?.width}
                            height={block.logo?.height}
                            alt={block.logo?.alt ? block.logo.alt : ''}
                            className={`${styles.logo} relative w-full h-auto`}
                          />
                        )}
                      </div>
                      <div className='w-1/2 text-right'>
                        {block?.overview?.map((item, index) => {
                          //console.log('col: ', index, block)
                          return (
                            <div className='text-20 font-300 leading-none text-slate text-left py-5'>{item}</div>
                          )
                        })}
                      </div>
                    </div>
                </div>
              )}
            </div>
          )
        })}

      </div>
    </div>
  </section>
)}

export default TimelineBlock
