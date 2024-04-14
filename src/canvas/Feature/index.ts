import { ComponentProps, registerUniformComponent } from '@uniformdev/canvas-react';
import type { Asset } from '@uniformdev/assets';
import { Feature } from './Feature';

export type FeatureProps = ComponentProps<{
  title: string;
  link: Types.ProjectMapLink;
  description: string;
  icon?: string | Asset | Types.CloudinaryImage;
}>;

registerUniformComponent({
  type: 'feature',
  component: Feature,
});

export default Feature;
export * from './decorator';
