import { FC, ReactNode } from 'react';
import classNames from 'classnames';
import { UniformSlot, ComponentProps, registerUniformComponent } from '@uniformdev/canvas-react';
import { convertColumnWidthsToTailwindColumns } from '@/utils';

export type GridOrder = 'order-first' | 'order-last';

export type Props = ComponentProps<{
  columnWidths: string;
  verticalAlignment: Types.VerticalAlignment;
  mobileItemsOrder?: Types.ItemsOrder;
  hasBottomBorder?: boolean;
  leftContent?: ReactNode;
  rightContent?: ReactNode;
}>;

const getVerticalAlignmentClass = (verticalAlignment: Types.VerticalAlignment) => {
  switch (verticalAlignment) {
    case 'top':
      return 'items-start';
    case 'center':
      return 'items-center';
    case 'bottom':
      return 'items-end';
    default:
      return 'items-start';
  }
};

const OrderPropClassMap = {
  first: 'order-first',
  last: 'order-last',
};

const SectionTwoColumns: FC<Props> = ({
  columnWidths = '1/2 - 1/2',
  verticalAlignment,
  mobileItemsOrder = 'first',
  hasBottomBorder,
}) => {
  const [leftColumnWidth, rightColumnWidth] = columnWidths.split('-');
  const leftContentColumns = convertColumnWidthsToTailwindColumns(leftColumnWidth.trim());
  const rightContentColumns = convertColumnWidthsToTailwindColumns(rightColumnWidth.trim());

  return (
    <>
      <div
        className={classNames(
          `grid grid-cols-1 gap-y-10 lg:grid-cols-12 lg:gap-0 pb-12`,
          { 'border-b-2': hasBottomBorder },
          getVerticalAlignmentClass(verticalAlignment)
        )}
      >
        <div
          className={classNames(
            'lg:order-none',
            [`lg:col-span-${leftContentColumns}`],
            OrderPropClassMap[mobileItemsOrder] || OrderPropClassMap['first']
          )}
        >
          <UniformSlot name="leftContent" />
        </div>
        <div className={classNames('lg:col-end-13', [`lg:col-span-${rightContentColumns}`])}>
          <UniformSlot name="rightContent" />
        </div>
      </div>
      <div className="lg:col-span-3 lg:col-span-4 lg:col-span-5 lg:col-span-6 lg:col-span-7 lg:col-span-8 lg:col-span-9 hidden" />
    </>
  );
};

registerUniformComponent({
  type: 'sectionTwoColumns',
  component: SectionTwoColumns,
});

export default SectionTwoColumns;
