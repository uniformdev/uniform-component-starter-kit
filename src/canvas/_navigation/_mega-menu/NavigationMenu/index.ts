import { ComponentProps, registerUniformComponent } from '@uniformdev/canvas-react';
import { NavigationMenu } from './NavigationMenu';

export type NavigationMenuProps = ComponentProps<{
  title: string;
  link: Types.ProjectMapLink;
}>;

registerUniformComponent({
  type: 'navigationMenu',
  component: NavigationMenu,
});
