import { CSSProperties, FC, ReactElement, useMemo } from 'react';
import classNames from 'classnames';
import { getBackgroundColor } from '../../../utilities/styling';
import { REGEX_COLOR_HEX } from '../../../utilities';

const DEFAULT_COLOR = '#fff';

export type TooltipProps = {
  className?: string;
  backgroundColor?: Types.ThemeColorsValues | string;
  withShadow?: boolean;
  style?: CSSProperties;
  children: ReactElement;
};
export const Tooltip: FC<TooltipProps> = ({ className, backgroundColor, withShadow = false, style, children }) => {
  const hexBackgroundColor = useMemo(
    () => (REGEX_COLOR_HEX.test(backgroundColor || DEFAULT_COLOR) ? backgroundColor : undefined),
    [backgroundColor]
  );

  return (
    <div
      className={classNames('overflow-hidden rounded-lg', className, {
        [getBackgroundColor(backgroundColor as Types.ThemeColorsValues)]: !hexBackgroundColor,
        'shadow-2xl': withShadow,
      })}
      style={{ backgroundColor: hexBackgroundColor, ...style }}
    >
      {children}
    </div>
  );
};
