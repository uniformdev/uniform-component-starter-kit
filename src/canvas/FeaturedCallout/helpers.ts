import { FeaturedCalloutVariant } from '../FeaturedCallout';

export const getFeaturedCalloutContentClass = (variantId?: string) => {
  switch (variantId) {
    case FeaturedCalloutVariant.ImageRight:
      return 'lg:order-1 justify-end';
    default:
      return '';
  }
};

export const getFeaturedCalloutTextContentClass = (variantId?: string) => {
  switch (variantId) {
    case FeaturedCalloutVariant.ImageRight:
      return 'lg:justify-end';
    default:
      return '';
  }
};
