
import React, { useEffect, useRef, useState, Fragment, useContext } from 'react'
import styles from './loading.module.scss'
import Peace from '@/public/icons/cursor-peace.svg'
import Heart from '@/public/icons/cursor-heart.svg'
import Play from '@/public/icons/cursor-play.svg'
import Pause from '@/public/icons/cursor-pause.svg'
import Bridge from '@/public/icons/cursor-bridge.svg'
import Dojo from '@/public/icons/Dojo-Logo_Red_RGB.svg'

const Loading = () => {

  return (
    <div className={`${styles.root}`}>
      <div className="relative w-screen h-screen left-0 top-0 bg-white">
        <div className='absolute w-full h-full flex items-center justify-center'>
            <div className='absolute w-1/2 h-auto text-center'>
                <div className={`${styles.icon} w-100 h-auto mx-auto text-orange`}><Peace /></div>
                <div className='text-40 leading-none font-300 text-orange text-center pt-20'>Loading</div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Loading
