//'use client'
import { getClient } from "@/lib/client"
import React from 'react'

export default async function PostNotFound(context: { params: { slug: string } }) {

  return (
    <div className={`page pt-100`}>
      <section className="w-full bg-white text-slate">
        <div className="px-50 md:px-150 py-200">
          <div className="w-full py-200">
            <div className="w-full">
              <div className={`text-70 leading-none text-center`}>Not Found</div>
              <div className={`text-30 leading-none text-center`}> Could not find requested resource</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
