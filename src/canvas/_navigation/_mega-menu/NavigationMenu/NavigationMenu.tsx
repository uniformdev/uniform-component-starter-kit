import { FC, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import { UniformSlot } from '@uniformdev/canvas-react';
import { NavigationMenuProps } from '.';

export const NavigationMenu: FC<NavigationMenuProps> = ({ link, title }) => {
  const router = useRouter();

  const isCurrentRoute = useMemo(() => {
    const { asPath } = router;
    const [pathWithoutQuery] = asPath.split('?');
    return link?.path === '/' ? asPath === link?.path : pathWithoutQuery.includes(link?.path);
  }, [router, link]);

  return (
    <li tabIndex={0}>
      <Link className={classNames('!rounded-none', { 'font-extrabold': isCurrentRoute })} href={link?.path || '#'}>
        {title}
        <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
          <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
        </svg>
      </Link>
      <ul className="w-max bg-primary text-white -right-6 !rounded-none z-40">
        <UniformSlot name="content" />
      </ul>
    </li>
  );
};
