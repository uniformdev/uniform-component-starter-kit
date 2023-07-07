import { FC } from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import {
  ComponentProps,
  registerUniformComponent,
  UniformText,
  useUniformCurrentComposition,
} from '@uniformdev/canvas-react';
import Button from '@/components/Button';
import { getImageUrl } from '@/utils';
import { getLineClampClass } from '@/utils/styling';

type BadgeStyles = 'primary' | 'secondary' | 'accent' | 'outline';

type BadgeSize = 'xs' | 'sm' | 'md' | 'lg';

export type Props = ComponentProps<{
  image: string | Types.CloudinaryImage;
  badge: string;
  badgeStyle: BadgeStyles;
  badgeSize: BadgeSize;
  title: string;
  description: string;
  slug?: string;
  buttonCopy: string;
  buttonLink: Types.ProjectMapLink;
  buttonStyle: Types.ButtonStyles;
  lineCountRestriction: Types.AvailableMaxLineCount;
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
  slug = '',
  badgeSize = 'md',
  badgeStyle = 'secondary',
  buttonLink,
  buttonStyle,
  lineCountRestriction,
  component: { variant } = {},
}) => {
  const imageUrl = getImageUrl(image);
  const { isContextualEditing } = useUniformCurrentComposition();
  return (
    <div
      className={classNames(
        'card w-96 max-w-full min-h-96 my-2 mx-0 md:m-2 relative border border-gray-200',
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
        <UniformText
          placeholder="Badge goes here"
          parameterId="badge"
          as="div"
          className={classNames('badge', getBadgeStyleClass(badgeStyle), getBadgeSizeClass(badgeSize))}
        />
        <UniformText
          placeholder="Title goes here"
          parameterId="title"
          as="h2"
          className={classNames('card-title', getTextClass(variant))}
        />
        <UniformText
          placeholder="Description goes here"
          parameterId="description"
          className={classNames(getLineClampClass(lineCountRestriction), getTextClass(variant))}
          render={(value = '') => <div dangerouslySetInnerHTML={{ __html: value }} />}
        />
        <div className="card-actions justify-end mt-auto">
          {Boolean(buttonLink?.path) && (
            <Button
              href={`${buttonLink.path}${slug ? `/${slug}` : ''}`}
              style={buttonStyle}
              copy={
                <UniformText
                  placeholder="Button copy goes here"
                  parameterId="buttonCopy"
                  onClick={isContextualEditing ? e => e.preventDefault() : undefined}
                />
              }
            />
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
