//'use client'
import React from 'react'
import blockInventory from './inventory'
import dynamic from 'next/dynamic'

import HomeHeroBlock from "@/components/blocks/home_hero/home_hero"
import HomeHeadlineBlock from "@/components/blocks/home_headline/home_headline"
import HomeFeaturedWorkBlock from "@/components/blocks/home_featured_work/home_featured_work"
import HomePartnersBlock from "@/components/blocks/home_partners/home_partners"
import Home3ColumnBlock from "@/components/blocks/home_3_column/home_3_column"
import Column2ImageBlock from "@/components/blocks/2_column_image/2_column_image"
import Column2VideoBlock from "@/components/blocks/2_column_video/2_column_video"
import FeaturedWorkBlock from "@/components/blocks/featured_work/featured_work"
import GalleryHorizontalBlock from "@/components/blocks/gallery_horizontal/gallery_horizontal"
import ImageBlock from "@/components/blocks/image/image"
import TimelineBlock from "@/components/blocks/timeline/timeline"
import VideoBlock from "@/components/blocks/video/video"
import WysiwygBlock from "@/components/blocks/wysiwyg/wysiwyg"
import HeadlineBlock from "@/components/blocks/headline/headline"
import HeadlineHeroBlock from "@/components/blocks/headline_hero/headline_hero"
import TextScrollerBlock from "@/components/blocks/text_scroller/text_scroller"
import ImageGridBlock from "@/components/blocks/image_grid/image_grid"
import TeamGridBlock from "@/components/blocks/team_grid/team_grid"
import PostNavigationBlock from "@/components/blocks/post_navigation/post_navigation"
import ProjectGridBlock from "@/components/blocks/project_grid/project_grid"
import ScrollDownBlock from "@/components/blocks/scroll_down/scroll_down"
import BlogGridBlock from "@/components/blocks/blog_grid/blog_grid"

//TODO OPTIMIZE 
//const HomeHeroBlock = dynamic(() => import(`@/components/blocks/home_hero/home_hero`)),
//const HomeHeadlineBlock = dynamic(() => import(`@/components/blocks/home_headline/home_headline`))

interface BlockInterface {
  __typename: string
  [key: string]: any
}

const Repeater = ({ blocks, meta, entries }: { blocks: BlockInterface[], meta?: any, entries: any }) => (
  <>
    {blocks?.map((block, index) => {
      const blockItem = Object.values(blockInventory).find(
        (b) => b.typename === block.__typename,
      )
      //console.log("repeater loop: ", block.__typename)
      if (block) {
        //console.log("repeater block: ", block.__typename)
        return (
          (() => {
            switch (block.__typename) {
              case 'Set_Components_HomeHero':
                return <HomeHeroBlock block={block} ></HomeHeroBlock>;
              case 'Set_Components_HomeHeadline':
                return <HomeHeadlineBlock block={block} ></HomeHeadlineBlock>;
              case 'Set_Components_HomeFeaturedWork':
                return <HomeFeaturedWorkBlock block={block} ></HomeFeaturedWorkBlock>;
              case 'Set_Components_HomePartners':
                return <HomePartnersBlock block={block} ></HomePartnersBlock>;
              case 'Set_Components_Home3Column':
                return <Home3ColumnBlock block={block} ></Home3ColumnBlock>;
              case 'Set_Components_FeaturedWork':
                return <FeaturedWorkBlock block={block} ></FeaturedWorkBlock>;
              case 'Set_Components_2ColumnImage':
                return <Column2ImageBlock block={block} ></Column2ImageBlock>;
              case 'Set_Components_2ColumnVideo':
                return <Column2VideoBlock block={block} ></Column2VideoBlock>;
              case 'Set_Components_GalleryHorizontal':
                return <GalleryHorizontalBlock block={block} ></GalleryHorizontalBlock>;
              case 'Set_Components_Timeline':
                return <TimelineBlock block={block} ></TimelineBlock>;
              case 'Set_Components_Video':
                return <VideoBlock block={block} ></VideoBlock>;
              case 'Set_Components_Wysiwyg':
                return <WysiwygBlock block={block} ></WysiwygBlock>;
              case 'Set_Components_Image':
                return <ImageBlock block={block} ></ImageBlock>;
              case 'Set_Components_Headline':
                return <HeadlineBlock block={block} ></HeadlineBlock>;
              case 'Set_Components_HeadlineHero':
                return <HeadlineHeroBlock block={block} meta={meta}></HeadlineHeroBlock>;
              case 'Set_Components_TextScroller':
                return <TextScrollerBlock block={block} ></TextScrollerBlock>;
              case 'Set_Components_ImageGrid':
                return <ImageGridBlock block={block} ></ImageGridBlock>;
              case 'Set_Components_PostNavigation':
                return <PostNavigationBlock block={block} ></PostNavigationBlock>;
              case 'Set_Components_ProjectGrid':
                return <ProjectGridBlock block={block} ></ProjectGridBlock>;
              case 'Set_Components_TeamGrid':
                return <TeamGridBlock block={block} ></TeamGridBlock>;
              case 'Set_Components_ScrollDown':
                return <ScrollDownBlock block={block} ></ScrollDownBlock>;
                case 'Set_Components_BlogGrid':
                  return <BlogGridBlock block={block} entries={entries} ></BlogGridBlock>;
            }
          })()
        )
        /*return React.createElement(
          blockItem.component,
          // typescript doesnt want the props in the same way I want them to be
          // there is probably a better solution than any tho
          {
            block: { ...block, id: `block_${block.__typename}__${index}` },
            key: `block_${block.__typename}__${index}`,
          } as any,
          null,
        )*/
      }
      return (
        <div>
          Block:
          {block}
          : not found
        </div>
      )
    })}
  </>
)

export default Repeater
