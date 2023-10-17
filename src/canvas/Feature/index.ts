import { ComponentProps, registerUniformComponent } from '@uniformdev/canvas-react';
import { Feature } from './Feature';

export type FeatureProps = ComponentProps<{
  title: string;
  link: Types.ProjectMapLink;
  description: string;
  icon?: string | Types.CloudinaryImage;
}>;

registerUniformComponent({
  type: 'feature',
  component: Feature,
});

export default Feature;
export * from './decorator';
