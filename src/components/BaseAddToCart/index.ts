export type BaseAddToCartProps = {
  buttonCopy?: string;
  buttonStyle: Types.ButtonStyles;
  onClick?: (quantity: number) => void;
  useCustomTextElements?: boolean;
  animationType?: Types.AnimationType;
  buttonAnimationType?: Types.AnimationType;
};

export { default } from './BaseAddToCart';
