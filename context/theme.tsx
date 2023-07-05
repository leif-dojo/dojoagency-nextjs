"use client"
import { createContext, useContext, useState, useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
const ThemeContext = createContext({} as any)
const GlobalContextProvider = ThemeContext.Provider
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export const ThemeContextProvider = ( {children}:{children: any} ) => {
    const [color, setColor] = useState('0,0,0');
    const [backgroundColor, setBackgroundColor] = useState('255,255,255');
    const [contactActive, setContactActive] = useState(false);
    const [cursorType, setCursorType] = useState("");
    const pathname = usePathname();

    const cursorChangeHandler = (cursorType:any) => {
      setCursorType(cursorType);
    };

    const colorChangeHandler = (color:any) => {
      setColor(color);
    };

    const backgroundChangeHandler = (backgroundColor:any) => {
      setBackgroundColor(backgroundColor);
    };

    useLayoutEffect(() => {
      //console.log("updated theme: ", color, backgroundColor)
      if(process.browser){
        var r = document.querySelector(':root');
        //var rs = getComputedStyle(r);
        const element = document.querySelector("body");
        const getter = gsap.getProperty(element);
        r.style.setProperty('--foreground-rgb', getter("color"));
        r.style.setProperty('--background-rgb', getter("backgroundColor"));
      }
      
    }, [color, backgroundColor]);

    //scroll top on path change
    useLayoutEffect(() => {
      if(process.browser){
        document.body.scrollTop = document.documentElement.scrollTop = 0;
      }

    }, [pathname]);

    //contact hash
    useLayoutEffect(() => {
      const onHashChanged = (e) => {
        const hash = window.location.hash;
          if(hash === '#contact') {
            setContactActive(true)
            //reset hash
            history.pushState("", document.title, window.location.pathname + window.location.search);
          }
      };
      window.addEventListener("hashchange", onHashChanged);

      return () => {
          window.removeEventListener("hashchange", onHashChanged);
      };

    }, []);

    /*
    //reset theme on path change
    useLayoutEffect(() => {
      //reset theme on path change
      //console.log("updated theme: ", color, backgroundColor)
      if(process.browser){
        var rb = document.querySelector('body');
        rb.style.color = '#231f20';
        rb.style.backgroundColor = '#FFFFFF';
        //reset theme on route change
        setColor('0,0,0')
        setBackgroundColor('255,255,255')
        console.log("set layout")
      }
    }, [pathname]);*/

    return (
        <GlobalContextProvider value={{
            contactActive, 
            setContactActive: setContactActive,
            cursorType: cursorType,
            cursorChangeHandler: cursorChangeHandler,
            colorChangeHandler: colorChangeHandler,
            backgroundChangeHandler: backgroundChangeHandler,
          }}>
            {children}
        </GlobalContextProvider>
    )
};

export const useThemeContext = () => useContext(ThemeContext);