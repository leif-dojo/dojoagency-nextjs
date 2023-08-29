import { gql } from '@apollo/client'

export const GlobalMetaQuery = gql`
query GlobalQuery {
  globalmeta: globalSet(handle: "global") {
    ... on GlobalSet_Global {
      handle
      facebook_url
      instagram_url
      linkedin_url
      meta_description
      meta_title
      open_graph_image {
        ... on Asset_Assets {
          permalink
          width
          height
          extension
        }
      }
    }
  }
}
`

export default gql`
query GlobalQuery {
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
      step_1_video_embed
      step_1_video_local {
        ... on Asset_Assets {
          id
          permalink
          is_video
          width
          height
          extension
        }
      }
      step_1_image {
        ... on Asset_Assets {
          id
          permalink
          is_video
          width
          height
          extension
        }
      }
      step_2_video_embed
      step_2_video_local {
        ... on Asset_Assets {
          id
          permalink
          is_video
          width
          height
          extension
        }
      }
      step_2_image {
        ... on Asset_Assets {
          id
          permalink
          is_video
          width
          height
          extension
        }
      }
      step_3_video_embed
      step_3_video_local {
        ... on Asset_Assets {
          id
          permalink
          is_video
          width
          height
          extension
        }
      }
      step_3_image {
        ... on Asset_Assets {
          id
          permalink
          is_video
          width
          height
          extension
        }
      }
      step_4_video_embed
      step_4_video_local {
        ... on Asset_Assets {
          id
          permalink
          is_video
          width
          height
          extension
        }
      }
      step_4_image {
        ... on Asset_Assets {
          id
          permalink
          is_video
          width
          height
          extension
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
  consent: globalSet(handle: "global") {
    ... on GlobalSet_Global {
      handle
      consent_headline
      consent_copy
    }
  }
}
`
