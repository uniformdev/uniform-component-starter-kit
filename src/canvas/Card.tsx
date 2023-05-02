import { FC } from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import { ComponentProps, registerUniformComponent, UniformText } from '@uniformdev/canvas-react';
import Button from '@/components/Button';
import { getImageUrl } from '@/utils';

type BadgeStyles = 'primary' | 'secondary' | 'accent' | 'outline';

type BadgeSize = 'xs' | 'sm' | 'md' | 'lg';

export type Props = ComponentProps<{
  image: string | Types.CloudinaryImage;
  badge: string;
  badgeStyle: BadgeStyles;
  badgeSize: BadgeSize;
  title: string;
  description: string;
  buttonCopy: string;
  renderedFromCarousel?: boolean;
  buttonLink: Types.ProjectMapLink;
  buttonStyle: Types.ButtonStyles;
}>;

export enum CardVariants {
  BackgroundImage = 'backgroundImage',
}

const getContentClass = (variantId?: string) => {
  switch (variantId) {
    case CardVariants.BackgroundImage:
      return 'image-full';
    default:
      return '';
  }
};

const getTextClass = (variantId?: string) => {
  switch (variantId) {
    case CardVariants.BackgroundImage:
      return 'text-primary-content';
    default:
      return 'text-secondary-content';
  }
};

const getBadgeStyleClass = (badgeStyle: Props['badgeStyle']) => {
  switch (badgeStyle) {
    case 'outline':
      return 'badge-outline';
    case 'primary':
      return 'badge-primary text-primary-content';
    case 'secondary':
      return 'badge-secondary text-secondary-content';
    case 'accent':
      return 'badge-accent text-accent-content';
    default:
      return '';
  }
};

const getBadgeSizeClass = (badgeSize: Props['badgeSize']) => {
  switch (badgeSize) {
    case 'xs':
      return 'badge-xs';
    case 'sm':
      return 'badge-sm';
    case 'md':
      return 'badge-md';
    case 'lg':
      return 'badge-lg';
    default:
      return '';
  }
};

const getImageSizeClassName = (variantId?: string) => {
  switch (variantId) {
    case CardVariants.BackgroundImage:
      return 'h-full';
    default:
      return 'h-48';
  }
};

const Card: FC<Props> = ({
  image,
  badge,
  badgeSize = 'md',
  badgeStyle = 'secondary',
  description,
  buttonCopy,
  buttonLink,
  buttonStyle,
  renderedFromCarousel,
  component: { variant } = {},
}) => {
  const imageUrl = getImageUrl(image);
  return (
    <div
      className={classNames(
        'card w-96 max-w-full min-h-96 shadow-xl my-2 mx-0 md:m-2 relative',
        getContentClass(variant)
      )}
    >
      {variant === CardVariants.BackgroundImage && (
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-50 rounded-xl" />
      )}
      <figure>
        {Boolean(imageUrl) && (
          <Image
            alt="image"
            src={imageUrl}
            width={384}
            height={384}
            className={classNames('object-cover', getImageSizeClassName(variant))}
          />
        )}
      </figure>
      <div className="card-body">
        {Boolean(badge && !renderedFromCarousel) && (
          <UniformText
            parameterId="badge"
            as="div"
            className={classNames('badge', getBadgeStyleClass(badgeStyle), getBadgeSizeClass(badgeSize))}
          />
        )}
        <UniformText parameterId="title" as="h2" className={classNames('card-title', getTextClass(variant))} />
        {Boolean(description) && <UniformText parameterId="description" as="p" className={getTextClass(variant)} />}
        <div className="card-actions justify-end">
          {Boolean(buttonCopy && buttonLink?.path) && (
            <Button href={buttonLink?.path} style={buttonStyle} copy={<UniformText parameterId="buttonCopy" />} />
          )}
        </div>
      </div>
    </div>
  );
};

[undefined, CardVariants.BackgroundImage].forEach(variantId => {
  registerUniformComponent({
    type: 'card',
    component: Card,
    variantId,
  });
});

export default Card;
