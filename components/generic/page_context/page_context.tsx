"use client"
import React, { useEffect } from "react";
import { useThemeContext } from '@/context/theme'

const PageContext = ({cursor} : {cursor: String}) => {
  const { cursorType, cursorChangeHandler, cursorPageChangeHandler } = useThemeContext()

  useEffect(() => {
    cursorChangeHandler(cursor)
    cursorPageChangeHandler(cursor)
  }, []);

  return (
    <></>
  );

};

export default PageContext;
