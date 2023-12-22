import { ComponentProps, registerUniformComponent } from '@uniformdev/canvas-react';
import type { Asset } from '@uniformdev/assets';
import { NavigationOneColumnMenuLink } from './NavigationOneColumnMenuLink';

export type NavigationOneColumnMenuLinkProps = ComponentProps<{
  title: string;
  link: Types.ProjectMapLink;
  description?: string;
  icon?: string | Asset;
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
