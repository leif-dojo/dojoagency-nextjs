//'use client'
import { getClient } from "@/lib/client"
import React from 'react'
import PageQuery from '@/queries/page'
import Repeater from '@/utils/rendering/repeater'
import { notFound } from "next/navigation"
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
      uri: '/method/'+context.params.slug,
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
  <div className="page  pt-100">
    <Repeater blocks={data.entry?.components} />
  </div>
  )
}
