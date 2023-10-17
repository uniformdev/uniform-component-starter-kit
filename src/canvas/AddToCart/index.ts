import { registerUniformComponent, ComponentProps } from '@uniformdev/canvas-react';
import { BaseAddToCartProps } from '../../components/BaseAddToCart';
import { AddToCart } from './AddToCart';

export type AddToCartProps = ComponentProps<BaseAddToCartProps>;

registerUniformComponent({
  type: 'addToCart',
  component: AddToCart,
});

export default AddToCart;
