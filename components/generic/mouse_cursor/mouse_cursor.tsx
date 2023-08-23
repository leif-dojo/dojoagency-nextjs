"use client"
import React, { useEffect } from "react";
import styles from './mouse_cursor.module.scss'
import useMousePosition from "@/hooks/useMousePosition"
import { useThemeContext } from '@/context/theme'
import { usePathname } from 'next/navigation'
import IconPeace from "@/public/icons/cursor-peace.svg"
import IconPlay from "@/public/icons/cursor-play.svg"
import IconPause from "@/public/icons/cursor-pause.svg"
import IconHeart from "@/public/icons/cursor-heart.svg"
import IconBridge from "@/public/icons/cursor-bridge.svg"
import IconThumb from "@/public/icons/cursor-thumb.svg"
import IconBoots from "@/public/icons/cursor-boots.svg"
import IconHeart2 from "@/public/icons/cursor-heart-2.svg"
import IconGoggles from "@/public/icons/cursor-goggles.svg"
import IconSteeringWheel from "@/public/icons/cursor-steering-wheel.svg"
import IconRocket from "@/public/icons/cursor-rocket.svg"
import IconMasks from "@/public/icons/cursor-masks.svg"

const Cursor = () => {
  const { cursorType, cursorChangeHandler, cursorPageType } = useThemeContext()
  const { x, y } = useMousePosition()
  const pathname = usePathname()
  let timeout: any;
  let cursor = cursorType;

  const isMobile = () => {
    if (process.browser) {
      return window.innerWidth < 1024
    } else {
      return false
    }
  }

  const getCursorIcon = () => {
    //disable cursors on mobile
    if (process.browser) {
      //update cursor if set
      (cursor == 'default' || cursor == '' || cursor == 'page' || cursor == undefined) ? document.body.classList.remove('no-cursor') : document.body.classList.add('no-cursor')

      if (cursor == 'page') {
        cursor = cursorPageType
        if (cursorPageType !== 'default') { document.body.classList.add('no-cursor') }
      }

      if(isMobile()){
        return false;
      }

      //change cursor
      switch (cursor) {
        case 'peace':
          return <div className={`${styles.peace}`}><IconPeace /></div>;
        case 'play':
          return <div className={`${styles.play}`}><IconPlay /></div>;
        case 'pause':
          return <div className={`${styles.pause}`}><IconPause /></div>;
        case 'heart':
          return <div className={`${styles.heart}`}><IconHeart /></div>;
        case 'bridge':
          return <div className={`${styles.bridge}`}><IconBridge /></div>;
        case 'horizontal-scroll':
          return <div className={`${styles.horizontal} flex`}><div className="w-full font-lato text-20 leading-none font-500 text-orange text-center pb-10 mt-auto mb-0">Scroll »</div></div>;
        case 'view':
          return <div className={`${styles.view} flex`}><div className="w-full font-lato text-20 leading-none font-500 text-orange text-center pb-10 mt-auto mb-0">View »</div></div>;
        case 'next':
          return <div className={`${styles.view} flex`}><div className="w-full font-lato text-20 leading-none font-500 text-orange text-center pb-10 mt-auto mb-0">Next »</div></div>;
        case 'instagram':
          return <div className={`${styles.instagram} text-orange`}><IconHeart /></div>;
        case 'linkedin':
          return <div className={`${styles.linkedin} text-orange`}><IconThumb /></div>;
        case 'boots':
          return <div className={`${styles.boots}`}><IconBoots /></div>;
        case 'heart-2':
          return <div className={`${styles.heart2}`}><IconHeart2 /></div>;
        case 'goggles':
          return <div className={`${styles.goggles}`}><IconGoggles /></div>;
        case 'steering-wheel':
          return <div className={`${styles.steeringwheel}`}><IconSteeringWheel /></div>;
        case 'rocket':
          return <div className={`${styles.rocket}`}><IconRocket /></div>;
        case 'masks':
          return <div className={`${styles.masks}`}><IconMasks /></div>;
      }
    }
  }

  useEffect(() => {
    //console.log("update cursor state")
    //TODO reset cursor if no movement
    clearTimeout(timeout)
    timeout = window.setTimeout(() => {
      cursorChangeHandler('page')
    }, 30000);

  }, [cursorType]);

  //reset cursor on path change
  useEffect(() => {
    cursorChangeHandler('page')
  }, [pathname]);

  return (
    <>
      <div className={`${styles.cursor}`} style={{ left: `${x}px`, top: `${y}px` }}>
        <div className={`${styles.icon}`}>
          {getCursorIcon()}
        </div>
      </div>
    </>
  );
};

export default Cursor;
