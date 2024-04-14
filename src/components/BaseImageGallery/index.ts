import { ComponentProps } from '@uniformdev/canvas-react/dist';
import type { Asset } from '@uniformdev/assets';
import { ContainerProps } from '../Container';

type Styles = {
  title?: string;
  description?: string;
};

export type BaseImageGalleryProps = ComponentProps<
  ContainerProps & {
    title?: string;
    titleStyle?: Types.HeadingStyles;
    description?: string;
    items?: Asset[] | Types.UniformOldImage[];
    maxItems?: number;
    animationType?: Types.AnimationType;
    animationOrder?: Types.AnimationOrder;
    duration?: Types.DurationType;
    delay?: Types.AnimationDelay;
    animationPreview?: boolean;
    styles?: Styles;
  }
>;

export { default } from './BaseImageGallery';
