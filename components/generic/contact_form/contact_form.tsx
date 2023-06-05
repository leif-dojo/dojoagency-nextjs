"use client"
import React, { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import Logo from 'public/icons/Dojo-Logo_Red_RGB.svg'
import IconX from '@/public/icons/icon-x.svg'
import { useThemeContext } from '@/context/theme'

import { useRouter } from 'next/router'

//import sendEvent from '../../../utils/gs'
import cn from 'classnames'

//import NavInterface from './nav.interface'
import SearchIcon from '../../../public/icons/icon-search.svg'
import styles from './contact_form.module.scss'

const NavBlock = ({
  //nav,
}: {
  //nav: NavInterface
}) => {
  const [step, setStep] = useState(1)
  const { contactActive, setContactActive} = useThemeContext();

  //const Globals = useContext(GlobalContext)
  //const [showMobileMenu, openMobileMenu] = useState(false)
  const openOrClose = () => {
    if (contactActive) {
      setContactActive(false)
    } else {
      setContactActive(true)
    }
    setStep(1)
  }

  //FORM
  const initDetailData = {
    name: '',
    email: '',
    message: '',
    // country: undefined,
  }
  const [detailData, setDetailData] = useState(initDetailData)

  return (
    <>
      {contactActive && (
        <div className={`${styles.root} fixed bg-orange w-screen h-screen left-0 top-0 z-100`}>

          <div className={`${styles.bg} bg absolute w-full h-full`}>
            <div className=''>
              <img className='' src={"http://cms.dojoagency.com.local/assets/primary-2.jpg"} />
              {/*<Image
                src="/images/placeholder.jpg"
                alt="Picture of the author"
                width={500}
                height={500}
              />*/}
              
            </div>
          </div>

          {step === 1 && (
            <div className='step bg-gold w-full h-full px-100'>
              <div className="relative w-full ">
                <div className={`${styles.close} relative top-0 right-0 h-0 text-right`}>
                  <div className="relative inline-block text-100 font-300 leading-none text-slate cursor-pointer z-10" onClick={() => openOrClose()}>X</div>
                </div>
              </div>
                <div className="relative  w-full h-full flex items-center z-10 flex justify-items-end">
                  <div className={`w-1/2 ml-auto text-left`}>
                    <div className='text-50 font-300 text-slate'>
                      Connect With Us
                    </div>
                    <div className={`${styles.inputWrapper} w-full`}>
                      <label className="w-full text-left text-slate" htmlFor="name">Name*</label>
                      <input
                        id="name"
                        placeholder=""
                        className="w-full"
                        onChange={(e) =>
                          setDetailData({ ...detailData, ['name']: e.target.value })
                        }
                      />
                    </div>
                    <div className='w-full text-right pt-20'>
                      <button className='btn btn-outline' onClick={() => setStep(2)}>Next</button>
                    </div>
                  </div>
                </div>
            </div>
          )}

          {step === 2 && (
            <div className='step bg-slate w-full h-full px-100'>
                <div className="relative  w-full ">
                <div className={`${styles.close} relative top-0 right-0 h-0 text-right`}>
                  <div className="relative inline-block text-100 font-300 leading-none text-gold cursor-pointer z-10" onClick={() => openOrClose()}>X</div>
                </div>
              </div>
                  <div className="relative  w-full h-full flex items-center z-10 flex justify-items-end">
                  <div className={`w-1/2 ml-auto text-left`}>
                    <div className='text-50 font-300 text-gold'>
                      Connect With Us
                    </div>
                    <div className={`${styles.inputWrapper} w-full`}>
                      <label className="w-full text-left text-white" htmlFor="email">Email*</label>
                      <input
                        id="email"
                        placeholder=""
                        className="w-full"
                        onChange={(e) =>
                          setDetailData({ ...detailData, ['email']: e.target.value })
                        }
                      />
                    </div>
                    <div className='w-full text-right pt-20'>
                      <button className='btn btn-outline-white' onClick={() => setStep(3)}>Next</button>
                    </div>
                  </div>
                </div>
            </div>
          )}
          
          {step === 3 && (
            <div className='step bg-aqua w-full h-full px-100'>
                <div className="relative  w-full ">
                <div className={`${styles.close} relative top-0 right-0 h-0 text-right`}>
                  <div className="relative inline-block text-100 font-300 leading-none text-white cursor-pointer z-10" onClick={() => openOrClose()}>X</div>
                </div>
              </div>
                  <div className="relative  w-full h-full flex items-center z-10 flex justify-items-end">
                  <div className={`w-1/2 ml-auto text-left`}>
                    <div className='text-50 font-300 text-slate'>
                      Connect With Us
                    </div>
                    <div className={`${styles.inputWrapper} w-full`}>
                      <label className="w-full text-slate" htmlFor="message">Message*</label>
                      <textarea
                        id="message"
                        placeholder=""
                        className="w-full"
                        onChange={(e) =>
                          setDetailData({ ...detailData, ['message']: e.target.value })
                        }
                      />
                    </div>
                    <div className='w-full text-right pt-20'>
                      <button className='btn btn-outline' onClick={() => setStep(4)}>Next</button>
                    </div>
                  </div>
                </div>
            </div>
          )}

          {step === 4 && (
            <div className='step bg-bluelight w-full h-full px-100'>
              <div className="relative  w-full ">
                <div className={`${styles.close} relative top-0 right-0 h-0 text-right`}>
                  <div className="relative inline-block text-100 font-300 leading-none text-slate cursor-pointer z-10" onClick={() => openOrClose()}>X</div>
                </div>
              </div>
              <div className="relative  w-full h-full flex items-center z-10 flex justify-items-end">
                <div className={`w-1/2 ml-auto text-left`}>
                  <div className='text-70 font-300 text-slate'>
                    Thanks! We will <br /> be in touch soon.
                  </div>
                  <div className={`w-1/2`}>

                  </div>
                  <div className='w-full text-left pt-20'>
                    <div className='font-nothingyoucoulddo text-30 font-400 text-slate' onClick={() => openOrClose()}>Return to home</div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      )}
    </>
  )
}

export default NavBlock
