import { FC } from 'react';
import Image from '../Image';
import classNames from 'classnames';
import { UniformText, useUniformContextualEditingState } from '@uniformdev/canvas-react';
import Button from '../../components/Button';
import { formatProjectMapLink, getMediaUrl } from '../../utilities';
import { getImageOverlayColorStyle, getImageOverlayOpacityStyle, getObjectFitClass } from '../../utilities/styling';
import { AnimationVariant } from '../AnimatedContainer';
import { withoutContainer } from '../../hocs/withoutContainer';
import FeatureIcon from './FeatureIcon';
import { useProductInfoAnimation } from './animation';
import { Props } from '.';

const ProductInfo: FC<Props> = ({
  titleStyle: TitleTag = 'h1',
  primaryButtonStyle = 'primary',
  secondaryButtonStyle = 'primary',
  primaryButtonLink,
  primaryButtonAnimationType,
  secondaryButtonLink,
  secondaryButtonAnimationType,
  image,
  overlayColor,
  overlayOpacity,
  objectFit,
  onClickPrimaryButton,
  onClickSecondaryButton,
  features,
  fullHeight,
  useCustomTextElements,
  eyebrowText,
  title,
  description,
  highlightText,
  subTitle,
  secondaryButtonCopy,
  primaryButtonCopy,
  animationType,
  duration = 'medium',
  animationOrder,
  animationPreview,
  delay = 'none',
  styles,
}) => {
  const { previewMode } = useUniformContextualEditingState();
  const isContextualEditing = previewMode === 'editor';
  const imageUrl = getMediaUrl(image);
  const { ElementWrapper, getDelayValue } = useProductInfoAnimation({
    duration,
    animationOrder,
    delay,
    animationType,
    animationPreview,
  });

  return (
    <div
      className={classNames('hero relative w-full h-full flex justify-end px-4 md:px-0', {
        'min-h-[700px]': !fullHeight,
        'min-h-[calc(100vh-64px)]': fullHeight,
      })}
    >
      {image && (
        <>
          <Image
            fill
            alt="hero-image"
            src={imageUrl}
            priority
            className={classNames(
              'absolute top-0 bottom-0 left-0 right-0 z-10',
              getObjectFitClass(objectFit || 'cover')
            )}
          />
          <div
            className={classNames(
              'absolute top-0 bottom-0 left-0 right-0 z-10',
              getImageOverlayOpacityStyle(overlayOpacity),
              getImageOverlayColorStyle(overlayColor)
            )}
          />
        </>
      )}
      <div className={classNames('flex w-full md:w-1/2 flex-col mx-1 md:mx-10 z-20 text-primary-content')}>
        <ElementWrapper
          duration={duration}
          delay={getDelayValue(0)}
          animationVariant={animationType === 'fadeIn' ? AnimationVariant.FadeIn : AnimationVariant.FadeInTop}
        >
          {useCustomTextElements ? (
            <p className={classNames('uppercase text-lg mb-5', styles?.eyebrow)}>{eyebrowText}</p>
          ) : (
            <UniformText
              placeholder="Eyebrow text goes here"
              parameterId="eyebrowText"
              as="p"
              className={classNames('uppercase text-lg mb-5', styles?.eyebrow)}
            />
          )}
        </ElementWrapper>
        <ElementWrapper
          duration={duration}
          delay={getDelayValue(1.5)}
          animationVariant={animationType === 'fadeIn' ? AnimationVariant.FadeIn : AnimationVariant.FadeInTop}
        >
          {useCustomTextElements ? (
            <TitleTag className={classNames('text-secondary font-bold text-4xl mb-5', styles?.title)}>{title}</TitleTag>
          ) : (
            <UniformText
              placeholder="Title goes here"
              parameterId="title"
              as={TitleTag}
              className={classNames('text-secondary font-bold text-4xl mb-5', styles?.title)}
            />
          )}
        </ElementWrapper>
        <ElementWrapper
          duration={duration}
          delay={getDelayValue(3)}
          animationVariant={animationType === 'fadeIn' ? AnimationVariant.FadeIn : AnimationVariant.FadeInTop}
        >
          {useCustomTextElements ? (
            <div className={classNames('text-xl font-light mb-5', styles?.subtitle)}>{subTitle}</div>
          ) : (
            <UniformText
              placeholder="Subtitle goes here"
              parameterId="subTitle"
              className={classNames('text-xl font-light mb-5', styles?.subtitle)}
            />
          )}
        </ElementWrapper>
        <ElementWrapper
          duration={duration}
          delay={getDelayValue(4.5)}
          animationVariant={animationType === 'fadeIn' ? AnimationVariant.FadeIn : AnimationVariant.FadeInTop}
        >
          {useCustomTextElements ? (
            <div className={classNames('text-lg mb-5', styles?.description)}>{description}</div>
          ) : (
            <UniformText
              placeholder="Description goes here"
              parameterId="description"
              className={classNames('text-lg mb-5', styles?.description)}
            />
          )}
        </ElementWrapper>
        <ElementWrapper
          duration={duration}
          delay={getDelayValue(6)}
          animationVariant={animationType === 'fadeIn' ? AnimationVariant.FadeIn : AnimationVariant.FadeInTop}
        >
          {useCustomTextElements ? (
            <div className={styles?.highlightText}>{highlightText}</div>
          ) : (
            <UniformText
              className={styles?.highlightText}
              placeholder="Highlight text goes here"
              parameterId="highlightText"
            />
          )}
        </ElementWrapper>
        <div className="lg:w-1/3 py-10">
          {(Boolean(primaryButtonCopy) || isContextualEditing) && (
            <ElementWrapper
              duration={duration}
              delay={getDelayValue(9)}
              animationVariant={animationType === 'fadeIn' ? AnimationVariant.FadeIn : AnimationVariant.FadeInTop}
            >
              <Button
                className="w-full"
                href={formatProjectMapLink(primaryButtonLink)}
                onClick={onClickPrimaryButton}
                animationType={primaryButtonAnimationType}
                copy={
                  useCustomTextElements ? (
                    <div>{primaryButtonCopy}</div>
                  ) : (
                    <UniformText placeholder="Button copy goes here" parameterId="primaryButtonCopy" />
                  )
                }
                style={primaryButtonStyle}
              />
            </ElementWrapper>
          )}
          {(Boolean(secondaryButtonCopy) || isContextualEditing) && (
            <ElementWrapper
              duration={duration}
              delay={getDelayValue(11.5)}
              animationVariant={animationType === 'fadeIn' ? AnimationVariant.FadeIn : AnimationVariant.FadeInTop}
            >
              <Button
                href={formatProjectMapLink(secondaryButtonLink)}
                onClick={onClickSecondaryButton}
                className={classNames('w-full mt-5', { 'border-secondary': !secondaryButtonAnimationType })}
                animationType={secondaryButtonAnimationType}
                copy={
                  useCustomTextElements ? (
                    <div>{secondaryButtonCopy}</div>
                  ) : (
                    <UniformText placeholder="Button copy goes here" parameterId="secondaryButtonCopy" />
                  )
                }
                style={secondaryButtonStyle}
              />
            </ElementWrapper>
          )}
        </div>

        <ElementWrapper
          duration={duration}
          delay={getDelayValue(13)}
          animationVariant={animationType === 'fadeIn' ? AnimationVariant.FadeIn : AnimationVariant.FadeInTop}
        >
          <div className="flex justify-between lg:w-3/4">
            {(features || []).map(feature => (
              <div className="flex items-center" key={feature}>
                <FeatureIcon />
                <p className="ml-2 text-sm md:text-base">{feature}</p>
              </div>
            ))}
          </div>
        </ElementWrapper>
      </div>
    </div>
  );
};

export default withoutContainer(ProductInfo, { withoutPaddings: true });
