//"use client"
import React, { useContext, useEffect, useState } from 'react'
import Arrow from '@/public/icons/icon-triangle.svg'

export const typename = 'Set_Components_PostNavigation'

const PostNavigationBlock = ({ block }: { block: any }) => {
console.log("post nav: ", block)
  return (
  <section className="w-full bg-white text-slate">
    <div className='container w-full flex flex-nowrap mx-auto py-100'>
      <div className='flex w-1/2 justify-items-start'>
        { block.back_link && (
          <a href={`${block.back_link}`} className="inline-flex mr-auto" aria-label="Previous">
            <Arrow className="rotate-180"/>
            <span className="font-nothingyoucoulddo text-40 font-400 text-blue pl-20">{block.back_link_copy ? block.back_link_copy : 'Previous'}</span>
          </a>
        )}
      </div>
      <div className='flex w-1/2 justify-items-end'>
        { block.forward_link && (
          <a  href={`${block.forward_link}`} className="inline-flex ml-auto" aria-label="Next">
            <span className="font-nothingyoucoulddo text-40 font-400 text-blue pr-20">{block.forward_link_copy ? block.forward_link_copy : 'Next'}</span> 
            <Arrow />
          </a>
        )}
      </div>
    </div>
  </section>
)}

export default PostNavigationBlock
