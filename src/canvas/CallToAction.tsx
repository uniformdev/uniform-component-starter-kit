import { FC } from 'react';
import classNames from 'classnames';
import { registerUniformComponent, ComponentProps, UniformText } from '@uniformdev/canvas-react';
import Button from '@/components/Button';
import { getTextClass } from '@/utils';

export type Props = ComponentProps<{
  eyebrowText: string;
  title: string;
  titleStyle: Types.HeadingStyles;
  description: string;
  primaryButtonCopy: string;
  primaryButtonLink: Types.ProjectMapLink;
  primaryButtonStyle: Types.ButtonStyles;
  secondaryButtonCopy: string;
  secondaryButtonLink: Types.ProjectMapLink;
  secondaryButtonStyle: Types.ButtonStyles;
}>;

export enum CallToActionVariant {
  AlignLeft = 'alignLeft',
  AlignRight = 'alignRight',
  Featured = 'featured',
}

const getCallToActionContentClass = (variantId?: string) => {
  switch (variantId) {
    case CallToActionVariant.AlignLeft:
      return 'flex-col text-start items-start w-full';
    case CallToActionVariant.AlignRight:
      return 'flex-col text-end items-end w-full';
    case CallToActionVariant.Featured:
      return 'flex-col lg:flex-row  text-start items-center justify-between w-full';
    default:
      return 'flex-col text-center items-center w-full';
  }
};

const getCallToActionTextWrappersClass = (variantId?: string) => {
  switch (variantId) {
    case CallToActionVariant.Featured:
      return 'w-4/5';
    default:
      return '';
  }
};

const CallToAction: FC<Props> = ({
  eyebrowText,
  titleStyle: TitleTag = 'h2',
  primaryButtonCopy,
  primaryButtonLink,
  primaryButtonStyle,
  secondaryButtonCopy,
  secondaryButtonLink,
  secondaryButtonStyle,
  component: { variant } = {},
}) => (
  <div className="flex flex-wrap items-center justify-between w-full lg:flex-nowrap rounded-xl text-secondary-content">
    <div className={classNames('flex', getCallToActionContentClass(variant))}>
      <div className={getCallToActionTextWrappersClass(variant)}>
        {eyebrowText && (
          <UniformText
            parameterId="eyebrowText"
            as="div"
            className="text-sm font-bold tracking-wider uppercase text-primary my-3"
          />
        )}
        <UniformText parameterId="title" as={TitleTag} className={classNames('font-medium', getTextClass(TitleTag))} />
        <UniformText parameterId="description" as="p" className="py-6 text-xl" />
      </div>
      <div className="flex justify-between">
        {Boolean(primaryButtonLink && primaryButtonCopy) && (
          <Button
            href={primaryButtonLink.path}
            copy={<UniformText parameterId="primaryButtonCopy" />}
            style={primaryButtonStyle}
          />
        )}
        {Boolean(secondaryButtonCopy && secondaryButtonLink) && (
          <Button
            href={secondaryButtonLink.path}
            copy={<UniformText parameterId="secondaryButtonCopy" />}
            style={secondaryButtonStyle}
          />
        )}
      </div>
    </div>
  </div>
);

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
