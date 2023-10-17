import { FC, useCallback } from 'react';
import BaseAddToCart from '../../components/BaseAddToCart';
import { AddToCartProps } from '.';

export const AddToCart: FC<AddToCartProps> = ({ buttonStyle, buttonCopy, buttonAnimationType }) => {
  const handleButtonClick = useCallback((quantity: number) => {
    window.alert(`This is add to cart event placeholder. quantity: ${quantity}.`);
  }, []);

  return (
    <BaseAddToCart
      animationType={buttonAnimationType}
      buttonStyle={buttonStyle}
      buttonCopy={buttonCopy}
      onClick={handleButtonClick}
    />
  );
};
