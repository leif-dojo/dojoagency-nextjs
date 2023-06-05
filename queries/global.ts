import { gql } from '@apollo/client'

export default gql`
query GlobalQuery {
  global: globalSet(handle: "global") {
    ... on GlobalSet_Global {
      google_analytics_id
    }
  }
  footer: globalSet(handle: "footer") {
    ... on GlobalSet_Footer {
      address
      copyright
      video_embed
      video_local {
        ... on Asset_Assets {
          id
          permalink
          is_video
          width
          height
          extension
        }
      }
      form_cta
      socials {
        ... on Set_Socials_Linkedin {
          url
          type
        }
        ... on Set_Socials_Instagram {
          url
          type
        }
      }
    }
  }
  header_nav: nav(handle: "header_nav") {
    handle
    title
    max_depth
    tree {
      page {
        id
        url
        entry_id
        title
      }
      children {
        page {
          entry_id
          id
          title
          url
        }
        depth
      }
      depth
    }
  }
  footer_nav: nav(handle: "footer_nav") {
    handle
    title
    max_depth
    tree {
      page {
        id
        url
        entry_id
        title
      }
      children {
        page {
          entry_id
          id
          title
          url
        }
        depth
      }
      depth
    }
  }
}
`
