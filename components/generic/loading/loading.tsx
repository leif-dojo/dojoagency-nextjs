"use client"
import React, { useEffect, useRef, useState, Fragment, useContext } from 'react'
import styles from './loading.module.scss'
import Peace from '@/public/icons/cursor-peace.svg'
import Heart from '@/public/icons/cursor-heart.svg'
import Play from '@/public/icons/cursor-play.svg'
import Pause from '@/public/icons/cursor-pause.svg'
import Bridge from '@/public/icons/cursor-bridge.svg'
import Dojo from '@/public/icons/dojo-logo_vertical.svg'

const Loading = () => {
  const [loading, setLoading] = useState('peace')

  useEffect(() => {
    setTimeout(() => {
      setLoading('heart')
    }, 1000);
    setTimeout(() => {
      setLoading('play')
    }, 2000);
    setTimeout(() => {
      setLoading('pause')
    }, 3000);
    setTimeout(() => {
      setLoading('bridge')
    }, 4000);
    setTimeout(() => {
      setLoading('dojo')
    }, 5000);
  }, []);

  const getLoadingIcon = () => {
    switch (loading) {
      case 'peace':
        return <Peace />;
      case 'heart':
        return <Heart />;
      case 'play':
        return <Play />;
      case 'pause':
        return <Pause />;
      case 'bridge':
        return <Bridge />;
      case 'dojo':
        return <Dojo />;
    }
  }

  return (
    <div className={`${styles.root}`}>
      <div className="relative w-screen h-screen left-0 top-0 bg-white">
        <div className='absolute w-full h-full flex items-center justify-center'>
          <div className='absolute w-1/2 h-auto text-center'>
            <div className={`${styles.icon} inline-block mx-auto text-orange text-center`}>{getLoadingIcon()}</div>
            <div className='text-40 leading-none font-300 text-orange text-center pt-20'>Loading...</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Loading
