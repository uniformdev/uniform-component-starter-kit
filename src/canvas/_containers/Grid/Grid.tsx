import { FC } from 'react';
import classNames from 'classnames';
import { UniformSlot } from '@uniformdev/canvas-react';
import { getGapXClass, getGapYClass, getGridColumnsClass } from './helpers';
import { GridProps } from '.';

export const Grid: FC<GridProps> = ({ columnsCount, gapX, gapY }) => (
  <div className={classNames('w-full grid', getGridColumnsClass(columnsCount), getGapXClass(gapX), getGapYClass(gapY))}>
    <UniformSlot name="grid-inner" />
  </div>
);
