import { FC } from 'react';
import { UniformSlot } from '@uniformdev/canvas-react';
import { BoxProps } from '.';

export const Box: FC<BoxProps> = ({ style }) => (
  <div style={{ ...style }}>
    <UniformSlot name="content" />
  </div>
);
