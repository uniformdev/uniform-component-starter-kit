import { FC } from 'react';
import { ComponentProps, registerUniformComponent } from '@uniformdev/canvas-react';
import type { Asset } from '@uniformdev/assets';
import { withoutContainer } from '../../hocs/withoutContainer';
import { ContainerProps } from '../../components/Container';
import { HeroSideImage } from './HeroSideImage';
import { HeroBackgroundImage } from './HeroBackgroundImage';
import { HeroTwoColumns } from './HeroTwoColumns';
import { HeroDefault } from './Hero';

export const DEFAULT_TEXT_COLOR = '#000';

type Styles = {
  eyebrowText?: string;
  title?: string;
  description?: string;
  descriptionSeparator?: string;
  sideImage?: string;
  textAlign?: string;
};

export type HeroProps = ComponentProps<
  ContainerProps & {
    eyebrowText: string;
    title: string;
    titleStyle: Types.HeadingStyles;
    description: string;
    image?: string | Asset;
    video?: string;
    primaryButtonCopy: string;
    primaryButtonLink: Types.ProjectMapLink;
    primaryButtonStyle: Types.ButtonStyles;
    primaryButtonAnimationType?: Types.AnimationType;
    secondaryButtonCopy: string;
    secondaryButtonLink: Types.ProjectMapLink;
    secondaryButtonStyle: Types.ButtonStyles;
    secondaryButtonAnimationType?: Types.AnimationType;
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
    styles?: Styles;
  }
>;

export enum HeroVariant {
  ImageLeft = 'imageLeft',
  ImageRight = 'imageRight',
  BackgroundImage = 'backgroundImage',
  TwoColumns = 'twoColumns',
}

const Hero: FC<HeroProps> = props => {
  const { variant } = props.component || {};
  switch (variant) {
    case HeroVariant.ImageRight:
    case HeroVariant.ImageLeft:
      return <HeroSideImage {...props} />;
    case HeroVariant.BackgroundImage:
      return <HeroBackgroundImage {...props} />;
    case HeroVariant.TwoColumns:
      return <HeroTwoColumns {...props} />;
    default:
      return <HeroDefault {...props} />;
  }
};

[undefined, HeroVariant.ImageLeft, HeroVariant.ImageRight, HeroVariant.BackgroundImage, HeroVariant.TwoColumns].forEach(
  variantId => {
    registerUniformComponent({
      type: 'hero',
      component: withoutContainer(Hero),
      variantId,
    });
  }
);

export default withoutContainer(Hero);
