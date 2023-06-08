"use client"
import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import { useThemeContext } from '@/context/theme'
import VideoPlayer from '../../generic/video_player/video_player'

export const typename = 'Set_Components_2ColumnVideo'

const Column2VideoBlock = ({ block }: { block: any }) => {

  const { cursorType, cursorChangeHandler} = useThemeContext();

 //console.log("2column video: ", block)
  return (
  <section className="w-full bg-white text-slate" onMouseEnter={() => cursorChangeHandler("default")} onMouseLeave={() => cursorChangeHandler("default")}>
    <div className="px-100 py-100">
      <div className="block md:flex">
        <div className="w-full md:w-5/12 md:pr-30">
          <div className="text-20 leading-none font-300 uppercase mb-10">
            {block.eyebrow}
          </div>
          <div className="text-90 leading-120 font-300 mb-20">
            {block.headline}
          </div>
          <div className="w-full">
            <div className='wysiwyg font-lato text-30 leading-40 font-300' dangerouslySetInnerHTML={{ __html: block.wysiwyg }}></div>
          </div>
        </div>
        <div className="w-full md:w-7/12">

          <VideoPlayer
            image_placeholder={block.image}
            video_placeholder={block.video_embed ? block.video_embed : block.video_local?.permalink}
            video={block.video_popup_embed ? block.video_popup_embed : block.video_popup_local}
          />

        </div>
      </div>
    </div>
  </section>
)}

export default Column2VideoBlock
