import { FC, useMemo, useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import { UniformSlot } from '@uniformdev/canvas-react';
import { checkIsCurrentRoute } from './helpers';
import { NavigationMenuProps } from '.';

export const NavigationMenu: FC<NavigationMenuProps> = ({ link, title }) => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const isCurrentRoute = useMemo(() => checkIsCurrentRoute(router, link), [router, link]);

  const onMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const onMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  return (
    <li className="h-full !static" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <details open={isHovered}>
        <summary
          className={classNames(
            '!rounded-none px-6 text-base hover:text-primary-content hover:opacity-80',

            {
              'font-extrabold': isCurrentRoute,
            }
          )}
        >
          {title}
        </summary>

        <ul
          className={classNames(
            'lg:w-full text-primary-content !bg-transparent left-0 !rounded-none !mt-0 !p-0 lg:!pt-3 !p-0'
          )}
        >
          <div className={classNames('lg:bg-gray-200 [&>*]:max-w-screen-xl [&>*]:mx-auto')}>
            <div className="bg-primary">
              <UniformSlot name="content" />
            </div>
          </div>
        </ul>
      </details>
    </li>
  );
};
