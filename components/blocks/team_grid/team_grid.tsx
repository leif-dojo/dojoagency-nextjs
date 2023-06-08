"use client"
import React from 'react'
import Image from 'next/image'
import styles from './team_grid.module.scss'
import { useThemeContext } from '@/context/theme'
import Socials from '@/components/generic/social_icons/social_icons'

export const typename = 'Set_Components_ImageGrid'

const ImageGridBlock = ({ block }: { block: any }) => {
  const { cursorType, cursorChangeHandler} = useThemeContext();

  const onMouseEnter = () => {
    cursorChangeHandler("next")
  }

  const onMouseLeave = () => {
      cursorChangeHandler("default")
  }

  //console.log("ImageGridBlock", block);
  return (
  <section className={`${styles.root} w-full bg-white text-slate overflow-hidden`}>
    <div className="px-50 md:px-100 py-100">
      <div className="w-full">
        <div className="w-full">
          <div className='wysiwyg text-90 leading-120 font-300' dangerouslySetInnerHTML={{ __html: block.headline }}></div>
        </div>
        <div className="w-full">
          <div className='wysiwyg text-30 leading-40 font-300' dangerouslySetInnerHTML={{ __html: block.wysiwyg }}></div>
        </div>
      </div>
      <div className={`${styles.grid} grid grid-cols-2 md:grid-cols-3 gap-30 w-full pt-50`}>

        {block?.team_grid?.map((block:any, index:any) => {
          console.log('col: ', index, block)
          return (
            <div className={`${styles.project} relative  overflow-hidden bg-grey w-full`} key={index}>
              <div className="w-full h-auto">
                <div className='relative w-full h-full top-0 left-0 aspect-square'>
                  {block.profile_image && (
                    <div className='absolute w-full h-full top-0 left-0 aspect-square'>
                      {block.profile_image && (
                        <Image
                          src={block.profile_image?.permalink}
                          width={block.profile_image?.width}
                          height={block.profile_image?.height}
                          alt={block.profile_image?.alt ? block.profile_image.alt : ''}
                          className={`${styles.image} relative w-full h-auto`}
                        />
                      )}
                    </div>
                  )}
                  <div className={`${styles.bio} absolute w-full h-full flex justify-center items-end px-18 py-18`}>
                    <div className='wysiwyg text-30 leading-40 font-300 text-white' dangerouslySetInnerHTML={{ __html: block.bio }}></div>
                  </div>
                </div>
                <div className={`relative flex flex-nowrap items-center w-full bg-slate text-white px-18 py-18`}>
                  <div className={`text-25 leading-none font-700 text-white text-center`}>
                    {block.name}
                  </div>
                  <div className={`text-25 leading-none font-300 text-white px-10`}>
                    |
                  </div>
                  <div className={`text-25 leading-none font-300 text-white text-center`}>
                    {block.job_title}
                  </div>
                  <div className={`ml-auto`}>
                    <Socials socials={block.socials} style={'simple'}/>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
        </div>
    </div>
  </section>
)}

export default ImageGridBlock
