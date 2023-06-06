//"use-client"
import { getClient } from "@/lib/client"
import React from 'react'
import PageQuery from '@/queries/page'
import Repeater from '@/utils/rendering/repeater'
import Image from 'next/image'
import HomeHeroBlock from "@/components/blocks/home_hero/home_hero"

export default async function Page(context: { params: { slug: string } }) {
  const client = getClient();
  const { data } = await client.query({
    query: PageQuery, 
    variables: {
      uri: '/',
    }
  });
  //console.log("page home: ", context.params.slug, data.entry?.components)
  //console.log("PAGE HOME: ", context.params)
  //console.log("page home HomeHeroBlock: ", HomeHeroBlock)
  return (
    <div className={`page pt-80`}>
      <Repeater blocks={data.entry.components} />
    </div>
  )
}
