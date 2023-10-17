import { ComponentProps, registerUniformComponent } from '@uniformdev/canvas-react';
import { NavigationTwoColumnsMenu } from './NavigationTwoColumnMenu';

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
  type: 'navigationTwoColumnsMenu',
  component: NavigationTwoColumnsMenu,
});
