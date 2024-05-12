import { FC } from 'react';
import classNames from 'classnames';
import { useUniformContextualEditingState } from '@uniformdev/canvas-react';
import { useHeroAnimation } from './animation';
import { BackgroundImage, Container, Description, EyebrowText, PrimaryButton, SecondaryButton, Title } from './atoms';
import { AnimationVariant } from '../../components/AnimatedContainer';
import { DEFAULT_TEXT_COLOR, HeroProps } from './';
import { REGEX_COLOR_HEX } from '../../utilities';
import { getHeroTextStyle } from './helpers';

export const HeroBackgroundImage: FC<HeroProps> = ({
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
  const currentColor = REGEX_COLOR_HEX.test(textColorVariant || textColor || DEFAULT_TEXT_COLOR)
    ? textColor
    : undefined;
  const baseTextStyle = getHeroTextStyle(textColorVariant || textColor);

  const { ElementWrapper, getDelayValue } = useHeroAnimation({
    duration,
    animationOrder,
    delay,
    animationType,
    animationPreview,
  });

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
        className={classNames('hero-content text-center p-0', {
          'h-full items-start pt-20': fullHeight,
        })}
        style={{ color: currentColor }}
      >
        <BackgroundImage
          image={image}
          video={video}
          objectFit={objectFit}
          overlayColor={overlayColor}
          overlayOpacity={overlayOpacity}
        />

        <div className={classNames('flex flex-col mx-1 md:mx-10 z-20')}>
          <ElementWrapper
            duration={duration}
            delay={getDelayValue(0)}
            animationVariant={animationType === 'fadeIn' ? AnimationVariant.FadeIn : AnimationVariant.FadeInTop}
          >
            <EyebrowText className={styles?.eyebrowText} />
          </ElementWrapper>
          <ElementWrapper
            duration={duration}
            delay={getDelayValue(1.5)}
            animationVariant={animationType === 'fadeIn' ? AnimationVariant.FadeIn : AnimationVariant.FadeInTop}
          >
            <Title
              titleStyle={titleStyle}
              useCustomTextElements={useCustomTextElements}
              title={title}
              className={styles?.title}
            />
          </ElementWrapper>
          <ElementWrapper
            duration={duration}
            delay={getDelayValue(3)}
            animationVariant={animationType === 'fadeIn' ? AnimationVariant.FadeIn : AnimationVariant.FadeInTop}
          >
            {styles?.descriptionSeparator && description ? <div className={styles?.descriptionSeparator} /> : null}
          </ElementWrapper>
          <ElementWrapper
            duration={duration}
            delay={getDelayValue(4.5)}
            animationVariant={animationType === 'fadeIn' ? AnimationVariant.FadeIn : AnimationVariant.FadeInTop}
          >
            <Description className={styles?.description} />
          </ElementWrapper>

          <div className="py-6">
            {(Boolean(primaryButtonCopy) || isContextualEditing) && (
              <ElementWrapper
                duration={duration}
                delay={getDelayValue(6)}
                animationVariant={animationType === 'fadeIn' ? AnimationVariant.FadeIn : AnimationVariant.FadeInTop}
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
                delay={getDelayValue(9)}
                animationVariant={animationType === 'fadeIn' ? AnimationVariant.FadeIn : AnimationVariant.FadeInTop}
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
