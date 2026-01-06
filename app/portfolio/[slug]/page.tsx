import { getClient } from "@/lib/client"
import React from 'react'
import { Metadata, ResolvingMetadata } from 'next'
import PageQuery from '@/queries/page'
import { PageMetaQuery } from '@/queries/page'
import Repeater from '@/utils/rendering/repeater'
import { notFound } from "next/navigation"
import PageContext from '@/components/generic/page_context/page_context'

type Props = {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}
let jsonLd_WebPage = {}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent?: ResolvingMetadata
): Promise<Metadata> {
  const client = getClient();
  const { slug } = await params;

  const { data } = await client.query({
    query: PageMetaQuery,
    variables: {
      uri: '/portfolio/' + slug,
    },
    context: {
      fetchOptions: {
        cache: 'force-cache', // or 'no-store', depending on freshness
        next: { revalidate: 3600 },
      },
    }
  });
  if(!data.entry){return {}};
  jsonLd_WebPage = {
    "@context": "http://schema.org",
    "@type": "WebPage",
    "name": "Dojo Agency",
    "url": 'https://www.dojoagency.com/portfolio/' + slug,
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
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.dojoagency.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Vans",
          "item": "https://www.dojoagency.com/portfolio"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": data.entry.title,
          "item": `https://www.dojoagency.com/portfolio/${slug}`
        }
      ].filter(Boolean),
    }
  }
  
  return {
    title: data.entry.meta_title ? data.entry.meta_title : data.entry.title,
    description: data.entry.meta_description ? data.entry.meta_description : '',
    keywords: data.entry.keywords || '',
    alternates: {
      canonical: data.entry.canonical || "https://www.dojoagency.com/portfolio/" + slug,
    },
    openGraph: {
      url: '/portfolio/' + slug,
      title: data.entry.meta_title ? data.entry.meta_title : data.entry.title,
      description: data.entry.meta_description ? data.entry.meta_description : '',
      images: data.entry.open_graph_image?.permalink ? [{ url: data.entry.open_graph_image?.permalink, width: data.entry.open_graph_image?.width, height: data.entry.open_graph_image?.height }] : [{ url: 'https://www.dojoagency.com/images/social_logo_1200x630.jpg', width: 1200, height: 630 }],
      locale: 'en_US',
      type: 'website',
    },
    robots: {
      index: data.entry.robots_index ?? true,
      follow: data.entry.robots_follow ?? true,
    },
    other: {
      'ai-crawl': data.entry.ai_crawl ? data.entry.ai_crawl : true,
      'ai-use': data.entry.ai_use ? data.entry.ai_use : false,
    }
  }
}

export default async function Page(context: { params: { slug: string }, searchParams: { livepreview: string, token: string } }) {
  const client = getClient();
  const { slug } = await context.params;
  const uri = new URL(process.env.NEXT_PUBLIC_GRAPHQL_URL)
  const { searchParams } = context;

  // Await searchParams before using them
  const { token, livepreview } = await searchParams;  // Ensure we await searchParams

  if (token) {
    uri.searchParams.append('token', token);
    if (livepreview) {
      uri.searchParams.append('live-preview', livepreview);
    }
  }

  const { data } = await client.query({
    query: PageQuery,
    variables: {
      uri: '/portfolio/' + slug,
    },
    context: {
      uri: uri.toString(),
      fetchOptions: {
        cache: 'force-cache', // or 'no-store', depending on freshness
        next: { revalidate: 3600 },
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
      <PageContext cursor={data.entry?.cursor ? data.entry?.cursor.value : 'default'}/>
      <div className="page">
        <Repeater blocks={data.entry?.components} meta={pagemeta} />
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd_WebPage) }}
      />
    </>
  )
}
