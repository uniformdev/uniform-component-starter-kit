import { FC } from 'react';
import Link from 'next/link';
import { LinkProps } from '.';

export const FooterLink: FC<LinkProps> = ({ title, link }) => (
  <Link href={link?.path || '#'} className="link text-secondary-content font-bold link-hover">
    {title}
  </Link>
);
