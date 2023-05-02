import { FC, ReactNode } from 'react';
import classNames from 'classnames';

export enum BackgroundTypes {
  Light = 'Light',
  Dark = 'Dark',
  Medium = 'Medium',
  Transparent = 'Transparent',
}

export enum PaddingSize {
  Small = 'Small',
  Medium = 'Medium',
  Large = 'Large',
  None = 'None',
}

const PaddingTopClasses = {
  [PaddingSize.Large]: 'pt-16 md:pt-28',
  [PaddingSize.Medium]: 'pt-10 lg:pt-20',
  [PaddingSize.Small]: 'pt-6 lg:pt-8',
  [PaddingSize.None]: '',
};

const PaddingBottomClasses = {
  [PaddingSize.Large]: 'pb-16 md:pb-28',
  [PaddingSize.Medium]: 'pb-10 lg:pb-20',
  [PaddingSize.Small]: 'pb-6 lg:pb-8',
  [PaddingSize.None]: '',
};

const BackgroundClasses = {
  [BackgroundTypes.Transparent]: 'bg-transparent',
  [BackgroundTypes.Light]: 'bg-base-100 text-black',
  [BackgroundTypes.Medium]: 'bg-gray-50 text-black',
  [BackgroundTypes.Dark]: 'bg-base-300 !text-primary-content',
};

export type Props = {
  backgroundType?: BackgroundTypes;
  paddingTop?: PaddingSize;
  paddingBottom?: PaddingSize;
  children: ReactNode;
  backgroundClassName?: string;
  className?: string;
};

type BackgroundWrapperProps = Required<Omit<Props, 'className'>>;

const BackgroundWrapper: FC<BackgroundWrapperProps> = ({
  backgroundType = BackgroundTypes.Transparent,
  paddingTop,
  paddingBottom,
  children,
  backgroundClassName,
}) =>
  BackgroundTypes[backgroundType] ? (
    <div
      className={classNames(
        BackgroundClasses[backgroundType],
        PaddingTopClasses[paddingTop],
        PaddingBottomClasses[paddingBottom],
        backgroundClassName
      )}
    >
      {children}
    </div>
  ) : (
    <>{children}</>
  );

export const BaseContainer: FC<Props> = ({ children, className }) => (
  <div className={classNames('m-auto max-w-screen-xl px-4 lg:px-8', className)}>{children}</div>
);

const Container: FC<Props> = ({
  backgroundType,
  paddingTop = PaddingSize.Medium,
  paddingBottom = PaddingSize.Medium,
  children,
  backgroundClassName = '',
  className,
}) => (
  <BackgroundWrapper
    paddingTop={paddingTop}
    backgroundType={backgroundType || BackgroundTypes.Transparent}
    paddingBottom={paddingBottom}
    backgroundClassName={backgroundClassName}
  >
    <BaseContainer className={className}>{children}</BaseContainer>
  </BackgroundWrapper>
);

export default Container;
