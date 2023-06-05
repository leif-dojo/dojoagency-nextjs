"use client"
import React, { memo, useState, useRef, useEffect } from 'react'
import Plyr from 'plyr'
//import Plyr, { APITypes } from "plyr-react";
import "plyr-react/plyr.css";
import styles from './video_player.module.scss'

import ReactPlayer from 'react-player'

export const typename = 'Set_Components_Video'

const VideoBlock = ({ source, options }: { source: any, options: any }) => {

    const [playing, setPlaying] = useState(false)
    const ref = useRef<APITypes>(null);

    useEffect(() => {
        //console.log("internal plyr instance:", ref.current.plyr)
    })

    const enterVideo = () => {
        (ref.current?.plyr as Plyr)?.fullscreen.enter();
    };

    const toggleVideo = () => {
        let player = (ref.current?.plyr as Plyr)
        //playing ? player.play() : player.pause();
        setPlaying(playing ? false : true)
    };


    const toggleState = () => {
        setPlaying(playing ? false : true)
    }

    let player

    useEffect(() => {
        const onPause = (event) => {
          console.log("Plyr Paused")
        }
        //console.log("useEffect: ", ref.current?.plyr)
        //ref?.current?.plyr?.on('play', onPlay)
        //ref?.current?.plyr?.on('pause', onPause)
        //ref?.current?.plyr?.on('ended', onEnded)
    
        /*player = new Plyr('#player', { 
            autoplay: true,
            //autopause: false,
            muted: true,
            hideControls: true,
            controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'captions', 'settings', 'pip', 'airplay', 'fullscreen'],
            settings: ['captions', 'quality', 'speed', 'loop']
         })
        player.play()*/

      }, [])

    //console.log("Video Player: ", source, options)
    return (
        <div className={`${styles.root} relative`}>
            {/*source && options && (
                <Plyr
                    ref={ref}
                    source={{
                        type: "video",
                        sources: [
                            {
                                src: "22439234",
                                provider: "vimeo"
                            }
                        ]
                    }}
                    options={{
                        autoplay: true,
                        //autopause: false,
                        muted: true,
                        hideControls: true,
                        controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'captions', 'settings', 'pip', 'airplay', 'fullscreen'],
                        settings: ['captions', 'quality', 'speed', 'loop']
                    }}
                />
                )*/}


            
            <div className="plyr__video-embed" id="player">
                <iframe
                    src="https://player.vimeo.com/video/163721649?loop=false&amp;byline=false&amp;portrait=false&amp;title=false&amp;speed=true&amp;transparent=0&amp;gesture=media"
                    allowfullscreen
                    allowtransparency
                    allow="autoplay"
                ></iframe>
            </div>

            <div className='absolute flex w-full h-full z-1 left-0 top-0' onClick={toggleVideo}>

            </div>

            <div className='relative z-99 text-20 text-white'>
                <button onClick={enterVideo}>fullscreen</button>
                <button onClick={toggleVideo}>Play</button>
                {playing ? "false" : "true"}
            </div>
            
        </div>
    )
}

export default memo(VideoBlock)
