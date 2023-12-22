import { FC, useMemo, useState, useCallback } from 'react';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import { UniformSlot } from '@uniformdev/canvas-react';
import { checkIsCurrentRoute } from './helpers';
import { LinkProps } from '.';

export const NavigationGroup: FC<LinkProps> = ({ title, link, styles }) => {
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
    <li className="h-full" tabIndex={0} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <details open={isHovered}>
        <summary
          className={classNames(
            '!rounded-none px-6 text-base hover:text-primary-content hover:opacity-60',
            styles?.link,
            {
              'font-extrabold': isCurrentRoute,
              [styles?.activeLink || '']: isCurrentRoute,
            }
          )}
        >
          {title}
        </summary>

        <ul className="p-2 bg-primary !rounded-none z-50 !mt-0 [&>*]:w-full [&>*]:min-w-max [&_a]:w-full [&_a]:py-4">
          <UniformSlot name="subNavItems" />
        </ul>
      </details>
    </li>
  );
};
