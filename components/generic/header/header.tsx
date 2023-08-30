"use client"
import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Logo from 'public/icons/Dojo-Logo_Red_RGB.svg'
import styles from './header.module.scss'
import HeaderInterface from './header.interface'
import Nav from '@/components/generic/nav/nav'

const HeaderBlock = ({ nav }: HeaderInterface) => {
  const lastScrollPos = useRef<number>(0)
  const scrollDirection = useRef<'up' | 'down' | 'initial'>('initial')
  const [Dir, setDir] = useState('initial')
  const [isTop, setIsTop] = useState(true)
  const [showMobileMenu, openMobileMenu] = useState(false)

  useEffect(() => {
    document.addEventListener('scroll', () => {
      //  detect scroll position in %
      const a = document.documentElement.scrollTop
      const b = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const c = (a / b) * 2
      const st = window.pageYOffset || document.documentElement.scrollTop

      if (st > 10) {
        setIsTop(false)
      } else {
        setIsTop(true)
        setDir('initial')
      }

      if (st === lastScrollPos.current || st < 100) return

      const dir2 = st > lastScrollPos.current ? 'down' : 'up'
      if (dir2 !== scrollDirection.current) {
        //console.log("NEW scroll incoming: ", dir)
        scrollDirection.current = dir2
        setDir(dir2)
      }

      lastScrollPos.current = st
    })

    return () => {
      document.removeEventListener('scroll', () => { })
      document.removeEventListener('resize', () => { })
    }
  }, [])

  const openOrClose = () => {
    if (showMobileMenu) {
      openMobileMenu(false)
      document.body.classList.remove('body-lock')
    } else {
      openMobileMenu(true)
      document.body.classList.add('body-lock')
    }
  }

  return (
    <>
      <div
        id="header-root"
        className={`${styles.root} ${(Dir === 'up') ? styles.up : ''} ${(Dir === 'down') ? styles.down : ''}`}>
        <div className="w-full px-50 md:px-100 flex items-center justify-between relative py-10 z-10">
          <Link href={'/'} className={`${styles.logo} relative text-left`} aria-label="Dojo Agency">
            <Logo />
          </Link>
          <div className={`${styles.hamburger} flex items-center cursor-pointer`} role="none" onClick={() => openOrClose()} role="button">
            <div className="a11y hidden">Toggle Menu</div>
            <div role="none" className={`${styles.bars}`}>
              <span className={styles.bar} />
              <span className={styles.bar} />
              <span className={styles.bar} />
            </div>
          </div>
        </div>
        {showMobileMenu &&
          <div className={`${styles.menuwrap} fixed  bg-white w-screen h-screen left-0 top-0 z-10`}>
            <div className="relative  w-full h-full px-50 md:px-100 flex flex-col items-center justify-center" onClick={() => openOrClose()} role="button">
              <div className="relative w-full">
                <div className={`${styles.close} absolute top-30 right-0 flex items-center cursor-pointer`} role="none" onClick={() => openOrClose()} role="button">
                  <div className="a11y hidden">Toggle Menu</div>
                  <div className={`font-lato text-orange text-80 font-300 leading-none`}>X</div>
                </div>
                <div className={`${styles.menulogo} text-left py-30`}>
                  <Link href={'/'} as={''} className='' aria-label="Dojo Agency">
                    <Logo />
                  </Link>
                </div>
              </div>
              <Nav nav={nav} />
            </div>
          </div>
        }
      </div>
    </>
  )
}

export default HeaderBlock
