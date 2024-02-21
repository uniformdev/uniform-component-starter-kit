import { FC } from 'react';
import classNames from 'classnames';
import { UniformText, useUniformCurrentComposition } from '@uniformdev/canvas-react';
import { REGEX_COLOR_HEX } from '../../../utilities';
import { getTextColor } from '../../../utilities/styling';
import { getDefaultTextStyle, getTextLetterSpacing, getTextSize } from './helpers';
import { TextProps } from './';

const DEFAULT_COLOR = '#000';
const DEFAULT_TAG = 'p';

export const Text: FC<TextProps> = ({ tag, color = DEFAULT_COLOR, size, letterSpacing, style = {} }) => {
  const { isContextualEditing } = useUniformCurrentComposition();

  const currentColor = REGEX_COLOR_HEX.test(color || DEFAULT_COLOR) ? color : undefined;
  const Tag = tag || DEFAULT_TAG;

  const TextElement = () => (
    <UniformText
      placeholder="Text goes here"
      parameterId="text"
      style={{ color: currentColor, ...style }}
      as={Tag}
      className={classNames(getDefaultTextStyle(Tag), getTextSize(size), getTextLetterSpacing(letterSpacing), {
        [getTextColor(color as Types.ThemeColorsValues)]: !currentColor,
      })}
    />
  );

  // ToDo requires refactoring (styles do not apply when сontextual editing)
  return isContextualEditing ? (
    <div style={{ color: currentColor, ...style }}>
      <TextElement />
    </div>
  ) : (
    <TextElement />
  );
};
