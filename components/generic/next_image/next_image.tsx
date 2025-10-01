"use client"
import React, { useRef, useState, useEffect } from 'react'
import baseStyles from './next_image.module.scss'
import IconVan from "@/public/icons/dojo-logo_vertical.svg"
import Head from 'next/head'  // For preload link tags

const imagesizes = [400, 640, 768, 960, 1024, 1280, 1440, 1600, 1920, 2560, 2880, 3840]
const quality = 70
const format = 'webp'

// Returns URL for an image at a given width
const getSrc = (image: any, width: number) => {
  if (!image) return ''
  const finalWidth = width && width <= 1920 ? width : 1920
  let url = typeof image === 'string' ? `${image}?w=${finalWidth}` : ''
  if (image?.path) {
    const fixedPath = image.path.replace(/ /g, '%20')
    url = `${process.env.NEXT_PUBLIC_MEDIA_URL}media/${fixedPath}?w=${finalWidth}&fm=${format}&q=${quality}`
  }
  return url
}

// Generates srcset string for all sizes <= given width
const getSrcSet = (image: any, maxWidth: number) => {
  if (!image?.path) return ''
  const fixedPath = image.path.replace(/ /g, '%20')
  return imagesizes
    .filter(size => size <= maxWidth)
    .map(size => `${process.env.NEXT_PUBLIC_MEDIA_URL}media/${fixedPath}?w=${size}&fm=${format}&q=${quality} ${size}w`)
    .join(', ')
}

const getPosition = (image: any) => {
  if (image?.focus_css) return { objectPosition: image.focus_css }
  return {}
}

const calculateRenderDimensions = (
  sizes: string,
  baseWidth: number,
  baseHeight: number
) => {
  if (!baseWidth || !baseHeight || baseWidth <= 0 || baseHeight <= 0) {
    return { width: 100, height: 100 }
  }

  let clientWidth = 768 // fallback for SSR
  if (typeof window !== 'undefined') {
    clientWidth = window.innerWidth
  }

  const aspectRatio = baseWidth / baseHeight

  // Parse vw percentage from `sizes`
  const match = sizes?.match(/([0-9.]+)vw/)
  const percent = match ? parseFloat(match[1]) : 100
  const scale = percent / 100

  const adjustedWidth = Math.min(Math.round(clientWidth * scale), baseWidth)
  const adjustedHeight = Math.round(adjustedWidth / aspectRatio)

  return {
    width: adjustedWidth || baseWidth,
    height: adjustedHeight || baseHeight
  }
}

const NextImage = ({
  src = '',
  image = {},
  width = 0,
  height = 0,
  sizes = '',
  alt = '',
  className = '',
  style = {},
  loading = 'lazy',
  fetchPriority = 'auto',
  preload = false
}: {
  src?: string
  image?: { path?: string, width?: number, height?: number, focus_css?: string }
  width: number
  height: number
  sizes?: string
  alt: string
  className?: string
  style?: React.CSSProperties
  loading?: "lazy" | "eager"
  fetchPriority?: "auto" | "high" | "low"
  preload?: boolean
}) => {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)
  const imgRef = useRef<HTMLImageElement | null>(null)

  const [mounted, setMounted] = useState(false)
  const [renderedDims, setRenderedDims] = useState({ width, height })

  // Calculate dimensions on mount or sizes change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setMounted(true)
      const dims = calculateRenderDimensions(sizes, width, height)
      setRenderedDims(dims)
    }
  }, [sizes, width, height])

  const imageSrc = getSrc(image && image.path ? image : src, renderedDims.width)
  const imageSrcSet = getSrcSet(image, renderedDims.width)

  // Create multiple breakpoints for <source> elements for example at desktop and mobile breakpoints
  const sources = [
    {
      media: '(max-width: 639px)', // small phones
      srcSet: getSrcSet(image, 1024),
    },
    {
      media: '(max-width: 1023px)', // tablets
      srcSet: getSrcSet(image, 1024),
    },
    {
      media: '(max-width: 1439px)', // small desktops
      srcSet: getSrcSet(image, 1440),
    },
    {
      media: '(max-width: 1919px)', // desktops
      srcSet: getSrcSet(image, 1920),
    },
    {
      media: '(max-width: 2559px)', // desktops
      srcSet: getSrcSet(image, 2560),
    },
    {
      media: '(max-width: 3840px)', // desktops
      srcSet: getSrcSet(image, 2560),
    }
  ]


  const handleImageLoaded = () => {
    //console.log('Image loaded', image);
    setLoaded(true);
  }
  const handleImageErrored = () => {
    //console.log('Image errored');
    setError(true);
  }

  // preload URLs for <link preload> tags
  const preloadUrls = React.useMemo(() => {
    if (!preload) return []
    if (!imageSrc) return []

    const urls = [imageSrc]

    if (image?.path) {
      const fixedPath = image.path.replace(/ /g, '%20')
      // preload top 3 sizes near rendered width
      const preloadSizes = imagesizes.filter(size => size <= renderedDims.width).slice(-3)
      preloadSizes.forEach(size => {
        const url = `${process.env.NEXT_PUBLIC_MEDIA_URL}media/${fixedPath}?w=${size}&fm=${format}&q=${quality}`
        if (!urls.includes(url)) urls.push(url)
      })
    }
    return urls
  }, [preload, imageSrc, image, renderedDims.width])

  const currentWidth = mounted ? renderedDims.width : width
  const currentHeight = mounted ? renderedDims.height : height
  const aspectRatio = width && height ? `${currentWidth} / ${currentHeight}` : undefined


  useEffect(() => {
    if (imgRef.current?.complete) {
      if (imgRef.current?.naturalWidth > 0) {
        handleImageLoaded()
      } else {
        handleImageErrored()
      }
    }
  }, [imageSrc])

  return (
    <>
      {preload && (
        <Head>
          {preloadUrls.map(url => (
            <link
              key={url}
              rel="preload"
              as="image"
              href={url}
              type="image/webp"
              crossOrigin="anonymous"
            />
          ))}
        </Head>
      )}
      {(image || src) && (
        <picture className={`${baseStyles.root} ${loaded ? baseStyles.loaded : ''}`} >
          {sources.map(({ media, srcSet }) => (
            <source
              key={media}
              media={media}
              srcSet={srcSet}
              sizes={sizes}
              type="image/webp"
            />
          ))}
          <img
            ref={imgRef}
            key={imageSrc}
            src={imageSrc}
            srcSet={imageSrcSet}
            width={currentWidth}
            height={currentHeight}
            sizes={sizes}
            alt={alt}
            onLoad={handleImageLoaded}
            onError={handleImageErrored}
            fetchPriority={fetchPriority}
            loading={loading}
            style={{
              ...getPosition(image),
              aspectRatio: aspectRatio
            }}
            className={`${className} img`}
          />
        </picture>

      )}
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className={`${baseStyles.loader}`}>
            <div className={`${baseStyles.spinner}`}></div>
          </div>
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <IconVan className="inline-block w-80 h-auto text-grey pb-5 opacity-50" />
          <div className="text-14 leading-none font-300 text-grey">Image not found</div>
        </div>
      )}
      {!image && !src && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <IconVan className="inline-block w-80 h-auto text-grey pb-5 opacity-50" />
        </div>
      )}
    </>
  )
}

export default NextImage
