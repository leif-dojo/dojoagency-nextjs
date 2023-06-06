import React, { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import Logo from 'public/icons/Dojo-Logo_Red_RGB.svg'
import { useRouter } from 'next/router'

//import sendEvent from '../../../utils/gs'
import cn from 'classnames'

import NavInterface from './nav.interface'
import SearchIcon from '../../../public/icons/icon-search.svg'
import styles from './nav.module.scss'

const NavBlock = ({
  nav,
}: {
  nav: NavInterface
}) => {
  //const Globals = useContext(GlobalContext)

  return (
    <>
      <div className={`${styles.root} flex items-center justify-center w-full h-full`}>
        {nav && (
          <ul className="flex items-center flex-col justify-center text-center">
          
            {nav.tree.map((t:any) => (
              <li key={`yy_${t.page.url}`} className='py-20'>
                <Link href={`${t.page.url}`} className="cursor-pointer font-lato text-54 leading-none text-slate font-300">
                    {t.page.title}
                </Link>
              </li>
            ))}
            
          </ul>
          )}
      </div>
    </>
  )
}

export default NavBlock
