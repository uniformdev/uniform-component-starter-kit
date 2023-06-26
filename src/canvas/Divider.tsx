import { FC } from 'react';
import classNames from 'classnames';
import { registerUniformComponent, ComponentProps } from '@uniformdev/canvas-react';

type Props = ComponentProps<{
  colorStyle: Types.AvailableColor;
  thickness: number;
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

const Divider: FC<Props> = ({ colorStyle, thickness }) => (
  <div className={classNames('w-full', getDividerColorStyle(colorStyle))} style={{ borderWidth: thickness }} />
);

export default Divider;

registerUniformComponent({
  type: 'divider',
  component: Divider,
});
