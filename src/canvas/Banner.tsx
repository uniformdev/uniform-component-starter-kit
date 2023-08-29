import { FC, Fragment } from 'react';
import classNames from 'classnames';
import {
  ComponentProps,
  registerUniformComponent,
  UniformText,
  useUniformCurrentComposition,
} from '@uniformdev/canvas-react';
import Image from 'next/image';
import Button from '../components/Button';
import { ScreenContainer } from '../components/Container';
import { formatProjectMapLink } from '../utilities';

export type Props = ComponentProps<{
  title: string;
  description: string;
  icon: string;
  inline: boolean;
  textAlign: Types.HorizontalAlignment;
  position: Types.AvailableBannerPosition;
  primaryButtonCopy: string;
  primaryButtonLink: Types.ProjectMapLink;
  primaryButtonStyle: Types.ButtonStyles;
  secondaryButtonCopy: string;
  secondaryButtonLink: Types.ProjectMapLink;
  secondaryButtonStyle: Types.ButtonStyles;
}>;

export const enum BannerVariant {
  FullWidth = 'fullWidth',
}

const getPositionClassName = (position: Types.AvailableBannerPosition, inline: boolean) => {
  if (inline) return '';
  switch (position) {
    case 'center':
      return 'top-1/2 -translate-y-1/2';
    case 'top':
      return 'top-4';
    default:
      return 'bottom-4';
  }
};

const getWidthClassName = (variantId?: BannerVariant) => {
  switch (variantId) {
    case BannerVariant.FullWidth:
      return 'w-full';
    default:
      return 'max-w-screen-xl';
  }
};

const getTextAlignmentClassName = (textAlignment: Types.HorizontalAlignment) => {
  switch (textAlignment) {
    case 'center':
      return 'text-center';
    case 'right':
      return 'text-right';
    default:
      return 'text-left';
  }
};

const getInlineClassName = (inline: boolean, variant: BannerVariant) => {
  if (!inline) {
    return 'fixed left-1/2 -translate-x-1/2';
  }

  if (variant !== BannerVariant.FullWidth) {
    return 'w-full md:w-screen-xl';
  }
};

const Banner: FC<Props> = ({
  icon,
  inline,
  primaryButtonLink,
  primaryButtonStyle = 'primary',
  position,
  textAlign,
  secondaryButtonLink,
  secondaryButtonStyle = 'primary',
  component,
}) => {
  const { isContextualEditing } = useUniformCurrentComposition();

  const Wrapper = inline && component?.variant !== BannerVariant.FullWidth ? ScreenContainer : Fragment;

  return (
    <Wrapper key="box-content">
      <div
        className={classNames(
          'w-full px-4 z-[9999]',
          getInlineClassName(inline, component?.variant as BannerVariant),
          getPositionClassName(position, inline),
          getWidthClassName(component?.variant as BannerVariant)
        )}
      >
        <div className="w-full grid md:grid-cols-12 bg-base-300 gap-x-6 py-5 px-5 xl:px-10">
          <div className="col-span-1">
            {Boolean(icon) && <Image width={60} height={60} src={icon} alt="banner-icon" />}
          </div>
          <div
            className={classNames('w-full flex flex-col items-left col-span-7', getTextAlignmentClassName(textAlign))}
          >
            <UniformText
              placeholder="Title goes here"
              parameterId="title"
              as="p"
              className="text-primary-content text-xl"
            />
            <UniformText
              placeholder="Description goes here"
              parameterId="description"
              as="p"
              className="py-6 text-xl"
            />
          </div>
          <div className="col-span-4 flex items-center justify-between gap-2 flex-col xs:gap-0 xs:flex-row md:flex-col lg:flex-row shrink-0 md:justify-end w-full md:w-auto md:space-x-0 md:space-y-2 lg:space-y-0 lg:space-x-3 mt-4 md:mt-0">
            {Boolean(primaryButtonLink) && (
              <Button
                className="mx-1"
                href={formatProjectMapLink(primaryButtonLink)}
                copy={
                  <UniformText
                    placeholder="Button Copy goes here"
                    parameterId="primaryButtonCopy"
                    onClick={isContextualEditing ? e => e.preventDefault() : undefined}
                  />
                }
                style={primaryButtonStyle}
              />
            )}
            {Boolean(secondaryButtonLink) && (
              <Button
                className="mx-1"
                href={formatProjectMapLink(secondaryButtonLink)}
                copy={
                  <UniformText
                    placeholder="Button Copy goes here"
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
    </Wrapper>
  );
};

[undefined, BannerVariant.FullWidth].forEach(variantId => {
  registerUniformComponent({
    type: 'banner',
    component: Banner,
    variantId,
  });
});

export default Banner;
