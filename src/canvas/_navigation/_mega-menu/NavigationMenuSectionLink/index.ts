import { ComponentProps, registerUniformComponent } from '@uniformdev/canvas-react';
import { NavigationMenuSectionLink } from './NavigationMenuSectionLink';

export type NavigationMenuSectionLinkProps = ComponentProps<{
  title: string;
  link: Types.ProjectMapLink;
  description?: string;
  icon?: string;
}>;

export enum NavigationMenuSectionLinkVariant {
  IconLeft = 'iconLeft',
}

[undefined, NavigationMenuSectionLinkVariant.IconLeft].forEach(variantId =>
  registerUniformComponent({
    type: 'navigationMenuSectionLink',
    component: NavigationMenuSectionLink,
    variantId,
  })
);
