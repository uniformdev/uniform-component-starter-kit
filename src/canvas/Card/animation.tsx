import { PropsWithChildren, useCallback, useEffect, useState } from 'react';
import { m as motion } from 'framer-motion';
import AnimatedContainer, { AnimationVariant, DelayVariants } from '../../components/AnimatedContainer';

export const useAnimationElements = (
  animationType: string | undefined,
  duration: Types.DurationType,
  animationPreview: boolean,
  delay: Types.AnimationDelay = 'none'
) => {
  const delayValue = DelayVariants[delay];
  const [runAnimationToggle, setRunAnimationToggle] = useState(false);

  useEffect(() => {
    setRunAnimationToggle(prevState => (animationPreview ? !prevState : prevState));
  }, [animationPreview]);

  const animationSpeed = {
    fast: 1,
    slow: 3,
    medium: 1.8,
  };

  const CardWrapper = useCallback(
    ({ children, className }: PropsWithChildren<{ className: string }>) => {
      switch (animationType) {
        case 'flyIn':
          return (
            <motion.div
              className={className}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ margin: '-400px', once: true }}
            >
              {children}
            </motion.div>
          );
        case 'fadeIn':
        default:
          return <div className={className}>{children}</div>;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [runAnimationToggle]
  );

  const ImageWrapper = useCallback(
    ({ children }: PropsWithChildren) => {
      switch (animationType) {
        case 'fadeIn':
          return (
            <AnimatedContainer delay={delayValue} animationVariant={AnimationVariant.FadeIn} duration={duration}>
              {children}
            </AnimatedContainer>
          );
        case 'flyIn':
          return (
            <motion.div
              variants={{
                offscreen: {
                  y: 120,
                  zIndex: 0,
                  transition: {
                    type: 'spring',
                    bounce: 0.2,
                    duration: animationSpeed[duration],
                  },
                },
                onscreen: {
                  y: 0,
                  transition: {
                    type: 'spring',
                    bounce: 0.2,
                    duration: animationSpeed[duration],
                    delay: delayValue,
                  },
                },
              }}
            >
              {children}
            </motion.div>
          );
        default:
          return <>{children}</>;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [runAnimationToggle]
  );

  const TitleWrapper = useCallback(
    ({ children }: PropsWithChildren) => {
      switch (animationType) {
        case 'fadeIn':
          return (
            <AnimatedContainer delay={delayValue} animationVariant={AnimationVariant.FadeIn} duration={duration}>
              {children}
            </AnimatedContainer>
          );
        case 'flyIn':
          return (
            <motion.div
              variants={{
                offscreen: {
                  y: 100,
                  opacity: 0,
                },
                onscreen: {
                  y: 0,
                  opacity: 1,
                  transition: {
                    duration: animationSpeed[duration],
                    delay: delayValue,
                  },
                },
              }}
            >
              {children}
            </motion.div>
          );
        default:
          return <>{children}</>;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [runAnimationToggle]
  );

  return {
    CardWrapper,
    ImageWrapper,
    TitleWrapper,
  };
};
