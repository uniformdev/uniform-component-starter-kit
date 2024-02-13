import { useCallback, useState } from 'react';

type Response = {
  isScrollLocked: boolean;
  toggleLockScroll: (value?: boolean) => void;
};

const useLockScroll = (): Response => {
  const [isScrollLocked, setIsLocked] = useState<boolean>(false);
  const toggleLockScroll = useCallback(
    (value = !isScrollLocked) => {
      const element = document.querySelector('body');
      if (element) {
        if (value) {
          const currentScrollPosition = window.scrollY;
          element.style.top = `${-currentScrollPosition}px`;
          element.style.overflow = 'hidden';
          element.style.position = 'fixed';
          element.style.width = '100%';
          setIsLocked(true);
        } else {
          element.style.removeProperty('top');
          element.style.removeProperty('overflow');
          element.style.removeProperty('position');
          setIsLocked(false);
        }
      }
    },
    [isScrollLocked]
  );
  return { isScrollLocked, toggleLockScroll };
};

export default useLockScroll;
