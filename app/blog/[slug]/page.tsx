import { getClient } from "@/lib/client"
import React from 'react'
import { Metadata, ResolvingMetadata } from 'next'
import BlogQuery from '@/queries/blog'
import { BlogMetaQuery } from '@/queries/blog'
import Repeater from '@/utils/rendering/repeater'
import { notFound } from "next/navigation"

type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}
let jsonLd_WebPage = {}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent?: ResolvingMetadata
): Promise<Metadata> {
  const client = getClient();
  //const uri = new URL(process.env.NEXT_PUBLIC_GRAPHQL_URL)
  const { data } = await client.query({
    query: BlogMetaQuery,
    variables: {
      slug: params.slug,
    },
  });
  jsonLd_WebPage = {
    "@context": "http://schema.org",
    "@type": "WebPage",
    "name": "Dojo Agency",
    "url": 'https://www.dojoagency.com/blog/' + params.slug,
    "description": data.entry.meta_description ? data.entry.meta_description : 'Brand marketing and health care advertising specialists based in Portland, Oregon.',
    "mainEntity": {
      "@type": "Article",
      "@id": "",
      "author": "Dojo Agency",
      "datePublished": data.entry.date ? data.entry.date : '2023-01-01',
      "dateModified": data.entry.last_modified,
      "mainEntityOfPage": "",
      "headline": data.entry.meta_title ? data.entry.meta_title : data.entry.title,
      "image": {
        "@type": "imageObject",
        "url": data.entry.open_graph_image?.permalink ? data.entry.open_graph_image?.permalink : 'https://www.dojoagency.com/images/social_logo_1200x630.jpg',
        "height": data.entry.open_graph_image?.height ? data.entry.open_graph_image?.height : '630',
        "width": data.entry.open_graph_image?.width ? data.entry.open_graph_image?.width : '1200'
      },
      "publisher": {
        "@type": "Organization",
        "name": "Dojo Agency",
        "logo": {
          "@type": "imageObject",
          "url": "https://www.dojoagency.com/images/social_logo_1200x1200.jpg"
        }
      }
    }
  }
  return {
    title: data.entry.meta_title ? data.entry.meta_title : data.entry.title,
    description: data.entry.meta_description ? data.entry.meta_description : '',
    alternates: {
      canonical: '/blog/' + params.slug,
    },
    openGraph: {
      url: '/blog/' + params.slug,
      title: data.entry.meta_title ? data.entry.meta_title : data.entry.title,
      description: data.entry.meta_description ? data.entry.meta_description : '',
      images: data.entry.open_graph_image?.permalink ? [{ url: data.entry.open_graph_image?.permalink, width: data.entry.open_graph_image?.width, height: data.entry.open_graph_image?.height, alt: data.entry.open_graph_image?.alt }] : [],
      locale: 'en_US',
      type: 'article',
      publishedTime: data.entry.date,
      //authors: ['https://www.facebook.com/jeffrey.selin'], //google no longer uses
    }
  }
}

export default async function Page(context: { params: { slug: string }, searchParams: { livepreview: string, token: string } }) {
  const client = getClient();
  const uri = new URL(process.env.NEXT_PUBLIC_GRAPHQL_URL)
  const token = context.searchParams.token
  const livepreview = context.searchParams.livepreview
  if (token) {
    uri.searchParams.append('token', token)
    uri.searchParams.append('live-preview', livepreview)
  }

  const { data } = await client.query({
    query: BlogQuery,
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

  if (!data.entry) {
    notFound()
  }

  const pagemeta = {
    title: data.entry.meta_title ? data.entry.meta_title : data.entry.title,
    description: data.entry.meta_description ? data.entry.meta_description : '',
  }

  return (
    <>
      <div className="page ">
        <Repeater blocks={data.entry?.components} meta={pagemeta} />
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd_WebPage) }}
      />
    </>
  )
}
