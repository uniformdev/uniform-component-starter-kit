import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import classNames from 'classnames';
import {
  UniformSlot,
  UniformSlotWrapperComponentProps,
  useUniformContextualEditingState,
} from '@uniformdev/canvas-react';
import BaseImage from '../../../components/Image/Image';
import { getAllChildrenIds, getMediaUrl } from '../../../utilities';
import { getPosition } from './helpers';
import { Tooltip } from './Tooltip';
import { HotspotProps } from './';

export const Hotspot: FC<HotspotProps> = ({
  icon,
  iconHorizontalPosition: left = '0%',
  iconVerticalPosition: top = '0%',
  tooltipPosition = 'top',
  tooltipWidth,
  tooltipBackgroundColor,
  withTooltipShadow,
  component,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const onClickSpot = useCallback(() => setIsOpen(prevState => !prevState), []);

  const { previewMode, selectedComponentReference } = useUniformContextualEditingState({ global: true });

  const allComponentChildrenIds = useMemo(() => getAllChildrenIds(component), [component]);

  const isTooltipOpened = useMemo(() => {
    const isChildComponentSelected =
      selectedComponentReference && allComponentChildrenIds.includes(selectedComponentReference?.id);
    return previewMode === 'editor' ? isChildComponentSelected : isOpen;
  }, [allComponentChildrenIds, isOpen, previewMode, selectedComponentReference]);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  const desktopTooltip = useCallback(
    ({ items }: UniformSlotWrapperComponentProps) => (
      <Tooltip
        className="p-4"
        backgroundColor={tooltipBackgroundColor}
        withShadow={withTooltipShadow}
        style={{ width: tooltipWidth?.startsWith('0') ? undefined : tooltipWidth }}
      >
        <>{items}</>
      </Tooltip>
    ),
    [tooltipBackgroundColor, tooltipWidth, withTooltipShadow]
  );

  const mobileTooltip = useCallback(
    ({ items }: UniformSlotWrapperComponentProps) => (
      <Tooltip
        className="w-[calc(100vw-2rem)] pt-10"
        backgroundColor={tooltipBackgroundColor}
        withShadow={withTooltipShadow}
        style={{ maxWidth: tooltipWidth?.startsWith('0') ? undefined : tooltipWidth }}
      >
        <>
          <button onClick={() => setIsOpen(false)} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
          <div className="p-4">{items}</div>
        </>
      </Tooltip>
    ),
    [tooltipBackgroundColor, tooltipWidth, withTooltipShadow]
  );

  const imgSrc = getMediaUrl(icon);
  if (!imgSrc) return null;

  const baseTooltipWrapperClassName = classNames('absolute z-20 duration-300 opacity-0', {
    'opacity-100 duration-700': isTooltipOpened,
  });

  return (
    <div ref={ref}>
      <button
        className={classNames(
          'absolute z-10 -translate-x-1/2 -translate-y-1/2 hover:scale-125 hover:opacity-100 duration-700 cursor-pointer opacity-70',
          { 'scale-125 !opacity-100': isTooltipOpened }
        )}
        style={{ top, left }}
        onClick={onClickSpot}
      >
        <BaseImage src={imgSrc} width={24} height={24} alt="spot-icon" />
      </button>

      <div
        className={classNames(baseTooltipWrapperClassName, 'hidden sm:block', getPosition(tooltipPosition))}
        style={{ top, left }}
      >
        {isTooltipOpened && <UniformSlot name="content" emptyPlaceholder={null} wrapperComponent={desktopTooltip} />}
      </div>

      <div className={classNames(baseTooltipWrapperClassName, 'block sm:hidden top-0 left-1/2 -translate-x-1/2')}>
        {isTooltipOpened && <UniformSlot name="content" emptyPlaceholder={null} wrapperComponent={mobileTooltip} />}
      </div>
    </div>
  );
};
