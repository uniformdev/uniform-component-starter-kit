import { FC } from 'react';
import classNames from 'classnames';
import { DividerProps } from '.';
import { getAlignmentClassName, getDividerColorStyle, getDividerWidth } from './helpers';

export const Divider: FC<DividerProps> = ({ colorStyle, thickness = 1, width, alignment }) => {
  return (
    <div className={classNames('w-full flex', getAlignmentClassName(alignment))}>
      <div
        className={classNames(getDividerColorStyle(colorStyle), getDividerWidth(width))}
        style={{ borderWidth: thickness }}
      />
    </div>
  );
};
