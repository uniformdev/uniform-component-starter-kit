import { ComponentProps, registerUniformComponent } from '@uniformdev/canvas-react';
import type { Asset } from '@uniformdev/assets';
import { NavigationMenuSectionLink } from './NavigationMenuSectionLink';

export type NavigationMenuSectionLinkProps = ComponentProps<{
  title: string;
  link: Types.ProjectMapLink;
  description?: string;
  icon?: string | Asset;
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
