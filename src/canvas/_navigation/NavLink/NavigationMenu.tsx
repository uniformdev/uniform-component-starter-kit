import { FC, useMemo, useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import { UniformSlot, useUniformContextualEditingState } from '@uniformdev/canvas-react';
import LinkItem from '../../../components/LinkItem';
import MobileMenuLayout from '../../../components/MobileMenuLayout';
import { getAllChildrenIds } from '../../../utilities';
import { checkIsCurrentRoute } from './helpers';
import { LinkProps } from '.';

export const NavigationMenu: FC<LinkProps> = ({ link, title, color, icon, hideIconBackground, styles, component }) => {
  const router = useRouter();
  const { isContextualEditing, selectedComponentReference } = useUniformContextualEditingState({ global: true });

  const allComponentChildrenIds = useMemo(() => getAllChildrenIds(component), [component]);

  const isChildComponentSelected =
    selectedComponentReference && allComponentChildrenIds.includes(selectedComponentReference?.id);

  const [isHovered, setIsHovered] = useState(false);

  const isCurrentRoute = useMemo(() => checkIsCurrentRoute(router, link), [router, link]);

  const onMouseEnter = useCallback(() => {
    if (!isContextualEditing) {
      setIsHovered(true);
    }
  }, [isContextualEditing]);

  const onMouseLeave = useCallback(() => {
    if (!isContextualEditing) {
      setIsHovered(false);
    }
  }, [isContextualEditing]);

  const isMenuOpened = isContextualEditing ? isChildComponentSelected : isHovered;

  return (
    <li className="h-full !static" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <div className="grow px-0">
        <LinkItem
          icon={icon}
          isCurrentRoute={isCurrentRoute}
          title={title}
          showArrow
          isHovered={isMenuOpened}
          hideIconBackground={hideIconBackground}
          color={color}
          styles={styles}
          link={link}
        />

        {isMenuOpened && (
          <>
            <div
              className={classNames(
                'lg:w-full absolute top-full left-0 text-primary-content !bg-transparent  !rounded-none -mt-5 pt-5 z-[60] hidden lg:block'
              )}
            >
              <div className={classNames('bg-white [&>*]:max-w-screen-xl [&>*]:mx-auto')}>
                <UniformSlot name="content" />
              </div>
            </div>

            <MobileMenuLayout
              isMegaMenu
              content={<UniformSlot name="content" />}
              onClickBack={onMouseLeave}
              backgroundType="static"
            />
          </>
        )}
      </div>
    </li>
  );
};
