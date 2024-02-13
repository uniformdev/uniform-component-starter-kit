import { FC } from 'react';
import classnames from 'classnames';
import { UniformSlot } from '@uniformdev/canvas-react';
import { TableRowProps } from '.';

export const TableRow: FC<TableRowProps> = ({ highlightsOnHover }) => (
  <tr className={classnames({ hover: highlightsOnHover })}>
    <UniformSlot name="cells" />
  </tr>
);
