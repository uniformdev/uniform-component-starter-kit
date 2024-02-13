import { ReactNode } from 'react';
import { BackgroundTypes, PaddingSize } from '../../utilities/styling';

export enum ContainerVariants {
  BackgroundInContainer = 'backgroundInContainer',
  FluidContent = 'fluidContent',
}

export type ContainerProps = {
  backgroundType?: BackgroundTypes | Types.ThemeColorsValues | string;
  paddingTop?: PaddingSize;
  paddingBottom?: PaddingSize;
  marginTop?: PaddingSize;
  marginBottom?: PaddingSize;
  children: ReactNode;
  backgroundClassName?: string;
  containerVariant?: string;
  className?: string;
};

export * from './BaseContainer';
export * from './ScreenContainer';
export { default } from './Container';
