import { FC } from 'react';
import { ComponentProps, registerUniformComponent } from '@uniformdev/canvas-react';
import NextImage from 'next/image';
import { getImageUrl } from '@/utils';
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
  borderWidth?: number;
}>;

const getOverlayColorStyle = (style?: Types.AvailableColor) => {
  switch (style) {
    case 'primary':
      return 'bg-primary';
    case 'secondary':
      return 'bg-secondary';
    case 'accent':
      return 'bg-accent';
    case 'base-200':
      return 'bg-base-200';
    case 'base-300':
      return 'bg-base-300';
    default:
      return '';
  }
};

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

const getOverlayOpacityStyle = (style?: Types.AvailableOpacity) => {
  switch (style) {
    case 0:
      return 'bg-opacity-0';
    case 10:
      return 'bg-opacity-10';
    case 20:
      return 'bg-opacity-20';
    case 30:
      return 'bg-opacity-30';
    case 40:
      return 'bg-opacity-40';
    case 50:
      return 'bg-opacity-50';
    case 60:
      return 'bg-opacity-60';
    case 70:
      return 'bg-opacity-70';
    case 80:
      return 'bg-opacity-80';
    case 90:
      return 'bg-opacity-90';
    case 100:
      return 'bg-opacity-100';
    default:
      return 'bg-opacity-100';
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
}) => {
  if ((fill && (width || height)) || ((!width || !height) && !fill)) {
    return null;
  }
  return (
    <div
      className={classNames('relative', getBorderColorStyle(borderColor))}
      style={{ borderWidth: `${borderWidth}px` }}
    >
      <NextImage
        src={getImageUrl(src)}
        width={width}
        height={height}
        alt={alt ?? 'image'}
        fill={fill}
        quality={quality}
        priority={priority}
      />
      <div
        className={classNames(
          'absolute top-0 left-0 right-0 bottom-0',
          getOverlayColorStyle(overlayColor),
          getOverlayOpacityStyle(overlayOpacity)
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
