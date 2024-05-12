import { useContext } from 'react';
import classNames from 'classnames';
import { useUniformContextualEditingState, UniformSlotProps } from '@uniformdev/canvas-react';
import { CarouselContext } from './Carousel';

export const CarouselInner: UniformSlotProps<string>['wrapperComponent'] = ({ items }) => {
  const { previewMode } = useUniformContextualEditingState();
  const isContextualEditing = previewMode === 'editor';
  const { currentIndex } = useContext(CarouselContext);

  return (
    <>
      {items.map((item, index) => (
        <div
          id={`slide-${index}`}
          key={index}
          className={classNames('min-w-full', {
            hidden: isContextualEditing && currentIndex !== index,
          })}
        >
          {item}
        </div>
      ))}
    </>
  );
};
