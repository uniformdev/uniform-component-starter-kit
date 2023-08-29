import { FC } from 'react';
import classNames from 'classnames';
import IconMinus from './IconMinus';
import IconPlus from './IconPlus';
import { getButtonClass } from '../utilities/styling';

interface Props {
  quantity: number;
  onClickIncrement: () => void;
  onClickDecrement: () => void;
  buttonStyle: Types.ButtonStyles;
}

const ProductQuantityItem: FC<Props> = ({ quantity, buttonStyle, onClickIncrement, onClickDecrement }) => (
  <div className="flex justify-between flex-row w-44 h-13 border border-gray-100">
    <div
      className={classNames('btn rounded-none', getButtonClass(buttonStyle), {
        'opacity-50 pointer-events-none': quantity === 1,
      })}
      onClick={onClickDecrement}
    >
      <IconMinus />
    </div>
    <div className="flex justify-center items-center w-full border-x border-gray-100">
      <span className="font-bold text-secondary-content select-none">{quantity}</span>
    </div>
    <div className={classNames('btn rounded-none', getButtonClass(buttonStyle))} onClick={onClickIncrement}>
      <IconPlus />
    </div>
  </div>
);

export default ProductQuantityItem;
