import { registerUniformComponent, ComponentProps } from '@uniformdev/canvas-react';
import { type Props as BaseProductInfoProps } from '../../components/BaseProductInfo';
import { ProductInfo } from './ProductInfo';

export type ProductInfoProps = ComponentProps<BaseProductInfoProps>;

registerUniformComponent({
  type: 'productInfo',
  component: ProductInfo,
});

export default ProductInfo;
