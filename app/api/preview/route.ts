import { getClient } from "@/lib/client"
import React from 'react'
import PageQuery from '@/queries/page'

// route handler with secret and slug
import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
 
export async function GET(request: Request) {
  console.log("API: ", request.url)
  // Parse query string parameters
  const { searchParams } = new URL(request.url)
  //const secret = searchParams.get('secret')
  const slug = searchParams.get('uri')
  const token = searchParams.get('token')
  const livepreview = searchParams.get('live-preview')
 
  // Check the secret and next parameters
  // This secret should only be known to this route handler and the CMS
  /*if (secret !== 'MY_SECRET_TOKEN' || !slug) {
    return new Response('Invalid token', { status: 401 })
  }*/
 
  // If the slug doesn't exist prevent draft mode from being enabled
  if (!slug) {
    return new Response('Invalid slug', { status: 401 })
  }
  // Enable Draft Mode by setting the cookie
  draftMode().enable()
 
  // Redirect to the path from the fetched post
  // We don't redirect to searchParams.slug as that might lead to open redirect vulnerabilities

  const res = slug+'?livepreview='+livepreview+'&token='+token;
  
  console.log("API redirect: ", slug, token, livepreview, res)
  redirect(res)
}