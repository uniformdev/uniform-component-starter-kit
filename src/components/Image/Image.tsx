import { FC } from 'react';
import NextImage, { ImageProps } from 'next/image';

const Image: FC<ImageProps> = props =>
  props.src ? <NextImage {...props} priority={props?.priority || Boolean(process.env.NEXT_PUBLIC_E2E_TEST)} /> : null;

export default Image;
