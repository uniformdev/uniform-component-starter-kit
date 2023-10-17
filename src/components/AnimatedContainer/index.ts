import { ReactNode } from 'react';

export type AnimatedContainerProps = {
  className?: string;
  animationVariant: AnimationVariant;
  duration: Types.DurationType;
  delay?: number;
  fadeInOffset?: number;
  children: ReactNode;
};

export enum AnimationVariant {
  FadeIn = 'fade-in',
  FadeInTop = 'fade-in-top',
  FadeInBottom = 'fade-in-bottom',
  FadeInLeft = 'fade-in-left',
  FadeInRight = 'fade-in-right',
}

export * from './helpers';
export { default } from './AnimatedContainer';
