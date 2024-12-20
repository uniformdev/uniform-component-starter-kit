import { FC } from 'react';
import classnames from 'classnames';
import { UniformSlot } from '@uniformdev/canvas-react';
import EmptyPlaceholder from '../../components/EmptyPlaceholder';
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
        <UniformSlot name="tableHead" emptyPlaceholder={<EmptyPlaceholder className="!h-11 !w-full" />} />
      </thead>
      <tbody>
        <UniformSlot name="tableBody" emptyPlaceholder={<EmptyPlaceholder className="!w-full" />} />
      </tbody>
    </table>
  </div>
);
