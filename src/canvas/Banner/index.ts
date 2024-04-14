import { ComponentProps, registerUniformComponent } from '@uniformdev/canvas-react';
import type { Asset } from '@uniformdev/assets';
import { withoutContainer } from '../../hocs/withoutContainer';
import { Banner } from './Banner';

export type BannerProps = ComponentProps<{
  title: string;
  description: string;
  icon?: string | Asset;
  inline: boolean;
  textAlign: Types.HorizontalAlignment;
  position: Types.AvailableBannerPosition;
  primaryButtonCopy: string;
  primaryButtonLink: Types.ProjectMapLink;
  primaryButtonStyle: Types.ButtonStyles;
  primaryButtonAnimationType?: Types.AnimationType;
  secondaryButtonCopy: string;
  secondaryButtonLink: Types.ProjectMapLink;
  secondaryButtonStyle: Types.ButtonStyles;
  secondaryButtonAnimationType?: Types.AnimationType;
}>;

export const enum BannerVariant {
  FullWidth = 'fullWidth',
}

[undefined, BannerVariant.FullWidth].forEach(variantId => {
  registerUniformComponent({
    type: 'banner',
    component: withoutContainer(Banner),
    variantId,
  });
});

export default withoutContainer(Banner);
