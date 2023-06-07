"use client"
import React, { useContext, useEffect, useState } from 'react'
import { useThemeContext } from '@/context/theme'
import styles from './video.module.scss'
import VideoPlayer from '../../generic/video_player/video_player'

export const typename = 'Set_Components_Video'

const VideoBlock = ({ block }: { block: any }) => {
  const { cursorType, cursorChangeHandler} = useThemeContext();
  //console.log("VideoBlock", block)
  return (
  <section className={`${styles.root} w-full bg-white text-slate`} onMouseEnter={() => cursorChangeHandler("default")} onMouseLeave={() => cursorChangeHandler("default")}>
    <div className="px-50 md:px-200 py-100">
      <VideoPlayer
        image_placeholder={block.image}
        video_placeholder={block.video_embed ? block.video_embed : block.video_local?.permalink}
        video={block.video_popup_embed ? block.video_popup_embed : block.video_local_popup?.permalink}
      />
    </div>
  </section>
)}

export default VideoBlock
