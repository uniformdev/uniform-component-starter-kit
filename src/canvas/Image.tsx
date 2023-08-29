import { FC } from 'react';
import { ComponentProps, registerUniformComponent } from '@uniformdev/canvas-react';
import NextImage from 'next/image';
import { getImageOverlayColorStyle, getImageOverlayOpacityStyle, getObjectFitClass } from '../utilities/styling';
import { getImageUrl } from '../utilities';
import classNames from 'classnames';

export type Props = ComponentProps<{
  src: string | Types.CloudinaryImage;
  width: number;
  height: number;
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

const getBorderColorStyle = (style?: Types.AvailableColor) => {
  switch (style) {
    case 'primary':
      return 'border-primary bg-primary';
    case 'secondary':
      return 'border-secondary bg-secondary';
    case 'accent':
      return 'border-accent bg-accent';
    case 'base-200':
      return 'border-base-200 bg-base-200';
    case 'base-300':
      return 'border-base-300 bg-base-300';
    default:
      return '';
  }
};

const getBorderRadiusStyle = (style?: Types.AvailableBorderRadius) => {
  switch (style) {
    case 'none':
      return '';
    case 'small':
      return 'rounded-md';
    case 'medium':
      return 'rounded-xl';
    case 'large':
      return 'rounded-3xl';
    case 'full':
      return 'rounded-full';
    default:
      return '';
  }
};

const Image: FC<Props> = ({
  src,
  width,
  height,
  alt,
  fill,
  quality,
  priority,
  overlayColor,
  overlayOpacity,
  borderWidth = 0,
  borderColor,
  borderRadius,
  objectFit,
}) => {
  if ((fill && (width || height)) || ((!width || !height) && !fill)) {
    return null;
  }

  return (
    <div
      className={classNames(
        'relative max-w-max h-max',
        getBorderColorStyle(borderColor),
        getBorderRadiusStyle(borderRadius)
      )}
      style={{ borderWidth: borderWidth }}
    >
      <NextImage
        src={getImageUrl(src)}
        width={width}
        height={height}
        className={classNames(getBorderRadiusStyle(borderRadius), getObjectFitClass(objectFit))}
        alt={alt ?? 'image'}
        fill={fill}
        quality={quality}
        priority={priority}
      />
      <div
        className={classNames(
          'absolute top-0 left-0 right-0 bottom-0',
          getImageOverlayColorStyle(overlayColor),
          getImageOverlayOpacityStyle(overlayOpacity),
          getBorderRadiusStyle(borderRadius)
        )}
      />
    </div>
  );
};

registerUniformComponent({
  type: 'image',
  component: Image,
});

export default Image;
