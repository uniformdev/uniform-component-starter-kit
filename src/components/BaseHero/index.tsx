import { FC, ReactElement } from 'react';
import type { Asset } from '@uniformdev/assets';
import { ContainerProps } from '../../components/Container';
import { HeroSideImage } from './HeroSideImage';
import { HeroBackgroundImage } from './HeroBackgroundImage';
import { HeroTwoColumns } from './HeroTwoColumns';
import { HeroDefault } from './Hero';

export { useHeroAnimation } from './animation';

export const DEFAULT_TEXT_COLOR = '#000';

type Styles = {
  eyebrowText?: string;
  title?: string;
  description?: string;
  descriptionSeparator?: string;
  sideImage?: string;
  textAlign?: string;
};

export type BaseHeroProps = ContainerProps & {
  eyebrowText: string;
  title: string;
  titleStyle: Types.HeadingStyles;
  description: string;
  image?: string | Asset;
  video?: string;
  overlayColor?: Types.AvailableColor;
  overlayOpacity?: Types.AvailableOpacity;
  objectFit?: Types.AvailableObjectFit;
  useCustomTextElements?: boolean;
  fullHeight?: boolean;
  animationType?: Types.AnimationType;
  animationOrder?: Types.AnimationOrder;
  duration?: Types.DurationType;
  textColorVariant: Types.AvailableTextColorVariant; // Deprecated
  textColor?: Types.ThemeColorsValues | string;
  backgroundColor?: Types.ThemeColorsValues | string;
  delay?: Types.AnimationDelay;
  animationPreview?: boolean;
  variant?: string;
  buttonsSlot?: ReactElement;
  styles?: Styles;
};

export enum BaseHeroVariant {
  ImageLeft = 'imageLeft',
  ImageRight = 'imageRight',
  BackgroundImage = 'backgroundImage',
  TwoColumns = 'twoColumns',
}

const BaseHero: FC<BaseHeroProps> = props => {
  switch (props.variant) {
    case BaseHeroVariant.ImageRight:
    case BaseHeroVariant.ImageLeft:
      return <HeroSideImage {...props} />;
    case BaseHeroVariant.BackgroundImage:
      return <HeroBackgroundImage {...props} />;
    case BaseHeroVariant.TwoColumns:
      return <HeroTwoColumns {...props} />;
    default:
      return <HeroDefault {...props} />;
  }
};

export default BaseHero;
