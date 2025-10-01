"use client"
import React, { useEffect, useState } from 'react'
import styles from './loading.module.scss'
import Peace from '@/public/icons/cursor-peace.svg'
import Heart from '@/public/icons/cursor-heart.svg'
import Play from '@/public/icons/cursor-play.svg'
import Pause from '@/public/icons/cursor-pause.svg'
import Bridge from '@/public/icons/cursor-bridge.svg'
import Dojo from '@/public/icons/dojo-logo_vertical.svg'

const icons = [
  { key: "peace", Component: Peace },
  { key: "heart", Component: Heart },
  { key: "play", Component: Play },
  { key: "pause", Component: Pause },
  { key: "bridge", Component: Bridge },
  { key: "dojo", Component: Dojo },
]

const Loading = () => {
  const [step, setStep] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1 < icons.length ? prev + 1 : prev))
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const { Component } = icons[step]

  return (
    <div className={styles.root}>
      <div className="relative w-screen h-screen left-0 top-0 bg-white">
        <div className="absolute w-full h-full flex items-center justify-center">
          <div className="absolute w-1/2 h-auto text-center">
            <div className={`${styles.icon} inline-block mx-auto text-orange text-center`}>
              <Component />
            </div>
            <div className="text-40 leading-none font-300 text-orange text-center pt-20">
              Loading...
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Loading
