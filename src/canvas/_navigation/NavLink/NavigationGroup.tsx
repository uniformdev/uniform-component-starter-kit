import { FC, useMemo, useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import { UniformSlot, useUniformContextualEditingState } from '@uniformdev/canvas-react';
import LinkItem from '../../../components/LinkItem';
import MobileMenuLayout from '../../../components/MobileMenuLayout';
import { getAllChildrenIds } from '../../../utilities';
import { checkIsCurrentRoute } from './helpers';
import { LinkProps } from '.';

export const NavigationGroup: FC<LinkProps> = ({ title, link, styles, color, hideIconBackground, icon, component }) => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const isCurrentRoute = useMemo(() => checkIsCurrentRoute(router, link), [router, link]);

  const { isContextualEditing, selectedComponentReference } = useUniformContextualEditingState({ global: true });

  const allComponentChildrenIds = useMemo(() => getAllChildrenIds(component), [component]);

  const isChildComponentSelected =
    selectedComponentReference && allComponentChildrenIds.includes(selectedComponentReference?.id);

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
    <li className="h-full relative" tabIndex={0} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <div className="grow px-0">
        <LinkItem
          icon={icon}
          isCurrentRoute={isCurrentRoute}
          title={title}
          isHovered={isMenuOpened}
          hideIconBackground={hideIconBackground}
          showArrow
          color={color}
          styles={styles}
          link={link}
        />

        {isMenuOpened && (
          <>
            <div className="p-2 bg-primary absolute top-full !rounded-none z-50 !mt-0 [&>*]:w-full [&>*]:min-w-max [&_a]:w-full [&_a]:py-4 hidden lg:block">
              <UniformSlot name="subNavItems" />
            </div>
            <MobileMenuLayout content={<UniformSlot name="subNavItems" />} onClickBack={onMouseLeave} />
          </>
        )}
      </div>
    </li>
  );
};
