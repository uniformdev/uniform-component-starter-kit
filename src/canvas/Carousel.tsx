import { FC, Fragment } from 'react';
import classNames from 'classnames';
import MultiCarousel from 'react-multi-carousel';
import { ComponentProps, componentStore, UniformText } from '@uniformdev/canvas-react';
import { ComponentInstance } from '@uniformdev/canvas';
import CarouselButtons from '@/components/CarouselButtons';
import Button from '@/components/Button';
import { getTextClass } from '@/utils';
import 'react-multi-carousel/lib/styles.css';

type Props = ComponentProps<{
  title: string;
  titleStyle: Types.HeadingStyles;
  description: string;
  buttonCopy: string;
  buttonLink: Types.ProjectMapLink;
  buttonStyle: Types.ButtonStyles;
}>;

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

const Carousel: FC<Props> = ({
  titleStyle: TitleTag = 'h1',
  description,
  buttonCopy,
  buttonLink,
  buttonStyle,
  component,
}) => (
  <>
    <div className="w-full flex flex-col md:flex-row md:items-center justify-between mb-6 md:mb-10 text-secondary-content">
      <div className="mb-6 md:mb-0 basis-2/3 xl:basis-auto">
        <UniformText parameterId="title" as={TitleTag} className={classNames('font-bold', getTextClass(TitleTag))} />
        {Boolean(description) && <UniformText parameterId="description" as="p" className="sm:pr-8" />}
      </div>
      {Boolean(buttonCopy && buttonLink) && <Button href={buttonLink.path} style={buttonStyle} copy={buttonCopy} />}
    </div>
    <MultiCarousel
      ssr
      deviceType="desktop"
      renderDotsOutside
      customButtonGroup={<CarouselButtons buttonStyle={buttonStyle} />}
      renderButtonGroupOutside
      shouldResetAutoplay={false}
      arrows={false}
      itemClass="px-2.5"
      containerClass="-mx-2.5"
      responsive={defaultResponsiveData}
    >
      {(component?.slots?.cardBlockInner || [])?.map((component: ComponentInstance, index) => {
        const Component = componentStore.get(component.type) || Fragment;
        const componentProps = Object.entries(component.parameters || {}).reduce(
          (acc, [key, { value }]) => ({ ...acc, [key]: value }),
          {}
        );
        const props = { ...componentProps, renderedFromCarousel: true };
        return <Component key={`${component._id}${index}`} {...props} />;
      })}
    </MultiCarousel>
  </>
);

export default Carousel;
