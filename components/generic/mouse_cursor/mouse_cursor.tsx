"use client"
import React, { useLayoutEffect } from "react";
import styles from './mouse_cursor.module.scss'
import useMousePosition from "@/hooks/useMousePosition";
import { useThemeContext } from '@/context/theme'
import IconPeace from "@/public/icons/cursor-peace.svg"
import IconPlay from "@/public/icons/cursor-play.svg"
import IconPause from "@/public/icons/cursor-pause.svg"
import IconHeart from "@/public/icons/cursor-heart.svg"
import IconBridge from "@/public/icons/cursor-bridge.svg"

const Cursor = () => {
  const { cursorType, cursorChangeHandler} = useThemeContext();
  const { x, y } = useMousePosition();
  let timeout: any;

  const getCursorIcon = () => {
    //update cursor if set
    //console.log("update cursor state",cursorType)
    if(document){
      (cursorType == 'default' || cursorType == '') ? document.body.classList.remove('no-cursor') : document.body.classList.add('no-cursor')
    }
    //change cursor
    switch(cursorType) {
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
    }
  }

  useLayoutEffect(() => {
    //console.log("update cursor state")
    //TODO reset cursor if no movement
    clearTimeout(timeout)
    timeout = window.setTimeout(() => {
      cursorChangeHandler('default')
    }, 30000);
    
  }, [cursorType]);

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
