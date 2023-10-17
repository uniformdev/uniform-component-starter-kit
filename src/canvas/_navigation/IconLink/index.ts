import { ComponentProps, registerUniformComponent } from '@uniformdev/canvas-react';
import { IconLink } from './IconLink';

export type IconLinkProps = ComponentProps<{
  link: Types.ProjectMapLink;
  icon: string | Types.CloudinaryImage;
}>;

registerUniformComponent({
  type: 'iconLink',
  component: IconLink,
});
