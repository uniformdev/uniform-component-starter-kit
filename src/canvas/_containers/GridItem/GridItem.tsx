import { FC } from 'react';
import classNames from 'classnames';
import { UniformSlot, registerUniformComponent } from '@uniformdev/canvas-react';
import {
  getGridColumnsSpanClass,
  getGridColumnsStartClass,
  getGridRowsSpanClass,
  getGridRowsStartClass,
} from './helpers';
import { GridItemProps } from '.';

const GridItem: FC<GridItemProps> = ({ columnStart, columnSpan, rowSpan, rowStart }) => (
  <div
    className={classNames(
      getGridColumnsStartClass(columnStart),
      getGridColumnsSpanClass(columnSpan),
      getGridRowsStartClass(rowStart),
      getGridRowsSpanClass(rowSpan)
    )}
  >
    <UniformSlot name="inner" />
  </div>
);

registerUniformComponent({
  type: 'gridItem',
  component: GridItem,
});

export default GridItem;
