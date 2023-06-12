//'use client'
import { getClient } from "@/lib/client"
import React from 'react'
import ProjectQuery from '@/queries/project'
import Repeater from '@/utils/rendering/repeater'
import { notFound } from "next/navigation"
import Arrow from '@/public/icons/icon-triangle.svg'
import { draftMode } from 'next/headers'
import Link from 'next/link'

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
    query: ProjectQuery, 
    variables: {
      slug: context.params.slug,
    },
    context: {
      uri: uri.toString(),
      fetchOptions: {
        next: { revalidate: 15 },
      },
    },
  });
  //const { loading, error, data } = useQuery(GlobalQuery, { client });
  //console.log("Project data: ", context.params.slug, data)

  // Forward fetched data to your Client Component
  if (!data.entry) {
    notFound()	
  }

  return (
  <div className="page bg-white text-slate pt-100">
    <Repeater blocks={data.entry?.components} />

    <div className='container w-full flex flex-nowrap mx-auto py-40'>
      <div className='flex w-1/2 justify-items-start'>
        <Link href={`/portfolio/`} className="inline-flex mr-auto text-blue" aria-label="Previous"><Arrow className={`w-30 h-auto rotate-180`}/><span className="font-nothingyoucoulddo text-40 font-400 text-blue pl-20">Previous</span></Link>
      </div>
      <div className='flex w-1/2 justify-items-end'>
        <Link  href={`/portfolio/`} className="inline-flex ml-auto text-blue" aria-label="Next"> <span className="font-nothingyoucoulddo text-40 font-400 text-blue pr-20">Next</span> <Arrow className={`w-30 h-auto`}/></Link>
      </div>
    </div>
  </div>
  )
}
