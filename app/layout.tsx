import './globals.css'
import '@/styles/globals.scss'
import React, { Suspense } from "react";
import { Metadata, ResolvingMetadata } from 'next'
import Script from 'next/script'
import localFont from 'next/font/local'
import { Lato } from 'next/font/google'
import { getClient } from "@/lib/client";
import GlobalQuery from '@/queries/global'
import { GlobalMetaQuery } from '@/queries/global'
import { ThemeContextProvider } from '@/context/theme'
import Header from '@/components/generic/header/header'
import Footer from '@/components/generic/footer/footer'
import ContactForm from '@/components/generic/contact_form/contact_form'
import MouseCursor from "@/components/generic/mouse_cursor/mouse_cursor";
import { PageTransition } from '@/components/generic/page_transition/page_transition'
import Loading from "./loading";
import { jsonLd_LocalBusiness, jsonLd_WebSite } from '@/utils/schema'

const lato = Lato({
  weight: ['100', '300', '400', '700', '900'],
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
const americantypewriter = localFont({
  src: [
    {
      path: '../public/fonts/AmericanTypewriter/AmericanTypewriter-Condensed.woff2',
      weight: '500',
      style: 'normal'
    }
  ],
  variable: '--font-americantypewriter'
});

type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent?: ResolvingMetadata
): Promise<Metadata> {
  const client = getClient();
  const { data } = await client.query({ query: GlobalMetaQuery });
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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const client = getClient();
  const { data } = await client.query({ query: GlobalQuery });
  return (
    <html lang="en">
      <head />
      <Script id="gtm" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${process.env.GTM_ID}');`}}></Script>
      <body className={`${lato.variable} ${nothingyoucoulddo.variable} ${americantypewriter.variable} font-lato`} suppressHydrationWarning={true}>
      <noscript dangerouslySetInnerHTML={{ __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${process.env.GTM_ID}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`}}></noscript>
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
      </body>
    </html>
  )
}




