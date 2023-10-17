import { FC, useCallback, useState, useEffect } from 'react';
import classNames from 'classnames';
import { UniformSlot, useUniformContextualEditingState } from '@uniformdev/canvas-react';
import { getModalMaxWidth } from './helpers';
import { ModalProps } from '.';

export const Modal: FC<ModalProps> = ({ closeOnClickOutside, automaticOpenTimeout, maxWidth, component }) => {
  const [showModal, setShowModal] = useState(false);

  const { isContextualEditing, selectedComponentReference } = useUniformContextualEditingState();

  const onToggleModal = useCallback(() => {
    if (!isContextualEditing) setShowModal(prev => !prev);
  }, [isContextualEditing]);

  const onClickOutside = useCallback(() => {
    if (!isContextualEditing && closeOnClickOutside) setShowModal(false);
  }, [closeOnClickOutside, isContextualEditing]);

  const onClickContent = useCallback(
    (e: React.MouseEvent<HTMLFormElement>) => {
      if (!isContextualEditing) e.stopPropagation();
    },
    [isContextualEditing]
  );

  const isModalContentPlaceholder =
    !component?.slots?.content?.length || component?.slots?.content?.[0]?._id?.startsWith('placeholder');

  const isModalTriggerPlaceholder = !component?.slots?.trigger?.length;

  useEffect(() => {
    if (isContextualEditing) return;
    if (isModalTriggerPlaceholder && automaticOpenTimeout) {
      setTimeout(() => setShowModal(true), automaticOpenTimeout * 1000);
    }
  }, [isModalTriggerPlaceholder, automaticOpenTimeout, isContextualEditing]);

  useEffect(() => {
    setShowModal(selectedComponentReference?.slotName === 'content');
  }, [selectedComponentReference]);

  return (
    <div>
      <div onClick={onToggleModal} className="max-w-screen-xl mx-auto">
        <UniformSlot name="trigger" />
      </div>
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
    </div>
  );
};
