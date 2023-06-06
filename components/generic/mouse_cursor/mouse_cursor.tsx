"use client"
import React, { useContext } from "react";
import styles from './mouse_cursor.module.scss'
import useMousePosition from "@/hooks/useMousePosition";
import { useThemeContext } from '@/context/theme'
import IconPeace from "@/public/icons/cursor-peace.svg"
import IconPlay from "@/public/icons/cursor-play.svg"
import IconPause from "@/public/icons/cursor-pause.svg"
import IconHeart from "@/public/icons/cursor-heart.svg"

const Cursor = () => {
  const { cursorType, cursorChangeHandler} = useThemeContext();
  const { x, y } = useMousePosition();

  const getCursorIcon = () => {
    switch(cursorType) {
      case 'peace':
        return <div className={`${styles.peace}`}><IconPeace /></div>;
      case 'play':
        return <div className={`${styles.play}`}><IconPlay /></div>;
      case 'pause':
        return <div className={`${styles.pause}`}><IconPause /></div>;
      case 'heart':
        return <div className={`${styles.heart}`}><IconHeart /></div>;
      case 'horizontal-scroll':
        return <div className={`${styles.horizontal} flex`}><div className="w-full font-lato text-20 leading-none font-500 text-orange text-center pb-10 mt-auto mb-0">Scroll »</div></div>;
      case 'view':
        return <div className={`${styles.view} flex`}><div className="w-full font-lato text-20 leading-none font-500 text-orange text-center pb-10 mt-auto mb-0">View »</div></div>;
    }
  }

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
