import { ComponentProps, registerUniformComponent } from '@uniformdev/canvas-react';
import { Grid } from './Grid';
import { ContainerProps } from '../Container';
import { withoutContainer } from '../../../hocs/withoutContainer';

export type GridProps = ComponentProps<
  ContainerProps & {
    columnsCount: Types.AvailableColumnCount;
    gapY: Types.AvailableGapVariants;
    gapX: Types.AvailableGapVariants;
  }
>;

registerUniformComponent({
  type: 'grid',
  component: withoutContainer(Grid, { additionalClassName: 'w-full' }),
});

export default withoutContainer(Grid, { additionalClassName: 'w-full' });
