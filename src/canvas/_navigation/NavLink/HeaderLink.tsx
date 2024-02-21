import { FC, useMemo } from 'react';
import { useRouter } from 'next/router';
import LinkItem from '../../../components/LinkItem';
import { checkIsCurrentRoute } from './helpers';
import { LinkProps } from '.';

export const HeaderLink: FC<LinkProps> = ({ title, link, icon, hideIconBackground, styles, color }) => {
  const router = useRouter();
  const isCurrentRoute = useMemo(() => checkIsCurrentRoute(router, link), [router, link]);
  return (
    <li tabIndex={0}>
      <LinkItem
        icon={icon}
        isCurrentRoute={isCurrentRoute}
        title={title}
        hideIconBackground={hideIconBackground}
        color={color}
        styles={styles}
        link={link}
      />
    </li>
  );
};
