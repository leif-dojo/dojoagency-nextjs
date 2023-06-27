//"use-client"
import { getClient } from "@/lib/client"
import React from 'react'
import { Metadata, ResolvingMetadata } from 'next'
import PageQuery from '@/queries/page'
import {PageMetaQuery} from '@/queries/page'
import Repeater from '@/utils/rendering/repeater'
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
      uri: '/',
    }
  });
  return {
    title: data.entry.meta_title ? data.entry.meta_title : data.entry.title,
    description: data.entry.meta_description ? data.entry.meta_description : '',
    openGraph: {
      siteName: 'Dojo Agency',
      url: 'https://wwww.dojoagency.com',
      title: data.entry.meta_title ? data.entry.meta_title : data.entry.title,
      description: data.entry.meta_description ? data.entry.meta_description : '',
      images: data.entry.open_graph_image?.permalink ? [{url: data.entry.open_graph_image?.permalink,width: data.entry.open_graph_image?.width,height: data.entry.open_graph_image?.height}] : [],
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
      uri: '/',
    },
    context: {
      uri: uri.toString(),
      fetchOptions: {
        next: { revalidate: 15 },
      },
    },
  });
  //console.log("page home: ", context.params.slug, data.entry?.components)
  //console.log("PAGE HOME: ", context.params)
  //console.log("page home HomeHeroBlock: ", HomeHeroBlock)
  return (
    <>
      <div className={`page`}>
        <Repeater blocks={data.entry.components} />
      </div>
    </>
  )
}
