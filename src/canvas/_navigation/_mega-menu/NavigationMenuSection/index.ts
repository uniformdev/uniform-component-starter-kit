import { ComponentProps, registerUniformComponent } from '@uniformdev/canvas-react';
import { NavigationMenuSection } from './NavigationMenuSection';

export type NavigationMenuSectionProps = ComponentProps<{
  title: string;
}>;

registerUniformComponent({
  type: 'navigationMenuSection',
  component: NavigationMenuSection,
});
