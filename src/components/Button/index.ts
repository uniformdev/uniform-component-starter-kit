import { MouseEvent, ReactNode } from 'react';

export type ButtonProps = {
  href?: string;
  copy: ReactNode;
  style: Types.ButtonStyles;
  className?: string;
  onClick?: (e?: MouseEvent<HTMLButtonElement>) => void;
  disable?: boolean;
  animationType?: Types.AnimationType;
};

export { default } from './Button';
