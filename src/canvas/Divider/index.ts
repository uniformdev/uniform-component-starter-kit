import { registerUniformComponent, ComponentProps } from '@uniformdev/canvas-react';
import { Divider } from './Divider';

export type DividerProps = ComponentProps<{
  colorStyle?: Types.AvailableColor;
  thickness?: number;
  width?: Types.AvailableWidth;
  alignment?: Types.HorizontalAlignment;
}>;

export default Divider;

registerUniformComponent({
  type: 'divider',
  component: Divider,
});
