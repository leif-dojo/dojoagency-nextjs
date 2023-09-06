"use client"
import React, { memo, useState, useRef, useEffect } from 'react'
import styles from './video_player.module.scss'
import { useThemeContext } from '@/context/theme'
import Image from 'next/image'
import dynamic from "next/dynamic"
const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false })
import IconPlay from "@/public/icons/cursor-play.svg"

const VideoBlock = ({ image_placeholder, video_placeholder, video, video_mobile, play_text }: { image_placeholder: any, video_placeholder: any, video: any, video_mobile?: any, play_text?: any }) => {
    const { cursorType, cursorChangeHandler } = useThemeContext();
    const [playing, setPlaying] = useState(false)
    const [active, setActive] = useState(false)
    const [hovering, setHovering] = useState(false)
    const openOrClose = () => {
        setActive(true)
        setPlaying(playing ? false : true)
        //active ? setVideoState('play') : setVideoState('pause');
        playing ? cursorChangeHandler("play") : cursorChangeHandler("page")
    }

    const onMouseEnter = () => {
        if (video) {
            setHovering(true)
            playing ? cursorChangeHandler("page") : cursorChangeHandler("play")
        }
    };

    const onMouseLeave = () => {
        if (video) {
            setHovering(false)
            cursorChangeHandler("peace")
        }
    };

    const toggleVideo = () => {
        setPlaying(playing ? false : true)
    };

    const [hasWindow, setHasWindow] = useState(false);
    useEffect(() => {
        if (typeof window !== "undefined") {
            setHasWindow(true);
        }
    }, []);

    const isMobile = () => {
        if (process.browser) {
          return window.innerWidth < 1024
        }
      }

    return (
        <div className={`${styles.root} relative aspect-video ${isMobile() ? (video_mobile ? styles.player_aspect_4_3 : styles.player_aspect_16_9) : ''}`}>
            <div className='relative w-full h-full aspect-video overflow-hidden' onMouseEnter={() => onMouseEnter()} onMouseLeave={() => onMouseLeave()}>

                {image_placeholder && (
                    <div className='relative w-full h-full'>
                        {!hovering && !active && video && (
                            <div className='absolute left-40 landscape:left-90 md:left-90 top-20 landscape:top-50 md:top-50 w-80 landscape:w-160 md:w-160 h-80 landscape:h-160 md:h-160 z-10 text-orange'>
                                <IconPlay />
                                <div className="pt-10 text-white text-20 leading-none font-300 whitespace-nowrap">{play_text}</div>
                            </div>
                        )}
                        <Image
                            src={image_placeholder?.permalink}
                            width={image_placeholder?.width}
                            height={image_placeholder?.height}
                            alt={image_placeholder?.alt ? image_placeholder.alt : ''}
                            className={`${styles.image} relative object-cover`}
                        />
                    </div>
                )}

                {video_placeholder && (
                    <div className="video absolute w-full h-full top-0 z-1" >
                        {!hovering && !active && video && (
                            <div className='absolute left-40 landscape:left-90 md:left-90 top-20 landscape:top-50 md:top-50 w-80 landscape:w-160 md:w-160 h-80 landscape:h-160 md:h-160 z-10 text-orange'>
                                <IconPlay />
                                <div className="pt-10 text-white text-20 leading-none font-300 whitespace-nowrap">{play_text}</div>
                            </div>
                        )}

                        <div className="video-inner absolute block w-full h-full aspect-video ">
                            <ReactPlayer
                                className={`${styles.player} react-player w-full h-auto aspect-video`}
                                url={video_placeholder}
                                playing={true}
                                loop={true}
                                controls={false}
                                volume={0}
                                muted={true}
                                //width='1920px'
                                //height='1080px'
                                playsinline={true}
                                config={{
                                    vimeo: {
                                        //controls: false
                                    }
                                }}
                            />
                        </div>
                    </div>
                )}

                {active && video && (
                    <div className={`${styles.video} video absolute w-full h-full overflow-hidden top-0 left-0 z-5`}>
                        <div className="video-inner absolute block w-full h-full bg-black">
                            <ReactPlayer
                                className={`${styles.player} ${isMobile() ? (video_mobile ? styles.player_aspect : '') : ''} react-player w-full h-auto aspect-video`}
                                url={isMobile() ? (video_mobile ? video_mobile : video) : video}
                                playing={playing}
                                loop={false}
                                controls={true}
                                volume={1}
                                muted={false}
                                //width='1920px'
                                //height='1080px'
                                playsinline={true}
                                onPause={() => setPlaying(false)}
                                onPlay={() => setPlaying(true)}
                                config={{
                                    vimeo: {
                                        //controls: false
                                    }
                                }}
                            />
                        </div>
                    </div>
                )}

                <div className={`absolute flex w-full h-full z-10 left-0 top-0 ${playing ? 'hidden' : ''}`} onClick={() => openOrClose()}></div>

            </div>

        </div>
    )
}

export default memo(VideoBlock)
