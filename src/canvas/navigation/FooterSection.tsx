import { FC } from 'react';
import { UniformSlot, ComponentProps, registerUniformComponent } from '@uniformdev/canvas-react';

type FooterSectionProps = ComponentProps<{
  title: string;
}>;

const FooterSection: FC<FooterSectionProps> = ({ title }) => (
  <div>
    <span className="footer-title opacity-100 text-primary">{title}</span>
    <UniformSlot name="links" />
  </div>
);

registerUniformComponent({
  type: 'footerSection',
  component: FooterSection,
});

export default FooterSection;
