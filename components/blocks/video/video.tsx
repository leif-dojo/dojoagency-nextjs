"use client"
import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import { useThemeContext } from '@/context/theme'
import VideoPlayer from '../../generic/video_player/video_player'

export const typename = 'Set_Components_Video'

const VideoBlock = ({ block }: { block: any }) => {
  const { cursorType, cursorChangeHandler} = useThemeContext();

  console.log("VideoBlock", block)
  return (
  <section className="w-full bg-white text-slate" onMouseEnter={() => cursorChangeHandler("default")} onMouseLeave={() => cursorChangeHandler("default")}>
    <div className="px-200 py-100">

        <VideoPlayer
          image_placeholder={block.image}
          video_placeholder={block.video_embed}
          video={block.video_popup_embed}
        />

    </div>
  </section>
)}

export default VideoBlock
