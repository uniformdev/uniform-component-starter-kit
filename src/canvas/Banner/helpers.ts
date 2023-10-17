import { BannerVariant } from '.';

export const getPositionClassName = (position: Types.AvailableBannerPosition, inline: boolean) => {
  if (inline) return '';
  switch (position) {
    case 'center':
      return 'top-1/2 -translate-y-1/2';
    case 'top':
      return 'top-4';
    default:
      return 'bottom-4';
  }
};

export const getWidthClassName = (variantId?: BannerVariant) => {
  switch (variantId) {
    case BannerVariant.FullWidth:
      return 'w-full';
    default:
      return 'max-w-screen-xl';
  }
};

export const getTextAlignmentClassName = (textAlignment: Types.HorizontalAlignment) => {
  switch (textAlignment) {
    case 'center':
      return 'text-center';
    case 'right':
      return 'text-right';
    default:
      return 'text-left';
  }
};
