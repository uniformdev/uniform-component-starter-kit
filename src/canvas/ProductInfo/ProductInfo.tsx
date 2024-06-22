import { FC, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import BaseProductInfo from '../../components/BaseProductInfo';
import { ProductInfoProps } from '.';

export const ProductInfo: FC<ProductInfoProps> = props => {
  const t = useTranslations();
  const handlePrimaryButtonClick = useCallback(() => {
    window.alert(t('This is add to cart event placeholder'));
  }, [t]);

  return <BaseProductInfo {...props} onClickPrimaryButton={handlePrimaryButtonClick} />;
};
