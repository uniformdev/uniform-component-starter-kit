import { FC } from 'react';
import { ComponentProps, registerUniformComponent } from '@uniformdev/canvas-react';
import NextImage from 'next/image';
import { getImageUrl } from '@/utils';

export type Props = ComponentProps<{
  src: string | Types.CloudinaryImage;
  width: number;
  height: number;
}>;

const Image: FC<Props> = ({ src, width = 200, height = 200 }) => (
  <NextImage alt="image" src={getImageUrl(src)} width={width} height={height} />
);

registerUniformComponent({
  type: 'image',
  component: Image,
});

export default Image;
