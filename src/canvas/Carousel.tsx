import { FC, useEffect, useState } from 'react';
import classNames from 'classnames';
import {
  ComponentProps,
  UniformSlot,
  registerUniformComponent,
  useUniformContextualEditingState,
  UniformText,
} from '@uniformdev/canvas-react';
import { getTextClass } from '@/utils';

export type Props = ComponentProps<{
  title: string;
  titleStyle: Types.HeadingStyles;
  description?: string;
}>;

const Carousel: FC<Props> = ({ component, titleStyle: TitleTag = 'h1', description }) => {
  const { selectedComponentReference, isContextualEditing } = useUniformContextualEditingState();
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalCountOfItems = component?.slots?.carouselItem?.length || 0;

  const onGoNext = () => {
    const nextSlideIndex = totalCountOfItems - 1 === currentIndex ? 0 : currentIndex + 1;
    setCurrentIndex(nextSlideIndex);
  };

  const onGoPrevious = () => {
    const previousSlideIndex = currentIndex === 0 ? totalCountOfItems - 1 : currentIndex - 1;
    setCurrentIndex(previousSlideIndex);
  };

  useEffect(() => {
    if (typeof selectedComponentReference?.componentIndex !== 'number') {
      return;
    }

    setCurrentIndex(selectedComponentReference.componentIndex);
  }, [selectedComponentReference]);

  return (
    <div>
      <div className="w-full flex flex-col md:flex-row md:items-center justify-between mb-6 md:mb-10 text-secondary-content">
        <div className="mb-6 md:mb-0 basis-2/3 xl:basis-auto">
          <UniformText parameterId="title" as={TitleTag} className={classNames('font-bold', getTextClass(TitleTag))} />
          {Boolean(description) && <UniformText parameterId="description" as="p" className="sm:pr-8" />}
        </div>
      </div>
      <div className="relative w-full min-h-[500px] overflow-hidden">
        <UniformSlot name="carouselItem">
          {({ child, key }) => {
            const keyElements = (key as string).split('-');

            const currentChildIndex = parseInt(keyElements[keyElements.length - 1], 10);

            return (
              <div
                id={`slide-${currentChildIndex}`}
                className={classNames('absolute transform-gpu transition-transform ease-linear w-full', {
                  'translate-x-0': currentChildIndex === currentIndex,
                  'translate-x-full': currentChildIndex > currentIndex,
                  '-translate-x-full': currentChildIndex < currentIndex,
                  'duration-500': !isContextualEditing,
                  'duration-0': isContextualEditing,
                })}
                key={currentChildIndex}
              >
                {child}
              </div>
            );
          }}
        </UniformSlot>
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a
            onClick={() => onGoPrevious()}
            className={classNames('btn btn-circle', { 'btn-disabled': currentIndex === 0 })}
          >
            ❮
          </a>
          <a
            onClick={() => onGoNext()}
            className={classNames('btn btn-circle', { 'btn-disabled': totalCountOfItems - 1 === currentIndex })}
          >
            ❯
          </a>
        </div>
      </div>
    </div>
  );
};

registerUniformComponent({
  type: 'carousel',
  component: Carousel,
});

export default Carousel;
