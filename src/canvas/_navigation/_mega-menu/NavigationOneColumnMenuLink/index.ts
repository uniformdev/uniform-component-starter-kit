import { ComponentProps, registerUniformComponent } from '@uniformdev/canvas-react';
import { NavigationOneColumnMenuLink } from './NavigationOneColumnMenuLink';

export type NavigationOneColumnMenuLinkProps = ComponentProps<{
  title: string;
  link: Types.ProjectMapLink;
  description?: string;
  icon?: string;
}>;

export enum NavigationOneColumnMenuLinkVariant {
  IconLeft = 'iconLeft',
}

[undefined, NavigationOneColumnMenuLinkVariant.IconLeft].forEach(variantId =>
  registerUniformComponent({
    type: 'navigationOneColumnMenuLink',
    component: NavigationOneColumnMenuLink,
    variantId,
  })
);
