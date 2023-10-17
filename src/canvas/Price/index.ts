import { registerUniformComponent, ComponentProps } from '@uniformdev/canvas-react';
import { Price } from './Price';

export type PriceProps = ComponentProps<{
  label?: string;
  labelStyle: Types.HeadingStyles;
  price?: number | string;
  currency?: string;
}>;

registerUniformComponent({
  type: 'price',
  component: Price,
});

export default Price;
