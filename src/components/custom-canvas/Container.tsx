import { FC } from 'react';
import {
  Container as CSKContainer,
  ContainerProps as CSKContainerProps,
} from '@uniformdev/csk-components/components/canvas';

// This is an example of how you can override an existing CSK component based on the Container component.
const Container: FC<CSKContainerProps> = props => <CSKContainer {...props} />;

export default Container;
