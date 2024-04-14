import { ComponentProps, registerUniformComponent } from '@uniformdev/canvas-react';
import type { Asset } from '@uniformdev/assets';
import { Card } from './Card';

type Styles = {
  title?: string;
  description?: string;
  container?: string;
  imageContainer?: string;
  image?: string;
  cardBody?: string;
};

export type CardProps = ComponentProps<{
  image?: string | Asset | Types.CloudinaryImage;
  badge?: string;
  badgeStyle?: Types.BadgeStyles;
  badgeSize?: Types.BadgeSize;
  title: string;
  description: string;
  buttonCopy?: string;
  buttonLink?: Types.ProjectMapLink;
  buttonStyle: Types.ButtonStyles;
  buttonAnimationType?: Types.AnimationType;
  lineCountRestriction: Types.AvailableMaxLineCount;
  useCustomTextElements?: boolean;
  overlayColor?: Types.AvailableColor;
  overlayOpacity?: Types.AvailableOpacity;
  objectFit?: Types.AvailableObjectFit;
  textColorVariant?: Types.AvailableTextColorVariant;
  animationType?: Types.AnimationType;
  duration?: Types.DurationType;
  delay?: Types.AnimationDelay;
  animationPreview?: boolean;
  styles?: Styles;
}>;

export enum CardVariants {
  BackgroundImage = 'backgroundImage',
  Featured = 'featured',
}

[undefined, CardVariants.BackgroundImage, CardVariants.Featured].forEach(variantId => {
  registerUniformComponent({
    type: 'card',
    component: Card,
    variantId,
  });
});

export * from './decorator';
export default Card;
