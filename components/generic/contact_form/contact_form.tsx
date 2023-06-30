"use client"
import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import { useThemeContext } from '@/context/theme'
import styles from './contact_form.module.scss'
import Arrow from '@/public/icons/icon-triangle.svg'
import { validateEmail } from '@/utils/general'

const NavBlock = ({
  data,
}: {
  data: any
}) => {
  const [step, setStep] = useState(1)
  const { contactActive, setContactActive } = useThemeContext();

  const [valid1, setvalid1] = useState(true)
  const [valid2, setvalid2] = useState(true)
  const [valid3, setvalid3] = useState(true)

  const openOrClose = () => {
    if (contactActive) {
      setContactActive(false)
      //reset fields on close
      setDetailData(initDetailData)
      setvalid1(true);
      setvalid2(true);
      setvalid3(true);
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
  }
  const [detailData, setDetailData] = useState(initDetailData)

  const validate1 = () => {
    //console.log("validate 1: ", detailData.name)
    if (!detailData.name) {
      setvalid1(false);
      return false
    }
    setStep(2)
    setvalid1(true);
  }
  const validate2 = () => {
    //console.log("validate 2: ", detailData.email)
    const email = detailData.email;
    if (!detailData.email || !validateEmail(email)) {
      setvalid2(false);
      return false
    }
    setStep(3)
    setvalid2(true);
  }

  const validate3 = () => {
    //console.log("validate 3: ", detailData.message)
    if (!detailData.message) {
      setvalid3(false);
      return false
    }
    submit()
    setvalid3(true);
  }


  const submit = async () => {
    const { name, email, message } = detailData
    const res = await submitForm(
      name,
      email,
      message,
    )
    //console.log("res: ", res)
    if (res.status && res.status === 'error') {
      // TODO: show error message
      console.error(res)
    } else {
      //console.log("Success")
      setStep(4)
    }
  }

  const submitForm = async (
    email: string,
    name: string,
    message: string,
  ) => {
    const url = process.env.NEXT_PUBLIC_CONTACT_FORM;
    const data = {
      name: name,
      email: email,
      message: message
    }
    if(url){
      return await fetch(url, {
        method: 'POST',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }).then((response) => { return response.json()})
      .catch((error) => {
        console.log('Error:', error)
      })
    } else {
      return {status:'error'}
    }
  }

  //console.log("Contact Form: ", data)
  return (
    <>
      {contactActive && (
        <div className={`${styles.root} fixed bg-black w-screen h-screen left-0 top-0 z-100`}>

          
            <div className={`${styles.step} ${step === 1 ? styles.active:''} step absolute opacity-0 bg-gold w-full h-full px-50 md:px-100`}>
              <div className={`${styles.bg} bg absolute w-full h-full left-0 top-0`}>
                {data.step_1_image && (
                  <Image
                    src={data.step_1_image?.permalink}
                    width={data.step_1_image?.width}
                    height={data.step_1_image?.height}
                    alt={data.step_1_image?.alt ? data.step_1_image.alt : ''}
                    className={`absolute top-0 w-full h-auto`}
                  />
                )}
              </div>
              <div className="relative w-full ">
                <div className={`${styles.close} absolute top-30 right-0 h-0 text-right`}>
                  <div className={`relative inline-block font-lato text-80 font-300 leading-none cursor-pointer z-10 text-slate`} onClick={() => openOrClose()}>X</div>
                </div>
              </div>
              <div className="relative  w-full h-full flex items-center z-10 justify-items-end">
                <div className={`w-full md:w-1/2 ml-auto text-left pr-0 md:pr-200`}>
                  <div className='text-90 font-300 text-slate pb-40'>
                    Connect With Us
                  </div>
                  <div className={`${styles.inputwrapper} ${valid1 ? '':  styles.error} w-full`}>
                    <label className="w-full text-left text-24 leading-none font-600 pb-20 text-slate" htmlFor="name">Name*</label>
                    <input
                      id="name"
                      placeholder=""
                      className="w-full text-22"
                      onChange={(e) =>
                        setDetailData({ ...detailData, ['name']: e.target.value })
                      }
                    />
                  </div>
                  <div className='w-full text-right pt-20'>
                    <button className='btn btn-outline' onClick={() => validate1()}>Next</button>
                  </div>
                </div>
              </div>
            </div>

            <div className={`${styles.step} ${step === 2 ? styles.active:''} step absolute opacity-0 bg-slate w-full h-full px-50 md:px-100`}>
              <div className={`${styles.bg} bg absolute w-full h-full left-0 top-0`}>
                {data.step_2_image && (
                  <Image
                    src={data.step_2_image?.permalink}
                    width={data.step_2_image?.width}
                    height={data.step_2_image?.height}
                    alt={data.step_2_image?.alt ? data.step_2_image.alt : ''}
                    className={`absolute top-0 w-full h-auto`}
                  />
                )}
              </div>
              <div className="relative  w-full ">
                <div className={`${styles.close} absolute top-30 right-0 h-0 text-right`}>
                  <div className={`relative inline-block font-lato text-80 font-300 leading-none cursor-pointer z-10 text-gold`} onClick={() => openOrClose()}>X</div>
                </div>
              </div>
              <div className="relative  w-full h-full flex items-center z-10 flex justify-items-end">
                <div className={`w-full md:w-1/2 ml-auto text-left pr-0 md:pr-200`}>
                  <div className='text-90 font-300 text-gold pb-40'>
                    Connect With Us
                  </div>
                  <div className={`${styles.inputwrapper} ${valid2 ? '':  styles.error} w-full`}>
                    <label className="w-full text-left text-24 leading-none font-600 pb-20 text-white" htmlFor="email">Email*</label>
                    <input
                      id="email"
                      placeholder=""
                      className="w-full text-22"
                      onChange={(e) =>
                        setDetailData({ ...detailData, ['email']: e.target.value })
                      }
                    />
                  </div>
                  <div className='w-full text-right pt-20'>
                    <button className='btn btn-outline-white' onClick={() => validate2()}>Next</button>
                  </div>
                </div>
              </div>
            </div>

            <div className={`${styles.step} ${step === 3 ? styles.active:''} step absolute opacity-0 bg-aqua w-full h-full px-50 md:px-100`}>
              <div className={`${styles.bg} bg absolute w-full h-full left-0 top-0`}>
                {data.step_3_image && (
                  <Image
                    src={data.step_3_image?.permalink}
                    width={data.step_3_image?.width}
                    height={data.step_3_image?.height}
                    alt={data.step_3_image?.alt ? data.step_3_image.alt : ''}
                    className={`absolute top-0 w-full h-auto`}
                  />
                )}
              </div>
              <div className="relative  w-full ">
                <div className={`${styles.close} absolute top-30 right-0 h-0 text-right`}>
                  <div className={`relative inline-block font-lato text-80 font-300 leading-none cursor-pointer z-10 text-white`} onClick={() => openOrClose()}>X</div>
                </div>
              </div>
              <div className="relative  w-full h-full flex items-center z-10 flex justify-items-end">
                <div className={`w-full md:w-1/2 ml-auto text-left pr-0 md:pr-200`}>
                  <div className='text-90 font-300 text-slate pb-40'>
                    Connect With Us
                  </div>
                  <div className={`${styles.inputwrapper} ${valid3 ? '':  styles.error} w-full`}>
                    <label className="w-full text-left text-24 leading-none font-600 pb-20 text-slate" htmlFor="message">Message*</label>
                    <textarea
                      id="message"
                      placeholder=""
                      className="w-full text-22"
                      rows={6}
                      onChange={(e) =>
                        setDetailData({ ...detailData, ['message']: e.target.value })
                      }
                    />
                  </div>
                  <div className='w-full text-right pt-20'>
                    <button className='btn btn-outline' onClick={() => validate3()}>Next</button>
                  </div>
                </div>
              </div>
            </div>

            <div className={`${styles.step} ${step === 4 ? styles.active:''} step absolute opacity-0 bg-bluelight w-full h-full px-50 md:px-100`}>
              <div className={`${styles.bg} bg absolute w-full h-full left-0 top-0`}>
                {data.step_4_image && (
                  <Image
                    src={data.step_4_image?.permalink}
                    width={data.step_4_image?.width}
                    height={data.step_4_image?.height}
                    alt={data.step_4_image?.alt ? data.step_4_image.alt : ''}
                    className={`absolute top-0 w-full h-auto`}
                  />
                )}
              </div>
              <div className="relative  w-full ">
                <div className={`${styles.close} absolute top-30 right-0 h-0 text-right`}>
                  <div className={`relative inline-block font-lato text-80 font-300 leading-none cursor-pointer z-10 text-slate`} onClick={() => openOrClose()}>X</div>
                </div>
              </div>
              <div className="relative  w-full h-full flex items-center z-10 flex justify-items-end">
                <div className={`w-full md:w-1/2 ml-auto text-left pr-0 md:pr-200`}>
                  <div className='text-90 font-300 text-slate leading-none pb-40'>
                    Thanks! We will <br /> be in touch soon.
                  </div>
                  <div className={`w-1/2`}>

                  </div>
                  <div className='w-full text-left pt-20'>
                    <div className='font-nothingyoucoulddo text-30 font-400 text-slate inline-flex cursor-pointer' onClick={() => openOrClose()}>
                      <Arrow className="w-30 h-auto rotate-180" />
                      <div className="font-nothingyoucoulddo text-40 font-400 text-slate pl-20">Return to home</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>


        </div>
      )}
    </>
  )
}

export default NavBlock
