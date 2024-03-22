import { FC } from 'react';
import { UniformSlot } from '@uniformdev/canvas-react';
import { BoxProps } from '.';
import EmptyPlaceholder from '../../../components/EmptyPlaceholder';

export const Box: FC<BoxProps> = ({ style }) => (
  <div style={{ ...style }}>
    <UniformSlot name="content" emptyPlaceholder={<EmptyPlaceholder />} />
  </div>
);
