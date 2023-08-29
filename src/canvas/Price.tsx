import { FC } from 'react';
import classNames from 'classnames';
import { registerUniformComponent, ComponentProps, UniformText } from '@uniformdev/canvas-react';
import { getTextClass } from '../utilities/styling';

export type Props = ComponentProps<{
  label?: string;
  labelStyle: Types.HeadingStyles;
  price?: number | string;
  currency?: string;
}>;

const Price: FC<Props> = ({ labelStyle = 'h1', currency }) => (
  <div className="flex flex-row items-center text-secondary-content py-2 gap-2">
    <UniformText
      placeholder="Label goes here"
      parameterId="label"
      as="span"
      className={classNames('font-medium', getTextClass(labelStyle))}
    />
    <UniformText
      placeholder="Price goes here"
      parameterId="price"
      as="div"
      className={classNames('font-medium', getTextClass(labelStyle))}
      render={value => {
        const formattedPrice =
          value && currency
            ? new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(Number(value))
            : value;
        return <div>{formattedPrice}</div>;
      }}
    />
  </div>
);

registerUniformComponent({
  type: 'price',
  component: Price,
});

export default Price;
