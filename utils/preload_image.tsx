// components/preload_image.tsx
const PreloadImage = ({ image }: { image?: any }) => {
    if (!image?.path) return null;

    const sizes = [400, 640, 768, 960, 1024, 1280, 1440, 1600, 1920]
    const quality = 70
    const format = 'webp'
    const fixedPath = image.path.replace(/ /g, '%20');
    const baseUrl = process.env.NEXT_PUBLIC_MEDIA_URL;

    return (
        <>
            {sizes.map((size) => (
                <link
                    key={size}
                    rel="preload"
                    as="image"
                    href={`${baseUrl}media/${fixedPath}?w=${size}&fm=${format}&q=${quality}`}
                    type="image/webp"
                    crossOrigin="anonymous"
                />
            ))}
        </>
    );
};

export default PreloadImage;
