import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/',
    },
    sitemap: [
      'https://www.dojoagency.com/sitemap.xml',
      'https://www.dojoagency.com/pages/sitemap.xml', 
      'https://www.dojoagency.com/blog/sitemap.xml'
    ]
  }
}