import { FC } from 'react';
import classNames from 'classnames';
import { useUniformContextualEditingState } from '@uniformdev/canvas-react';
import BaseImage from '../../components/Image';
import EmptyImagePlaceholder from '../../components/EmptyImagePlaceholder';
import {
  getBorderColorStyle,
  getBorderRadiusStyle,
  getImageOverlayColorStyle,
  getImageOverlayOpacityStyle,
  getObjectFitClass,
} from '../../utilities/styling';
import { getMediaUrl, isMediaAsset } from '../../utilities';
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
  const { previewMode } = useUniformContextualEditingState();
  const isContextualEditing = previewMode === 'editor';

  const imgSrc = getMediaUrl(src);
  const defaultWidth = isMediaAsset(src) ? src.fields?.width?.value : 500;
  const defaultHeight = isMediaAsset(src) ? src.fields?.height?.value : 300;

  if (!imgSrc && isContextualEditing) {
    return <EmptyImagePlaceholder />;
  }

  const widthWithDefault = width ? Number.parseInt(width) : defaultWidth;
  const heightWithDefault = height ? Number.parseInt(height) : defaultHeight;

  return (
    <div
      className={classNames(
        'relative w-full h-full',
        getBorderColorStyle(borderColor),
        getBorderRadiusStyle(borderRadius)
      )}
      style={{ borderWidth: borderWidth }}
    >
      {Boolean(imgSrc) && (
        <BaseImage
          src={imgSrc}
          width={fill ? undefined : widthWithDefault}
          height={fill ? undefined : heightWithDefault}
          className={classNames('w-full', getBorderRadiusStyle(borderRadius), getObjectFitClass(objectFit))}
          alt={alt ?? 'image'}
          fill={fill}
          quality={quality}
          priority={priority}
        />
      )}
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
