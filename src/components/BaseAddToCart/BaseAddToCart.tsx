import { FC, useCallback, useState } from 'react';
import classNames from 'classnames';
import { UniformText } from '@uniformdev/canvas-react';
import { getButtonClass } from '../../utilities/styling';
import ProductQuantityItem from '../../components/ProductQuantityItem';
import { BaseAddToCartProps } from './';

const BaseAddToCart: FC<BaseAddToCartProps> = ({
  buttonCopy,
  buttonStyle,
  onClick,
  useCustomTextElements = false,
  animationType,
}) => {
  const [quantity, setQuantity] = useState<number>(1);

  const onClickIncrement = useCallback(() => setQuantity(quantity => quantity + 1), []);
  const onClickDecrement = useCallback(() => setQuantity(quantity => quantity - 1 || 1), []);

  const handleButtonClick = useCallback(() => {
    onClick?.(quantity);
  }, [quantity, onClick]);

  return (
    <div className="flex flex-row justify-between items-center py-6 flex-wrap gap-5">
      <div className="flex flex-wrap items-center justify-between w-auto gap-4 grow">
        <div className="inline font-bold text-secondary-content">QUANTITY: </div>
        <ProductQuantityItem
          animationType={animationType}
          buttonStyle={buttonStyle}
          quantity={quantity}
          onClickDecrement={onClickDecrement}
          onClickIncrement={onClickIncrement}
        />
      </div>
      <button
        className={classNames('btn rounded-none ml-auto w-full flex-1 min-w-[200px]', getButtonClass(buttonStyle))}
        onClick={handleButtonClick}
      >
        {useCustomTextElements ? (
          <div>{buttonCopy}</div>
        ) : (
          <UniformText placeholder="Button copy goes here" parameterId="buttonCopy" />
        )}
      </button>
    </div>
  );
};

export default BaseAddToCart;
