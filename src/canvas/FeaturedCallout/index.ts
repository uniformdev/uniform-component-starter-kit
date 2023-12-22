import { registerUniformComponent, ComponentProps } from '@uniformdev/canvas-react';
import type { Asset } from '@uniformdev/assets';
import { FeaturedCallout } from './FeaturedCallout';

export type FeaturedCalloutProps = ComponentProps<{
  eyebrowText?: string;
  title: string;
  titleStyle: Types.HeadingStyles;
  description: string;
  image?: string | Asset | Types.CloudinaryImage;
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
