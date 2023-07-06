import './globals.css'
import '@/styles/globals.scss'
import React, { Suspense } from "react";
import { Metadata, ResolvingMetadata } from 'next'
import localFont from 'next/font/local'
import { Lato } from 'next/font/google'
import { getClient } from "@/lib/client";
import GlobalQuery from '@/queries/global'
import {GlobalMetaQuery} from '@/queries/global'
import { ThemeContextProvider } from '@/context/theme'
import Header from '@/components/generic/header/header'
import Footer from '@/components/generic/footer/footer'
import ContactForm from '@/components/generic/contact_form/contact_form'
import MouseCursor from "@/components/generic/mouse_cursor/mouse_cursor";
import { PageTransition } from '@/components/generic/page_transition/page_transition'
import Loading from "./loading";

const lato = Lato({
  weight: ['100','300','400','700','900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lato',
});
const nothingyoucoulddo = localFont({
  src: [
    {
      path: '../public/fonts/NothingYouCouldDo/NothingYouCouldDo.woff2',
      weight: '400',
      style: 'normal'
    }
  ],
  variable: '--font-nothingyoucoulddo'
});

/*export const metadata: Metadata = {
  title: 'Dojo Agency',
  description: 'Brand marketing and health care advertising specialists based in Portland, Oregon.',
  viewport: 'width=device-width, initial-scale=1',
}*/

type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}
 
export async function generateMetadata(
  { params, searchParams }: Props,
  parent?: ResolvingMetadata
): Promise<Metadata> {
  const client = getClient();
  const { data } = await client.query({query: GlobalMetaQuery});
  return {
    title: data.globalmeta.meta_title,
    description: data.globalmeta.meta_description,
    metadataBase: new URL('https://www.dojoagency.com'),
    openGraph: {
      siteName: 'Dojo Agency',
      url: 'https://www.dojoagency.com',
      title: data.globalmeta.meta_title,
      description: data.globalmeta.meta_description,
      images: [
        {
          url: data.globalmeta.open_graph_image?.permalink,
          width: data.globalmeta.open_graph_image?.width,
          height: data.globalmeta.open_graph_image?.height
        }
      ],
      locale: 'en_US',
      type: 'website',
    }
  }
}

const jsonLd_LocalBusiness = {
  "@context": "http://schema.org",
  "@type": "LocalBusiness",
  "name": "Dojo Agency",
  "legalName": "Dojo Agency",
  "address": {
      "@type": "PostalAddress",
      "streetAddress": "7518 N Chicago Ave",
      "addressLocality": "Portland",
      "addressRegion": "OR",
      "postalCode":"97203",
      "addressCountry":"US"
  },
  "geo": {
      "@type": "GeoCoordinates",
      "latitude": "45.5920665",
      "longitude": "-122.7547016"
  },
  "url": "https://www.dojoagency.com/",
  "telephone": "5037060509",
  "logo": "https://www.dojoagency.com/images/social_logo_wide.jpg",
  "image": "https://www.dojoagency.com/images/social_logo_1200x630.jpg",
  "hasMap": "",
  "email": "jeff@dojoagency.com",
  "description": "Brand marketing and health care advertising specialists based in Portland, Oregon.",
  "openingHours": "Mo, Tu, We, Th, Fr, Sa",	
  "priceRange": "$$$$",
  "sameAs" : [ 
      "https://www.linkedin.com/company/DojoAgency",
      "https://www.instagram.com/dojoagency/"
  ]
}
const jsonLd_WebSite = {
  "@context": "http://schema.org", 
  "@type": "WebSite", 
  "url": "https://www.dojoagency.com/", 
  "name": "Dojo Agency",
  "description": "Brand marketing and health care advertising specialists based in Portland, Oregon." 
}	
const jsonLd_WebPage = {
  "@context": "http://schema.org", 
  "@type": "WebPage",  
  "name": "Dojo Agency",
  "url": "https://www.dojoagency.com/",
  "description": "Brand marketing and health care advertising specialists based in Portland, Oregon.",
  "mainEntity": {
      "@type": "Article",
      "@id": "",
      "author": "Dojo Agency",
      "datePublished": "2023-01-01",
      "dateModified": "2023-01-01",
      "mainEntityOfPage": "",
      "headline": "Brand and Campaign Results",
      "image": {
          "@type": "imageObject",
          "url": "https://www.dojoagency.com/images/social_logo_1200x630.jpg",
          "height": "630",
          "width": "1200"
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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const client = getClient();
  const { data } = await client.query({query: GlobalQuery});
  return (
      <html lang="en">
        <head />
        <body className={`${lato.variable} ${nothingyoucoulddo.variable} font-lato`}>
          <main className='main pt-100'>
            <ThemeContextProvider>
              <MouseCursor />
              <ContactForm data={data.footer} />
              <Header nav={data.header_nav} />
              <Suspense fallback={<Loading />}><PageTransition>{children}</PageTransition></Suspense>
              <Footer footer={data.footer} footer_nav={data.footer_nav} />
            </ThemeContextProvider>
          </main>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd_LocalBusiness) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd_WebSite) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd_WebPage) }}
          />
        </body>
      </html>
  )
}




