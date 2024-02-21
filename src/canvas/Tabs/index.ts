import { ComponentProps, registerUniformComponent } from '@uniformdev/canvas-react';
import { Tabs } from './Tabs';

type Styles = {
  container?: string;
};

export type TabsProps = ComponentProps<{
  size: 'tiny' | 'small' | 'normal' | 'large';
  styles?: Styles;
}>;

export enum TabsVariant {
  Boxed = 'boxed',
  Lifted = 'lifted',
  Bordered = 'bordered',
}

[undefined, TabsVariant.Bordered, TabsVariant.Lifted, TabsVariant.Boxed].forEach(variantId => {
  registerUniformComponent({
    type: 'tabs',
    component: Tabs,
    variantId,
  });
});

export default Tabs;
