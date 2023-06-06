import { FC } from 'react';
import classNames from 'classnames';
import { registerUniformComponent, ComponentProps } from '@uniformdev/canvas-react';

type Props = ComponentProps<{
  colorStyle: Types.AvailableColor;
  thickness: Types.AvailableThickness;
}>;

const getDividerColorStyle = (style: Types.AvailableColor) => {
  switch (style) {
    case 'primary':
      return 'border-primary';
    case 'secondary':
      return 'border-secondary';
    case 'accent':
      return 'border-accent';
    case 'base-200':
      return 'border-base-200';
    case 'base-300':
      return 'border-base-300';
    default:
      return 'border-base-200';
  }
};

const getDividerThickness = (thickness: Types.AvailableThickness) => {
  switch (thickness) {
    case '1px':
      return 'border-[1px]';
    case '2px':
      return 'border-[2px]';
    case '3px':
      return 'border-[3px]';
    case '5px':
      return 'border-[5px]';
    case '7px':
      return 'border-[7px]';
    case '10px':
      return 'border-[10px]';
    default:
      return 'border-[1px]';
  }
};

const Divider: FC<Props> = ({ colorStyle, thickness }) => (
  <div className={classNames('w-full', getDividerColorStyle(colorStyle), getDividerThickness(thickness))} />
);

export default Divider;

registerUniformComponent({
  type: 'divider',
  component: Divider,
});
