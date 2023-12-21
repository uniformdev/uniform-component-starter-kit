import { FC } from 'react';
import MenuLink from '../../../../components/MenuLink';
import { getMediaUrl } from '../../../../utilities';
import { NavigationMenuSectionLinkProps } from '.';

export const NavigationMenuSectionLink: FC<NavigationMenuSectionLinkProps> = ({ icon, component, ...rest }) => (
  <MenuLink {...rest} imageUrl={getMediaUrl(icon)} variant={component?.variant} />
);
