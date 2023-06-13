import { gql } from '@apollo/client'

export default gql`
fragment Components on components {
  ... on Set_Components_HomeHero {
    __typename
    headline
    type
    image {
      id
      ... on Asset_Assets {
        id
        alt
        url
        width
        height
        path
        permalink
        extension
        is_image
        is_video
        is_audio
        focus_css
      }
    }
    video_embed
    video_popup_embed
  }
  ... on Set_Components_HomeHeadline {
    __typename
    headline
    subheadline
    type
  }
  ... on Set_Components_HomePartners {
    headline
    type
    partners_grid {
      client {
        ... on Entry_Clients_Client {
          id
          client_logo {
            id
            ... on Asset_Assets {
              id
              alt
              url
              width
              height
              path
              permalink
              extension
              is_image
              is_video
              is_audio
              focus_css
            }
          }
          client_name
        }
      }
      description
      fact
    }
  }
  ... on Set_Components_HomeFeaturedWork {
    headline
    type
    featured_projects {
      headline
      image {
        id
        ... on Asset_Assets {
          id
          alt
          url
          width
          height
          path
          permalink
          extension
          is_image
          is_video
          is_audio
          focus_css
        }
      }
      image_hover {
        id
        ... on Asset_Assets {
          id
          alt
          url
          width
          height
          path
          permalink
          extension
          is_image
          is_video
          is_audio
          focus_css
        }
      }
      link
    }
  }
  ... on Set_Components_Home3Column {
    type
    columns {
      content
      headline
      icon {
        id
        ... on Asset_Assets {
          id
          alt
          url
          width
          height
          path
          permalink
          extension
          is_image
          is_video
          is_audio
          focus_css
        }
      }
    }
  }
  ... on Set_Components_FeaturedWork {
    headline
    type
    featured_projects {
      ... on Entry_Projects_Project {
        id
        project_name
        project_date
        title
        slug
        featured_image {
          id
          ... on Asset_Assets {
            id
            alt
            url
            width
            height
            path
            permalink
            extension
            is_image
            is_video
            is_audio
            focus_css
          }
        }
      }
    }
  }
  ... on Set_Components_2ColumnImage {
    eyebrow
    headline
    type
    image {
      id
      ... on Asset_Assets {
        id
        alt
        url
        width
        height
        path
        permalink
        extension
        is_image
        is_video
        is_audio
        focus_css
      }
    }
    wysiwyg
  }
  ... on Set_Components_2ColumnVideo {
    eyebrow
    headline
    video_embed
    type
    wysiwyg
    image {
      id
      ... on Asset_Assets {
        id
        alt
        url
        width
        height
        path
        permalink
        extension
        is_image
        is_video
        is_audio
        focus_css
      }
    }
    video_popup_embed
  }
  ... on Set_Components_GalleryHorizontal {
    headline
    type
  }
  ... on Set_Components_Timeline {
    headline
    wysiwyg
    type
  }
  ... on Set_Components_Video {
    video_embed
    video_popup_embed
    type
    image {
      id
      ... on Asset_Assets {
        id
        alt
        url
        width
        height
        path
        permalink
        extension
        is_image
        is_video
        is_audio
        focus_css
      }
    }
  }
  ... on Set_Components_Wysiwyg {
    wysiwyg
    type
    headline
  }
  ... on Set_Components_Image {
    type
    image {
      id
      ... on Asset_Assets {
        id
        alt
        url
        width
        height
        path
        permalink
        extension
        is_image
        is_video
        is_audio
        focus_css
      }
    }
  }
  ... on Set_Components_Headline {
    headline
    type
  }
  ... on Set_Components_HeadlineClient {
    headline
    type
    client {
      ... on Entry_Clients_Client {
        id
        client_logo {
          id
          ... on Asset_Assets {
            id
            alt
            url
            width
            height
            path
            permalink
            extension
            is_image
            is_video
            is_audio
            focus_css
          }
        }
        client_name
      }
    }
  }
  ... on Set_Components_TextScroller {
    wysiwyg
    type
    background_image {
      id
      ... on Asset_Assets {
        id
        alt
        url
        width
        height
        path
        permalink
        extension
        is_image
        is_video
        is_audio
        focus_css
      }
    }
  }
  ... on Set_Components_ImageGrid {
    image_grid {
      link
      image_headline
      image {
        id
        ... on Asset_Assets {
          id
          alt
          url
          width
          height
          path
          permalink
          extension
          is_image
          is_video
          is_audio
          focus_css
        }
      }
      image_hover {
        id
        ... on Asset_Assets {
          id
          alt
          url
          width
          height
          path
          permalink
          extension
          is_image
          is_video
          is_audio
          focus_css
        }
      }
    }
  }
}
`
