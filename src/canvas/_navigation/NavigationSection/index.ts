import { ComponentProps, registerUniformComponent } from '@uniformdev/canvas-react';
import { NavigationSection } from './NavigationSection';

export type NavigationSectionProps = ComponentProps<{ title: string }>;

registerUniformComponent({
  type: 'navigationSection',
  component: NavigationSection,
});

// Deprecated. Please use navigationSection component instead of footerSection. The footerSection will be removed.
registerUniformComponent({
  type: 'footerSection',
  component: NavigationSection,
});

export default NavigationSection;
