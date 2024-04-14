import { FC, useCallback, useState, useEffect, MouseEvent } from 'react';
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

  const onCloseModal = useCallback((e: globalThis.KeyboardEvent) => {
    if (e?.code === 'Escape') setShowModal(false);
  }, []);

  const onClickOutside = useCallback(() => {
    if (!isContextualEditing && closeOnClickOutside) setShowModal(false);
  }, [closeOnClickOutside, isContextualEditing]);

  const onClickContent = useCallback(
    (e: MouseEvent<HTMLFormElement>) => {
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

  useEffect(() => {
    document.addEventListener('keydown', onCloseModal, false);

    return () => {
      document.removeEventListener('keydown', onCloseModal, false);
    };
  });

  return (
    <div>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <div onClick={onToggleModal} className="max-w-screen-xl mx-auto">
        <UniformSlot name="trigger" />
      </div>
      {isModalContentPlaceholder ? (
        <UniformSlot name="content" />
      ) : (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions
        <dialog
          open={showModal}
          className={classNames('modal w-full h-full', {
            // we need override uniform add button zIndex(9900)
            'modal-open z-[9901]': showModal,
          })}
          aria-labelledby="dialognews-label"
          aria-modal="true"
          onClick={onClickOutside}
        >
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
          <form
            method="dialog"
            className={classNames('modal-box p-8', getModalMaxWidth(maxWidth))}
            onClick={onClickContent}
          >
            <button onClick={onToggleModal} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
            <UniformSlot name="content" />
          </form>
        </dialog>
      )}
    </div>
  );
};
