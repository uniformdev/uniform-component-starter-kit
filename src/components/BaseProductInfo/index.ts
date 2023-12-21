import type { Asset } from '@uniformdev/assets';

type Styles = {
  eyebrow?: string;
  title?: string;
  description?: string;
  subtitle?: string;
  highlightText?: string;
};

export type Props = {
  eyebrowText: string;
  title: string;
  titleStyle: Types.HeadingStyles;
  subTitle: string;
  description: string;
  highlightText: string;
  image?: string | Asset;
  primaryButtonCopy: string;
  primaryButtonStyle: Types.ButtonStyles;
  primaryButtonLink?: Types.ProjectMapLink;
  primaryButtonAnimationType?: Types.AnimationType;
  secondaryButtonCopy: string;
  secondaryButtonStyle: Types.ButtonStyles;
  secondaryButtonLink?: Types.ProjectMapLink;
  secondaryButtonAnimationType?: Types.AnimationType;
  overlayColor?: Types.AvailableColor;
  overlayOpacity?: Types.AvailableOpacity;
  objectFit?: Types.AvailableObjectFit;
  onClickPrimaryButton?: () => void;
  onClickSecondaryButton?: () => void;
  features: string[];
  fullHeight?: boolean;
  useCustomTextElements?: boolean;
  animationType?: Types.AnimationType;
  animationOrder?: Types.AnimationOrder;
  duration?: Types.DurationType;
  delay?: Types.AnimationDelay;
  animationPreview?: boolean;
  styles?: Styles;
};

export { default } from './BaseProductInfo';
