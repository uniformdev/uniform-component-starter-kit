import { FC, useEffect, useRef, useState, createContext } from 'react';
import Image from '../../components/Image';
import classNames from 'classnames';
import { UniformSlot, useUniformContextualEditingState } from '@uniformdev/canvas-react';
import { fromCamelCaseText, getMediaUrl } from '../../utilities';
import { CarouselProps, CarouselVariants } from '.';
import { CarouselInner } from './CarouselInner';

export const CarouselContext = createContext({ currentIndex: 0 });

const formatNumber = (number: number) => (number < 10 ? `0${number}` : number);

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

  const renderCarouselButtons = () =>
    variant === CarouselVariants.Brochure ? (
      <div className=" w-full grid grid-cols-1 lg:grid-cols-12 gap-x-16 gap-y-0">
        <div className="lg:col-start-11 lg:col-span-3 flex justify-between">
          <div className="flex gap-x-4 items-center">
            {formatNumber(currentIndex + 1)} / {formatNumber(totalCountOfItems)}
          </div>
          <div className="flex gap-x-4">
            <button
              onClick={() => onGoPrevious()}
              className={classNames('btn btn-ghost', { 'btn-disabled': currentIndex === 0 })}
            >
              ❮
            </button>
            <button
              onClick={() => onGoNext()}
              className={classNames('btn btn-ghost', {
                'btn-disabled': totalCountOfItems - 1 === currentIndex,
              })}
            >
              ❯
            </button>
          </div>
        </div>
      </div>
    ) : (
      <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2 z-50">
        <button
          onClick={() => onGoPrevious()}
          className={classNames('btn btn-circle text-primary-content', { 'btn-disabled': currentIndex === 0 })}
        >
          ❮
        </button>
        <button
          onClick={() => onGoNext()}
          className={classNames('btn btn-circle btn-primary', {
            'btn-disabled': totalCountOfItems - 1 === currentIndex,
          })}
        >
          ❯
        </button>
      </div>
    );

  return (
    <CarouselContext.Provider
      value={{
        currentIndex,
      }}
    >
      <div>
        <div className="relative overflow-hidden">
          {renderCarouselButtons()}
          <div ref={container} className="flex flex-row items-center scroll-smooth overflow-x-hidden">
            <UniformSlot name="carouselItem" wrapperComponent={CarouselInner} />
          </div>
        </div>
        {variant === CarouselVariants.ImageGallery && !!carouselItem?.length && (
          <div className="pt-2 flex flex-row gap-2 flex-wrap">
            {carouselItem.map((item, index) => {
              const { src } = item.parameters || {};
              const srcImage = getMediaUrl(src?.value as string | undefined);

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
