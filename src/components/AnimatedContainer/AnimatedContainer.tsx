import { FC, useRef } from 'react';
import { m as motion, useInView } from 'framer-motion';
import { AnimatedContainerProps } from './';
import { getAnimationParams } from './helpers';

const AnimatedContainer: FC<AnimatedContainerProps> = ({
  animationVariant,
  duration,
  delay = 0,
  children,
  fadeInOffset = 24,
  className,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const animationParams = getAnimationParams({
    isInView,
    animationVariant,
    duration,
    delay,
    fadeInOffset,
  });

  return animationParams && !Boolean(process.env.NEXT_PUBLIC_E2E_TEST) ? (
    <motion.div className={className} ref={ref} {...animationParams}>
      {children}
    </motion.div>
  ) : (
    <>{children}</>
  );
};

export default AnimatedContainer;
