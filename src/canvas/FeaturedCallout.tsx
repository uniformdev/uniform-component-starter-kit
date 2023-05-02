import { FC } from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import { UniformSlot, registerUniformComponent, ComponentProps, UniformText } from '@uniformdev/canvas-react';
import { getTextClass, getImageUrl } from '@/utils';

export type Props = ComponentProps<{
  eyebrowText?: string;
  title: string;
  titleStyle: Types.HeadingStyles;
  description: string;
  image?: string | Types.CloudinaryImage;
}>;

export enum FeaturedCalloutVariant {
  ImageRight = 'imageRight',
}

const getFeaturedCalloutContentClass = (variantId?: string) => {
  switch (variantId) {
    case FeaturedCalloutVariant.ImageRight:
      return 'lg:order-1 justify-end';
    default:
      return '';
  }
};

const getFeaturedCalloutTextContentClass = (variantId?: string) => {
  switch (variantId) {
    case FeaturedCalloutVariant.ImageRight:
      return 'lg:justify-end';
    default:
      return '';
  }
};

const FeaturedCallout: FC<Props> = ({
  eyebrowText,
  titleStyle: TitleTag = 'h1',
  image,
  component: { variant } = {},
}) => {
  const imageUrl = getImageUrl(image);
  return (
    <div className="hero flex flex-wrap lg:gap-10 lg:flex-nowrap text-secondary-content">
      <div
        className={classNames(
          'flex items-center justify-start w-full lg:w-1/2',
          getFeaturedCalloutContentClass(variant)
        )}
      >
        <div>{Boolean(imageUrl) && <Image src={imageUrl} width="521" height="482" alt="Feature" />}</div>
      </div>

      <div
        className={classNames(
          'hero-content flex flex-wrap items-center w-full lg:w-1/2 p-0',
          getFeaturedCalloutTextContentClass(variant)
        )}
      >
        <div>
          <div className="flex flex-col w-full">
            {eyebrowText && (
              <UniformText
                parameterId="eyebrowText"
                as="div"
                className="text-sm font-bold tracking-wider uppercase text-primary my-3"
              />
            )}
            <UniformText
              parameterId="title"
              as={TitleTag}
              className={classNames('font-bold', getTextClass(TitleTag))}
            />
            <UniformText parameterId="description" as="p" className="py-6" />
          </div>
          <div className="w-full">
            <UniformSlot name="feature" />
          </div>
        </div>
      </div>
    </div>
  );
};

[undefined, FeaturedCalloutVariant.ImageRight].forEach(variantId => {
  registerUniformComponent({
    type: 'featuredCallout',
    component: FeaturedCallout,
    variantId,
  });
});

export default FeaturedCallout;
