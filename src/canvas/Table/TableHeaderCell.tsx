import { FC } from 'react';
import { UniformText } from '@uniformdev/canvas-react';
import { TableCellProps } from '.';

export const TableHeaderCell: FC<TableCellProps> = () => (
  <th>
    <UniformText placeholder="Value goes here" parameterId="value" />
  </th>
);
