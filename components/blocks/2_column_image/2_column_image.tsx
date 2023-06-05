//"use client"
import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
export const typename = 'Set_Components_2ColumnImage'

const Column2ImageBlock = ({ block }: { block: any }) => {
console.log("Column2ImageBlock", block)
  return (
  <section className="w-full bg-white text-slate">
    <div className=" px-100 py-100">
      <div className="block md:flex">
        <div className="w-full md:w-5/12 md:pr-30">
          <div className="text-20 leading-none font-300 uppercase mb-10">
            {block.eyebrow}
          </div>
          <div className="text-90 leading-120 font-300 mb-20">
            {block.headline}
          </div>
          <div className="w-full">
            <div className='wysiwyg text-30 leading-40 font-300' dangerouslySetInnerHTML={{ __html: block.wysiwyg }}></div>
          </div>
        </div>
        <div className="w-full md:w-7/12">
          {block.image && (
            <div className='w-full'>
              <Image
              src={block.image?.permalink}
              width={block.image?.width}
              height={block.image?.height}
              alt={block.image?.alt ? block.image.alt : ''}
              className='w-full h-auto'
            />
            </div>
          )}
        </div>
      </div>
    </div>
  </section>
)}

export default Column2ImageBlock
