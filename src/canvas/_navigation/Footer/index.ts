import { ComponentProps, registerUniformComponent } from '@uniformdev/canvas-react';
import type { Asset } from '@uniformdev/assets';
import { Footer } from './Footer';

type Styles = {
  container?: string;
  footerSection?: string;
  buildTimestamp?: string;
};

export type FooterProps = ComponentProps<{
  logo?: string | Asset | Types.CloudinaryImage;
  displayBuildTimestamp?: boolean;
  copyright: string;
  footerText?: string;
  styles?: Styles;
}>;

registerUniformComponent({
  type: 'footer',
  component: Footer,
});

export * from './decorator';
export default Footer;
