//"use client"
import React, { useContext, useEffect, useState } from 'react'

export const typename = 'Set_Components_Wysiwyg'

const WysiwygBlock = ({ block }: { block: any }) => {

  return (
  <section className="w-full bg-white text-slate">
    <div className="px-150 py-50">
      <div className="w-full">
        <div className="w-full">
          <div className='wysiwyg text-90 leading-120 font-300' dangerouslySetInnerHTML={{ __html: block.headline }}></div>
        </div>
        <div className="w-full">
          <div className='wysiwyg text-30 leading-40 font-300' dangerouslySetInnerHTML={{ __html: block.wysiwyg }}></div>
        </div>
      </div>
    </div>
  </section>
)}

export default WysiwygBlock
