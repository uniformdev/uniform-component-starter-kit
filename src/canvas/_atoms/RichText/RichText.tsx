import { FC } from 'react';
import classNames from 'classnames';
import { UniformRichText } from '@uniformdev/canvas-react';
import { REGEX_COLOR_HEX } from '../../../utilities';
import { getTextColor } from '../../../utilities/styling';
import { RichTextProps, RichTextVariants } from '.';

const DEFAULT_COLOR = '#000';

export const RichText: FC<RichTextProps> = ({ color = DEFAULT_COLOR, style = {}, styles, component }) => {
  // Deprecated. Please use new  RichTextVariants component with. The RichTextVariants.Light will be removed
  const currentColor =
    component?.variant !== RichTextVariants.Light
      ? REGEX_COLOR_HEX.test(color || DEFAULT_COLOR)
        ? color
        : undefined
      : '#fff';

  return (
    <UniformRichText
      style={{ color: currentColor, ...style }}
      className={classNames(
        'max-w-full prose [&_*]:text-current marker:text-current',
        {
          [getTextColor(color as Types.ThemeColorsValues)]: !currentColor,
        },
        styles?.content
      )}
      parameterId="content"
    />
  );
};
