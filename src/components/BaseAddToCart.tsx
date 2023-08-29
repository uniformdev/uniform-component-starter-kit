import { FC, useCallback, useState } from 'react';
import { useUniformCurrentComposition, UniformText } from '@uniformdev/canvas-react';
import classNames from 'classnames';
import { getButtonClass } from '../utilities/styling';
import ProductQuantityItem from '../components/ProductQuantityItem';

export type Props = {
  buttonCopy?: string;
  buttonStyle: Types.ButtonStyles;
  onClick: (quantity: number) => void;
};

const BaseAddToCart: FC<Props> = ({ buttonStyle, onClick }) => {
  const { isContextualEditing } = useUniformCurrentComposition();
  const [quantity, setQuantity] = useState<number>(1);

  const onClickIncrement = useCallback(() => setQuantity(quantity => quantity + 1), []);
  const onClickDecrement = useCallback(() => setQuantity(quantity => quantity - 1 || 1), []);

  const handleButtonClick = useCallback(() => {
    onClick(quantity);
  }, [quantity, onClick]);

  return (
    <div className="flex flex-row justify-between items-center py-6 flex-wrap gap-5">
      <div className="flex items-center justify-between w-auto gap-4 grow">
        <div className="inline font-bold text-secondary-content">QUANTITY:</div>
        <ProductQuantityItem
          buttonStyle={buttonStyle}
          quantity={quantity}
          onClickDecrement={onClickDecrement}
          onClickIncrement={onClickIncrement}
        />
      </div>
      <div
        className={classNames('btn rounded-none ml-auto w-full flex-1 min-w-[200px]', getButtonClass(buttonStyle))}
        onClick={handleButtonClick}
      >
        <UniformText
          placeholder="Button copy goes here"
          parameterId="buttonCopy"
          onClick={isContextualEditing ? e => e.preventDefault() : undefined}
        />
      </div>
    </div>
  );
};

export default BaseAddToCart;
