import { FC, useCallback, useMemo } from 'react';
import classNames from 'classnames';
import IconArrow from '../../components/IconArrow';
import { getButtonAnimationClass, getButtonClass } from '../../utilities/styling';
import { CarouselButtonProps } from './';

const CarouselButtons: FC<CarouselButtonProps> = ({
  next,
  previous,
  carouselState,
  goToSlide,
  buttonStyle,
  buttonAnimationStyle,
  colorClassName,
}) => {
  const { totalItems = 0, currentSlide = 0, slidesToShow = 0 } = carouselState || {};
  const isLastSlide = useMemo(
    () => currentSlide + 1 === totalItems - slidesToShow + 1,
    [currentSlide, totalItems, slidesToShow]
  );

  const lastSlideIndex = useMemo(() => totalItems - slidesToShow, [slidesToShow, totalItems]);

  const handleNext = useCallback(() => {
    if (isLastSlide && goToSlide) return goToSlide(0);
    next?.();
  }, [goToSlide, isLastSlide, next]);

  const handlePrevious = useCallback(() => {
    if (!currentSlide && goToSlide) return goToSlide(lastSlideIndex);
    previous?.();
  }, [currentSlide, goToSlide, lastSlideIndex, previous]);

  return totalItems > slidesToShow ? (
    <div className="flex justify-center sm:justify-end items-center my-6 lg:mt-9">
      <button
        aria-label="Go to previous"
        className={classNames(
          'btn rounded-none',
          buttonAnimationStyle
            ? getButtonAnimationClass(buttonStyle, buttonAnimationStyle)
            : getButtonClass(buttonStyle)
        )}
        onClick={handlePrevious}
      >
        <IconArrow direction="left" />
      </button>
      <p className={classNames('min-w-[90px] text-center font-bold', colorClassName)}>
        {currentSlide + 1} / {totalItems - slidesToShow + 1}
      </p>
      <button
        aria-label="Go to next"
        className={classNames(
          'btn rounded-none',
          buttonAnimationStyle
            ? getButtonAnimationClass(buttonStyle, buttonAnimationStyle)
            : getButtonClass(buttonStyle)
        )}
        onClick={handleNext}
      >
        <IconArrow direction="right" />
      </button>
    </div>
  ) : null;
};

export default CarouselButtons;
