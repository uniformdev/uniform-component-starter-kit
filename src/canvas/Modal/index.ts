import { registerUniformComponent, ComponentProps } from '@uniformdev/canvas-react';
import { withoutContainer } from '../../hocs/withoutContainer';
import { Modal } from './Modal';

export type ModalProps = ComponentProps<{
  closeOnClickOutside: boolean;
  maxWidth: Types.AvailableModalMaxWidth;
  automaticOpenTimeout: number;
}>;

registerUniformComponent({
  type: 'modal',
  component: withoutContainer(Modal),
});

export default withoutContainer(Modal);
