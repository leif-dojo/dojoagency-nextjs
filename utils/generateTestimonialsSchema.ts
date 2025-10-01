export const generateTestimonialsSchema = (testimonials: any[]) => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  "itemListElement": testimonials.map((t, i) => ({
    "@type": "Review",
    "author": {
      "@type": "Person",
      "name": t.title || "Anonymous"
    },
    "reviewBody": t.testimonial,
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": t.rating || 5,
      "bestRating": 5,
      "worstRating": 1
    },
    "itemReviewed": {
      "@type": "Organization",
      "name": "Van Specialties"
    },
    "position": i + 1
  }))
});
