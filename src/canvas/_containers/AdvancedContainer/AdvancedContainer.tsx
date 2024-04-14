import { FC } from 'react';
import { UniformSlot } from '@uniformdev/canvas-react';
import { AdvancedContainerProps, AdvancedContainerVariants } from '.';
import {
  getBackgroundColor,
  getMarginBottomClass,
  getMarginTopClass,
  getPaddingBottomClass,
  getPaddingTopClass,
} from '../../../utilities/styling';
import classNames from 'classnames';
import { REGEX_COLOR_HEX } from '../../../utilities';
import EmptyPlaceholder from '../../../components/EmptyPlaceholder';

const DEFAULT_COLOR = '#fff';

export const AdvancedContainer: FC<AdvancedContainerProps> = ({
  title,
  backgroundColor,
  marginTop,
  marginBottom,
  paddingTop,
  paddingBottom,
  style = {},
  component,
}) => {
  const { variant } = component;

  const currentColor = REGEX_COLOR_HEX.test(backgroundColor || DEFAULT_COLOR) ? backgroundColor : undefined;

  return (
    <div
      title={title}
      className={classNames(
        'relative w-full h-full',
        { 'max-w-screen-xl mx-auto': variant !== AdvancedContainerVariants.FluidContent },
        { [getBackgroundColor(backgroundColor as Types.ThemeColorsValues)]: !currentColor },
        getPaddingTopClass(paddingTop),
        getPaddingBottomClass(paddingBottom),
        getMarginTopClass(marginTop),
        getMarginBottomClass(marginBottom)
      )}
      style={{ ...style }}
    >
      <div className="absolute w-full h-full top-0 left-0 z-10 overflow-hidden">
        <UniformSlot name="background" emptyPlaceholder={null} />
      </div>
      <div className="relative z-20">
        <UniformSlot name="content" emptyPlaceholder={<EmptyPlaceholder />} />
      </div>
    </div>
  );
};
