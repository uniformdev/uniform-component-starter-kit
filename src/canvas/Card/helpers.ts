import { CardVariants, CardProps } from './';

export const getContentClass = (variantId?: string) => {
  switch (variantId) {
    case CardVariants.BackgroundImage:
      return 'image-full';
    default:
      return '';
  }
};

export const getTextClass = (variantId?: string) => {
  switch (variantId) {
    case CardVariants.Featured:
      return 'mb-4';
    default:
      return '';
  }
};

export const getDescriptionClass = (variantId?: string) => {
  switch (variantId) {
    case CardVariants.Featured:
      return 'mt-4';
    default:
      return '';
  }
};

export const getBadgeStyleClass = (badgeStyle: CardProps['badgeStyle']) => {
  switch (badgeStyle) {
    case 'outline':
      return 'badge-outline';
    case 'primary':
      return 'badge-primary text-primary-content';
    case 'secondary':
      return 'badge-secondary text-secondary-content';
    case 'accent':
      return 'badge-accent text-accent-content';
    default:
      return '';
  }
};

export const getBadgeSizeClass = (badgeSize: CardProps['badgeSize']) => {
  switch (badgeSize) {
    case 'xs':
      return 'badge-xs';
    case 'sm':
      return 'badge-sm';
    case 'md':
      return 'badge-md';
    case 'lg':
      return 'badge-lg';
    default:
      return '';
  }
};
