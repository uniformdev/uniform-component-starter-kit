import { useCallback } from 'react';
import { UniformPlaygroundDecorator } from '@uniformdev/canvas-react';

// This decorator is used as a display of the Accordion component around the Accordion Item component
// Activate visual editing doc: https://docs.uniform.app/docs/guides/composition/visual-editing/activate-visual-editing
export const AccordionItemDecorator: UniformPlaygroundDecorator = ({ data, children }) => {
  const ItemPlaceholder = useCallback(
    (count = 1) =>
      new Array(count).fill(0).map((_item, index) => (
        <div key={`item-${index}`} className="card rounded-none blur-xs mt-6">
          <button className="flex flex-row justify-between items-center p-4 md:p-8 text-2xl font-bold bg-primary w-full">
            <p className="text-start pr-2 text-primary-content">{`Accordion item #${index + 2} title`}</p>
            <div className="flex items-center">
              <svg width="15" height="9" viewBox="0 0 15 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M7.49987 9L15 1.86349L13.0416 0L7.5 5.2729L1.95843 0L0 1.86349L7.49987 9Z"
                  fill="white"
                />
              </svg>
            </div>
          </button>
        </div>
      )),
    []
  );

  return data.type !== 'accordionItem' ? (
    <>{children}</>
  ) : (
    <div className="text-secondary-content">
      <p className="text-3xl font-extrabold blur-xs">Accordion title</p>
      <p className="text-xl pb-6 blur-xs">Some compelling text</p>
      {children}
      {ItemPlaceholder(2)}
    </div>
  );
};
