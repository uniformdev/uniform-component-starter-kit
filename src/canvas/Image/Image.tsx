import { FC } from 'react';
import { useUniformContextualEditingState } from '@uniformdev/canvas-react';
import classNames from 'classnames';
import BaseImage from '../../components/Image';
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
  const { isContextualEditing } = useUniformContextualEditingState();

  const widthWithDefault = width ? Number.parseInt(width as string) : 500;
  const heightWithDefault = height ? Number.parseInt(height as string) : 300;

  if (!src && isContextualEditing) {
    return <span className="font-bold text-2xl italic">ℹ️ Please add an asset to display an image.</span>;
  }

  return (
    <div
      className={classNames(
        'relative max-w-full h-max',
        getBorderColorStyle(borderColor),
        getBorderRadiusStyle(borderRadius)
      )}
      style={{
        borderWidth: borderWidth,
        minHeight: fill ? heightWithDefault : undefined,
        minWidth: fill ? widthWithDefault : undefined,
      }}
    >
      <BaseImage
        src={getMediaUrl(src)}
        width={fill ? undefined : widthWithDefault}
        height={fill ? undefined : heightWithDefault}
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
