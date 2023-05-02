import React, { FC } from 'react';
import classNames from 'classnames';
import { UniformSlot, ComponentProps, registerUniformComponent } from '@uniformdev/canvas-react';
import { convertColumnWidthsToTailwindColumns } from '@/utils';

export type Props = ComponentProps<{
  width: string;
  alignment?: Types.HorizontalAlignment;
  textAlignment?: Types.HorizontalAlignment;
}>;

const getAlignmentClasses = (alignment?: Types.HorizontalAlignment) => {
  switch (alignment) {
    case 'center':
      return 'justify-center';
    case 'right':
      return 'justify-end';
    default:
      return 'justify-start';
  }
};

const getTextAlignmentClasses = (alignment?: Types.HorizontalAlignment) => {
  switch (alignment) {
    case 'center':
      return 'text-center';
    case 'right':
      return 'text-right';
    default:
      return 'text-left';
  }
};

const SectionOneColumn: FC<Props> = ({ width, alignment = 'left', textAlignment = 'left' }) => {
  const columnWidths = convertColumnWidthsToTailwindColumns(width?.trim());
  return (
    <div className={classNames('flex', getAlignmentClasses(alignment), getTextAlignmentClasses(textAlignment))}>
      <div className="w-full" style={{ width: `calc(100% / 12 * ${columnWidths})` }}>
        <UniformSlot name="section-content" />
      </div>
    </div>
  );
};

registerUniformComponent({
  type: 'sectionOneColumn',
  component: SectionOneColumn,
});

export default SectionOneColumn;
