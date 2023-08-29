import { FC } from 'react';
import classNames from 'classnames';
import {
  registerUniformComponent,
  useUniformCurrentComposition,
  ComponentProps,
  UniformText,
} from '@uniformdev/canvas-react';
import Button from '../components/Button';
import { getTextClass } from '../utilities/styling';
import { formatProjectMapLink } from '../utilities';

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
  titleStyle: TitleTag = 'h2',
  primaryButtonCopy,
  primaryButtonLink,
  primaryButtonStyle,
  secondaryButtonCopy,
  secondaryButtonLink,
  secondaryButtonStyle,
  component: { variant } = {},
}) => {
  const { isContextualEditing } = useUniformCurrentComposition();
  return (
    <div className="flex flex-wrap items-center justify-between w-full lg:flex-nowrap rounded-xl text-secondary-content">
      <div className={classNames('flex', getCallToActionContentClass(variant))}>
        <div className={getCallToActionTextWrappersClass(variant)}>
          <UniformText
            placeholder="Eyebrow text goes here"
            parameterId="eyebrowText"
            as="div"
            className="text-sm font-bold tracking-wider uppercase text-primary my-3"
          />
          <UniformText
            placeholder="Title goes here"
            parameterId="title"
            as={TitleTag}
            className={classNames('font-medium', getTextClass(TitleTag))}
          />
          <UniformText placeholder="Description goes here" parameterId="description" as="p" className="py-6 text-xl" />
        </div>
        <div className="flex justify-between">
          {Boolean(primaryButtonLink && primaryButtonCopy) && (
            <Button
              href={formatProjectMapLink(primaryButtonLink)}
              copy={
                <UniformText
                  placeholder="Description goes here"
                  parameterId="primaryButtonCopy"
                  onClick={isContextualEditing ? e => e.preventDefault() : undefined}
                />
              }
              style={primaryButtonStyle}
            />
          )}
          {Boolean(secondaryButtonCopy && secondaryButtonLink) && (
            <Button
              href={formatProjectMapLink(secondaryButtonLink)}
              copy={
                <UniformText
                  placeholder="Description goes here"
                  parameterId="secondaryButtonCopy"
                  onClick={isContextualEditing ? e => e.preventDefault() : undefined}
                />
              }
              style={secondaryButtonStyle}
            />
          )}
        </div>
      </div>
    </div>
  );
};

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
