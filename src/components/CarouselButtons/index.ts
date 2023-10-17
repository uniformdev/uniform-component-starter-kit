import { ButtonGroupProps } from 'react-multi-carousel';

export type CarouselButtonProps = ButtonGroupProps & {
  buttonStyle: Types.ButtonStyles;
  buttonAnimationStyle?: Types.AnimationType;
  colorClassName?: string;
};

export { default } from './CarouselButtons';
