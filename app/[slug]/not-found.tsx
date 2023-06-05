//'use client'
import { getClient } from "@/lib/client"
import React from 'react'

export default async function PostNotFound(context: { params: { slug: string } }) {

  return (
    <div className="page pt-50">
      404
    </div>
  )
}
