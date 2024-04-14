import { ElementType } from 'react';
import { RootComponentInstance } from '@uniformdev/canvas';

type Styles = {
  pageContentContainer?: string;
  modal?: {
    container?: string;
  };
};

export type BasePageProps = {
  preview: boolean;
  useUniformComposition?: boolean;
  data: RootComponentInstance;
  providers: ElementType;
  skipContainerWrappersList?: string[];
  context: Record<string, unknown>;
  styles?: Styles;
  localizationSettings?: Types.LocalizationSettings;
};

export * from './decorator';
export { default } from './BasePage';
