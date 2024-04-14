import { FC } from 'react';
import { UniformSlot } from '@uniformdev/canvas-react';
import { BoxProps } from '.';
import EmptyPlaceholder from '../../../components/EmptyPlaceholder';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const Box: FC<BoxProps> = ({ style, component, ...restStyles }) => (
  <div style={{ ...style, ...restStyles }}>
    <UniformSlot name="content" emptyPlaceholder={<EmptyPlaceholder />} />
  </div>
);
