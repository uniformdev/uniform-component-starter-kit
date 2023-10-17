import { ComponentProps } from '@uniformdev/canvas-react/dist';
import { ContainerProps } from '../Container';

type Styles = {
  title?: string;
  description?: string;
};

export type BaseProductGalleryProps = ComponentProps<
  ContainerProps & {
    title?: string;
    titleStyle?: Types.HeadingStyles;
    description?: string;
    items?: Types.UniformImage[];
    maxItems?: number;
    animationType?: Types.AnimationType;
    animationOrder?: Types.AnimationOrder;
    duration?: Types.DurationType;
    delay?: Types.AnimationDelay;
    animationPreview?: boolean;
    styles?: Styles;
  }
>;

export { default } from './BaseProductGallery';
