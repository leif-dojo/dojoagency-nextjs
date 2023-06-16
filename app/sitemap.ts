import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://www.dojoagency.com',
      lastModified: new Date(),
    },
  ]
}