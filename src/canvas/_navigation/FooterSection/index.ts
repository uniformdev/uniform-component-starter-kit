import { ComponentProps, registerUniformComponent } from '@uniformdev/canvas-react';
import { FooterSection } from './FooterSection';

export type FooterSectionProps = ComponentProps<{ title: string }>;

registerUniformComponent({
  type: 'footerSection',
  component: FooterSection,
});

export default FooterSection;
