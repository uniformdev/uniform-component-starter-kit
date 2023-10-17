import { CallToActionVariant } from '.';

export const getCallToActionContentClass = (variantId?: string) => {
  switch (variantId) {
    case CallToActionVariant.AlignLeft:
      return 'flex-col text-start items-start w-full';
    case CallToActionVariant.AlignRight:
      return 'flex-col text-end items-end w-full';
    case CallToActionVariant.Featured:
      return 'flex-col lg:flex-row  text-start items-center justify-between w-full';
    default:
      return 'flex-col text-center items-center w-full';
  }
};

export const getCallToActionTextWrappersClass = (variantId?: string) => {
  switch (variantId) {
    case CallToActionVariant.Featured:
      return 'w-4/5';
    default:
      return '';
  }
};
