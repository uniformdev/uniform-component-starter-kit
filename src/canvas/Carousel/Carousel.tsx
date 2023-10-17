import { FC, useEffect, useRef, useState, createContext } from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import { UniformSlot, useUniformContextualEditingState } from '@uniformdev/canvas-react';
import { fromCamelCaseText } from '../../utilities';
import { CarouselProps, CarouselVariants } from '.';
import { CarouselInner } from './CarouselInner';

export const CarouselContext = createContext({ currentIndex: 0 });

export const Carousel: FC<CarouselProps> = ({ component }) => {
  const { selectedComponentReference } = useUniformContextualEditingState();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [reCheckCarouselSlider, setReCheckCarouselSlider] = useState<boolean>(false);
  const totalCountOfItems = component?.slots?.carouselItem?.length || 0;
  const variant = component?.variant;
  const container = useRef<HTMLInputElement>(null);
  const carouselItem = component?.slots?.carouselItem;

  useEffect(() => {
    const handleResize = () => setReCheckCarouselSlider(prevState => !prevState);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (typeof selectedComponentReference?.componentIndex !== 'number') {
      return;
    }

    setCurrentIndex(selectedComponentReference.componentIndex);
  }, [selectedComponentReference]);

  useEffect(() => {
    if (container.current) {
      const { clientWidth } = container.current;
      container.current.scrollLeft = currentIndex * clientWidth;
    }
  }, [currentIndex, reCheckCarouselSlider]);

  const onGoNext = () => {
    const nextSlideIndex = totalCountOfItems - 1 === currentIndex ? 0 : currentIndex + 1;
    setCurrentIndex(nextSlideIndex);
  };

  const onGoPrevious = () => {
    const previousSlideIndex = currentIndex === 0 ? totalCountOfItems - 1 : currentIndex - 1;
    setCurrentIndex(previousSlideIndex);
  };

  return (
    <CarouselContext.Provider
      value={{
        currentIndex,
      }}
    >
      <div>
        <div className="relative overflow-hidden">
          <div ref={container} className="flex flex-row items-center scroll-smooth overflow-x-hidden">
            <UniformSlot name="carouselItem" wrapperComponent={CarouselInner} />
          </div>
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2 z-50">
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
        {variant === CarouselVariants.ImageGallery && !!carouselItem?.length && (
          <div className="pt-2 flex flex-row gap-2 flex-wrap">
            {carouselItem.map((item, index) => {
              const { src } = item.parameters || {};
              const srcImage = src?.value as string | undefined;

              return (
                <button
                  type="submit"
                  aria-label="image-gallery"
                  key={`image-gallery-${index}`}
                  className={classNames(
                    'cursor-pointer w-32 h-32 outline outline-1 outline-gray-200 p-1.5 hover:p-0.5 ease-out duration-300',
                    { '!p-0.5 pointer-events-none': currentIndex === index }
                  )}
                  onClick={() => setCurrentIndex(index)}
                >
                  {srcImage ? (
                    <div className="relative w-full h-full">
                      <Image src={srcImage} fill className="object-cover" alt="" />
                    </div>
                  ) : (
                    <div className="bg-primary w-full h-full  flex justify-center items-center">
                      <span className="break-words">{fromCamelCaseText(item.type)}</span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </CarouselContext.Provider>
  );
};
