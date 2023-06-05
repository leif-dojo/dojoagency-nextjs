import { gql } from '@apollo/client'

export default gql`
  fragment CMSAsset on Asset_Assets {
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
`
