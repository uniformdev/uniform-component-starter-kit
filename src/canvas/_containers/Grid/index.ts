import { ComponentProps, registerUniformComponent } from '@uniformdev/canvas-react';
import { Grid } from './Grid';

export type GridProps = ComponentProps<{
  columnsCount: Types.AvailableColumnCount;
  gapY: Types.AvailableGapVariants;
  gapX: Types.AvailableGapVariants;
}>;

registerUniformComponent({
  type: 'grid',
  component: Grid,
});

export default Grid;
