import { FC, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import BaseAddToCart from '../../components/BaseAddToCart';
import { AddToCartProps } from '.';

export const AddToCart: FC<AddToCartProps> = ({ buttonStyle, buttonCopy, buttonAnimationType }) => {
  const t = useTranslations();

  const handleButtonClick = useCallback(() => {
    window.alert(t('This is add to cart event placeholder'));
  }, [t]);

  return (
    <BaseAddToCart
      animationType={buttonAnimationType}
      buttonStyle={buttonStyle}
      buttonCopy={buttonCopy}
      onClick={handleButtonClick}
    />
  );
};
