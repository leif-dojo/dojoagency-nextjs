import './globals.css'
import '@/styles/globals.scss'
import React, { Suspense } from "react";
import { Metadata } from 'next'
import localFont from 'next/font/local'
import { Lato } from 'next/font/google'
import { getClient } from "@/lib/client";
import GlobalQuery from '@/queries/global'
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

export const metadata: Metadata = {
  title: 'Dojo Agency',
  description: 'Brand marketing and health care advertising specialists based in Portland, Oregon.',
  viewport: 'width=device-width, initial-scale=1',
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
        </body>
      </html>
  )
}




