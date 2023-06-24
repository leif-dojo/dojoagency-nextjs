//'use client'
import { getClient } from "@/lib/client"
import React from 'react'
import { Metadata, ResolvingMetadata } from 'next'
import PageQuery from '@/queries/page'
import {PageMetaQuery} from '@/queries/page'
import Repeater from '@/utils/rendering/repeater'
import { notFound } from "next/navigation"
import { draftMode } from 'next/headers'

type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}
 
export async function generateMetadata(
  { params, searchParams }: Props,
  parent?: ResolvingMetadata
): Promise<Metadata> {
  const client = getClient();
  const uri = new URL(process.env.NEXT_PUBLIC_GRAPHQL_URL)
  const { data } = await client.query({
    query: PageMetaQuery, 
    variables: {
      uri: '/core-stories/'+params.slug,
    }
  });
  return {
    title: data.entry.meta_title,
    description: data.entry.meta_description,
    openGraph: {
      url: '/core-stories/'+params.slug,
      title: data.entry.meta_title,
      description: data.entry.meta_description,
      images: [
        {
          url: data.entry.open_graph_image?.permalink,
          width: data.entry.open_graph_image?.width,
          height: data.entry.open_graph_image?.height
        }
      ],
      locale: 'en_US',
      type: 'website',
    }
  }
}

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
      uri: '/core-stories/'+context.params.slug,
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
  <div className="page ">
    <Repeater blocks={data.entry?.components} />
  </div>
  )
}
