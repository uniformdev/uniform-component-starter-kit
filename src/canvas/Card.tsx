import { FC } from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import {
  ComponentProps,
  registerUniformComponent,
  UniformText,
  useUniformCurrentComposition,
} from '@uniformdev/canvas-react';
import Button from '../components/Button';
import { formatProjectMapLink, getImageUrl } from '../utilities';
import {
  getImageOverlayColorStyle,
  getImageOverlayOpacityStyle,
  getLineClampClass,
  getObjectFitClass,
} from '../utilities/styling';

export type Props = ComponentProps<{
  image: string | Types.CloudinaryImage;
  badge: string;
  badgeStyle: Types.BadgeStyles;
  badgeSize: Types.BadgeSize;
  title: string;
  description: string;
  buttonCopy: string;
  buttonLink?: Types.ProjectMapLink;
  buttonStyle: Types.ButtonStyles;
  lineCountRestriction: Types.AvailableMaxLineCount;
  useCustomTextElements?: boolean;
  overlayColor?: Types.AvailableColor;
  overlayOpacity?: Types.AvailableOpacity;
  objectFit?: Types.AvailableObjectFit;
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
  buttonLink,
  buttonStyle,
  title,
  buttonCopy,
  description,
  lineCountRestriction,
  useCustomTextElements,
  overlayOpacity,
  overlayColor,
  objectFit = 'cover',
  component: { variant } = {},
}) => {
  const imageUrl = getImageUrl(image);
  const { isContextualEditing } = useUniformCurrentComposition();

  const badgeClassNames = classNames('badge', getBadgeStyleClass(badgeStyle), getBadgeSizeClass(badgeSize));
  const titleClassNames = classNames('card-title', getTextClass(variant));
  const descriptionClassNames = classNames(getLineClampClass(lineCountRestriction), getTextClass(variant));

  const isBackgroundImage = variant === CardVariants.BackgroundImage;

  return (
    <div
      className={classNames('card w-96 max-w-full mx-0 md:mx-2 border border-gray-200', getContentClass(variant), {
        relative: isBackgroundImage,
      })}
    >
      <figure className={classNames({ relative: !isBackgroundImage })}>
        {Boolean(imageUrl) && (
          <Image
            alt="image"
            src={imageUrl}
            width={384}
            height={384}
            className={classNames(getObjectFitClass(objectFit || 'cover'), getImageSizeClassName(variant))}
          />
        )}
        <div
          className={classNames(
            'absolute top-0 left-0 right-0 bottom-0 rounded-xl',
            getImageOverlayOpacityStyle(overlayOpacity),
            getImageOverlayColorStyle(overlayColor)
          )}
        />
      </figure>
      <div className="card-body">
        {useCustomTextElements ? (
          <div className={badgeClassNames}>{badge}</div>
        ) : (
          <UniformText placeholder="Badge goes here" parameterId="badge" as="div" className={badgeClassNames} />
        )}
        {useCustomTextElements ? (
          <h2 className={titleClassNames}>{title}</h2>
        ) : (
          <UniformText placeholder="Title goes here" parameterId="title" as="h2" className={titleClassNames} />
        )}
        {useCustomTextElements ? (
          <div className={descriptionClassNames} dangerouslySetInnerHTML={{ __html: description }} />
        ) : (
          <UniformText
            placeholder="Description goes here"
            parameterId="description"
            className={descriptionClassNames}
            render={(value = '') => <div dangerouslySetInnerHTML={{ __html: value }} />}
          />
        )}

        <div className="card-actions justify-end mt-auto">
          {buttonLink && (
            <Button
              href={formatProjectMapLink(buttonLink)}
              style={buttonStyle}
              copy={
                useCustomTextElements ? (
                  <div
                    onClick={isContextualEditing ? e => e.preventDefault() : undefined}
                    className={descriptionClassNames}
                  >
                    {buttonCopy}
                  </div>
                ) : (
                  <UniformText
                    placeholder="Button copy goes here"
                    parameterId="buttonCopy"
                    onClick={isContextualEditing ? e => e.preventDefault() : undefined}
                  />
                )
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
