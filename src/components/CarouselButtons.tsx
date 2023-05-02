import { FC, useCallback, useMemo } from 'react';
import classNames from 'classnames';
import { ButtonGroupProps } from 'react-multi-carousel';
import IconArrow from '@/components/IconArrow';
import { getButtonClass } from '@/utils';

type CarouselButtonProps = ButtonGroupProps & {
  buttonStyle: Types.ButtonStyles;
};

const CarouselButtons: FC<CarouselButtonProps> = ({ next, previous, carouselState, goToSlide, buttonStyle }) => {
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
    <div className="flex justify-center sm:justify-end items-center mt-6 lg:mt-9">
      <div className={classNames('btn rounded-none', getButtonClass(buttonStyle))} onClick={handlePrevious}>
        <IconArrow direction="left" />
      </div>
      <p className="min-w-[90px] text-center font-bold text-secondary-content">
        {currentSlide + 1} / {totalItems - slidesToShow + 1}
      </p>
      <div className={classNames('btn rounded-none', getButtonClass(buttonStyle))} onClick={handleNext}>
        <IconArrow direction="right" />
      </div>
    </div>
  ) : null;
};

export default CarouselButtons;
