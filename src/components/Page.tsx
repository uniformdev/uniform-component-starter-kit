import { FC, ElementType, Fragment } from 'react';
import classNames from 'classnames';
import { UniformComposition, UniformSlot } from '@uniformdev/canvas-react';
import type { RootComponentInstance } from '@uniformdev/canvas';
import { HeroVariant } from '../canvas/Hero';
import UniformPreviewIcon from './UniformPreviewIcon';
import ThemeProvider from './ThemeProvider';
import Container from './Container';
import { PaddingSize } from '../utilities/styling';

export type PageProps = {
  preview: boolean;
  useUniformComposition?: boolean;
  data: RootComponentInstance;
  providers: ElementType;
  skipContainerWrappersList?: string[];
};

const Page: FC<PageProps> = ({
  data: composition,
  useUniformComposition,
  preview,
  providers: Providers = Fragment,
}) => (
  <UniformComposition data={composition} behaviorTracking="onLoad">
    <ThemeProvider>
      <Providers>
        {/* Docs: https://docs.uniform.app/reference/packages/uniformdev-canvas-react#slot */}
        <UniformSlot name="pageHeader" />
        {/* useUniformComposition is always true only for global composition preview */}
        {useUniformComposition && <h1 className="flex-1 flex justify-center items-center">Page content placeholder</h1>}
        <UniformSlot name="pageContent">
          {/* adding container with padding only to 1+ component in the content slot */}
          {({ key, child, component }) => {
            // Do not wrap container around the component if it is a container itself
            if (['container', 'spacer', 'banner', 'productDetails'].includes(component.type)) return <>{child}</>;
            const isHeroBackgroundImageVariant =
              component.type === 'hero' &&
              (component.variant === HeroVariant.BackgroundDarkImage ||
                component.variant === HeroVariant.BackgroundLightImage);

            return (
              <Container
                className={classNames({ '!max-w-none !px-0': isHeroBackgroundImageVariant })}
                // adding padding top only to 1+ component in the content slot
                paddingTop={
                  key.toString().endsWith('-0') && isHeroBackgroundImageVariant ? PaddingSize.None : PaddingSize.Small
                }
                paddingBottom={PaddingSize.Small}
              >
                {child}
              </Container>
            );
          }}
        </UniformSlot>
        <UniformSlot name="pageFooter" />
        {preview && <UniformPreviewIcon />}
      </Providers>
    </ThemeProvider>
  </UniformComposition>
);

export default Page;
