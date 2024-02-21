import { CSSProperties } from 'react';
import { ComponentProps, registerUniformComponent } from '@uniformdev/canvas-react';
import { Box } from './Box';

export type BoxProps = ComponentProps<{
  style: CSSProperties;
}>;

registerUniformComponent({
  type: 'box',
  component: Box,
});
