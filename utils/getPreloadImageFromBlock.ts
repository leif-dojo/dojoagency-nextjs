// lib/blocks/getPreloadImageFromBlock.ts

type ImageLike = {
    path?: string;
    [key: string]: any;
};

type Block = {
    __typename: string;
    [key: string]: any;
};

export function getPreloadImageFromBlock(block: Block): ImageLike | undefined {
    if (!block) return;

    switch (block.__typename) {
        case 'Set_Components_HeroImage':
            return block.hero_image_image;
        case 'Set_Components_HomeHero':
            return block.home_hero_slides?.[0]?.image;
        // Add more as needed
        default:
            return undefined;
    }
}
