import { FC, ReactNode } from 'react';
import classNames from 'classnames';
import {
  BackgroundTypes,
  PaddingSize,
  getBackgroundClass,
  getPaddingTopClass,
  getPaddingBottomClass,
  getMarginTopClass,
  getMarginBottomClass,
} from '../utilities/styling';

export enum ContainerVariants {
  BackgroundInContainer = 'backgroundInContainer',
  FluentContent = 'fluentContent',
}

export type Props = {
  backgroundType?: BackgroundTypes;
  paddingTop?: PaddingSize;
  paddingBottom?: PaddingSize;
  marginTop?: PaddingSize;
  marginBottom?: PaddingSize;
  children: ReactNode;
  backgroundClassName?: string;
  containerVariant?: string;
  className?: string;
};

type BackgroundWrapperProps = Required<Omit<Props, 'className'>>;

const BackgroundWrapper: FC<Omit<BackgroundWrapperProps, 'containerVariant'>> = ({
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

export const BaseContainer: FC<Props> = ({ children, className }) => (
  <div className={classNames('px-4 lg:px-8', className)}>{children}</div>
);

export const ScreenContainer: FC<Props> = ({ children, className }) => (
  <BaseContainer className={classNames('m-auto max-w-screen-xl', className)}>{children}</BaseContainer>
);

const Container: FC<Props> = ({
  backgroundType,
  paddingTop = PaddingSize.Medium,
  paddingBottom = PaddingSize.Medium,
  marginTop = PaddingSize.None,
  marginBottom = PaddingSize.None,
  containerVariant,
  children,
  backgroundClassName = '',
  className,
}) => {
  if (containerVariant === ContainerVariants.FluentContent) {
    return (
      <BackgroundWrapper
        paddingTop={paddingTop}
        backgroundType={backgroundType || BackgroundTypes.Transparent}
        paddingBottom={paddingBottom}
        marginTop={marginTop}
        marginBottom={marginBottom}
        backgroundClassName={backgroundClassName}
      >
        <BaseContainer className={className}>{children}</BaseContainer>
      </BackgroundWrapper>
    );
  }

  if (containerVariant === ContainerVariants.BackgroundInContainer) {
    return (
      <ScreenContainer className={className}>
        <BackgroundWrapper
          paddingTop={paddingTop}
          backgroundType={backgroundType || BackgroundTypes.Transparent}
          paddingBottom={paddingBottom}
          marginTop={marginTop}
          marginBottom={marginBottom}
          backgroundClassName={classNames('px-4 lg:px-8', backgroundClassName)}
        >
          {children}
        </BackgroundWrapper>
      </ScreenContainer>
    );
  }

  return (
    <BackgroundWrapper
      paddingTop={paddingTop}
      backgroundType={backgroundType || BackgroundTypes.Transparent}
      paddingBottom={paddingBottom}
      marginTop={marginTop}
      marginBottom={marginBottom}
      backgroundClassName={backgroundClassName}
    >
      <ScreenContainer className={className}>{children}</ScreenContainer>
    </BackgroundWrapper>
  );
};

export default Container;
