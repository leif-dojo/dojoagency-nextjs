"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { useThemeContext } from '@/context/theme'
import styles from './contact_form.module.scss'
import NextIcon from '@/public/icons/icon-next.svg'
import { validateEmail } from '@/utils/general'
import Link from 'next/link'
import Socials from '@/components/generic/social_icons/social_icons'

const NavBlock = ({
  data,
}: {
  data: any
}) => {
  const [step, setStep] = useState(1)
  const { contactActive, setContactActive, cursorChangeHandler } = useThemeContext();

  const [valid1, setvalid1] = useState(true)
  const [valid2, setvalid2] = useState(true)
  const [valid3, setvalid3] = useState(true)
  const [validfinal, setvalidfinal] = useState(true)

  const openOrClose = () => {
    if (contactActive) {
      setContactActive(false)
      //reset fields on close
      setDetailData(initDetailData)
      setvalid1(true);
      setvalid2(true);
      setvalid3(true);
      setvalidfinal(true);
    } else {
      setContactActive(true)
    }
    setStep(1)
  }

  //FORM
  const initDetailData = {
    name: '',
    lastname: '', //honeypot
    email: '',
    message: '',
    hash: '8aaf78f9a70f1a4410c6d16637f877da'

  }
  const [detailData, setDetailData] = useState(initDetailData)

  const onKeyUp = (e) => {
    if(e.code === 'Enter') {
      switch(step) {
        case 1:
          validate1()
          break;
        case 2:
          validate2()
          break;
        case 3:
          validate3()
          break;
      }
    }
  }

  const validate1 = () => {
    //validation - require least 2 characters and honeypot field empty
    if (!detailData.name || detailData.name.length < 2 || detailData.lastname.length > 0) {
      setvalid1(false);
      return false
    }
    setStep(2)
    setvalid1(true);
  }
  const validate2 = () => {
    //validation - require valid email regex checker
    const email = detailData.email;
    if (!detailData.email || !validateEmail(email)) {
      setvalid2(false);
      return false
    }
    setStep(3)
    setvalid2(true);
  }

  const validate3 = () => {
    //validation - require least 2 characters
    if (!detailData.message || detailData.message.length < 2) {
      setvalid3(false);
      return false
    }
    submit()
    setvalid3(true);
  }


  const submit = async () => {
    const { name, lastname, email, message, hash } = detailData
    if (name.length > 1 && email.length > 1 && message.length > 1 && detailData.lastname.length == 0) {
      setvalidfinal(true);
      const res = await submitForm(
        name,
        lastname,
        email,
        message,
        hash
      )
      //console.log("res: ", res)
      if (res.status && res.status === 'error') {
        // TODO: show error message
        console.error(res)
        setvalidfinal(false);
      } else {
        //console.log("Success")
        setStep(4)
        if (process.browser) {
          //GTM/GA event
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({
            'event': 'form_submission',
            'event_category': 'form',
            'event_label': 'Contact Form',
          });
        }
      }
    } else {
      console.error('missing required fields')
      setvalidfinal(false);
    }
  }

  const submitForm = async (
    name: string,
    lastname: string,
    email: string,
    message: string,
    hash: string
  ) => {
    const url = process.env.NEXT_PUBLIC_CONTACT_FORM;
    const data = {
      name: name,
      lastname: lastname,
      email: email,
      message: message,
      hash: hash
    }
    if (url) {
      console.log("submitForm: ", email, name, message)
      if (name && email && message && lastname === '' && hash === '8aaf78f9a70f1a4410c6d16637f877da') {
        return await fetch(url, {
          method: 'POST',
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }).then((response) => { return response.json() })
          .catch((error) => {
            console.log('Error:', error)
          })
      } else {
        return { status: 'error' }
      }
    } else {
      return { status: 'error' }
    }
  }

  return (
    <>

      <div className={`${styles.root} ${contactActive ? styles.active : ''} fixed bg-black w-screen h-screen left-0 top-0 z-100`} onMouseEnter={() => { cursorChangeHandler("default") }} onMouseLeave={() => { cursorChangeHandler("page") }}>
        <div className={`${styles.step} ${step === 1 ? styles.active : ''} step absolute opacity-0 bg-gold w-full h-full px-50 landscape:px-100 md:px-100`}>
          <div className={`${styles.bg} bg absolute w-full h-full left-0 top-0 bg-gold`}>
            {data.step_1_image && (
              <picture>
                <source media={`(max-width: 567px)`} srcSet={data.step_1_image_mobile ? data.step_1_image_mobile?.permalink : data.step_1_image?.permalink} />
                <source media={`(min-width: 568px)`} srcSet={data.step_1_image?.permalink} />
                <Image
                  src={data.step_1_image?.permalink}
                  width={data.step_1_image?.width}
                  height={data.step_1_image?.height}
                  alt={data.step_1_image?.alt ? data.step_1_image.alt : ''}
                  className={`absolute top-0 w-full h-auto`}
                />
              </picture>
            )}
          </div>
          <div className="relative w-full ">
            <div className={`${styles.close} absolute top-30 right-0 h-0 text-right`}>
              <div className={`relative inline-block font-lato text-80 font-300 leading-none cursor-pointer z-10 text-slate`} onClick={() => openOrClose()}>X</div>
            </div>
          </div>
          <div className="relative  w-full h-full flex items-center z-10 justify-items-end">
            <div className={`w-full landscape:w-1/2 md:w-1/2 ml-auto text-left pr-0 landscape:pr-200 md:pr-200`}>
              <div className='text-90 font-300 leading-none text-slate pb-40'>
                Connect with us
              </div>
              <div className={`${styles.inputwrapper} ${valid1 ? '' : styles.error} w-full`}>
                <label className="w-full text-left text-24 leading-none font-600 pb-20 text-slate" htmlFor="name">Name*</label>
                <input
                  id="name"
                  placeholder=""
                  className="w-full text-22"
                  onChange={(e) =>
                    setDetailData({ ...detailData, ['name']: e.target.value })
                  }
                  onKeyUp={onKeyUp}
                  //onBlur={validate1}
                />
                <input
                  id="lastname"
                  placeholder=""
                  className="w-full text-22 hidden"
                  onChange={(e) =>
                    setDetailData({ ...detailData, ['lastname']: e.target.value })
                  }
                />
                <div className={`absolute top-full left-0 text-left text-24 leading-none font-600 pb-20 text-red pt-20 ${valid1 ? 'hidden' : 'block'}`}>Name Required</div>
              </div>
              <div className='relative w-full text-right mt-20'>
                <button className='btn btn-outline' onClick={() => validate1()}>Next</button>
                <div className={`${styles.progress} flex md:hidden absolute left-full h-full top-0`}>
                  <div className={`${styles.progressdot} border-golden bg-golden`}></div>
                  <div className={`${styles.progressdot} border-golden`}></div>
                  <div className={`${styles.progressdot} border-golden`}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={`${styles.step} ${step === 2 ? styles.active : ''} step absolute opacity-0 bg-slate w-full h-full px-50 md:px-100`}>
          <div className={`${styles.bg} bg absolute w-full h-full left-0 top-0 bg-slate`}>
            {data.step_2_image && (
              <picture>
                <source media={`(max-width: 567px)`} srcSet={data.step_2_image_mobile ? data.step_2_image_mobile?.permalink : data.step_2_image?.permalink} />
                <source media={`(min-width: 568px)`} srcSet={data.step_2_image?.permalink} />
                <Image
                  src={data.step_2_image?.permalink}
                  width={data.step_2_image?.width}
                  height={data.step_2_image?.height}
                  alt={data.step_2_image?.alt ? data.step_2_image.alt : ''}
                  className={`absolute top-0 w-full h-auto`}
                />
              </picture>
            )}
          </div>
          <div className="relative  w-full ">
            <div className={`${styles.close} absolute top-30 right-0 h-0 text-right`}>
              <div className={`relative inline-block font-lato text-80 font-300 leading-none cursor-pointer z-10 text-gold`} onClick={() => openOrClose()}>X</div>
            </div>
          </div>
          <div className="relative  w-full h-full flex items-center z-10 justify-items-end">
            <div className={`w-full landscape:w-1/2 md:w-1/2 ml-auto text-left pr-0 landscape:pr-200 md:pr-200`}>
              <div className='text-90 font-300 leading-none text-gold pb-40'>
                Connect with us
              </div>
              <div className={`${styles.inputwrapper} ${valid2 ? '' : styles.error} w-full`}>
                <label className="w-full text-left text-24 leading-none font-600 pb-20 text-white" htmlFor="email">Email*</label>
                <input
                  id="email"
                  placeholder=""
                  className="w-full text-22"
                  onChange={(e) =>
                    setDetailData({ ...detailData, ['email']: e.target.value })
                  }
                  onKeyUp={onKeyUp}
                  //onBlur={validate2}
                />
                <div className={`absolute top-full left-0 text-left text-24 leading-none font-600 pb-20 text-red pt-20 ${valid2 ? 'hidden' : 'block'}`}>Not Valid Email</div>
              </div>
              <div className='relative w-full text-right mt-20'>
                <button className='btn btn-outline-white' onClick={() => validate2()}>Next</button>
                <div className={`${styles.progress} flex md:hidden absolute left-full h-full top-0`}>
                  <div className={`${styles.progressdot} border-bluedark`}></div>
                  <div className={`${styles.progressdot} border-bluedark bg-bluedark`}></div>
                  <div className={`${styles.progressdot} border-bluedark`}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={`${styles.step} ${step === 3 ? styles.active : ''} step absolute opacity-0 bg-aqua w-full h-full px-50 md:px-100`}>
          <div className={`${styles.bg} bg absolute w-full h-full left-0 top-0 bg-aqua`}>
            {data.step_3_image && (
              <picture>
                <source media={`(max-width: 567px)`} srcSet={data.step_3_image_mobile ? data.step_3_image_mobile?.permalink : data.step_3_image?.permalink} />
                <source media={`(min-width: 568px)`} srcSet={data.step_3_image?.permalink} />
                <Image
                  src={data.step_3_image?.permalink}
                  width={data.step_3_image?.width}
                  height={data.step_3_image?.height}
                  alt={data.step_3_image?.alt ? data.step_3_image.alt : ''}
                  className={`absolute top-0 w-full h-auto`}
                />
              </picture>
            )}
          </div>
          <div className="relative  w-full ">
            <div className={`${styles.close} absolute top-30 right-0 h-0 text-right`}>
              <div className={`relative inline-block font-lato text-80 font-300 leading-none cursor-pointer z-10 text-white`} onClick={() => openOrClose()}>X</div>
            </div>
          </div>
          <div className="relative  w-full h-full flex items-center z-10 justify-items-end">
            <div className={`w-full landscape:w-1/2 md:w-1/2 ml-auto text-left pr-0 landscape:pr-200 md:pr-200`}>
              <div className='text-90 font-300 leading-none text-slate pb-40'>
                Connect with us
              </div>
              <div className={`${styles.inputwrapper} ${valid3 ? '' : styles.error} w-full`}>
                <label className="w-full text-left text-24 leading-none font-600 pb-20 text-slate" htmlFor="message">Message*</label>
                <textarea
                  id="message"
                  placeholder=""
                  className="w-full text-22"
                  rows={6}
                  onChange={(e) =>
                    setDetailData({ ...detailData, ['message']: e.target.value })
                  }
                  onKeyUp={onKeyUp}
                  //onBlur={validate3}
                />
                <div className={`absolute top-full left-0 text-left text-24 leading-none font-600 pb-20 text-red pt-20 ${valid3 ? 'hidden' : 'block'}`}>Message Required</div>
                <div className={`absolute top-full left-0 text-left text-24 leading-none font-600 pb-20 text-red pt-20 ${validfinal ? 'hidden' : 'block'}`}>Missing Required Fields</div>
              </div>
              <div className='relative w-full text-right mt-20'>
                <button className='btn btn-outline' onClick={() => validate3()}>Next</button>
                <div className={`${styles.progress} flex md:hidden absolute left-full h-full top-0`}>
                  <div className={`${styles.progressdot} border-aquadark`}></div>
                  <div className={`${styles.progressdot} border-aquadark`}></div>
                  <div className={`${styles.progressdot} border-aquadark bg-aquadark`}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={`${styles.step} ${step === 4 ? styles.active : ''} step absolute opacity-0 bg-bluelight w-full h-full px-50 md:px-100`}>
          <div className={`${styles.bg} bg absolute w-full h-full left-0 top-0 bg-bluelight`}>
            {data.step_4_image && (
              <picture>
                <source media={`(max-width: 567px)`} srcSet={data.step_4_image_mobile ? data.step_4_image_mobile?.permalink : data.step_4_image?.permalink} />
                <source media={`(min-width: 568px)`} srcSet={data.step_4_image?.permalink} />
                <Image
                  src={data.step_4_image?.permalink}
                  width={data.step_4_image?.width}
                  height={data.step_4_image?.height}
                  alt={data.step_4_image?.alt ? data.step_4_image.alt : ''}
                  className={`absolute top-0 w-full h-auto`}
                />
              </picture>
            )}
          </div>
          <div className="relative  w-full ">
            <div className={`${styles.close} absolute top-30 right-0 h-0 text-right`}>
              <div className={`relative inline-block font-lato text-80 font-300 leading-none cursor-pointer z-10 text-slate`} onClick={() => openOrClose()}>X</div>
            </div>
          </div>
          <div className="relative  w-full h-full flex items-center z-10 justify-items-end">
            <div className={`w-full landscape:w-1/2 md:w-1/2 ml-auto text-left pr-0 landscape:pr-200 md:pr-200`}>
              <div className='text-90 font-300 text-slate leading-none pb-40'>
                Thanks! We will <br /> be in touch soon.
              </div>
              <div className={`w-1/2`}>

              </div>
              <div className='w-full text-left pt-0'>
                <Link href={`/team`} className="link inline-flex items-center justify-items-end ml-auto text-slate" aria-label="Next">
                  <span className="font-nothingyoucoulddo text-40 font-400 leading-none pr-20 text-right">Meet the team</span>
                  <div><NextIcon className={`${styles.nextarrow} w-30 h-auto`} /></div>
                </Link>
              </div>
              <div className='w-full pt-20'>
                <Socials socials={data.socials} style={'simple'} color={'text-slate'} />
              </div>
            </div>
          </div>
        </div>


      </div>

    </>
  )
}

export default NavBlock
