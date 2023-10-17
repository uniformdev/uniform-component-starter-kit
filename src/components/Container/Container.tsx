import { FC } from 'react';
import classNames from 'classnames';
import { BackgroundTypes, PaddingSize } from '../../utilities/styling';
import { ContainerProps, ContainerVariants } from './';
import { BaseContainer } from './BaseContainer';
import { ScreenContainer } from './ScreenContainer';
import { BackgroundWrapper } from './helpers';

const Container: FC<ContainerProps> = ({
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
  if (containerVariant === ContainerVariants.FluidContent) {
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
          backgroundClassName={classNames(backgroundClassName)}
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
