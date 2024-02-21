import { registerUniformComponent } from '@uniformdev/canvas-react';
import { Tab } from './Tab';

export type TabTitleProps = {
  title: string;
  size: Types.TabSize;
  style: Types.TabStyle;
  isActive: boolean;
  onClick: () => void;
};

registerUniformComponent({
  type: 'tab',
  component: Tab,
});

export default Tab;
export * from './TabTitle';
