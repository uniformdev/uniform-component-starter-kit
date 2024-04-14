import { ComponentProps, registerUniformComponent } from '@uniformdev/canvas-react';
import type { Asset } from '@uniformdev/assets';
import { HeaderLink } from './HeaderLink';
import { FooterLink } from './FooterLink';
import { NavigationGroup } from './NavigationGroup';
import { NavigationMenu } from './NavigationMenu';

export type Styles = {
  link?: string;
  activeLink?: string;
};

export type LinkProps = ComponentProps<{
  title: string;
  link: Types.ProjectMapLink;
  icon?: Asset;
  hideIconBackground: boolean;
  color?: Types.ThemeColorsValues | string;
  styles?: Styles;
}>;

// default variant
registerUniformComponent({
  type: 'navigationLink',
  component: HeaderLink,
});

registerUniformComponent({
  type: 'navigationLink',
  component: FooterLink,
  variantId: 'footer',
});

registerUniformComponent({
  type: 'navigationLink',
  component: HeaderLink,
  variantId: 'header',
});

registerUniformComponent({
  type: 'navigationGroup',
  component: NavigationGroup,
});

registerUniformComponent({
  type: 'navigationMenu',
  component: NavigationMenu,
});

export { HeaderLink, FooterLink, NavigationGroup, NavigationMenu };
