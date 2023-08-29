import { FC, ReactNode, MouseEvent } from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import { getButtonClass } from '../utilities/styling';

type Props = {
  href?: string;
  copy: ReactNode;
  style: Types.ButtonStyles;
  className?: string;
  onClick?: (e?: MouseEvent<HTMLButtonElement>) => void;
  disable?: boolean;
};

const Button: FC<Props> = ({ href, copy, style, className, onClick, disable = false }) => {
  const buttonStyle = classNames('btn rounded-none', className, getButtonClass(style), { 'btn-disabled': disable });
  const buttonContent = () => (
    <>
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
    </>
  );

  return href ? (
    <Link role="button" href={href} target={href.startsWith('http') ? '_blank' : '_self'} className={buttonStyle}>
      {buttonContent()}
    </Link>
  ) : (
    <button onClick={onClick} className={buttonStyle}>
      {buttonContent()}
    </button>
  );
};

export default Button;
