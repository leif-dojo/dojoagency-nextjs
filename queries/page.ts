import { gql } from '@apollo/client'

export default gql`
  query page($uri: String) {
    entry(collection: "pages", uri: $uri) {
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
          }
          ... on Set_Components_GalleryHorizontal {
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
          }
          ... on Set_Components_Wysiwyg {
            wysiwyg
            type
            eyebrow
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
            eyebrow
            headline
            type
          }
          ... on Set_Components_HeadlineHero {
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
            back_link
            back_link_copy
            forward_link
            forward_link_copy
            type
          }
          ... on Set_Components_ProjectGrid {
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
            }
          }
          ... on Set_Components_TeamGrid {
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
        }
      }
    }
  }
`
