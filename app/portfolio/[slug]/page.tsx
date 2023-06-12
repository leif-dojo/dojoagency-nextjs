//'use client'
import { getClient } from "@/lib/client"
import React from 'react'
import PageQuery from '@/queries/page'
import Repeater from '@/utils/rendering/repeater'
import { notFound } from "next/navigation"
import Link from 'next/link'
import Arrow from '@/public/icons/icon-triangle.svg'
import { draftMode } from 'next/headers'

export default async function Page(context: { params: { slug: string }, searchParams: { livepreview: string, token: string} }) {
  const client = getClient();
  const { isEnabled } = draftMode()
  const uri = new URL(process.env.NEXT_PUBLIC_GRAPHQL_URL)
  const token = context.searchParams.token
  const livepreview = context.searchParams.livepreview
  if (token) {
    uri.searchParams.append('token', token)
    uri.searchParams.append('live-preview', livepreview)
  }

  const { data } = await client.query({
    query: PageQuery, 
    variables: {
      uri: '/portfolio/'+context.params.slug,
    },
    context: {
      uri: uri.toString(),
      fetchOptions: {
        next: { revalidate: 15 },
      },
    },
  });

  // Forward fetched data to your Client Component
  if (!data.entry) {
    notFound()	
  }

  return (
  <div className="page bg-white pt-100">
    <Repeater blocks={data.entry?.components} />

    <div className='w-full flex flex-nowrap px-50 md:px-100 py-100'>
      <div className='flex w-1/2 justify-items-start'>
        <Link href={`/portfolio/`} className="inline-flex mr-auto text-blue" aria-label="Previous">
          <Arrow className={`w-30 h-auto rotate-180`}/>
          <span className="font-nothingyoucoulddo text-40 font-400 text-blue pl-20">Back to Portfolio</span></Link>
      </div>
      <div className='flex w-1/2 justify-items-end'>
        
      </div>
    </div>
  </div>
  )
}
