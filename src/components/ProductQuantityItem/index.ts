export type ProductQuantityItemProps = {
  quantity: number;
  onClickIncrement: () => void;
  onClickDecrement: () => void;
  buttonStyle: Types.ButtonStyles;
  animationType?: Types.AnimationType;
};

export * from './ProductQuantityItem';
export { default } from './ProductQuantityItem';
