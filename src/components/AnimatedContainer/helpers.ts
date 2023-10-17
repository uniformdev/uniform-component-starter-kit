import { AnimationVariant } from './';

const getDuration = (duration: Types.DurationType, animationVariant: AnimationVariant) => {
  const speedCoefficient = {
    [AnimationVariant.FadeInTop]: 1,
    [AnimationVariant.FadeIn]: 1,
    [AnimationVariant.FadeInBottom]: 1,
    [AnimationVariant.FadeInLeft]: 1,
    [AnimationVariant.FadeInRight]: 1,
  };

  const speed = {
    fast: 0.2,
    slow: 0.8,
    medium: 0.4,
  };

  return speed[duration] * (speedCoefficient[animationVariant] || 1);
};

export const DelayVariants = {
  none: 0,
  short: 0.25,
  medium: 0.5,
  long: 1,
};

export const getAnimationParams = ({
  isInView,
  animationVariant,
  duration,
  delay,
  fadeInOffset,
}: {
  isInView: boolean;
  animationVariant: AnimationVariant;
  duration: Types.DurationType;
  delay: number;
  fadeInOffset: number;
}) => {
  const transition = {
    duration: getDuration(duration, animationVariant),
    delay: 0.25 + delay,
    ease: [0.42, 0, 0.58, 1],
  };
  switch (animationVariant) {
    case AnimationVariant.FadeIn:
      return {
        initial: 'hidden',
        animate: isInView ? 'show' : 'hidden',
        variants: {
          hidden: { x: 0, opacity: 0, transition },
          show: {
            y: 0,
            x: 0,
            opacity: 1,
            transition,
          },
        },
      };
    case AnimationVariant.FadeInTop:
      return {
        initial: 'hidden',
        animate: isInView ? 'show' : 'hidden',
        variants: {
          hidden: { y: fadeInOffset * -1, opacity: 0, transition },
          show: {
            y: 0,
            x: 0,
            opacity: 1,
            transition,
          },
        },
      };
    case AnimationVariant.FadeInBottom:
      return {
        initial: 'hidden',
        animate: isInView ? 'show' : 'hidden',
        variants: {
          hidden: { y: fadeInOffset, opacity: 0, transition },
          show: {
            y: 0,
            x: 0,
            opacity: 1,
            transition,
          },
        },
      };
    case AnimationVariant.FadeInLeft:
      return {
        initial: 'hidden',
        animate: isInView ? 'show' : 'hidden',
        variants: {
          hidden: { x: fadeInOffset, opacity: 0, transition },
          show: {
            y: 0,
            x: 0,
            opacity: 1,
            transition,
          },
        },
      };
    case AnimationVariant.FadeInRight:
      return {
        initial: 'hidden',
        animate: isInView ? 'show' : 'hidden',
        variants: {
          hidden: { x: fadeInOffset * -1, opacity: 0, transition },
          show: {
            y: 0,
            x: 0,
            opacity: 1,
            transition,
          },
        },
      };
    default: {
      console.error(`${animationVariant} animation is not defined`);
      return undefined;
    }
  }
};
