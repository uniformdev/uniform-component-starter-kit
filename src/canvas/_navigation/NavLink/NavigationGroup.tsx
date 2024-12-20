import { FC, useMemo, useState, useCallback } from 'react';
import { UniformSlot, useUniformContextualEditingState } from '@uniformdev/canvas-react';
import LinkItem from '../../../components/LinkItem';
import MobileMenuLayout from '../../../components/MobileMenuLayout';
import { getAllChildrenIds } from '../../../utilities';
import { LinkProps } from '.';

export const NavigationGroup: FC<Omit<LinkProps, 'link'>> = ({
  title,
  styles,
  color,
  hideIconBackground,
  icon,
  component,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const { previewMode, selectedComponentReference } = useUniformContextualEditingState({ global: true });
  const isContextualEditing = previewMode === 'editor';

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
          title={title}
          isHovered={isMenuOpened}
          hideIconBackground={hideIconBackground}
          showArrow
          color={color}
          styles={styles}
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
