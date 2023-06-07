//"use client"
import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image'

export const typename = 'Set_Components_Image'

const ImageBlock = ({ block }: { block: any }) => {
  //console.log("ImageBlock", block )
  return (
  <section className="w-full bg-white text-slate">
    <div className="px-50 md:px-200 py-100">
      <div className="flex w-full">
        {block.image && (
          <div className='w-full'>
              <Image
                src={block.image?.permalink}
                width={block.image?.width}
                height={block.image?.height}
                alt={block.image?.alt ? block.image.alt : ''}
                className={`w-full h-auto`}
              />
          </div>
        )}
      </div>
    </div>
  </section>
)}

export default ImageBlock
