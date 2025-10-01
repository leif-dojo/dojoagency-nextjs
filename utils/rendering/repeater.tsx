import dynamic from "next/dynamic";
//import Script from "next/script";
//import PreloadImage from '@/utils/preload_image'
//import { getPreloadImageFromBlock } from "../getPreloadImageFromBlock";

interface BlockInterface {
  __typename: string;
  [key: string]: any;
}

// Dynamic import map for block components
const componentMap: Record<string, any> = {
  Set_Components_HomeHero: dynamic(() => import("@/components/blocks/home_hero/home_hero")),
  Set_Components_HomeHeadline: dynamic(() => import("@/components/blocks/home_headline/home_headline")),
  Set_Components_HomeFeaturedWork: dynamic(() => import("@/components/blocks/home_featured_work/home_featured_work")),
  Set_Components_HomePartners: dynamic(() => import("@/components/blocks/home_partners/home_partners")),
  Set_Components_Home3Column: dynamic(() => import("@/components/blocks/home_3_column/home_3_column")),
  Set_Components_2ColumnImage: dynamic(() => import("@/components/blocks/2_column_image/2_column_image")),
  Set_Components_2ColumnVideo: dynamic(() => import("@/components/blocks/2_column_video/2_column_video")),
  Set_Components_FeaturedWork: dynamic(() => import("@/components/blocks/featured_work/featured_work")),
  Set_Components_GalleryHorizontal: dynamic(() => import("@/components/blocks/gallery_horizontal/gallery_horizontal")),
  Set_Components_Image: dynamic(() => import("@/components/blocks/image/image")),
  Set_Components_Timeline: dynamic(() => import("@/components/blocks/timeline/timeline")),
  Set_Components_Video: dynamic(() => import("@/components/blocks/video/video")),
  Set_Components_Wysiwyg: dynamic(() => import("@/components/blocks/wysiwyg/wysiwyg")),
  Set_Components_Headline: dynamic(() => import("@/components/blocks/headline/headline")),
  Set_Components_HeadlineHero: dynamic(() => import("@/components/blocks/headline_hero/headline_hero")),
  Set_Components_TextScroller: dynamic(() => import("@/components/blocks/text_scroller/text_scroller")),
  Set_Components_ImageGrid: dynamic(() => import("@/components/blocks/image_grid/image_grid")),
  Set_Components_TeamGrid: dynamic(() => import("@/components/blocks/team_grid/team_grid")),
  Set_Components_PostNavigation: dynamic(() => import("@/components/blocks/post_navigation/post_navigation")),
  Set_Components_ProjectGrid: dynamic(() => import("@/components/blocks/project_grid/project_grid")),
  Set_Components_ScrollDown: dynamic(() => import("@/components/blocks/scroll_down/scroll_down")),
  Set_Components_BlogGrid: dynamic(() => import("@/components/blocks/blog_grid/blog_grid")),
};

const Repeater = ({
  blocks,
  meta,
  entries,
}: {
  blocks: BlockInterface[];
  meta?: any;
  entries?: any;
}) => {
  return (
    <>
      {blocks?.map((block, index) => {
        if (!block) {
          return (
            <div key={`invalid-${index}`}>
              Block: {block} : not found
            </div>
          );
        }

        const Component = componentMap[block.__typename];
        if (!Component) {
          return (
            <div key={`unknown-${index}`}>
              Unknown block type: {block.__typename}
            </div>
          );
        }

        const extraProps =
          block.__typename === "Set_Components_HeadlineHero"
            ? { meta }
            : block.__typename === "Set_Components_BlogGrid"
            ? { entries }
            : {};

        return (
          <Component
            key={block.id || `${block.__typename}-${index}`}
            block={block}
            {...extraProps}
          />
        );
      })}
    </>
  );
};

export default Repeater;
