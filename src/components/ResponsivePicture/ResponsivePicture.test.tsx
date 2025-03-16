import { fireEvent, render, screen, act } from '@testing-library/react';
import { ResponsivePicture } from './ResponsivePicture';

const desktopImgSrcset =
    'https://example.com/image-desktop.jpg 1200w, https://example.com/image-desktop-2.jpg 2400w';

const mobileImgSrcset =
    'https://example.com/image-mobile.jpg 600w, https://example.com/image-mobile-2.jpg 1200w';

const standardImgForAllScreensConfig = { src: 'https://example.com/image.jpg', alt: 'Art' };

const fallbackText = 'Sample Fallback';
const testId = 'responsive-picture-test';

describe('utils/ResponsivePicture', () => {
    it('should have alt and src attributes', () => {
        render(
            <ResponsivePicture
                data-testid={testId}
                standardImgForAllScreensConfig={{
                    src: standardImgForAllScreensConfig.src,
                    alt: standardImgForAllScreensConfig.alt,
                }}
                desktopImgSrcset={desktopImgSrcset}
                mobileImgSrcset={mobileImgSrcset}
                lazy={true}
                className="test-class"
                fallback={<span>{fallbackText}</span>}
            />,
        );

        const img = screen.getByRole('img');
        const wrapperElement = screen.getByTestId(testId).closest('div');

        expect(img).toHaveAttribute('src', standardImgForAllScreensConfig.src);
        expect(img).toHaveAttribute('alt', standardImgForAllScreensConfig.alt);
        expect(img).toHaveAttribute('loading', 'lazy');

        expect(screen.queryByText(fallbackText)).not.toBeInTheDocument();

        expect(wrapperElement).toHaveClass('vds-responsive-picture');
    });

    it('should override loading lazy prop', () => {
        render(
            <ResponsivePicture
                standardImgForAllScreensConfig={{
                    src: standardImgForAllScreensConfig.src,
                    alt: standardImgForAllScreensConfig.alt,
                }}
                desktopImgSrcset={desktopImgSrcset}
                mobileImgSrcset={mobileImgSrcset}
                lazy={false}
                fallback={null}
            />,
        );

        const img = screen.getByRole('img');

        expect(img).not.toHaveAttribute('loading', 'lazy');
    });

    it('should render a fallback if the picture fails to load', () => {
        render(
            <ResponsivePicture
                data-testid={testId}
                standardImgForAllScreensConfig={{
                    src: standardImgForAllScreensConfig.src,
                    alt: standardImgForAllScreensConfig.alt,
                }}
                desktopImgSrcset={desktopImgSrcset}
                mobileImgSrcset={mobileImgSrcset}
                className="test-class"
                fallback={<h1>{fallbackText}</h1>}
            />,
        );

        const picture = screen.getByRole('img');

        act(() => {
            fireEvent.error(picture);
        });

        expect(screen.getByRole('heading')).toBeInTheDocument();
        expect(screen.getByText(fallbackText)).toBeInTheDocument();
    });

    it('should use custom firstMediaMinWidth when provided', () => {
        const customFirstMediaMinWidth = 768;
        render(
            <ResponsivePicture
                standardImgForAllScreensConfig={{
                    src: standardImgForAllScreensConfig.src,
                    alt: standardImgForAllScreensConfig.alt,
                }}
                desktopImgSrcset={desktopImgSrcset}
                mobileImgSrcset={mobileImgSrcset}
                firstMediaMinWidth={customFirstMediaMinWidth}
                fallback={<span>{fallbackText}</span>}
            />,
        );

        const sources = screen.getAllByRole('img')[0].parentElement?.querySelectorAll('source');

        expect(sources).toHaveLength(2);
        expect(sources?.[0]).toHaveAttribute('media', `(min-width: ${customFirstMediaMinWidth}px)`);
        expect(sources?.[0]).toHaveAttribute('srcset', desktopImgSrcset);
        expect(sources?.[1]).toHaveAttribute('media', '(min-width: 0px)');
        expect(sources?.[1]).toHaveAttribute('srcset', mobileImgSrcset);
    });

    // it('should use default firstMediaMinWidth when not provided', () => {
    //   render(
    //     <ResponsivePicture
    //       standardImgForAllScreensConfig={{
    //         src: standardImgForAllScreensConfig.src,
    //         alt: standardImgForAllScreensConfig.alt,
    //       }}
    //       desktopImgSrcset={desktopImgSrcset}
    //       mobileImgSrcset={mobileImgSrcset}
    //       fallback={<span>{fallbackText}</span>}
    //     />,
    //   );

    //   const sources = screen.getAllByRole('img')[0].parentElement?.querySelectorAll('source');

    //   expect(sources).toHaveLength(2);
    //   expect(sources?.[0]).toHaveAttribute('media', `(min-width: 1024px)`);
    //   expect(sources?.[0]).toHaveAttribute('srcset', desktopImgSrcset);
    //   expect(sources?.[1]).toHaveAttribute('media', '(min-width: 0px)');
    //   expect(sources?.[1]).toHaveAttribute('srcset', mobileImgSrcset);
    // });
});
