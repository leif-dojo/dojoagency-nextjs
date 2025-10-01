import { NextResponse } from 'next/server'

export async function GET() {
  const baseUrl = 'https://www.dojoagency.com'

  const types = ['pages', 'projects', 'blog']
  const sitemaps = types.map((type) => {
    return `
      <sitemap>
        <loc>${baseUrl}/${type}/sitemap.xml</loc>
      </sitemap>
    `
  }).join('')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
  <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${sitemaps}
  </sitemapindex>`

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
