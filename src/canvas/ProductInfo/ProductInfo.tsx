import { FC, useCallback } from 'react';
import BaseProductInfo from '../../components/BaseProductInfo';
import { ProductInfoProps } from '.';

export const ProductInfo: FC<ProductInfoProps> = props => {
  const handlePrimaryButtonClick = useCallback(() => {
    window.alert('This is add to cart event placeholder');
  }, []);

  return <BaseProductInfo {...props} onClickPrimaryButton={handlePrimaryButtonClick} />;
};
