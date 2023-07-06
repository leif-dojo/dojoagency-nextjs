import { gql } from '@apollo/client'

export const BlogLandingMetaQuery = gql`
  query pagemeta {
    entry(collection: "pages", uri: "/blog") {
      ... on Entry_Pages_Page {
        id
        published
        slug
        status
        private
        title
        uri
        url
        meta_title
        meta_description
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
  query bloglanding {
    entry(collection: "pages", uri: "/blog") {
      id
      __typename
      title
      slug
      uri
      ... on Entry_Pages_Page {
        id
        published
        slug
        status
        private
        title
        uri
        url
        components {
          ... on Set_Components_HomeHero {
            __typename
            background_color
            text_color
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
            video_popup_local {
              ... on Asset_Assets {
                id
                permalink
                is_video
                width
                height
                extension
              }
            }
            video_play_text
          }
          ... on Set_Components_HomeHeadline {
            __typename
            background_color
            text_color
            headline
            subheadline
            type
          }
          ... on Set_Components_HomePartners {
            __typename
            background_color
            text_color
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
                  client_logo_dark {
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
            __typename
            background_color
            text_color
            headline
            type
            featured_projects {
              headline
              headline_hover
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
              video_embed
              video_embed_hover
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
              video_local_hover {
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
          ... on Set_Components_Home3Column {
            __typename
            background_color
            text_color
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
              link
            }
          }
          ... on Set_Components_FeaturedWork {
            __typename
            background_color
            text_color
            headline
            type
            grid_style {
              value
              label
            }
            featured_projects {
              headline
              headline_hover
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
              video_embed
              video_embed_hover
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
              video_local_hover {
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
          ... on Set_Components_2ColumnImage {
            __typename
            background_color
            text_color
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
            wysiwyg_sub
          }
          ... on Set_Components_2ColumnVideo {
            __typename
            background_color
            text_color
            eyebrow
            headline
            video_embed
            type
            wysiwyg
            wysiwyg_sub
            image {
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
            video_local_popup {
              ... on Asset_Assets {
                id
                permalink
                is_video
                width
                height
                extension
              }
            }
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
            video_play_text
          }
          ... on Set_Components_GalleryHorizontal {
            __typename
            background_color
            text_color
            headline
            type
            gallery_grid {
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
              headline
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
            }
          }
          ... on Set_Components_Timeline {
            __typename
            background_color
            text_color
            eyebrow
            headline
            wysiwyg
            type
            timeline {
              color
              headline
              image {
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
              logo {
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
              year
              overview
            }
          }
          ... on Set_Components_Video {
            __typename
            background_color
            text_color
            video_embed
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
            video_popup_embed
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
            video_local_popup {
              ... on Asset_Assets {
                id
                permalink
                is_video
                width
                height
                extension
              }
            }
            video_play_text
          }
          ... on Set_Components_Wysiwyg {
            __typename
            background_color
            text_color
            type
            eyebrow
            headline
            wysiwyg_set: wysiwyg {
              ... on BardText {
                text
                type
              }
              ... on Set_Wysiwyg_2Column {
                wysiwyg
                type
                order {
                  value
                  label
                }
                image {
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
              ... on Set_Wysiwyg_Image {
                image {
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
              ... on Set_Wysiwyg_Quote {
                quote
                quote_author
                type
              }
              ... on Set_Wysiwyg_VideoEmbed {
                video_embed
                type
              }
              ... on Set_Wysiwyg_PdfDownload {
                type
                pdf_text
                pdf {
                  ... on Asset_Assets {
                    id
                    alt
                    url
                    path
                    permalink
                    extension
                  }
                }
              }
              ... on Set_Wysiwyg_AudioFile {
                type
                audio_file {
                  ... on Asset_Assets {
                    id
                    alt
                    url
                    path
                    permalink
                    extension
                  }
                }
              }
            }
          }
          ... on Set_Components_Image {
            __typename
            background_color
            text_color
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
            __typename
            background_color
            text_color
            eyebrow
            headline
            type
          }
          ... on Set_Components_HeadlineHero {
            __typename
            background_color
            text_color
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
            eyebrow
            sharing_title
            show_sharing
          }
          ... on Set_Components_TextScroller {
            __typename
            background_color
            text_color
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
          }
          ... on Set_Components_ImageGrid {
            __typename
            background_color
            text_color
            image_grid {
              link
              image_headline
              image_headline_hover
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
              video_embed
              video_embed_hover
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
              video_local_hover {
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
          ... on Set_Components_PostNavigation {
            __typename
            background_color
            text_color
            back_link
            back_link_copy
            forward_link
            forward_link_copy
            type
          }
          ... on Set_Components_ProjectGrid {
            __typename
            background_color
            text_color
            type
            wysiwyg
            eyebrow
            headline
            project_grid {
              popup_headline
              popup_image {
                ... on Asset_Assets {
                  id
                  permalink
                  is_video
                  width
                  height
                  extension
                }
              }
              popup_wysiwyg
              project_description
              project_entry {
                ... on Entry_Projects_Project {
                  id
                }
              }
              project_image {
                ... on Asset_Assets {
                  id
                  permalink
                  is_video
                  width
                  height
                  extension
                }
              }
              project_title
              popup_video_embed
              popup_video_local {
                ... on Asset_Assets {
                  id
                  permalink
                  is_video
                  width
                  height
                  extension
                }
              }
              popup_video_play_text
              project_video_embed
              project_video_local {
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
          ... on Set_Components_TeamGrid {
            __typename
            background_color
            text_color
            eyebrow
            headline
            wysiwyg
            type
            team_grid {
              ... on Entry_Team_Team {
                id
                name
                bio
                job_title
                profile_image {
                  ... on Asset_Assets {
                    id
                    permalink
                    is_video
                    width
                    height
                    extension
                  }
                }
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
                title
              }
            }
          }
          ... on Set_Components_ScrollDown {
            type
          }
          ... on Set_Components_BlogGrid {
            __typename
            background_color
            text_color
            eyebrow
            headline
            type
          }
        }
      }
    }
    entries(collection: "blog", sort: "date desc") {
      from
      to
      total
      per_page
      last_page
      has_more_pages
      current_page
      data {
        ... on Entry_Blog_Blog {
          id
          author {
            id
          }
          date(format: "F jS, Y")
          featured_image {
            ... on Asset_Assets {
              id
              permalink
              is_video
              width
              height
              extension
            }
          }
          last_modified
          permalink
          private
          published
          slug
          status
          title
          uri
          excerpt
        }
      }
    }
  }
`
