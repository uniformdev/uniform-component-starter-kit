import { FC } from 'react';
import { UniformSlot, ComponentProps, registerUniformComponent } from '@uniformdev/canvas-react';
import BaseContainer, { Props as BaseContainerProps } from '@/components/Container';

export type ContainerProps = ComponentProps<BaseContainerProps>;

const Container: FC<ContainerProps> = props => (
  <BaseContainer {...props}>
    <UniformSlot name="container-inner" />
  </BaseContainer>
);

registerUniformComponent({
  type: 'container',
  component: Container,
});

export default Container;
