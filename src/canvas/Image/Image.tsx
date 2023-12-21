import { FC } from 'react';
import BaseImage from '../../components/Image';
import classNames from 'classnames';
import { getImageOverlayColorStyle, getImageOverlayOpacityStyle, getObjectFitClass } from '../../utilities/styling';
import { getMediaUrl } from '../../utilities';
import { getBorderColorStyle, getBorderRadiusStyle } from './helpers';
import { ImageProps } from '.';

export const Image: FC<ImageProps> = ({
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
        'relative max-w-full h-max',
        getBorderColorStyle(borderColor),
        getBorderRadiusStyle(borderRadius)
      )}
      style={{ borderWidth: borderWidth }}
    >
      <BaseImage
        src={getMediaUrl(src)}
        width={width}
        height={height}
        className={classNames('w-full', getBorderRadiusStyle(borderRadius), getObjectFitClass(objectFit))}
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
