import { FC } from 'react';
import Image from '../../components/Image';
import classNames from 'classnames';
import { UniformText, useUniformContextualEditingState } from '@uniformdev/canvas-react';
import Button from '../../components/Button';
import {
  getImageOverlayColorStyle,
  getImageOverlayOpacityStyle,
  getLineClampClass,
  getObjectFitClass,
} from '../../utilities/styling';
import { formatProjectMapLink, getMediaUrl } from '../../utilities';
import { getBadgeSizeClass, getBadgeStyleClass, getContentClass, getDescriptionClass, getTextClass } from './helpers';
import { useAnimationElements } from './animation';
import { CardVariants, CardProps } from './';

export const Card: FC<CardProps> = ({
  image,
  badge = '',
  badgeSize = 'md',
  badgeStyle = 'secondary',
  buttonLink,
  buttonStyle,
  buttonAnimationType,
  title,
  buttonCopy,
  description,
  lineCountRestriction,
  useCustomTextElements,
  overlayOpacity,
  overlayColor,
  objectFit = 'cover',
  component: { variant } = {},
  textColorVariant = 'Dark',
  animationType,
  duration = 'medium',
  animationPreview,
  delay,
  styles,
}) => {
  const { previewMode } = useUniformContextualEditingState();
  const isContextualEditing = previewMode === 'editor';
  const imageUrl = getMediaUrl(image);

  const badgeClassNames = classNames('badge', getBadgeStyleClass(badgeStyle), getBadgeSizeClass(badgeSize));

  const titleClassNames = classNames(
    'card-title',
    getTextClass(variant),
    textColorVariant === 'Dark' ? 'text-secondary-content' : 'text-primary-content',
    styles?.title
  );

  const descriptionClassNames = classNames(
    getLineClampClass(lineCountRestriction),
    getDescriptionClass(variant),
    textColorVariant === 'Dark' ? 'text-secondary-content' : 'text-primary-content',
    styles?.description,
    'whitespace-break-spaces'
  );

  const isBackgroundImage = variant === CardVariants.BackgroundImage;

  const { CardWrapper, ImageWrapper, TitleWrapper } = useAnimationElements(
    animationType,
    duration,
    !!animationPreview,
    delay
  );

  return (
    <CardWrapper
      className={classNames(
        'card w-full h-full border border-gray-200',
        getContentClass(variant),
        { relative: isBackgroundImage, '!border-0 !rounded-none': variant === CardVariants.Featured },
        styles?.container
      )}
    >
      <ImageWrapper>
        <figure
          className={classNames(
            {
              'relative h-48': !isBackgroundImage && Boolean(imageUrl),
            },
            styles?.imageContainer
          )}
        >
          {Boolean(imageUrl) && (
            <Image
              alt="image"
              src={imageUrl}
              className={classNames(
                'absolute top-0 left-0 right-0 bottom-0',
                { 'rounded-xl': isBackgroundImage },
                getObjectFitClass(objectFit || 'cover'),
                styles?.image
              )}
              fill
            />
          )}
          <div
            className={classNames(
              'absolute top-0 left-0 right-0 bottom-0',
              { 'rounded-t-xl': !isBackgroundImage },
              { 'rounded-xl': isBackgroundImage },
              getImageOverlayOpacityStyle(overlayOpacity),
              getImageOverlayColorStyle(overlayColor)
            )}
          />
        </figure>
      </ImageWrapper>
      <div
        className={classNames(
          'card-body z-10',
          {
            'px-2': variant === CardVariants.Featured,
          },
          styles?.cardBody
        )}
      >
        <TitleWrapper>
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
        </TitleWrapper>
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
          {(Boolean(buttonCopy) || isContextualEditing) && (
            <Button
              href={formatProjectMapLink(buttonLink)}
              style={buttonStyle}
              animationType={buttonAnimationType}
              copy={
                useCustomTextElements ? (
                  <div>{buttonCopy}</div>
                ) : (
                  <UniformText placeholder="Button copy goes here" parameterId="buttonCopy" />
                )
              }
            />
          )}
        </div>
      </div>
    </CardWrapper>
  );
};
