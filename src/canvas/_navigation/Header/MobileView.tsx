import { FC, useState, useEffect, useCallback, useMemo } from 'react';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import { UniformSlot, useUniformContextualEditingState } from '@uniformdev/canvas-react';
import { ComponentInstance } from '@uniformdev/canvas';
import useLockScroll from '../../../hooks/useLockScroll';
import { getAllChildrenIds } from '../../../utilities';

type Props = {
  wrapperClassName?: string;
  logo?: React.ReactNode;
  component: ComponentInstance;
};

export const MobileView: FC<Props> = ({ wrapperClassName, logo, component }) => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { toggleLockScroll } = useLockScroll();

  const toggleMenu = useCallback(() => setIsMenuOpen(prevState => !prevState), []);

  const { isContextualEditing, selectedComponentReference } = useUniformContextualEditingState({ global: true });

  const allComponentChildrenIds = useMemo(() => getAllChildrenIds(component), [component]);

  const isChildComponentSelected =
    selectedComponentReference && allComponentChildrenIds.includes(selectedComponentReference?.id);

  useEffect(() => {
    if (!isContextualEditing) {
      toggleLockScroll(isMenuOpen);
    }
  }, [toggleLockScroll, isContextualEditing, isMenuOpen]);

  useEffect(() => {
    if (!isContextualEditing) {
      setIsMenuOpen(false);
    }
  }, [router.asPath, isContextualEditing]);

  const isMenuOpened = isContextualEditing ? isChildComponentSelected : isMenuOpen;

  const renderToggleButton = () => (
    <button onClick={toggleMenu} tabIndex={0} className="btn btn-ghost hover:bg-transparent px-0 lg:hidden">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
      </svg>
    </button>
  );

  return (
    <div className="relative">
      {renderToggleButton()}
      {isMenuOpened && (
        <ul
          tabIndex={0}
          className={classNames('fixed top-0 left-0 h-screen w-screen z-50 px-4 py-2', wrapperClassName)}
        >
          <div className="flex">
            {renderToggleButton()}
            {logo}
          </div>
          <div className="flex flex-col items-center gap-y-4 !text-xl mt-4">
            <UniformSlot name="links" />
          </div>
          <div className="flex justify-center items-center gap-x-4 !text-xl mt-4 [&_.dropdown>ul]:fixed [&_.dropdown>ul]:left-0">
            <UniformSlot name="iconLinks" />
          </div>
        </ul>
      )}
    </div>
  );
};
