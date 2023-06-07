//'use client'
import { getClient } from "@/lib/client"
import React from 'react'
import ProjectQuery from '@/queries/project'
import Repeater from '@/utils/rendering/repeater'
import { notFound } from "next/navigation"
import Arrow from '@/public/icons/icon-triangle.svg'

export default async function Page(context: { params: { slug: string } }) {
  // const { color, setColor} = useThemeContext();
  const client = getClient();

  const { data } = await client.query({
    query: ProjectQuery, 
    variables: {
      slug: context.params.slug,
    }
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
        <a href={`/portfolio/`} className="inline-flex mr-auto text-blue" aria-label="Previous"><Arrow className={`w-30 h-auto rotate-180`}/><span className="font-nothingyoucoulddo text-40 font-400 text-blue pl-20">Previous</span></a>
      </div>
      <div className='flex w-1/2 justify-items-end'>
        <a  href={`/portfolio/`} className="inline-flex ml-auto text-blue" aria-label="Next"> <span className="font-nothingyoucoulddo text-40 font-400 text-blue pr-20">Next</span> <Arrow className={`w-30 h-auto`}/></a>
      </div>
    </div>
  </div>
  )
}
