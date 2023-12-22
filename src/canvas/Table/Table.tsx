import { FC } from 'react';
import classnames from 'classnames';
import { UniformSlot } from '@uniformdev/canvas-react';
import { TableProps, TableVariant } from '.';
import { getTableSize } from './helpers';

export const Table: FC<TableProps> = ({ size, component }) => (
  <div className="overflow-x-auto">
    <table
      className={classnames('table', getTableSize(size), {
        'table-zebra': component?.variant === TableVariant.Zebra,
      })}
    >
      <thead>
        <UniformSlot name="tableHead" />
      </thead>
      <tbody>
        <UniformSlot name="tableBody" />
      </tbody>
    </table>
  </div>
);
