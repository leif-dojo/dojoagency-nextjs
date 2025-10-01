interface ServiceImage {
  permalink: string;
  width: number;
  height: number;
}

interface SchemaItem {
  __typename: string;
  id: string;
  service_type?: string;
  service_name?: string;
  service_description?: string;
  service_image?: ServiceImage;
  // extend as needed for other types
}

export function generateSchemas(schemas: SchemaItem[] | null): any | null {
  if (!schemas || schemas.length === 0) return null;

  const items = schemas.map((item) => {
    switch (item.__typename) {
      case 'Set_Schema_Service':
        return generateServiceSchema(item);
      default:
        return null;
    }
  }).filter(Boolean);

  if (items.length === 0) return null;

  // ✅ Single JSON-LD object representing multiple entries
  return {
    "@context": "https://schema.org",
    "@graph": items
  };
}


function generateServiceSchema(item: SchemaItem) {
  const slug = slugify(item.service_type || item.service_name || 'service');

  return {
    "@context": "http://schema.org",
    "@type": "Service",
    "@id": `https://www.dojoagency.com/service/${slug}/`,
    "url": `https://www.dojoagency.com/service/${slug}/`,
    "name": item.service_name,
    "serviceType": item.service_type,
    "description": item.service_description,
    ...(item.service_image?.permalink && {
      "image": {
        "@type": "ImageObject",
        "url": item.service_image.permalink,
        "width": item.service_image.width.toString(),
        "height": item.service_image.height.toString()
      }
    }),
    "provider": {
      "@type": "LocalBusiness",
      "name": "Dojo Agency",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "7518 North Chicago Avenue",
        "addressLocality": "Portland",
        "addressRegion": "OR",
        "postalCode": "97203",
        "addressCountry": "US"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "45.5919907",
        "longitude": "-122.7589671"
      },
      "url": "https://www.dojoagency.com",
      "telephone": "",
      "logo": "https://www.dojoagency.com/images/social_logo_wide.jpg",
      "image": "https://www.dojoagency.com/images/social_logo_1200x630.jpg",
      "hasMap": "https://goo.gl/maps/zR1BWXgrYswqhwrH8",
      "email": "info@dojoagency.com",
      "description": "Brand marketing and advertising specialists based in Portland, Oregon.",
      "openingHours": [
        "Mo 08:30-17:00",
        "Tu 08:30-17:00",
        "We 08:30-17:00",
        "Th 08:30-17:00",
        "Fr 08:30-16:00"
      ],
      "priceRange": "$$$$"
    },
    "areaServed": [
      { "@type": "Country", "name": "USA" },
      { "@type": "City", "name": "Portland", "@id": "https://en.wikipedia.org/wiki/Portland,_Oregon" }
    ]
  };
}

function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-');
}
