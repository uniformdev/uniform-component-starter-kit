import { registerUniformComponent, ComponentProps } from '@uniformdev/canvas-react';
import { FeaturedCallout } from './FeaturedCallout';

export type FeaturedCalloutProps = ComponentProps<{
  eyebrowText?: string;
  title: string;
  titleStyle: Types.HeadingStyles;
  description: string;
  image?: string | Types.CloudinaryImage;
}>;

export enum FeaturedCalloutVariant {
  ImageRight = 'imageRight',
}

[undefined, FeaturedCalloutVariant.ImageRight].forEach(variantId => {
  registerUniformComponent({
    type: 'featuredCallout',
    component: FeaturedCallout,
    variantId,
  });
});

export default FeaturedCallout;
