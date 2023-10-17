import { ComponentProps, registerUniformComponent } from '@uniformdev/canvas-react';
import { NavigationOneColumnMenu } from './NavigationOneColumnMenu';

export type NavigationOneColumnMenuProps = ComponentProps<{
  description?: string;
  icon?: string;
  primaryButtonCopy: string;
  primaryButtonLink: Types.ProjectMapLink;
  primaryButtonStyle: Types.ButtonStyles;
  secondaryButtonCopy: string;
  secondaryButtonLink: Types.ProjectMapLink;
  secondaryButtonStyle: Types.ButtonStyles;
}>;

registerUniformComponent({
  type: 'navigationOneColumnMenu',
  component: NavigationOneColumnMenu,
});
