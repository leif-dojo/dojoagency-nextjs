import { useEffect, useState } from 'react'

const { theme } = require('../tailwind.config')

/**
 * remove html elements from text
 * @param html html content
 * @returns text
 */
export const textFromHtml = ({html}:{html: any}) => html.replace(/(<([^>]+)>)/gi, '')

/**
 * Scroll to the next element
 * @param mainRef - Parent ref
 */
export const scrollToNextElement = ({mainRef}:{mainRef: any}) => {
  const { current } = mainRef
  if (current) {
    const neighbor = current.nextSibling
    if (neighbor) {
      neighbor.scrollIntoView({ behavior: 'smooth' })
    }
  }
}

export const validateEmail = (email:string) => {
  return email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
}

/**
 * Returns true if current window width matches mobile breakpoint
 * @param defaultState - default state for initial render, default is false
 * @param breakPoint - tailwind breakpoint to use as max width, default is md
 * @returns isMobile - boolean
 */
export const useIsMobile = (defaultState = false, breakPoint = 'md') => {
  const [isMobile, setIsMobile] = useState(defaultState)
  const bpWidth = theme.screens[breakPoint].replace('px', '')

  const onResize = () => {
    setIsMobile(window.innerWidth < bpWidth)
  }

  const events = ['resize', 'orientationchange']

  useEffect(() => {
    // trigger callback once after initial rendering
    onResize()
    // add event listeners for all events from the array above
    events.forEach((e) => {
      window.addEventListener(e, () => {
        onResize()
      })
    })
    // remove event listeners for all events from the array above
    return () => {
      events.forEach((e) => {
        window.removeEventListener(e, () => {})
      })
    }
  }, [])

  return isMobile
}

/**
 * Returns true if current window width matches mobile breakpoint
 * @returns boolean
 */
export const useIsTouch = () => {
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    setIsTouch(
      !!(
        typeof window !== 'undefined' &&
        ('ontouchstart' in window ||
          ((window as any).DocumentTouch &&
            typeof document !== 'undefined' &&
            document instanceof (window as any).DocumentTouch))
      ) ||
        !!(
          typeof navigator !== 'undefined' &&
          (navigator.maxTouchPoints)
        ),
    )
  }, [])

  return isTouch
}

/**
 * Returns true if device is iOS
 * @returns boolean
 */
export const useIsIOS = () => {
  const [isIOS, setIsIOS] = useState(false)

  useEffect(() => {
    setIsIOS(/iPad|iPhone|iPod/.test(navigator.userAgent))
  }, [])

  return isIOS
}

/**
 * Converts Hex to RGB value
 * @returns rgb string
 */
export const hexToRgb = (hex:any) => {
  if(hex){
    const hexarray =  hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i,(m:any, r:any, g:any, b:any) => '#' + r + r + g + g + b + b).substring(1).match(/.{2}/g).map((x:any) => parseInt(x, 16))
    return `${hexarray[0]},${hexarray[1]},${hexarray[2]}`
  }
}

/**
 * Converts RGB to Hex value
 * @returns rgb string
 */
export const rgbToHex = (r:any,g:any,b:any) => {
  return (r:any, g:any, b:any) => '#' + [r, g, b].map(x => {
    const hex = x.toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }).join('')
}