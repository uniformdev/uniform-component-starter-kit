import { ComponentProps, registerUniformComponent } from '@uniformdev/canvas-react';
import type { Asset } from '@uniformdev/assets';
import { Image } from './Image';

export type ImageProps = ComponentProps<{
  src: string | Asset | Types.CloudinaryImage;
  width?: string;
  height?: string;
  alt?: string;
  fill?: boolean;
  quality?: number;
  priority?: boolean;
  overlayColor?: Types.AvailableColor;
  overlayOpacity?: Types.AvailableOpacity;
  borderColor?: Types.AvailableColor;
  borderWidth?: string;
  borderRadius?: Types.AvailableBorderRadius;
  objectFit?: Types.AvailableObjectFit;
}>;

registerUniformComponent({
  type: 'image',
  component: Image,
});

export default Image;
