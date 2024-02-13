import { FC } from 'react';
import classNames from 'classnames';
import {
  BackgroundTypes,
  getBackgroundClass,
  getBackgroundColor,
  getMarginBottomClass,
  getMarginTopClass,
  getPaddingBottomClass,
  getPaddingTopClass,
} from '../../utilities/styling';
import { ContainerProps } from './';
import { REGEX_COLOR_HEX } from '../../utilities';

type BackgroundWrapperProps = Required<Omit<ContainerProps, 'className'>>;

export const BackgroundWrapper: FC<Omit<BackgroundWrapperProps, 'containerVariant'>> = ({
  backgroundType = BackgroundTypes.Transparent,
  paddingTop,
  paddingBottom,
  marginTop,
  marginBottom,
  children,
  backgroundClassName,
}) => {
  const currentColor = REGEX_COLOR_HEX.test(backgroundType) ? backgroundType : undefined;
  const backgroundStyle = (() => {
    const fixedBackgroundStyle = getBackgroundClass(backgroundType as BackgroundTypes);
    if (fixedBackgroundStyle) {
      return fixedBackgroundStyle;
    } else {
      return getBackgroundColor(backgroundType as Types.ThemeColorsValues);
    }
  })();

  return backgroundStyle || currentColor ? (
    <div
      className={classNames(
        { [backgroundStyle]: !currentColor },
        getPaddingTopClass(paddingTop),
        getPaddingBottomClass(paddingBottom),
        getMarginTopClass(marginTop),
        getMarginBottomClass(marginBottom),
        backgroundClassName
      )}
      style={{ backgroundColor: currentColor }}
    >
      {children}
    </div>
  ) : (
    <>{children}</>
  );
};
