"use client"
import { createContext, useContext, useState } from "react";
const ThemeContext = createContext({} as any)
const GlobalContextProvider = ThemeContext.Provider

export const ThemeContextProvider = ( {children}:{children: any} ) => {
    const [color, setColor] = useState('red');
    const [contactActive, setContactActive] = useState(false);
    const [cursorType, setCursorType] = useState("");

    const cursorChangeHandler = (cursorType) => {
      setCursorType(cursorType);
    };

    return (
        <GlobalContextProvider value={{
            contactActive, 
            setContactActive: setContactActive,
            cursorType: cursorType,
            cursorChangeHandler: cursorChangeHandler,
          }}>
            {children}
        </GlobalContextProvider>
    )
};

export const useThemeContext = () => useContext(ThemeContext);