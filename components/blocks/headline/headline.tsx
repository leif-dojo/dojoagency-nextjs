//"use client"
import React, { useContext, useEffect, useState } from 'react'

export const typename = 'Set_Components_Wysiwyg'

const WysiwygBlock = ({ block }: { block: any }) => {

  return (
  <section className="w-full bg-white text-slate">
    <div className="px-50 md:px-150 py-50">
      <div className="flex">
        <div className="w-full">
          <div className='wysiwyg text-90 leading-120 font-300' dangerouslySetInnerHTML={{ __html: block.headline }}></div>
        </div>
      </div>
    </div>
  </section>
)}

export default WysiwygBlock
