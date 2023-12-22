import { ComponentProps, registerUniformComponent } from '@uniformdev/canvas-react';
import { withoutContainer } from '../../../hocs/withoutContainer';
import { Box } from './Box';

export type BoxProps = ComponentProps;

registerUniformComponent({
  type: 'box',
  component: withoutContainer(Box),
});
