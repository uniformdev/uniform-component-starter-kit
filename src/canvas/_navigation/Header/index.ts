import { ComponentProps, registerUniformComponent } from '@uniformdev/canvas-react';
import { withoutContainer } from '../../../hocs/withoutContainer';
import { Header } from './Header';

export type HeaderProps = ComponentProps<{
  logo: string | Types.CloudinaryImage;
  theme: string;
  linksAlignment: Types.HorizontalAlignment;
}>;

export enum HeaderVariants {
  Light = 'light',
}

[undefined, HeaderVariants.Light].forEach(variantId => {
  registerUniformComponent({
    type: 'header',
    component: withoutContainer(Header),
    variantId,
  });
});

export default withoutContainer(Header);
export * from './decorator';
