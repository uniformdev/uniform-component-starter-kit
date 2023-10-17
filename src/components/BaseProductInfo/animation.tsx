import { Fragment, PropsWithChildren, useCallback, useEffect, useMemo, useState } from 'react';
import AnimatedContainer, { DelayVariants, AnimatedContainerProps } from '../../components/AnimatedContainer';

export const getDelayCoefficient = (duration: Types.DurationType) => {
  switch (duration) {
    case 'slow':
      return 5;
    case 'medium':
      return 7.5;
    case 'fast':
      return 10;
    default:
      return 7.5;
  }
};

export const getDelay = (
  delayIndex: number,
  oneByOneAnimation: boolean,
  delayCoefficient: number,
  initialDelay: number
) => (oneByOneAnimation ? delayIndex / delayCoefficient + initialDelay : initialDelay);

const useElementsWrapperKeys = (animationType: Types.AnimationType | undefined, animationPreview: boolean) => {
  const [runAnimationToggle, setRunAnimationToggle] = useState(false);

  useEffect(() => {
    setRunAnimationToggle(prevState => (animationPreview ? !prevState : prevState));
  }, [animationPreview]);

  return useCallback(
    ({ children, ...props }: PropsWithChildren<AnimatedContainerProps>) =>
      animationType ? <AnimatedContainer {...props}>{children}</AnimatedContainer> : <Fragment>{children}</Fragment>,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [runAnimationToggle]
  );
};

export const useProductInfoAnimation = ({
  duration,
  animationOrder,
  delay = 'none',
  animationType,
  animationPreview = false,
}: {
  duration: Types.DurationType;
  animationOrder?: Types.AnimationOrder;
  delay?: Types.AnimationDelay;
  animationType?: Types.AnimationType;
  animationPreview?: boolean;
}) => {
  const delayCoefficient = useMemo(() => getDelayCoefficient(duration), [duration]);

  return {
    ElementWrapper: useElementsWrapperKeys(animationType, animationPreview),
    getDelayValue: useCallback(
      (delayIndex: number) =>
        getDelay(delayIndex, animationOrder === 'oneByOne', delayCoefficient, DelayVariants[delay]),
      [animationOrder, delayCoefficient, delay]
    ),
  };
};
