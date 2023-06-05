//'use client'
import { getClient, clientNoCache } from "@/lib/client"
import React from 'react'
import PageQuery from '@/queries/page'
import { useThemeContext } from '@/context/theme'
import { ApolloClient, InMemoryCache, HttpLink, from, useQuery } from "@apollo/client"
import dynamic from 'next/dynamic'
import Repeater from '@/utils/rendering/repeater'
import { notFound } from "next/navigation"
import Image from 'next/image'
import Arrow from '@/public/icons/icon-triangle.svg'

/*const componentList = {
  Set_Components_HomeHero: dynamic(() => import(`@/components/blocks/home_hero/home_hero`)),
  Set_Components_HomeHeadline: dynamic(() => import(`@/components/blocks/home_headline/home_headline`))
}*/

export default async function Page(context: { params: { slug: string } }) {
  // const { color, setColor} = useThemeContext();
  const client = getClient();
console.log("PAGE: ", context.params)
  const { data } = await client.query({
    query: PageQuery, 
    variables: {
      uri: '/portfolio/'+context.params.slug,
    }
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
  <div className="page bg-white pt-80">
    <Repeater blocks={data.entry?.components} />

    <div className='container w-full flex flex-nowrap mx-auto py-40'>
      <div className='flex w-1/2 justify-items-start'>
        <a href={`/portfolio/`} className="inline-flex mr-auto" aria-label="Previous"><Arrow className="rotate-180"/><span className="font-nothingyoucoulddo text-40 font-400 text-blue pl-20">Portfolio</span></a>
      </div>
      <div className='flex w-1/2 justify-items-end'>
        
      </div>
    </div>
  </div>
  )
}
