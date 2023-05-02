import { FC } from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import { getButtonClass } from '@/utils';

type Props = {
  href: string;
  copy: React.ReactNode;
  style: Types.ButtonStyles;
  className?: string;
};

const Button: FC<Props> = ({ href, copy, style, className }) => (
  <Link
    role="button"
    href={href}
    target={href.startsWith('http') ? '_blank' : '_self'}
    className={classNames('btn rounded-none', className, getButtonClass(style))}
  >
    {copy}
    {style === 'link' && (
      <svg
        className="mx-2 stroke-primary"
        width="23"
        height="25"
        viewBox="0 0 23 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 12.7561L20.4878 12.7561" stroke="stroke-primary" strokeWidth="3" />
        <path d="M10.8823 23L20.881 12.4956L10.8823 2" stroke="stroke-primary" strokeWidth="3" />
      </svg>
    )}
  </Link>
);

export default Button;
