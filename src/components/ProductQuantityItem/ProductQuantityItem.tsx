import { FC } from 'react';
import classNames from 'classnames';
import IconMinus from '../IconMinus';
import IconPlus from '../IconPlus';
import { getButtonClass, getButtonAnimationClass } from '../../utilities/styling';
import { ProductQuantityItemProps } from '.';

const ProductQuantityItem: FC<ProductQuantityItemProps> = ({
  quantity,
  buttonStyle,
  onClickIncrement,
  onClickDecrement,
  animationType,
}) => (
  <div className="flex justify-between flex-row w-44 h-13 border border-gray-100">
    <button
      aria-label="decrement"
      className={classNames(
        'btn rounded-none',
        animationType ? getButtonAnimationClass(buttonStyle, animationType) : getButtonClass(buttonStyle),
        {
          'opacity-50 pointer-events-none': quantity === 1,
        }
      )}
      onClick={onClickDecrement}
    >
      <IconMinus />
    </button>
    <div className="flex justify-center items-center w-full border-x border-gray-100">
      <span className="font-bold text-secondary-content select-none">{quantity}</span>
    </div>
    <button
      aria-label="increment"
      className={classNames(
        'btn rounded-none',
        animationType ? getButtonAnimationClass(buttonStyle, animationType) : getButtonClass(buttonStyle)
      )}
      onClick={onClickIncrement}
    >
      <IconPlus />
    </button>
  </div>
);

export default ProductQuantityItem;
