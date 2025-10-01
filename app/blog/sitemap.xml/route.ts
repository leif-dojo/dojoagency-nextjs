import { NextResponse } from 'next/server'
import { getClient } from "@/lib/client";
import { blogSitemap } from '@/queries/sitemap'

export async function GET(req: Request, { params }: { params: { type: string } }) {

    const client = getClient();
    const { data } = await client.query({
      query: blogSitemap,
    });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${data.entries.data.map((entry) => `
    <url>
      <loc>https://www.dojoagency.com${entry.url}</loc>
      <lastmod>${entry.last_modified}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.7</priority>
    </url>`).join('')}
  </urlset>`

  return new NextResponse(xml, {
    headers: { 'Content-Type': 'application/xml' },
  })
}
