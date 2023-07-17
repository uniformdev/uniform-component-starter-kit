import { FC } from 'react';
import classNames from 'classnames';
import { UniformComposition, UniformSlot } from '@uniformdev/canvas-react';
import type { RootComponentInstance } from '@uniformdev/canvas';
import { HeroVariant } from '@/canvas/Hero';
import UniformPreviewIcon from './UniformPreviewIcon';
import ThemeProvider from './ThemeProvider';
import Container from './Container';
import { PaddingSize } from '@/utils/styling';
import { mergeGlobalCompositions } from '@/utils/canvas';

type PageProps = {
  preview: boolean;
  useUniformComposition?: boolean;
  data: RootComponentInstance;
};

const Page: FC<PageProps> = ({ data: composition, useUniformComposition, preview }) => (
  <UniformComposition
    data={composition}
    behaviorTracking="onLoad"
    contextualEditingEnhancer={
      !useUniformComposition
        ? ({ composition: rootComposition }) => mergeGlobalCompositions(rootComposition, composition)
        : undefined
    }
  >
    <ThemeProvider data={composition} useUniformComposition={useUniformComposition}>
      {/* Docs: https://docs.uniform.app/reference/packages/uniformdev-canvas-react#slot */}
      <UniformSlot name="header" />
      {/* useUniformComposition is always true only for global composition preview */}
      {useUniformComposition && <h1 className="flex-1 flex justify-center items-center">Page content placeholder</h1>}
      <UniformSlot name="pageContent">
        {/* adding container with padding only to 1+ component in the content slot */}
        {({ key, child, component }) => {
          // Do not wrap container around the component if it is a container itself
          if (['container', 'spacer', 'banner'].includes(component.type)) return <>{child}</>;

          return (
            <Container
              className={classNames({
                '!max-w-none !px-0':
                  component.type === 'hero' &&
                  (component.variant === HeroVariant.BackgroundDarkImage ||
                    component.variant === HeroVariant.BackgroundLightImage),
              })}
              // adding padding top only to 1+ component in the content slot
              paddingTop={key.toString().endsWith('-0') ? PaddingSize.None : PaddingSize.Small}
              paddingBottom={PaddingSize.Small}
            >
              {child}
            </Container>
          );
        }}
      </UniformSlot>
      <UniformSlot name="footer" />
      {preview && <UniformPreviewIcon />}
    </ThemeProvider>
  </UniformComposition>
);

export default Page;
