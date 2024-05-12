import { FC, Fragment } from 'react';
import Image from '../../components/Image';
import classNames from 'classnames';
import { UniformText, useUniformContextualEditingState } from '@uniformdev/canvas-react';
import Button from '../../components/Button';
import { formatProjectMapLink, getMediaUrl } from '../../utilities';
import { ScreenContainer } from '../../components/Container';
import { getPositionClassName, getWidthClassName, getTextAlignmentClassName } from './helpers';
import { BannerProps, BannerVariant } from '.';

export const Banner: FC<BannerProps> = ({
  icon,
  inline,
  primaryButtonCopy,
  primaryButtonLink,
  primaryButtonStyle = 'primary',
  primaryButtonAnimationType,
  position,
  textAlign,
  secondaryButtonCopy,
  secondaryButtonLink,
  secondaryButtonStyle = 'primary',
  secondaryButtonAnimationType,
  component,
}) => {
  const { previewMode } = useUniformContextualEditingState();
  const isContextualEditing = previewMode === 'editor';
  const Wrapper = inline && component?.variant !== BannerVariant.FullWidth ? ScreenContainer : Fragment;

  return (
    <Wrapper>
      <div
        className={classNames(
          'w-full z-[9999]',
          { 'fixed left-1/2 -translate-x-1/2': !inline },
          getPositionClassName(position, inline),
          getWidthClassName(component?.variant as BannerVariant)
        )}
      >
        <div className="w-full grid md:grid-cols-12 bg-base-300 gap-x-6 py-5 px-5 xl:px-10">
          <div className="col-span-1">
            {Boolean(icon) && <Image width={60} height={60} src={getMediaUrl(icon)} alt="banner-icon" />}
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
              className="py-6 text-xl text-primary-content"
            />
          </div>
          <div className="col-span-4 flex items-center justify-between gap-2 flex-col xs:gap-0 xs:flex-row md:flex-col lg:flex-row shrink-0 md:justify-end w-full md:w-auto md:space-x-0 md:space-y-2 lg:space-y-0 lg:space-x-3 mt-4 md:mt-0">
            {(Boolean(primaryButtonCopy) || isContextualEditing) && (
              <Button
                className="mx-1"
                href={formatProjectMapLink(primaryButtonLink)}
                copy={<UniformText placeholder="Button copy goes here" parameterId="primaryButtonCopy" />}
                animationType={primaryButtonAnimationType}
                style={primaryButtonStyle}
              />
            )}
            {(Boolean(secondaryButtonCopy) || isContextualEditing) && (
              <Button
                className="mx-1"
                href={formatProjectMapLink(secondaryButtonLink)}
                copy={<UniformText placeholder="Button copy goes here" parameterId="secondaryButtonCopy" />}
                animationType={secondaryButtonAnimationType}
                style={secondaryButtonStyle}
              />
            )}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
