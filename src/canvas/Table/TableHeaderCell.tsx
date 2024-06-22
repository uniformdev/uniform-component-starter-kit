import { FC } from 'react';
import { UniformText } from '@uniformdev/canvas-react';
import { useTranslations } from 'next-intl';
import { TableCellProps } from '.';

export const TableHeaderCell: FC<TableCellProps> = () => {
  const t = useTranslations();
  return (
    <th>
      <UniformText placeholder={t('Value goes here')} parameterId="value" />
    </th>
  );
};
