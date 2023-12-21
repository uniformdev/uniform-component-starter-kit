import { FC } from 'react';
import classnames from 'classnames';
import { TabTitleProps } from '.';
import { getTabSize, getTabStyle } from './helpers';

export const TabTitle: FC<TabTitleProps> = ({ title, style, size, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={classnames('tab min-w-max', getTabSize(size), getTabStyle(style), { 'tab-active': isActive })}
  >
    <span>{title}</span>
  </button>
);
