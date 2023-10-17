import { FC, useCallback } from 'react';
import classNames from 'classnames';
import { UniformText } from '@uniformdev/canvas-react';
import { getTextClass } from '../../utilities/styling';
import { PriceProps } from '.';

export const Price: FC<PriceProps> = ({ labelStyle = 'h1', currency }) => {
  const renderValue = useCallback(
    (value: string | undefined) => {
      const formattedPrice =
        value && currency
          ? new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(Number(value))
          : value;
      return <div>{formattedPrice}</div>;
    },
    [currency]
  );

  return (
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
        render={renderValue}
      />
    </div>
  );
};
