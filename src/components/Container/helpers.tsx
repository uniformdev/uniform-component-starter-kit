import { FC } from 'react';
import classNames from 'classnames';
import {
  BackgroundTypes,
  getBackgroundClass,
  getMarginBottomClass,
  getMarginTopClass,
  getPaddingBottomClass,
  getPaddingTopClass,
} from '../../utilities/styling';
import { ContainerProps } from './';

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
  return BackgroundTypes[backgroundType] ? (
    <div
      className={classNames(
        getBackgroundClass(backgroundType),
        getPaddingTopClass(paddingTop),
        getPaddingBottomClass(paddingBottom),
        getMarginTopClass(marginTop),
        getMarginBottomClass(marginBottom),
        backgroundClassName
      )}
    >
      {children}
    </div>
  ) : (
    <>{children}</>
  );
};
