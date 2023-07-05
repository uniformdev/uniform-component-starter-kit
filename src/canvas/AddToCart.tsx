import { FC, useCallback, useState } from 'react';
import {
  registerUniformComponent,
  useUniformCurrentComposition,
  ComponentProps,
  UniformText,
} from '@uniformdev/canvas-react';
import classNames from 'classnames';
import { getButtonClass } from '@/utils/styling';
import IconMinus from '@/components/IconMinus';
import IconPlus from '@/components/IconPlus';

export type AddToCartProps = ComponentProps<{
  buttonCopy?: string;
  buttonStyle: Types.ButtonStyles;
}>;

const AddToCart: FC<AddToCartProps> = ({ buttonStyle }) => {
  const { isContextualEditing } = useUniformCurrentComposition();
  const [quantity, setQuantity] = useState<number>(1);

  const increaseQuantity = useCallback(() => setQuantity(quantity => quantity + 1), []);
  const decreaseQuantity = useCallback(() => setQuantity(quantity => quantity - 1 || 1), []);

  const handleContinueButtonClick = useCallback(
    () => window.alert(`This is add to cart event placeholder. quantity: ${quantity}.`),
    [quantity]
  );

  return (
    <div className="flex flex-row justify-between items-center py-6 flex-wrap gap-5">
      <div className="flex items-center justify-between w-auto gap-4 grow">
        <div className="inline font-bold text-secondary-content">QUANTITY:</div>
        <div className="flex justify-between flex-row w-44 h-13 border border-gray-100">
          <div
            className={classNames('btn rounded-none', getButtonClass(buttonStyle), {
              'opacity-50 pointer-events-none': quantity === 1,
            })}
            onClick={decreaseQuantity}
          >
            <IconMinus />
          </div>
          <div className="flex justify-center items-center w-full border-x border-gray-100">
            <span className="font-bold text-secondary-content select-none">{quantity}</span>
          </div>
          <div className={classNames('btn rounded-none', getButtonClass(buttonStyle))} onClick={increaseQuantity}>
            <IconPlus />
          </div>
        </div>
      </div>
      <div
        className={classNames('btn rounded-none ml-auto w-full flex-1 min-w-[200px]', getButtonClass(buttonStyle))}
        onClick={handleContinueButtonClick}
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

registerUniformComponent({
  type: 'addToCart',
  component: AddToCart,
});

export default AddToCart;
