//'use client'
import { getClient } from "@/lib/client"
import React from 'react'
import PageQuery from '@/queries/page'
import { useThemeContext } from '@/context/theme'
import { ApolloClient, InMemoryCache, HttpLink, from, useQuery } from "@apollo/client"
import dynamic from 'next/dynamic'
import Repeater from '@/utils/rendering/repeater'
import { notFound } from "next/navigation"
import Image from 'next/image'
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
  //const { loading, error, data } = useQuery(GlobalQuery, { client });
  //console.log("page client data: ", context.params.slug, data.entry?.components)
  // This request should be cached until manually invalidated.
  // Similar to `getStaticProps`.
  // `force-cache` is the default and can be omitted.
  // const staticData = await fetch(`https://...`, { cache: 'force-cache' });

  // This request should be refetched on every request.
  // Similar to `getServerSideProps`.
  // const dynamicData = await fetch(`https://...`, { cache: 'no-store' });

  // This request should be cached with a lifetime of 10 seconds.
  // Similar to `getStaticProps` with the `revalidate` option.
  // const revalidatedData = await fetch(`https://...`, {
  //   next: { revalidate: 10 },
  // });

  // Fetch data directly in a Server Component
  // const recentPosts = await getPosts();

  //const components = data.entry.components?.map((block, index) => componentList[block.__typename])

  // Forward fetched data to your Client Component
  if (!data.entry) {
    notFound()	
  }

  return (
  <div className="page bg-white pt-100">
    <Repeater blocks={data.entry?.components} />
  </div>
  )
}
