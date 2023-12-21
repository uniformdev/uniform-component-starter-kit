import { ComponentProps, registerUniformComponent } from '@uniformdev/canvas-react';
import type { Asset } from '@uniformdev/assets';
import { IconLink } from './IconLink';

export type IconLinkProps = ComponentProps<{
  link: Types.ProjectMapLink;
  icon?: string | Asset | Types.CloudinaryImage;
}>;

registerUniformComponent({
  type: 'iconLink',
  component: IconLink,
});
