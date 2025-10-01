"use client";
import React, { memo, useState, useRef, useEffect } from "react";
import styles from "./video_player.module.scss";
import { useThemeContext } from "@/context/theme";
//import NextImage from "../next_image/next_image";
import Image from "next/image";
import IconPlay from "@/public/icons/cursor-play.svg";

const VideoBlock = ({
  image_placeholder,
  video_placeholder,
  video,
  video_mobile,
  play_text,
}: {
  image_placeholder: any;
  video_placeholder: any;
  video: any;
  video_mobile?: any;
  play_text?: any;
}) => {
  const { cursorChangeHandler } = useThemeContext();
  const [playing, setPlaying] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [playerLoaded, setPlayerLoaded] = useState(false);
  const [PlayerComponent, setPlayerComponent] = useState<any>(null);
  const [active, setActive] = useState(false);
  const [hovering, setHovering] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);

  const isMobile = () => typeof window !== "undefined" && window.innerWidth < 1024;
  const isYoutubeOrVimeo = (url: string) => /youtube\.com|youtu\.be|vimeo\.com/.test(url);

  useEffect(() => {
    if (!video && !video_placeholder) return;

    const links: { href: string; rel: string }[] = [];

    if (/youtube\.com|youtu\.be/.test(video) || /youtube\.com|youtu\.be/.test(video_placeholder)) {
      links.push(
        { rel: "preconnect", href: "https://www.youtube.com" },
        { rel: "preconnect", href: "https://www.google.com" },
        { rel: "preconnect", href: "https://i.ytimg.com" },
        { rel: "preconnect", href: "https://s.ytimg.com" },
        { rel: "preconnect", href: "https://www.gstatic.com" },
        { rel: "dns-prefetch", href: "https://www.youtube.com" },
        { rel: "dns-prefetch", href: "https://i.ytimg.com" },
      );
    } else if (/vimeo\.com/.test(video) || /vimeo\.com/.test(video_placeholder)) {
      links.push(
        { rel: "preconnect", href: "https://player.vimeo.com" },
        { rel: "preconnect", href: "https://i.vimeocdn.com" },
        { rel: "dns-prefetch", href: "https://player.vimeo.com" },
        { rel: "dns-prefetch", href: "https://i.vimeocdn.com" },
      );
    }

    links.forEach(({ rel, href }) => {
      if (!document.head.querySelector(`link[rel="${rel}"][href="${href}"]`)) {
        const link = document.createElement("link");
        link.rel = rel;
        link.href = href;
        document.head.appendChild(link);
      }
    });
  }, [video]);



  // Intersection observer to track visibility
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.4 }
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  // Load react-player on first mousemove anywhere or after timeout fallback
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const loadPlayer = async () => {
      if (!playerLoaded) {
        const mod = await import("react-player"); // do not import globally
        setPlayerComponent(() => mod.default);
        setPlayerLoaded(true);
      }
      window.removeEventListener("mousemove", onMouseMove);
      clearTimeout(timeoutId);
    };

    const onMouseMove = () => {
      loadPlayer();
    };

    window.addEventListener("mousemove", onMouseMove);

    // Fallback: load player automatically after 3 seconds if no movement
    timeoutId = setTimeout(() => {
      loadPlayer();
      setHovering(true);
      setIsVisible(true);
    }, isMobile() ? 1000 : 20000);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      clearTimeout(timeoutId);
    };
  }, [playerLoaded]);

  // Autoplay video if visible and player loaded and NOT manually activated
  useEffect(() => {
    if (playerLoaded && isVisible && !active) {
      //setPlaying(true);
      //cursorChangeHandler("play");
    } else if (!active) {
      //setPlaying(false);
      //cursorChangeHandler("page");
    }
  }, [playerLoaded, isVisible, active, cursorChangeHandler]);

  const openOrClose = () => {
    setActive(true);
    setPlaying((prev) => !prev);
    cursorChangeHandler(playing ? "play" : "page");
  };

  const onMouseEnter = () => {
    if (video) {
      setHovering(true);
      cursorChangeHandler(playing ? "page" : "play");
    }
  };

  const onMouseLeave = () => {
    if (video) {
      setHovering(false);
      cursorChangeHandler("peace");
    }
  };

  return (
    <div
      ref={containerRef}
      className={`${styles.root} relative aspect-video object-cover object-center ${isMobile()
        ? video_mobile
          ? styles.player_aspect_4_3
          : styles.player_aspect_16_9
        : ""
        }`}
    >
      <div
        className="relative w-full h-full aspect-video overflow-hidden object-cover object-center"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {image_placeholder && (
          <div className="relative w-full h-full object-cover object-center">
            {!hovering && !active && video && (
              <div className="absolute left-40 landscape:left-90 md:left-90 top-20 landscape:top-50 md:top-50 w-80 landscape:w-160 md:w-160 h-80 landscape:h-160 md:h-160 z-10 text-orange">
                <IconPlay />
                <div className="pt-10 text-white text-20 leading-none font-300 whitespace-nowrap">
                  {play_text}
                </div>
              </div>
            )}
            <Image
              src={image_placeholder.permalink}
              width={image_placeholder?.width}
              height={image_placeholder?.height}
              sizes="(min-width: 768px) 100vw, 100vw"
              alt={image_placeholder?.alt || ""}
              className={`${styles.image} relative w-full h-full object-cover object-center`}
              loading="eager"
              fetchPriority="high"
            />
          </div>
        )}

        {video_placeholder && playerLoaded && PlayerComponent && (
          <div className="video absolute w-full h-full top-0 z-1">
            {!hovering && !active && video && (
              <div className="absolute left-40 landscape:left-90 md:left-90 top-20 landscape:top-50 md:top-50 w-80 landscape:w-160 md:w-160 h-80 landscape:h-160 md:h-160 z-10 text-orange">
                <IconPlay />
                <div className="pt-10 text-white text-20 leading-none font-300 whitespace-nowrap">
                  {play_text}
                </div>
              </div>
            )}

            <div className="video-inner absolute block w-full h-full aspect-video">
              <PlayerComponent
                className={`${styles.player} react-player !w-full !h-auto aspect-video`}
                style={{ pointerEvents: "none" }}
                src={video_placeholder}
                playing={true}
                loop={true}
                controls={false}
                volume={0}
                muted={true}
                playsInline={true}
                config={{
                  youtube: {
                    playerVars: {
                      controls: 0,
                      showinfo: 0,
                      modestbranding: 1,
                      rel: 0,
                      autoplay: 1,
                      loop: 1,
                      fs: 0,
                      iv_load_policy: 3,
                      disablekb: 1,
                      cc_load_policy: 0,
                    },
                  },
                  vimeo: {
                    playerOptions: {
                      controls: false,
                      title: false,
                      byline: false,
                      portrait: false,
                      sidedock: false,
                    },
                  },
                }}
              />
            </div>
          </div>
        )}

        {active && PlayerComponent && (
          <div
            className={`${styles.video} video absolute w-full h-full overflow-hidden top-0 left-0 z-5`}
          >
            <div className="video-inner absolute block w-full h-full bg-black">
              <PlayerComponent
                className={`${styles.player} ${isMobile() ? (video_mobile ? styles.player_aspect : "") : ""
                  } react-player w-full h-auto aspect-video`}
                src={isMobile() ? video_mobile || video : video}
                playing={playing}
                loop={false}
                controls={true}
                volume={1}
                muted={false}
                playsinline={true}
                onPause={() => setPlaying(false)}
                onPlay={() => setPlaying(true)}
                config={{
                  vimeo: {},
                }}
              />
            </div>
          </div>
        )}

        {!playing && (
          <div
            className="absolute flex w-full h-full z-10 left-0 top-0"
            onClick={openOrClose}
          ></div>
        )}
      </div>
    </div>
  );
};

export default memo(VideoBlock);
