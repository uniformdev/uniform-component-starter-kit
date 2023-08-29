import { FC, useCallback, useState, useEffect } from 'react';
import {
  registerUniformComponent,
  ComponentProps,
  UniformSlot,
  useUniformContextualEditingState,
} from '@uniformdev/canvas-react';
import classNames from 'classnames';

export type Props = ComponentProps<{
  closeOnClickOutside: boolean;
  maxWidth: Types.AvailableModalMaxWidth;
  automaticOpenTimeout: number;
}>;

const getModalMaxWidth = (maxWidth: Types.AvailableModalMaxWidth) => {
  switch (maxWidth) {
    case 'small':
      return 'max-w-sm';
    case 'medium':
      return 'max-w-md';
    case 'large':
      return 'max-w-lg';
    case 'xLarge':
      return 'max-w-xl';
    default:
      return 'max-w-max';
  }
};

const Modal: FC<Props> = ({ closeOnClickOutside, automaticOpenTimeout, maxWidth, component }) => {
  const [showModal, setShowModal] = useState(false);

  const { isContextualEditing, selectedComponentReference } = useUniformContextualEditingState();

  const onToggleModal = useCallback(() => {
    if (isContextualEditing) return;

    setShowModal(prev => !prev);
  }, [isContextualEditing]);

  const onClickOutside = useCallback(() => {
    if (isContextualEditing) return;

    if (closeOnClickOutside) {
      setShowModal(false);
    }
  }, [closeOnClickOutside, isContextualEditing]);

  const onClickContent = useCallback(
    (e: React.MouseEvent<HTMLFormElement>) => {
      if (isContextualEditing) return;

      e.stopPropagation();
    },
    [isContextualEditing]
  );

  const isModalContentPlaceholder =
    !component?.slots?.content?.length || component?.slots?.content?.[0]?._id === 'placeholder';

  const isModalTriggerPlaceholder = !component?.slots?.trigger?.length;

  useEffect(() => {
    if (isContextualEditing) return;
    if (isModalTriggerPlaceholder && automaticOpenTimeout) {
      setTimeout(() => {
        setShowModal(true);
      }, automaticOpenTimeout * 1000);
    }
  }, [isModalTriggerPlaceholder, automaticOpenTimeout, isContextualEditing]);

  useEffect(() => {
    setShowModal(selectedComponentReference?.slotName === 'content');
  }, [selectedComponentReference]);

  return (
    <>
      <span onClick={onToggleModal}>
        <UniformSlot name="trigger" />
      </span>
      {isModalContentPlaceholder ? (
        <UniformSlot name="content" />
      ) : (
        <dialog
          open={showModal}
          className={classNames('modal w-full h-full', {
            // we need override uniform add button zIndex(9900)
            'modal-open z-[9901]': showModal,
          })}
          onClick={onClickOutside}
        >
          <form
            method="dialog"
            className={classNames('modal-box p-8', getModalMaxWidth(maxWidth))}
            onClick={onClickContent}
          >
            <div onClick={onToggleModal} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </div>
            <UniformSlot name="content" />
          </form>
        </dialog>
      )}
    </>
  );
};

registerUniformComponent({
  type: 'modal',
  component: Modal,
});

export default Modal;
