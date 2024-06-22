import { FC } from 'react';
import { UniformText } from '@uniformdev/canvas-react';
import { useTranslations } from 'next-intl';
import { TableCellProps } from '.';

export const TableDataCell: FC<TableCellProps> = () => {
  const t = useTranslations();
  return (
    <td>
      <UniformText placeholder={t('Value goes here')} parameterId="value" />
    </td>
  );
};
