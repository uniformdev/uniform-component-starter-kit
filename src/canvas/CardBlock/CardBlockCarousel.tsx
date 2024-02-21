import { FC, useCallback } from 'react';
import classNames from 'classnames';
import MultiCarousel from 'react-multi-carousel';
import { UniformText, UniformSlot, UniformSlotWrapperComponentProps } from '@uniformdev/canvas-react';
import 'react-multi-carousel/lib/styles.css';
import CarouselButtons from '../../components/CarouselButtons';
import Button from '../../components/Button';
import { getTextClass } from '../../utilities/styling';
import { formatProjectMapLink } from '../../utilities';
import { getColorClassName } from './helpers';
import { CardBlockProps } from '.';

const defaultResponsiveData = {
  desktop: {
    breakpoint: { max: Infinity, min: 768 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 768, min: 568 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 568, min: 0 },
    items: 1,
  },
};

export const CardBlockCarousel: FC<CardBlockProps> = ({
  titleStyle: TitleTag = 'h1',
  buttonLink,
  buttonStyle,
  buttonAnimationType,
  textColorVariant,
  styles,
}) => {
  const colorClassName = getColorClassName(textColorVariant);

  const carouselInner = useCallback(
    ({ items }: UniformSlotWrapperComponentProps) => {
      return (
        <MultiCarousel
          ssr
          deviceType="desktop"
          renderDotsOutside
          customButtonGroup={
            <CarouselButtons
              buttonAnimationStyle={buttonAnimationType}
              buttonStyle={buttonStyle}
              colorClassName={colorClassName}
            />
          }
          renderButtonGroupOutside
          shouldResetAutoplay={false}
          arrows={false}
          itemClass="px-2.5 flex"
          containerClass="-mx-2.5"
          responsive={defaultResponsiveData}
        >
          {items}
        </MultiCarousel>
      );
    },
    [buttonStyle, colorClassName, buttonAnimationType]
  );

  return (
    <div>
      <div
        className={classNames(
          'w-full flex flex-col md:flex-row md:items-center justify-between mb-6 md:mb-10',
          styles?.container,
          colorClassName
        )}
      >
        <div className="mb-6 md:mb-0 basis-2/3 xl:basis-auto">
          <UniformText
            placeholder={'Title goes here'}
            parameterId="title"
            as={TitleTag}
            className={classNames('font-bold', getTextClass(TitleTag))}
          />
          <UniformText placeholder={'Description goes here'} parameterId="description" as="p" className="sm:pr-8" />
        </div>
        {Boolean(buttonLink) && (
          <Button
            href={formatProjectMapLink(buttonLink)}
            style={buttonStyle}
            animationType={buttonAnimationType}
            copy={<UniformText placeholder="Button copy goes here" parameterId="buttonCopy" />}
          />
        )}
      </div>
      <UniformSlot name="cardBlockInner" wrapperComponent={carouselInner} />
    </div>
  );
};
