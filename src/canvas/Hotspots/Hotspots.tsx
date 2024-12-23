import { FC } from 'react';
import classNames from 'classnames';
import { UniformSlot, useUniformContextualEditingState } from '@uniformdev/canvas-react';
import BaseImage from '../../components/Image';
import EmptyPlaceholder from '../../components/EmptyPlaceholder';
import EmptyImagePlaceholder from '../../components/EmptyImagePlaceholder';
import { getObjectFitClass } from '../../utilities/styling';
import { getMediaUrl } from '../../utilities';
import { HotspotsProps } from '.';

export const Hotspots: FC<HotspotsProps> = ({ backgroundImage, width, height, alt, fill, objectFit }) => {
  const { previewMode } = useUniformContextualEditingState();
  const isContextualEditing = previewMode === 'editor';

  const imgSrc = getMediaUrl(backgroundImage);
  if (!imgSrc && isContextualEditing) {
    return <EmptyImagePlaceholder />;
  }

  const widthWithDefault = width ? Number.parseInt(width) : backgroundImage?.[0]?.fields?.width?.value ?? 500;
  const heightWithDefault = height ? Number.parseInt(height) : backgroundImage?.[0].fields?.height?.value ?? 300;

  return (
    <div className="relative w-full h-full">
      <BaseImage
        src={imgSrc}
        width={fill ? undefined : widthWithDefault}
        height={fill ? undefined : heightWithDefault}
        className={classNames('w-full', getObjectFitClass(objectFit))}
        alt={alt ?? 'hotspots-background-image'}
        fill={fill}
      />
      <UniformSlot name="hotspots" emptyPlaceholder={<EmptyPlaceholder className="h-11" />} />
    </div>
  );
};
