import { FC } from 'react';
import classNames from 'classnames';
import { DividerProps } from '.';
import { getDividerColorStyle } from './helpers';

export const Divider: FC<DividerProps> = ({ colorStyle, thickness }) => (
  <div className={classNames('w-full', getDividerColorStyle(colorStyle))} style={{ borderWidth: thickness }} />
);
