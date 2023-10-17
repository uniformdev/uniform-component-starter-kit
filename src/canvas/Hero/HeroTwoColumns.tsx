import { FC } from 'react';
import classNames from 'classnames';
import { useHeroAnimation } from './animation';
import { BackgroundImage, Container, Description, EyebrowText, PrimaryButton, SecondaryButton, Title } from './atoms';
import { AnimationVariant } from '../../components/AnimatedContainer';
import { HeroProps } from './';

export const HeroTwoColumns: FC<HeroProps> = ({
  title,
  titleStyle = 'h1',
  image,
  video,
  primaryButtonLink,
  primaryButtonStyle = 'primary',
  primaryButtonAnimationType,
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
  backgroundType,
  containerVariant,
  paddingBottom,
  paddingTop,
  marginBottom,
  marginTop,
  textColorVariant = 'Light',
  animationPreview,
  delay = 'none',
  styles,
}) => {
  const baseTextStyle = textColorVariant === 'Light' ? 'text-primary-content' : 'text-secondary-content';

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
      className={baseTextStyle}
      paddingBottom={paddingBottom}
      paddingTop={paddingTop}
      marginBottom={marginBottom}
      marginTop={marginTop}
      backgroundType={backgroundType}
      containerVariant={containerVariant}
    >
      <div
        className={classNames('hero-content text-center p-0', {
          'h-full items-start pt-20': fullHeight,
        })}
      >
        <BackgroundImage
          image={image}
          video={video}
          objectFit={objectFit}
          overlayColor={overlayColor}
          overlayOpacity={overlayOpacity}
        />

        <div className={classNames('flex flex-row mx-1 md:mx-10 z-20')}>
          <div className="grid grid-cols-2 gap-x-28">
            <div className="flex flex-col">
              <ElementWrapper
                duration={duration}
                delay={getDelayValue(0)}
                animationVariant={animationType === 'fadeIn' ? AnimationVariant.FadeIn : AnimationVariant.FadeInRight}
              >
                <EyebrowText className={styles?.eyebrowText} />
              </ElementWrapper>
              <ElementWrapper
                duration={duration}
                delay={getDelayValue(1.5)}
                animationVariant={animationType === 'fadeIn' ? AnimationVariant.FadeIn : AnimationVariant.FadeInRight}
              >
                <Title
                  titleStyle={titleStyle}
                  useCustomTextElements={useCustomTextElements}
                  className={classNames('text-left', styles?.title)}
                  title={title}
                />
              </ElementWrapper>
            </div>

            <div className="text-secondary flex flex-col items-start">
              <ElementWrapper
                duration={duration}
                delay={getDelayValue(3)}
                animationVariant={animationType === 'fadeIn' ? AnimationVariant.FadeIn : AnimationVariant.FadeInLeft}
              >
                <Description className={classNames('text-left !py-0', styles?.description)} />
              </ElementWrapper>
              <div className="py-6">
                {Boolean(primaryButtonLink) && (
                  <ElementWrapper
                    duration={duration}
                    delay={getDelayValue(4.5)}
                    animationVariant={
                      animationType === 'fadeIn' ? AnimationVariant.FadeIn : AnimationVariant.FadeInLeft
                    }
                  >
                    <PrimaryButton
                      animationType={primaryButtonAnimationType}
                      primaryButtonLink={primaryButtonLink}
                      primaryButtonStyle={primaryButtonStyle}
                    />
                  </ElementWrapper>
                )}
                {Boolean(secondaryButtonLink) && (
                  <ElementWrapper
                    duration={duration}
                    delay={getDelayValue(6)}
                    animationVariant={
                      animationType === 'fadeIn' ? AnimationVariant.FadeIn : AnimationVariant.FadeInLeft
                    }
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
        </div>
      </div>
    </Container>
  );
};
