import { FC } from 'react';
import classNames from 'classnames';
import { Container, Description, EyebrowText, Title } from './atoms';
import { useHeroAnimation } from './animation';
import { AnimationVariant } from '../../components/AnimatedContainer';
import { DEFAULT_TEXT_COLOR, BaseHeroProps } from './';
import { REGEX_COLOR_HEX } from '../../utilities';
import { getHeroTextStyle } from './helpers';

export const HeroDefault: FC<BaseHeroProps> = ({
  title,
  titleStyle = 'h1',
  description,
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
  buttonsSlot,
  styles,
}) => {
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
          <div className={classNames('pb-6', { 'py-6': !description })}>{buttonsSlot}</div>
        </div>
      </div>
    </Container>
  );
};
