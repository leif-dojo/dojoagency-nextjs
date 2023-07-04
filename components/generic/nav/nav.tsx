import React from 'react'
import Link from 'next/link'
import NavInterface from './nav.interface'
import styles from './nav.module.scss'

const NavBlock = ({
  nav,
}: {
  nav: NavInterface
}) => {

  return (
    <>
      <div className={`${styles.root} flex items-center justify-center w-full h-full`}>
        {nav && (
          <ul className="flex items-center flex-col justify-center text-center">

            {nav.tree.map((t: any) => (
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
