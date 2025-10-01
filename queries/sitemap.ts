import { gql } from '@apollo/client'

export const pagesSitemap = gql`
query pagesSitemap {
  entries(collection: "pages") {
    data {
      url
      title
      slug
      last_modified(format: "c")
    }
  }
}
`

export const blogSitemap = gql`
query blogSitemap {
  entries(collection: "blog") {
    data {
      url
      title
      slug
      last_modified(format: "c")
    }
  }
}
`

export const projectSitemap = gql`
query projectSitemap {
  entries(collection: "projects") {
    data {
      url
      title
      slug
      last_modified(format: "c")
    }
  }
}
`

export default gql`
query sitemap {
  pages: entries(collection: "pages", sort: "title") {
    data {
      id
      url
      title
      slug
      last_modified(format: "c")
    }
  }
  blog: entries(collection: "blog", sort: "title") {
    data {
      id
      title
      slug
      last_modified(format: "c")
    }
  }
  projects: entries(collection: "projects", sort: "title") {
    data {
      id
      title
      slug
      last_modified(format: "c")
    }
  }
}

`