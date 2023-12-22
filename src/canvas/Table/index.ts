import { registerUniformComponent, ComponentProps } from '@uniformdev/canvas-react';
import { Table } from './Table';
import { TableDataCell } from './TableDataCell';
import { TableHeaderCell } from './TableHeaderCell';
import { TableRow } from './TableRow';

export type TableProps = ComponentProps<{
  size: Types.TableSize;
}>;

export enum TableVariant {
  Zebra = 'zebra',
}

export type TableCellProps = ComponentProps<{
  value: string;
}>;

export type TableRowProps = ComponentProps<{
  highlightsOnHover: string;
}>;
[undefined, TableVariant.Zebra].forEach(variantId => {
  registerUniformComponent({
    type: 'table',
    component: Table,
    variantId,
  });
});

registerUniformComponent({
  type: 'tableDataCell',
  component: TableDataCell,
});
registerUniformComponent({
  type: 'tableHeaderCell',
  component: TableHeaderCell,
});
registerUniformComponent({
  type: 'tableRow',
  component: TableRow,
});

export default Table;
