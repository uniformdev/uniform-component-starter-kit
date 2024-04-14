import { FC, useState, useMemo, useEffect } from 'react';
import {
  UniformSlot,
  UniformSlotWrapperComponentProps,
  useUniformContextualEditingState,
} from '@uniformdev/canvas-react';
import classnames from 'classnames';
import { getAllChildrenIds } from '../../utilities';
import { TabsProps } from '.';
import { TabTitle } from '../Tab/TabTitle';
import { getTabStyle } from './helpers';

export const Tabs: FC<TabsProps> = ({ component, size, styles }) => {
  const { selectedComponentReference } = useUniformContextualEditingState({ global: true });

  const selectedSlotIndex = useMemo(() => {
    const tabs = component?.slots?.tabs;
    if (!selectedComponentReference?.id || !tabs) {
      return -1;
    }

    // Find the index of the tab containing the selected component
    return tabs.findIndex(tab => {
      const childrenIds = getAllChildrenIds(tab);
      return childrenIds.includes(selectedComponentReference.id);
    });
  }, [component?.slots?.tabs, selectedComponentReference?.id]);

  const tabs =
    component?.slots?.tabs?.map(tab => ({
      title: tab?.parameters?.title?.value as string,
      isActive: tab?.parameters?.isActive?.value as boolean,
    })) || [];

  const defaultActiveTabIndexFromCanvas = tabs?.findIndex(tab => tab.isActive);

  const defaultActiveTabIndex = defaultActiveTabIndexFromCanvas >= 0 ? defaultActiveTabIndexFromCanvas : 0;

  const [activeTabIndex, setActiveTabIndex] = useState<number>(defaultActiveTabIndex);

  useEffect(() => {
    if (selectedSlotIndex >= 0) {
      setActiveTabIndex(selectedSlotIndex);
    }
  }, [selectedComponentReference, selectedSlotIndex]);

  return (
    <>
      <div
        className={classnames(
          'tabs overflow-x-auto flex-nowrap w-full',
          getTabStyle(component?.variant as Types.TabStyle),
          styles?.container
        )}
      >
        {tabs?.map((tab, index) => (
          <TabTitle
            onClick={() => setActiveTabIndex(index)}
            isActive={activeTabIndex === index}
            key={tab.title}
            title={tab.title}
            size={size}
            style={component?.variant as Types.TabStyle}
          />
        ))}
      </div>
      <UniformSlot
        name="tabs"
        wrapperComponent={({ items }: UniformSlotWrapperComponentProps) =>
          <>{items[activeTabIndex]}</> ?? <div>no tab found</div>
        }
      />
    </>
  );
};
