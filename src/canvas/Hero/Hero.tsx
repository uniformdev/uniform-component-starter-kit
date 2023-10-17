import { FC } from 'react';
import classNames from 'classnames';
import { Container, Description, EyebrowText, PrimaryButton, SecondaryButton, Title } from './atoms';
import { useHeroAnimation } from './animation';
import { AnimationVariant } from '../../components/AnimatedContainer';
import { HeroProps } from './';

export const HeroDefault: FC<HeroProps> = ({
  title,
  titleStyle = 'h1',
  description,
  primaryButtonLink,
  primaryButtonStyle = 'primary',
  primaryButtonAnimationType,
  secondaryButtonLink,
  secondaryButtonStyle = 'primary',
  secondaryButtonAnimationType,
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
            <Description className={styles?.description} />
          </ElementWrapper>
          <div className={classNames('pb-6', { 'py-6': !description })}>
            {Boolean(primaryButtonLink) && (
              <ElementWrapper
                duration={duration}
                delay={getDelayValue(4.5)}
                animationVariant={animationType === 'fadeIn' ? AnimationVariant.FadeIn : AnimationVariant.FadeInTop}
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
