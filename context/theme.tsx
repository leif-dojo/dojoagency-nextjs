"use client"
import { createContext, useContext, useState, useLayoutEffect } from "react";
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
        //alert("The value of --background-rgb is: " + rs.getPropertyValue('--background-rgb'));
        const element = document.querySelector("body");
        const getter = gsap.getProperty(element);
        r.style.setProperty('--foreground-rgb', getter("color"));
        r.style.setProperty('--background-rgb', getter("backgroundColor"));

        /*gsap.to(".main", {
          color: `rgb(${color})`,
          backgroundColor: `rgb(${backgroundColor})`,
          duration: 2,
          ease: "none",
          onUpdate: (e) => {
            //console.log('THEME COLOR UPDATING: ', getter("backgroundColor"));
            r.style.setProperty('--foreground-rgb', getter("color"));
            r.style.setProperty('--background-rgb', getter("backgroundColor"));
          }
        })*/
      }
      
    }, [color, backgroundColor]);

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