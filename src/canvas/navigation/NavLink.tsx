import { FC, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ComponentProps, UniformSlot, registerUniformComponent } from '@uniformdev/canvas-react';

import classNames from 'classnames';

type LinkProps = ComponentProps<{
  title: string;
  link: Types.ProjectMapLink;
}>;

const FooterLink: FC<LinkProps> = ({ title, link }) => (
  <Link href={link?.path || '#'} className="link text-secondary-content font-bold link-hover">
    {title}
  </Link>
);

const HeaderLink: FC<LinkProps> = ({ title, link }) => {
  const router = useRouter();

  const isCurrentRoute = useMemo(() => {
    const { asPath } = router;
    const [pathWithoutQuery] = asPath.split('?');

    if (link?.path === '/') {
      return asPath === link.path;
    }

    return pathWithoutQuery.includes(link?.path);
  }, [router, link]);

  return (
    <li>
      <Link className={classNames('!rounded-none', { 'font-extrabold': isCurrentRoute })} href={link?.path || '#'}>
        {title}
      </Link>
    </li>
  );
};

const NavigationGroup: FC<LinkProps> = ({ title, link }) => {
  const router = useRouter();

  const isCurrentRoute = useMemo(() => {
    const { asPath } = router;
    const [pathWithoutQuery] = asPath.split('?');

    if (link?.path === '/') {
      return asPath === link.path;
    }

    return pathWithoutQuery.includes(link?.path);
  }, [router, link]);

  return (
    <li tabIndex={0}>
      <Link className={classNames('!rounded-none', { 'font-extrabold': isCurrentRoute })} href={link?.path || '#'}>
        {title}
        <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
          <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
        </svg>
      </Link>
      <ul className="p-2 bg-primary !rounded-none z-50">
        <UniformSlot name="subNavItems" />
      </ul>
    </li>
  );
};

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
