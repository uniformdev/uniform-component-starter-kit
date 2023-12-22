import { FC, useMemo } from 'react';
import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { checkIsCurrentRoute } from './helpers';
import { LinkProps } from '.';

export const HeaderLink: FC<LinkProps> = ({ title, link, styles }) => {
  const router = useRouter();
  const isCurrentRoute = useMemo(() => checkIsCurrentRoute(router, link), [router, link]);
  return (
    <li tabIndex={0}>
      <Link
        className={classNames(
          '!rounded-none text-base focus:!text-primary-content active:!text-primary-content hover:text-primary-content hover:opacity-60',
          styles?.link,
          {
            'font-extrabold': isCurrentRoute,
            [styles?.activeLink || '']: isCurrentRoute,
          }
        )}
        href={link?.path || '#'}
      >
        {title}
      </Link>
    </li>
  );
};
