import { FC } from 'react';
import { UniformSlot } from '@uniformdev/canvas-react';
import { FooterSectionProps } from '.';

export const FooterSection: FC<FooterSectionProps> = ({ title }) => (
  <div>
    <span className="footer-title opacity-100 text-primary">{title}</span>
    <UniformSlot name="links" />
  </div>
);
