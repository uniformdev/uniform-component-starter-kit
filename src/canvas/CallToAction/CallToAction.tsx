import { FC } from 'react';
import classNames from 'classnames';
import { UniformText, useUniformContextualEditingState } from '@uniformdev/canvas-react';
import Button from '../../components/Button';
import { getTextClass } from '../../utilities/styling';
import { formatProjectMapLink } from '../../utilities';
import { getCallToActionContentClass, getCallToActionTextWrappersClass } from './helpers';
import { CallToActionProps } from '.';

export const CallToAction: FC<CallToActionProps> = ({
  titleStyle: TitleTag = 'h2',
  primaryButtonCopy,
  primaryButtonLink,
  primaryButtonStyle,
  primaryButtonAnimationType,
  secondaryButtonCopy,
  secondaryButtonLink,
  secondaryButtonStyle,
  secondaryButtonAnimationType,
  textColorVariant,
  styles,
  component: { variant } = {},
}) => {
  const { previewMode } = useUniformContextualEditingState();
  const isContextualEditing = previewMode === 'editor';

  const isLightTextColor = textColorVariant === 'Light';
  const eyebrowTextColorStyle = isLightTextColor ? 'text-secondary' : 'text-primary';
  const textColorStyle = isLightTextColor ? 'text-primary-content' : 'text-secondary-content';

  return (
    <div
      className={classNames(
        'flex flex-wrap items-center justify-between w-full lg:flex-nowrap rounded-xl',
        textColorStyle,
        styles?.container
      )}
    >
      <div className={classNames('flex', getCallToActionContentClass(variant))}>
        <div className={getCallToActionTextWrappersClass(variant)}>
          <UniformText
            placeholder="Eyebrow text goes here"
            parameterId="eyebrowText"
            as="div"
            className={classNames(
              'text-sm font-bold tracking-wider uppercase text-primary my-3',
              eyebrowTextColorStyle
            )}
          />
          <UniformText
            placeholder="Title goes here"
            parameterId="title"
            as={TitleTag}
            className={classNames('font-medium', getTextClass(TitleTag))}
          />
          <UniformText
            placeholder="Description goes here"
            parameterId="description"
            as="p"
            className="pt-6 text-xl whitespace-break-spaces"
          />
        </div>
        <div className="flex justify-between pt-6">
          {(Boolean(primaryButtonCopy) || isContextualEditing) && (
            <Button
              href={formatProjectMapLink(primaryButtonLink)}
              animationType={primaryButtonAnimationType}
              copy={<UniformText placeholder="Button copy goes here" parameterId="primaryButtonCopy" />}
              style={primaryButtonStyle}
            />
          )}
          {(Boolean(secondaryButtonCopy) || isContextualEditing) && (
            <Button
              href={formatProjectMapLink(secondaryButtonLink)}
              animationType={secondaryButtonAnimationType}
              copy={<UniformText placeholder="Button copy goes here" parameterId="secondaryButtonCopy" />}
              style={secondaryButtonStyle}
            />
          )}
        </div>
      </div>
    </div>
  );
};
