import React, { useState } from 'react';
import './ResponsivePicture.scss';

type StandardImageConfig = { src: string; alt: string };

export type ResponsivePictureProps = {
    /** src and alt for the standard image for all screen sizes (could be a fallback img). */
    standardImgForAllScreensConfig: StandardImageConfig;
    /** srcset for desktop images (from firstMediaMinWidth to infinity).
     *  (eg: 'https://example.com/image.jpg 800w, https://example.com/image.jpg, 1024w')
     *  OR could be a file path.
     */
    desktopImgSrcset: string;
    /** srcset for mobile images (from 0px to firstMediaMinWidth - 1)
     *  (eg: 'https://example.com/image.jpg 800w, https://example.com/image.jpg, 1024w')
     *  OR could be a file path.
     */
    mobileImgSrcset: string;
    /** min-width for the first media query from where the desktopImgSrcset will be used (default: 1024px) */
    firstMediaMinWidth?: number;
    /** enable lazy loading (default: true) */
    lazy?: boolean;
    /** Fallback element if the picture tag fails to load. Ideally, this should be a placeholder image */
    fallback: React.ReactNode;
    /** Additional CSS class names for wrapper div */
    className?: string;
};

const DEFAULT_FIRST_MIN_WIDTH = 1024;

/**
 * ResponsivePicture component for displaying responsive images.
 * @param standardImgForAllScreensConfig - Src and alt for the standard image for all screen sizes (not a fallback).
 * @param desktopImgSrcset - Srcset for desktop images (from firstMediaMinWidth to infinity)
 * (eg: 'https://example.com/image.jpg 1200w, https://example.com/image.jpg, 1400w') OR could be file path.
 * @param mobileImgSrcset - Srcset for mobile images (from 0px to firstMediaMinWidth - 1).
 * (eg: 'https://example.com/image.jpg 800w, https://example.com/image.jpg, 1024w') OR could be file path.
 * @param firstMediaMinWidth - (optional) Min-width for the first media query from where the desktopImgSrcset will be used (default: 1024px).
 * @param lazy - (optional) Enable lazy loading (default: true).
 * @param fallback - Fallback React element to render if the picture tag fails to load due to 404 etc. Ideally, this should be a placeholder image.
 * @param className - (optional) Additional CSS class names.
 */
export const ResponsivePicture: React.FC<ResponsivePictureProps> = ({
    standardImgForAllScreensConfig,
    desktopImgSrcset,
    mobileImgSrcset,
    firstMediaMinWidth,
    lazy = true,
    fallback,
    className = '',
    ...rest
}) => {
    const [hasError, setHasError] = useState<boolean>(false);

    return (
        <div className={`responsive-picture ${className}`}>
            {!hasError && (
                <picture>
                    <source
                        media={`(min-width: ${
                            firstMediaMinWidth ? firstMediaMinWidth : DEFAULT_FIRST_MIN_WIDTH
                        }px)`}
                        srcSet={desktopImgSrcset}
                    />
                    <source media="(min-width: 0px)" srcSet={mobileImgSrcset} />
                    <img
                        src={standardImgForAllScreensConfig?.src}
                        alt={standardImgForAllScreensConfig?.alt}
                        onError={() => setHasError(true)}
                        loading={lazy ? 'lazy' : undefined}
                        {...rest}
                    />
                </picture>
            )}

            {hasError && fallback}
        </div>
    );
};
