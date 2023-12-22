import { FC, SyntheticEvent, useCallback, useState } from 'react';
import { UniformSlot } from '@uniformdev/canvas-react';
import { getMediaUrl } from '../../../../utilities';
import MenuLink from '../../../../components/MenuLink';
import { NavigationOneColumnMenuLinkProps } from '.';

export const NavigationOneColumnMenuLink: FC<NavigationOneColumnMenuLinkProps> = ({ icon, component, ...rest }) => {
  const [showHoverItem, setShowHoverItem] = useState<boolean>(false);

  const toggleShowHoverItem = useCallback(
    (e: SyntheticEvent<HTMLDivElement>) => setShowHoverItem(e.type !== 'mouseleave'),
    []
  );

  return (
    <div className="grid md:grid-cols-12 grid-cols-5">
      <div onMouseEnter={toggleShowHoverItem} onMouseLeave={toggleShowHoverItem} className="col-span-5 px-4 py-2">
        <MenuLink {...rest} imageUrl={getMediaUrl(icon)} variant={component?.variant} />
      </div>
      {showHoverItem && (
        <div className="hidden absolute w-[calc(100%*7/12)] h-full right-0 top-0 md:block col-span-7 bg-white z-30">
          <div className="flex h-full items-center">
            <div className="w-full [&>*]:overflow-x-hidden [&>*]:mx-auto">
              <UniformSlot name="hoverContent" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
