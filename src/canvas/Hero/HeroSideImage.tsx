import { FC, useMemo } from 'react';
import classNames from 'classnames';
import { useUniformContextualEditingState } from '@uniformdev/canvas-react';
import { useHeroAnimation } from './animation';
import { Container, Description, EyebrowText, PrimaryButton, SecondaryButton, SideImage, Title } from './atoms';
import { AnimationVariant } from '../../components/AnimatedContainer';
import { HeroVariant, HeroProps, DEFAULT_TEXT_COLOR } from './';
import { REGEX_COLOR_HEX } from '../../utilities';
import { getHeroTextStyle } from './helpers';

export const HeroSideImage: FC<HeroProps> = ({
  title,
  titleStyle = 'h1',
  description,
  image,
  video,
  primaryButtonCopy,
  primaryButtonLink,
  primaryButtonStyle = 'primary',
  primaryButtonAnimationType,
  secondaryButtonCopy,
  secondaryButtonLink,
  secondaryButtonStyle = 'primary',
  secondaryButtonAnimationType,
  component,
  overlayOpacity,
  overlayColor,
  objectFit,
  useCustomTextElements = false,
  fullHeight,
  animationType,
  duration = 'medium',
  animationOrder,
  backgroundType, // Deprecated
  backgroundColor,
  containerVariant,
  paddingBottom,
  paddingTop,
  marginBottom,
  marginTop,
  textColorVariant, // Deprecated
  textColor = DEFAULT_TEXT_COLOR,
  animationPreview,
  delay = 'none',
  styles,
}) => {
  const { previewMode } = useUniformContextualEditingState();
  const isContextualEditing = previewMode === 'editor';
  const { variant } = component || {};

  const currentColor = REGEX_COLOR_HEX.test(textColorVariant || textColor || DEFAULT_TEXT_COLOR)
    ? textColor
    : undefined;
  const baseTextStyle = getHeroTextStyle(textColorVariant || textColor);

  const heroContentClass = variant === HeroVariant.ImageLeft ? 'flex-col lg:flex-row' : 'flex-col lg:flex-row-reverse';

  const { ElementWrapper, getDelayValue } = useHeroAnimation({
    duration,
    animationOrder,
    delay,
    animationType,
    animationPreview,
  });

  const textAnimationSide = useMemo(
    () => (variant === HeroVariant.ImageLeft ? AnimationVariant.FadeInLeft : AnimationVariant.FadeInRight),
    [variant]
  );

  const imageAnimationSide = useMemo(
    () => (variant === HeroVariant.ImageLeft ? AnimationVariant.FadeInRight : AnimationVariant.FadeInLeft),
    [variant]
  );

  return (
    <Container
      fullHeight={fullHeight}
      className={classNames({ [baseTextStyle]: !currentColor })}
      paddingBottom={paddingBottom}
      paddingTop={paddingTop}
      marginBottom={marginBottom}
      marginTop={marginTop}
      backgroundType={backgroundColor || backgroundType}
      containerVariant={containerVariant}
    >
      <div
        className={classNames('hero-content text-center p-0', heroContentClass, {
          'h-full items-start pt-20': fullHeight,
        })}
        style={{ color: currentColor }}
      >
        <ElementWrapper
          duration={duration}
          delay={getDelayValue(0)}
          animationVariant={animationType === 'fadeIn' ? AnimationVariant.FadeIn : imageAnimationSide}
        >
          <SideImage
            video={video}
            image={image}
            objectFit={objectFit}
            overlayColor={overlayColor}
            overlayOpacity={overlayOpacity}
            className={styles?.sideImage}
          />
        </ElementWrapper>

        <div className={classNames('flex flex-col mx-1 md:mx-10 z-20 text-start', styles?.textAlign)}>
          <ElementWrapper
            duration={duration}
            delay={getDelayValue(0)}
            animationVariant={animationType === 'fadeIn' ? AnimationVariant.FadeIn : textAnimationSide}
          >
            <EyebrowText className={styles?.eyebrowText} />
          </ElementWrapper>
          <ElementWrapper
            duration={duration}
            delay={getDelayValue(1.5)}
            animationVariant={animationType === 'fadeIn' ? AnimationVariant.FadeIn : textAnimationSide}
          >
            <Title
              className={classNames('py-2', styles?.title)}
              titleStyle={titleStyle}
              useCustomTextElements={useCustomTextElements}
              title={title}
            />
          </ElementWrapper>
          <ElementWrapper
            duration={duration}
            delay={getDelayValue(3)}
            animationVariant={animationType === 'fadeIn' ? AnimationVariant.FadeIn : textAnimationSide}
          >
            <Description className={classNames('py-10', styles?.description)} />
          </ElementWrapper>
          <div className={classNames('pb-6', { 'py-6': !description })}>
            {(Boolean(primaryButtonCopy) || isContextualEditing) && (
              <ElementWrapper
                duration={duration}
                delay={getDelayValue(3)}
                animationVariant={animationType === 'fadeIn' ? AnimationVariant.FadeIn : textAnimationSide}
              >
                <PrimaryButton
                  animationType={primaryButtonAnimationType}
                  primaryButtonLink={primaryButtonLink}
                  primaryButtonStyle={primaryButtonStyle}
                />
              </ElementWrapper>
            )}
            {(Boolean(secondaryButtonCopy) || isContextualEditing) && (
              <ElementWrapper
                duration={duration}
                delay={getDelayValue(3)}
                animationVariant={animationType === 'fadeIn' ? AnimationVariant.FadeIn : textAnimationSide}
              >
                <SecondaryButton
                  animationType={secondaryButtonAnimationType}
                  secondaryButtonLink={secondaryButtonLink}
                  secondaryButtonStyle={secondaryButtonStyle}
                />
              </ElementWrapper>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};
