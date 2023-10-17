import { registerUniformComponent, ComponentProps } from '@uniformdev/canvas-react';
import { CallToAction } from './CallToAction';

type Styles = {
  container?: string;
};
export type CallToActionProps = ComponentProps<{
  eyebrowText: string;
  title: string;
  titleStyle: Types.HeadingStyles;
  description: string;
  primaryButtonCopy: string;
  primaryButtonLink: Types.ProjectMapLink;
  primaryButtonStyle: Types.ButtonStyles;
  primaryButtonAnimationType?: Types.AnimationType;
  secondaryButtonCopy: string;
  secondaryButtonLink: Types.ProjectMapLink;
  secondaryButtonStyle: Types.ButtonStyles;
  secondaryButtonAnimationType?: Types.AnimationType;
  textColorVariant?: Types.AvailableTextColorVariant;
  styles?: Styles;
}>;

export enum CallToActionVariant {
  AlignLeft = 'alignLeft',
  AlignRight = 'alignRight',
  Featured = 'featured',
}

[
  undefined,
  CallToActionVariant.AlignLeft,
  CallToActionVariant.AlignLeft,
  CallToActionVariant.AlignRight,
  CallToActionVariant.Featured,
].forEach(variantId => {
  registerUniformComponent({
    type: 'callToAction',
    component: CallToAction,
    variantId,
  });
});

export default CallToAction;
