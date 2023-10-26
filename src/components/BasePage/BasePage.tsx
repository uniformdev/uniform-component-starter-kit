import { FC, PropsWithChildren } from 'react';
import classNames from 'classnames';
import {
  createUniformApiEnhancer,
  UniformComposition,
  UniformSlot,
  useUniformCurrentComposition,
} from '@uniformdev/canvas-react';
import ComponentStarterKitContextProvider from '../../context/ComponentStarterKitContext';
import UniformPreviewIcon from '../UniformPreviewIcon';
import ThemeProvider from '../ThemeProvider';
import { getGapClass, getMarginBottomClass, PaddingSize } from '../../utilities/styling';
import { CHILDREN_CONTAINER_STYLES, COMMON_PADDING } from '../../hocs/withoutContainer';
import { BasePageProps } from './';

const PageContent: FC<Pick<BasePageProps, 'preview' | 'useUniformComposition' | 'providers' | 'styles'>> = ({
  useUniformComposition,
  preview,
  providers: Providers,
  styles,
}) => {
  const { data: composition } = useUniformCurrentComposition();

  const gap = composition?.slots?.pageHeader?.[0]?.parameters?.syntheticGap?.value as PaddingSize | undefined;

  const ContentProviders = ({ children }: PropsWithChildren) =>
    Providers ? <Providers styles={{ modal: styles?.modal }}>{children}</Providers> : <>{children}</>;

  return (
    <ThemeProvider>
      <ContentProviders>
        {/* Docs: https://docs.uniform.app/reference/packages/uniformdev-canvas-react#slot */}
        <div className={COMMON_PADDING}>
          <UniformSlot name="pageHeader" />
        </div>
        {/* useUniformComposition is always true only for global composition preview */}
        {useUniformComposition && <h1 className="flex-1 flex justify-center items-center">Page content placeholder</h1>}
        <div
          className={classNames(
            'flex flex-col flex-1',
            CHILDREN_CONTAINER_STYLES,
            COMMON_PADDING,
            getGapClass(gap),
            getMarginBottomClass(gap),
            styles?.pageContentContainer
          )}
        >
          <UniformSlot name="pageContent" />
        </div>
        <div className={COMMON_PADDING}>
          <UniformSlot name="pageFooter" />
        </div>
        {preview && <UniformPreviewIcon />}
      </ContentProviders>
    </ThemeProvider>
  );
};

const BasePage: FC<BasePageProps> = ({
  data: composition,
  useUniformComposition,
  preview,
  providers,
  styles,
  context,
}) => (
  <UniformComposition
    data={composition}
    behaviorTracking="onLoad"
    contextualEditingEnhancer={createUniformApiEnhancer({ apiUrl: '/api/preview' })}
  >
    <ComponentStarterKitContextProvider {...(context || {})}>
      <PageContent
        useUniformComposition={useUniformComposition}
        preview={preview}
        providers={providers}
        styles={styles}
      />
    </ComponentStarterKitContextProvider>
  </UniformComposition>
);

export default BasePage;
